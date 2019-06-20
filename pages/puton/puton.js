// pages/puton/puton.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data: {
      date: '2016-11-08',
      time: '12:00',
      index: 0,
      article: '',

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



  //  点击时间组件确定事件
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //  点击日期组件确定事件
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  
  testinput: function (e) {
    this.setData({
      article: e.detail.value
    })
  },

})