import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/Catalog'
import Product from '@/components/Product'
import About from '@/components/About'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'


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
      path: '/product/:id',
      name: 'Product',
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
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
  ]
})
