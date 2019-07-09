// pages/sign/sign.js

import * as config from '../../config.js'
var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    article: {},
    status: false,
  },
  //载入当天文章
  onLoad: function() {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    //以当前时间为参数向服务端请求当天文章
    wx.request({
      url: config.articleUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync('Token'),
        Time: parseInt(Date.now() / 1000)
      },
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode == 200 && res.data.code == 0) {
          //成功时转换获取的markdown
          let data = app.towxml.toJson(
            res.data.data.Content,
            'markdown'
          );

          data.theme = 'light';
          //设置显示内容
          that.setData({
            article: data,
            status: true,
          });
        } else {
          //没有文章提示用户并返回
          wx.showToast({
            title: '今天没有文章',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            });
          },1500)
        }
      },
      fail: () => wx.hideLoading(),
      complete: (res) => console.log(res)
    });
  },
  //用户点击打卡按钮
  handleClick: function() {
    //以当前用户的Token为参数请求服务端的打卡接口
    wx.request({
      url: config.punchUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync("Token")
      },
      success: (res) => {
        if (res.statusCode == 200 && res.data.code == 0) {
          //成功时提示用户并返回
          wx.showToast({
            title: '打卡成功',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
        } else {
          //否则提示用户重复打卡
          wx.showToast({
            title: '请勿重复打卡',
            icon: 'none'
          });
        }
      },
      complete: (res) => console.log(res)
    });
  }

})