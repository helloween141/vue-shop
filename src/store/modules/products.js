const axios = require('axios')

export default {
	state: {
		products: [],
		filters: []
	},

	getters: {
		allProducts (state) {
			let productsList = state.products
			console.log(state.filters)
			// Фильтрация по категории
			if (state.filters.category) {
				productsList = productsList.filter(
					product => product.categoryId === state.filters.category
				)			
			}

			// Фильтрация по тексту
			if (state.filters.searchText) {
				productsList = productsList.filter(
					product => product.title.includes(state.filters.searchText) ||
							   product.artist.includes(state.filters.searchText)	
				)			
			}	

			if (state.filters.sortType) {
				switch (state.filters.sortType) {
					case 'id': productsList = productsList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); break;
					case 'artist_name': productsList = productsList.sort((a, b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0)); break;
					case 'price_asc': productsList = productsList.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0)); break;
					case 'price_desc': productsList = productsList.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0)); break;
				}
				 
			}
			
			return productsList
		}
	},

	mutations: {
		refreshProducts (state, products) {
			state.products = products
		},

		setFilters (state, filters) {
			state.filters = Object.assign({}, state.filters, filters)
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
