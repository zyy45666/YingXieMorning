// pages/more/more.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: ''
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

  pwinput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  passbt:function()
  {
    console.info(this.data)
    if(this.data.inputValue!='34567')
    {
      wx.showToast({
        title: "密码错误",
        icon: 'none',
        duration: 1500,
        mask: true
      })  
    }
    else{
      wx.navigateTo({
        url: '../puton/puton'
      })
    }
  }

})