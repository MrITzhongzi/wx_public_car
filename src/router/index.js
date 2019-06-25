import Vue from 'vue'
import Router from 'vue-router'

import Shouye from '@/components/Shouye'
import Yuyue from '@/components/Yuyue'
import Huodong from '@/components/Huodong'
import Wode from '@/components/Wode'

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
      name: 'test',
      component: Yuyue
    },
    {
      path: '/activity',
      name: 'test',
      component: Huodong
    },
    {
      path: '/my',
      name: 'test',
      component: Wode
    },
  ]
})
