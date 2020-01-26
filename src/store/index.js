import Vue from 'vue';
import Vuex from 'vuex';
import cart from './modules/cart' 
import products from './modules/products' 

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFilter, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faFilter, faShoppingCart)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		cart, 
		products
	}

})