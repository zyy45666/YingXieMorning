//app.js

const Towxml = require('/towxml/main');

App({

  onLaunch:function(){

  },

  globalData: {
    userInfo: null
  },
  towxml: new Towxml()
 
})