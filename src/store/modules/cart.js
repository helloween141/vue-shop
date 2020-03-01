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

    // Кол-во товара 
    cartProductAmount (state, productId) {
      return function (productId) {
        const product = state.cart.find(item => item.id === productId)
        return product ? product.amount : 0
      }
    }
  },

  mutations: {

    // Добавить товар в корзину
    addProduct(state, product) {
      const index = state.cart.findIndex(item => item.id === product.id)
      index >= 0 ? Vue.set(state.cart[index], 'amount', state.cart[index].amount + 1) : state.cart.push({ id: product.id, amount: 1 })
    },

    // Изменить кол-во товара в корзине
    changeAmountProduct(state, payload) {
      const index = state.cart.findIndex(item => item.id === payload.productId)
      Vue.set(state.cart[index], 'amount', payload.amount)
    },

    removeProduct(state, product) {
      const index = state.cart.findIndex(item => item.id === product.id)
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
    },

    async cartAllProducts ({ dispatch, commit, state }) {
      let result = []
	        for await (const item of state.cart) {
	            const product = await this.dispatch('loadProductById', item.id)
	            result.push({...product, amount: item.amount})
	        }
      return result		
    },

  }
}
