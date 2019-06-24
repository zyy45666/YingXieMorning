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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})