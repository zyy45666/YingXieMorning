// pages/Setup/Setup.js
Page({
  cet4bt: function() {
    wx.navigateTo({
      url: '../cet4/cet4',
    })
  },
  cet6bt: function() {
    wx.navigateTo({
      url: '../cet6/cet6',
    })
  },
  Hbt: function() {
    wx.showToast({
      title: '休息一下吧',
      icon: 'loading',
      duration: 5000,
    })
  }
})