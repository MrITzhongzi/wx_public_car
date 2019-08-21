// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import AMap from 'vue-amap'
import axios from 'axios'
import wx from 'weixin-js-sdk'
// 全局变量
import global_ from './components/config/GlobalParams'
Vue.prototype.GLOBAL = global_

Vue.use(AMap)
Vue.config.productionTip = false
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: '518f4668ca5f354185885be70c6cc731',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    axios.get('/user/getWxJSConfig', {
      params: { url: window.location.href.split('#')[0] }
    }).then(function (response) {
      let resData = response.data
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: resData.appId, // 必填，公众号的唯一标识
        timestamp: resData.timestamp, // 必填，生成签名的时间戳
        nonceStr: resData.nonceStr, // 必填，生成签名的随机串
        signature: resData.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      })
    })
  }
})
