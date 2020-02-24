import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/catalog/:category_id?',
      name: 'catalog',
      component: () => import('@/views/Catalog.vue')
    },
    {
      path: '/product/:url',
      name: 'product',
      component: () => import('@/views/Product.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/Cart.vue')
    },
    {
      path: '/success-order/:orderId',
      name: 'success-order',
      component: () => import('@/views/SuccessOrder.vue')
    },
  ]
})
