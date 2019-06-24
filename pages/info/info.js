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

  confirm() {
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
        if (res.statusCode == 200) {
          wx.setStorageSync("Name", this.data.name);
          wx.setStorageSync("SchoolId", this.data.schoolId);
          wx.navigateBack({
            delta: 1
          });
        }
      },
      fail: () => {
        wx.hideLoading();
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