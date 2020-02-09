import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app'
import 'firebase/database'

import cart from './modules/cart' 
import products from './modules/products' 

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faFilter, faShoppingCart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);
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

export default new Vuex.Store({
	modules: {
		cart, 
		products
	}
})