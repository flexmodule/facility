import Vue from 'vue'
import Router from 'vue-router'
// import Hydetails from '@/components/Hydetails'

import Home from '@/views/home/index'
import Deal from '@/views/deal/index'
import Order from '@/views/order/index'
import My from '@/views/my/index'
import Login from '@/views/login/index'
import Reg from '@/views/login/reg'
import SystemSet from '@/views/my/systemSet/index'
import Mydata from '@/views/my/mydata/index'
import Fundlist from '@/views/my/fundlist/index'
import recharge from '@/views/my/recharge/index'
import withdrawCash from '@/views/my/withdrawCash/index'
import messageCenter from '@/views/my/messageCenter/index'
import PasswordSet from '@/views/my/systemSet/passwordSet/index'
import Zhaopass from '@/views/login/zhaopass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/deal',
      name: 'Deal',
      component: Deal
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/passwordSet',
      name: 'PasswordSet',
      component: PasswordSet
    },
    {
      path: '/systemSet',
      name: 'SystemSet',
      component: SystemSet
    },
    {
      path: '/mydata',
      name: 'Mydata',
      component: Mydata
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/withdrawCash',
      name: 'withdrawCash',
      component: withdrawCash
    },
    {
      path: '/fundlist',
      name: 'Fundlist',
      component: Fundlist
    },
    {
      path: '/messageCenter',
      name: 'messageCenter',
      component: messageCenter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/zhaopass',
      name: 'Zhaopass',
      component: Zhaopass
    }
  ]
})
