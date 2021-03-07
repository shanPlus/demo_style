import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/props',
        name: 'props',
        components: {
          default: () => import('@/views/valueTransfer/index'),
          valueTransfer2: () => import('@/components/valueTransfer/index')
        }
      },
      {
        path: '/form',
        name: 'form',
        component: () => import('@/views/elementUi/form.vue')
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   components: Home
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
