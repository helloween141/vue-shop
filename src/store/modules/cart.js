import Vue from 'vue';
import firebase from 'firebase'

export default {
	state: {
		cart: []
	},

	getters: {
		// Общее кол-во товаров
		cartCount (state) {
			return state.cart.length > 0 ? state.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount || 0), 0) : 0
		},

		// Все товары
		cartAllProducts (state, getters, rootState) {
			return state.cart.map(x => Object.assign(x, rootState.products.products.find(y => y.id == x.id)))
		},

		// Кол-во товара 
		cartProductAmount (state, productId) {
			return function (productId) {
				let product = state.cart.find(item => item.id === productId)
				return product ? product.amount : 0
			}
		},

		// Итоговая цена заказа
		cartTotalPrice (state) {
			return state.cart.length > 0 ? state.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price || 0), 0) : 0
		}
	},

	mutations: {

		// Добавить товар в корзину
		addProduct(state, product) {
			let index = state.cart.findIndex(item => item.id === product.id)
			index >= 0 ? Vue.set(state.cart[index], 'amount', state.cart[index].amount + 1) : state.cart.push({ id: product.id, amount: 1 })
		},

		// Изменить кол-во товара в корзине
		changeAmountProduct(state, payload) {
			let index = state.cart.findIndex(item => item.id === payload.productId)
			let amount = 0

			if (index >= 0) {
				if (payload.type === 'inc') {
					amount = state.cart[index].amount + 1 
				} else if (payload.type === 'dec') {
					amount = state.cart[index].amount - 1 > 0 ? state.cart[index].amount - 1 : 1
				}	
				Vue.set(state.cart[index], 'amount', amount)		
			}
		},

		removeProduct(state, product) {
			let index = state.cart.findIndex(item => item.id === product.id)
			if (index >= 0) {
				state.cart.splice(index, 1);
			}
		},

		clear(state) {
			state.cart = []
		}
	},

	actions: {
		async createOrder({ dispatch, commit }, userData) {
			try {
				const order = await firebase.database().ref('orders').push(userData);
				commit('clear')
				return order.key
			}
	  		catch(error) {
			    console.log(error)
			}			
		}

	}
}
