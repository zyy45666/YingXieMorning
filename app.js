//app.js

import * as config from './config.js'
const Towxml = require('/towxml/main');

App({

  onLaunch: function() {
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
          if (res.statusCode != 200) {
            that.login();
          } else if (res.statusCode == 200) {
            that.checkInfo();
          }
        },
        complete: (res) => console.log(res)
      });
    } else {
      that.login();
    }

  },
  globalData: {
    userInfo: null
  },
  towxml: new Towxml(),
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
            if (res.statusCode == 200) {
              wx.setStorageSync("ID", res.data.ID);
              wx.setStorageSync("Token", res.data.Token);
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
        if (res.statusCode == 200 && (res.data.Name.length + res.data.SchoolID.length) == 0) {
          wx.navigateTo({
            url: '/pages/info/info',
          });
        }
        if (res.statusCode == 200 && (res.data.Name.length + res.data.SchoolID.length) != 0) {
          wx.setStorageSync('Name', res.data.Name);
          wx.setStorageSync('SchoolID', res.data.SchoolID);
        }
      },
      complete: (res) => console.log(res)
    })
  }
})