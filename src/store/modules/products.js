const axios = require('axios')

export default {
	state: {
		products: [],
		filters: []
	},

	getters: {
		allProducts (state) {
			if (state.filters.category) {
				return state.products.filter(
					product => product.categoryId === state.filters.category
				)			
			} else {
				return state.products
			}
		}
	},

	mutations: {
		refreshProducts (state, products) {
			state.products = products
		},

		setFilters (state, filters) {
			state.filters = filters
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
