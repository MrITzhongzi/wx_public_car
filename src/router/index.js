import Vue from 'vue'
import Router from 'vue-router'

import Shouye from '@/components/Shouye'
import Yuyue from '@/components/Yuyue'
import Huodong from '@/components/Huodong'
import Wode from '@/components/Wode'

import Sign from '@/components/Huodong/Sign.vue'
import MyMap from '@/components/shouye/Map'
import CarList from '@/components/yuyue/CarList'
import SignComponent from '@/components/shouye/CalendarPage'
import ReferrerCar from '@/components/wode/Referrer'

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
      path: '/carlist',
      name: 'carlist',
      component: CarList
    },
    {
      path: '/signcomponent',
      name: 'SignComponent',
      component: SignComponent
    },
    {
      path: '/referrer',
      name: 'referrer',
      component: ReferrerCar
    }
  ]
})
