import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EventID from '../views/EventID.vue'
import Endscreen from '../views/Endscreen.vue'
import Datescreen from '../views/Datescreen.vue'
import Admin from '../views/Admin.vue'
import Loading from '../views/Loading.vue'
import CreateAccount from '@/views/CreateAccount.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {

    path: '/GeekReview',
    name: 'GeekReview',
    component: () => import('../views/GeekReview.vue')
  },
  {
    path: '/eventid',
    name: 'EventID',
    component: EventID
  },
  {
    path: '/endscreen',
    name: 'Endscreen',
    component: Endscreen
  },
  {
    path: '/datescreen',
    name: 'Datescreen',
    component: Datescreen
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/loading',
    name: 'Loading',
    component: Loading
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
