const axios = require('axios')
const firebase = require('firebase')

export default {
	state: {
		products: [],
		filters: [],
		product: null
	},

	getters: {
		allProducts (state) {
			let productsList = state.products
		
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

			// Сортировка
			if (state.filters.sortType) {
				switch (state.filters.sortType) {
					case 'id': productsList = productsList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
					break;
					case 'artist_name': productsList = productsList.sort((a, b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0))
					break;
					case 'price_asc': productsList = productsList.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
					break;
					case 'price_desc': productsList = productsList.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
					break;
				}
				 
			}
			
			return productsList
		},

		dataProduct (state) {
			return state.product
		}
	},

	mutations: {
		refreshProducts (state, products) {
			state.products = products
		},

		refreshProduct (state, product) {
			state.product = product
		},

		setFilters (state, filters) {
			state.filters = Object.assign({}, state.filters, filters)
		}	
	},

	actions: {
		async loadProducts (ctx) {
			try {
				let productsList = []
				await firebase.database().ref('products').once('value', snapshot => {
					snapshot.forEach(product => {
					  	productsList.push(product.val())
					});
				});	

				ctx.commit('refreshProducts', productsList) 	
			}
		    catch(error) {
		       console.log(error)
		    }
		},

		async loadProduct (ctx, payload) {
			try {
			    await firebase.database().ref('products').orderByChild('id').equalTo(payload.productId).once('child_added', snapshot => {   
			        ctx.commit('refreshProduct', snapshot.val()) 
			    }); 	
			}	
	  		catch(error) {
			    console.log(error)
			}
		}
	}
}
