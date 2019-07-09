// info.js
import * as config from './../../config.js'

Page({
  
  data: {
    name: '',
    schoolId: ''
  },

  idChange(e) {
    this.setData({
      schoolId: e.detail.detail.value
    });
  },
  nameChange(e) {
    this.setData({
      name: e.detail.detail.value
    });
  },
  //用户点击确认按钮
  confirm() {
    //未填写信息就提示用户
    if (this.data.name.length == 0 || this.data.schoolId.length == 0) {
      wx.showToast({
        title: '请输入非空信息',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '信息上传中',
    })
    //以用户填写的姓名，学号为参数调用服务端设置用户信息接口
    wx.request({
      url: config.setUserInfoUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync("Token"),
        Name: this.data.name,
        SchoolID: this.data.schoolId.toString()
      },
      success: (res) => {
        wx.hideLoading();
        //成功则更新本地用户信息
        if (res.statusCode == 200 && res.data.code == 0) {
          wx.setStorageSync("Name", this.data.name);
          wx.setStorageSync("SchoolId", this.data.schoolId);
          wx.navigateBack({
            delta: 1
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        //失败就提示用户
        wx.showToast({
          title: '上传失败，请稍后再试',
          icon: 'none'
        })
      },
      complete: (res) => console.log(res)
    });
  },

  onUnload: () => {
    var name = wx.getStorageSync("Name");
    var id = wx.getStorageSync("SchoolId");
    if (!(name && name.length != 0 && id && id.length != 0)) {
      wx.navigateTo({
        url: '../../pages/info/info',
      });
    }
  }
})