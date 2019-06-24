// pages/sign/sign.js

import * as config from '../../config.js'
var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    article: {},
    status: false,
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
            article: data,
            status: true,
          });
        } else {
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
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
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