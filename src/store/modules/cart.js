import Vue from 'vue';
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
			console.log(state.cart)
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
		addProduct (state, product) {
			let index = state.cart.findIndex(item => item.id === product.id)
			index >= 0 ? Vue.set(state.cart[index], 'amount', state.cart[index].amount + 1) : state.cart.push({ id: product.id, amount: 1 })
		},

		// Удалить товар из корзины
		removeProduct (state, product) {
			let index = state.cart.findIndex(item => item.id === product.id)
			let amount = state.cart[index].amount - 1 > 0 ? state.cart[index].amount - 1 : 1

			Vue.set(state.cart[index], 'amount', amount)
		},
	}
}
