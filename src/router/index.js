import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/views/Catalog'
import Product from '@/views/Product'
import About from '@/views/About'
import Cart from '@/views/Cart'
import Checkout from '@/views/Checkout'


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
      props: true,
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
