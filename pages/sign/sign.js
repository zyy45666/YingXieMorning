// pages/sign/sign.js

import * as config from '../../config.js'
const { $Toast } = require('../../dist/base/index');
var util = require('../../utils/util.js');
const app = getApp();
Page({

  data: {
    article: {},
    cur_year:0,
    cur_month:0,
    cur_day:0
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
  },
  handleClick: function(){
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getDate();
    var tapData={
      year:cur_year,
      month:cur_month,
      day:cur_day,
    };
    console.log(tapData);
    wx.showToast({
      title: '打卡成功',
      icon: 'success',
      duration: 1500
    })
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      })
    },1500)
  }

})