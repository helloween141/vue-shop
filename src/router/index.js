import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/Catalog'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
  ]
})
