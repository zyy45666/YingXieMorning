// pages/sign/sign.js

import * as config from '../../config.js'
var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    article: {},
  },
  onLoad: function() {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: config.articleUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync('Token'),
        Time: parseInt(Date.now() / 1000)
      },
      success: (res) => {
        wx.hideLoading();
        if (res.statusCode == 200) {
          let data = app.towxml.toJson(
            res.data.Content,
            'markdown'
          );

          data.theme = 'light';

          that.setData({
            article: data
          });
        } else {
          wx.navigateBack({
            delta: 1
          });
          wx.showToast({
            title: '该天没有文章',
            icon: 'none'
          });
        }
      },
      fail: () => wx.hideLoading(),
      complete: (res) => console.log(res)
    });
  },
  handleClick: function() {
    wx.request({
      url: config.punchUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync("Token")
      },
      success: (res) => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '打卡成功',
          });
        } else {
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