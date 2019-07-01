// pages/home/home.js
import * as config from './../../config.js'
Page({
  onLoad: function() {
    var that = this;
    var token = wx.getStorageSync("Token");
    if (token && token.length != 0) {
      wx.request({
        url: config.directLogin,
        method: 'POST',
        data: {
          Token: token
        },
        success: (res) => {
          if (res.statusCode != 200)
            return;
          if (res.data.code != 0) {
            that.login();
          } else if (res.data.code == 0) {
            that.checkInfo();
          }
        },
        complete: (res) => console.log(res)
      });
    } else {
      that.login();
    }
  },
  login() {
    var that = this;
    wx.login({
      success: (res) => {
        wx.request({
          url: config.loginUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            if (res.statusCode == 200 && res.data.code == 0) {
              wx.setStorageSync("ID", res.data.data.ID);
              wx.setStorageSync("Token", res.data.data.Token);
              that.checkInfo();
            }
          },
          complete: (res) => console.log(res)
        });
      }
    });
  },
  checkInfo: () => {
    wx.request({
      url: config.getUserInfoUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync("Token")
      },
      success: (res) => {
        if (res.statusCode == 200 && res.data.code == 0 && (res.data.data.Name.length + res.data.data.SchoolID.length) == 0) {
          wx.setStorageSync('Name', '');
          wx.setStorageSync('SchoolID', '');
          wx.navigateTo({
            url: '/pages/info/info',
          });
        }
        if (res.statusCode == 200 && res.data.code == 0 && (res.data.data.Name.length + res.data.data.SchoolID.length) != 0) {
          wx.setStorageSync('Name', res.data.data.Name);
          wx.setStorageSync('SchoolID', res.data.data.SchoolID);
        }
      },
      complete: (res) => console.log(res)
    })
  },
  signbt: function() {
    wx.navigateTo({
      url: '../sign/sign'
    })
  },
  campbt: function() {
    wx.navigateTo({
      url: '../camp/camp'
    })
  }
})