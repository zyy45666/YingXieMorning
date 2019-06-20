//app.js

import * as config from './config.js'

App({

  onLaunch: function() {
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
              wx.request({
                url: config.getUserInfoUrl,
                method: 'POST',
                data: {
                  Token: res.data.Token
                },
                success: (res) => {
                  if (res.statusCode == 200 && (res.data.Name.length + res.data.SchoolID.length) == 0){
                    wx.navigateTo({
                      url: '/pages/info/info',
                    });
                  }
                }
              })
            }
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null
  }
})