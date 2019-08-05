// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import AMap from 'vue-amap'

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
  template: '<App/>'
})
