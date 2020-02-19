import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/views/Catalog'
import Product from '@/views/Product'
import About from '@/views/About'
import Cart from '@/views/Cart'
import SuccessOrder from '@/views/SuccessOrder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/product/:url',
      name: 'product',
      component: Product
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/success-order/:orderId',
      name: 'success-order',
      component: SuccessOrder
    },
  ]
})
