const axios = require('axios')
const firebase = require('firebase')

export default {
  state: {
    filters: []
  },

  getters: {
    getFilters (state) {
      return state.filters
    }
  },

  mutations: {
    setFilters (state, filters) {
      state.filters = Object.assign({}, state.filters, filters)
    }
  },

  actions: {
    async loadProducts (ctx) {
      try {
        return (await firebase.database().ref('products').once('value')).val()
      } catch (error) {
		       console.log(error)
		  }
    },

    async loadProductByUrl (ctx, productUrl) {
      try {
			    const product = (await firebase.database().ref('products').orderByChild('isbn').equalTo(productUrl).once('child_added')).val() || {}
			    return {...product}
      } catch (error) {
			    console.log(error)
      }
    },

    async loadPopular (ctx, limit) {
      try {
        let list = []
        await firebase.database().ref('products').orderByChild('rating').limitToLast(limit).once('value', snapshot => {
          snapshot.forEach(product => {
            list.push(product.val())
          })
        })

        return list
      } catch (error) {
        console.log(error)
      }
    },

  }
}
