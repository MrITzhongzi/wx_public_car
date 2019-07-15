import Vue from 'vue'
import Router from 'vue-router'

import Shouye from '@/components/Shouye'
import Yuyue from '@/components/Yuyue'
import Huodong from '@/components/Huodong'
import Wode from '@/components/Wode'

import Sign from '@/components/Huodong/Sign.vue'
import MyMap from '@/components/shouye/Map'

import WeixinBackPage from '@/components/wxpage/WeixinBackPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Shouye
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: Yuyue
    },
    {
      path: '/activity',
      name: 'activity',
      component: Huodong
    },
    {
      path: '/my',
      name: 'my',
      component: Wode
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign
    },
    {
      path: '/map',
      name: 'map',
      component: MyMap
    },
    {
      path: '/weixinbackpage',
      name: 'weixinBackPage',
      component: WeixinBackPage
    }
  ]
})
