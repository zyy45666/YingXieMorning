// pages/home/home.js
import * as config from './../../config.js'
Page({
  onLoad: function() {
    var that = this;
    //获取本地保存的Token
    var token = wx.getStorageSync("Token");
    if (token && token.length != 0) {
      //如果Token存在则请求服务端直接登录接口
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
            //如果直接登录不成功则调用login函数
            that.login();
          } else if (res.data.code == 0) {
            //直接登录成功则检查用户信息是否填写
            that.checkInfo();
          }
        },
        complete: (res) => console.log(res)
      });
    } else {
      //Token不存在则调用login函数
      that.login();
    }
  },
  login() {
    var that = this;
    //调用微信的login函数
    wx.login({
      success: (res) => {
        //成功则以code为参数请求服务端登录接口
        wx.request({
          url: config.loginUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            if (res.statusCode == 200 && res.data.code == 0) {
              //调用成功则将返回的用户ID和Token保存
              wx.setStorageSync("ID", res.data.data.ID);
              wx.setStorageSync("Token", res.data.data.Token);
              //检查用户信息是否填写
              that.checkInfo();
            }
          },
          complete: (res) => console.log(res)
        });
      }
    });
  },
  checkInfo: () => {
    //向服务端请求用户信息
    wx.request({
      url: config.getUserInfoUrl,
      method: 'POST',
      data: {
        Token: wx.getStorageSync("Token")
      },
      success: (res) => {
        if (res.statusCode == 200 && res.data.code == 0 && (res.data.data.Name.length + res.data.data.SchoolID.length) == 0) {
          //如果用户信息不全就重置本地信息
          wx.setStorageSync('Name', '');
          wx.setStorageSync('SchoolID', '');
          //跳转到用户信息填写页面
          wx.navigateTo({
            url: '/pages/info/info',
          });
        }
        if (res.statusCode == 200 && res.data.code == 0 && (res.data.data.Name.length + res.data.data.SchoolID.length) != 0) {
          //如果已经填写过就更新本地信息
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