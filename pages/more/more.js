// pages/more/more.js
var app=getApp();
Page({

  data: {
    inputValue: ''
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