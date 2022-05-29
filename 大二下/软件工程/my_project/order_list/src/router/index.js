import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Center from '../views/Center.vue'
import Repair from '../views/Repair.vue'
import RentInfo from '../views/RentInfo.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login/',
      name: 'login',
      component: Login
    },
    {
      path: '/center/',
      name: 'center',
      component: Center,
    },
    {
      path: '/repair/',
      name: 'repair',
      component: Repair,
    },
    {
      path: '/rentInfo/:rent_id',
      name: 'rentInfo',
      component: RentInfo,
    }
  ]
})

export default router
