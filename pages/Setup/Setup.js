// pages/Setup/Setup.js
var app = getApp
var util = require('../../utils/util.js');
import * as config from '../../config.js'

Page({
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "", //用户头像
      nickName: "", //用户昵称
    },

    days: [],
    signUp: [],
    cur_year: 0,
    cur_month: 0,
    count: 0

  },
  /**
   *点击添加地址事件
   */
  add_address_fun: function() {
    wx.navigateTo({
      url: 'add_address/add_address',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    });
    //获取当前年月  
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    //获取当前用户当前任务的签到状态
    this.onGetSignUp();
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    })
  },
  getThisMonthDays: function(year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function(year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({
      days: []
    });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          date: null,
          isSign: false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days: that.data.days
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function(year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });
  },

  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign: function() {
    var that = this;
    var signs = that.data.signUp;
    var daysArr = that.data.days;
    for (var i = 0; i < signs.length; i++) {
      var current = new Date(signs[i]);
      var year = current.getFullYear();
      var month = current.getMonth() + 1;
      var day = current.getDate();
      day = parseInt(day);
      for (var j = 0; j < daysArr.length; j++) {
        //年月日相同并且已打卡
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day) {
          daysArr[j].isSign = true;
        }
      }
    }
    that.setData({
      days: daysArr
    });
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar: function(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

  //获取当前用户该任务的签到数组
  onGetSignUp: function() {
    // var that = this;
    // var Task_User = Bmob.Object.extend("task_user");
    // var q = new Bmob.Query(Task_User);
    // q.get(that.data.objectId, {
    //   success: function(result) {
    //     that.setData({
    //       signUp: result.get("signUp"),
    //       count: result.get("score")
    //     });
    //     //获取后就判断签到情况
    //     that.onJudgeSign();
    //   },
    //   error: function(object, error) {}
    // });
    var that = this;
    wx.request({
      url: config.punches,
      method: 'POST',
      data: {
        Token: wx.getStorageSync('Token')
      },
      success: (res) => {
        if (res.statusCode == 200) {
          var signs = [];
          res.data.logs.forEach((e) => {
            signs.push(e.Time);
          });
          that.setData({
            signUp: signs,
            count: signs.length
          });
          that.onJudgeSign();
        }
      },
      complete: (res) => console.log(res)
    })
  },
  btn: function(e) {
    console.log(e);
    const year = this.data.cur_year;
    const month = this.data.cur_month;
    var day = parseInt(e.currentTarget.id);
    var tapData = {
      year: year,
      month: month,
      day: day
    }
    wx.setStorageSync('tapData', tapData);
    wx.navigateTo({
      url: '/pages/article/article',
    })
  }
})