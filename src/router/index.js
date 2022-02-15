import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EventID from '../views/EventID.vue'
import Endscreen from '../views/Endscreen.vue'
import Datescreen from '../views/Datescreen.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
 
    path: '/GeekReview',
    name: 'GeekReview',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GeekReview.vue')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
