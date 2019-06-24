// pages/article/article.js

import * as config from '../../config.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click: true,
    article: {}
  },
  onLoad: function(options) {
    var tapData = (wx.getStorageSync('tapData') || []);
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: config.articleUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync('Token'),
        Time: parseInt(Date.parse(tapData.year.toString() + "-" + tapData.month.toString() 
        + "-" + tapData.day.toString()) / 1000)
      },
      success: (res) => {
        console.log(res);
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
          wx.showToast({
            title: '该天没有文章',
            icon: 'none',
            duration: 1500
          });
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 1500)
        }
      },
      fail: () => wx.hideLoading(),
      complete: (res) => console.log(res)
    });
  }
})