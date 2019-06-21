// pages/puton/puton.js

import * as config from './../../config.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2019-6-21',
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
            title: '发布成功'
          });
          wx.navigateBack({
            delta: 1
          });
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