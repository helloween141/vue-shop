import Vue from 'vue'
import App from './App'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import Firebase from 'firebase/app'
import 'firebase/database'
import messagePlugin from '@/utils/message.plugin'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'

Vue.use(Vuelidate)
Vue.use(Firebase)
Vue.use(messagePlugin)
Vue.component('paginate', Paginate)

Firebase.initializeApp({
  apiKey: 'AIzaSyA4eU1Ensarf6w6eAoQlNMwuosk6MNCXlM',
  authDomain: 'simple-shop-vue.firebaseapp.com',
  databaseURL: 'https://simple-shop-vue.firebaseio.com',
  projectId: 'simple-shop-vue',
  storageBucket: 'simple-shop-vue.appspot.com',
  messagingSenderId: '539705901851',
  appId: '1:539705901851:web:9e7463a1b69d92cec9c9be'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
