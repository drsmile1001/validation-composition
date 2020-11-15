import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Form1 from '../views/Form1.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Form1
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
