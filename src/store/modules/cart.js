export default {
	state: {
		cart: []
	},

	getters: {
		cartCount (state) {
			return state.cart.length || 0
		},

		cartAllProducts (state, getters, rootState, rootGetters) {
			let products = rootState.products.products

			for (let i = 0; i < state.cart.length; i++) {

			}
			return products
		},

		cartProductAmount (state, productId) {
			return function (productId) {
				// return state.cart.filter(product => product.id === productId).length
				let count = 0
			    for (let i = 0; i < state.cart.length; i++) {
			        if (productId === state.cart[i]) {
			          count++
			        }
			    }				
				return count
			}
		}
		
	},

	mutations: {
		addProduct (state, product) {
			state.cart.push(product.id)	
		},

		removeProduct (state, product) {
			delete state.cart[product.id]
		},
	}
}
