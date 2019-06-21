// pages/sign/sign.js

import * as config from '../../config.js'
const app = getApp();
Page({

  data: {
    article: {}
  },
  jumpPage: function() {
    wx.navigateTo({
      url: '../readingresult/readingresult'
    })
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
        }
      },
      fail: () => wx.hideLoading(),
      complete: (res) => console.log(res)
    });
  }

})