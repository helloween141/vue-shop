import Vue from 'vue'
import App from './App'
import Vuelidate from 'vuelidate'

import firebase from 'firebase/app'
import 'firebase/database'

import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faShoppingCart, faAngleUp, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import BootstrapVue from 'bootstrap-vue'
import VueBootstrapToasts from "vue-bootstrap-toasts";
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(faFilter, faAngleUp, faShoppingCart, faCartPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueBootstrapToasts);
Vue.use(Vuelidate)
Vue.use(firebase)

firebase.initializeApp({
    apiKey: "AIzaSyA4eU1Ensarf6w6eAoQlNMwuosk6MNCXlM",
    authDomain: "simple-shop-vue.firebaseapp.com",
    databaseURL: "https://simple-shop-vue.firebaseio.com",
    projectId: "simple-shop-vue",
    storageBucket: "simple-shop-vue.appspot.com",
    messagingSenderId: "539705901851",
    appId: "1:539705901851:web:9e7463a1b69d92cec9c9be"
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

