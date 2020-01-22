const axios = require('axios')

export default {
	state: {
		products: []
	},

	getters: {
		allProducts (state) {
			return function (filters = []) {
				if (filters['category']) {
					return state.products.filter(
						product => product.categoryId === filters['category']
					)			
				}
				return state.products
			}
		}
	},

	mutations: {
		refreshProducts (state, products) {
			state.products = products
		}
		
	},

	actions: {
		loadProducts (ctx) {
	      axios.get('/static/products.json')
	      .then(response => {
	        const products = response.data.products
	        ctx.commit('refreshProducts', products)
	      })
	      .catch(error => {
	        console.log(error)
	      });
		}
	}
}
