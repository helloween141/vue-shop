export default {
	state: {
		cart: []
	},

	getters: {
		cartCount (state) {
			return state.cart.length || 0
		},

		cartAllProducts (state) {
			return state.cart 
		},

		cartProductAmount (state, productId) {
			return function (productId) {
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
			/*
				TODO: remove product logic
			*/
		},
	}
}
