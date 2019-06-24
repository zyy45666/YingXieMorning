// pages/puton/puton.js

import * as config from './../../config.js'

var app = getApp()
Page({
  data: {
    date: '',
    index: 0,
    article: '',

  },
  //  点击日期组件确定事件
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  textinput: function(e) {
    this.setData({
      article: e.detail.value
    });
  },

  putonbt() {
    if (this.data.article.length == 0) {
      wx.showToast({
        title: '请输入文章',
        icon: 'none'
      });
      return;
    }
    wx.showLoading({
      title: '发布中',
    });
    wx.request({
      url: config.publishUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync('Token'),
        Content: this.data.article,
        Time: Date.parse(this.data.date)/1000
      },
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '发布成功',
            duration: 1500
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
        } else {
          wx.showToast({
            title: '发布失败，请重试',
            icon: 'none'
          })
        }
      },
      fail: () => wx.hideLoading(),
      complete: (res) => console.log(res)
    })
  }

})