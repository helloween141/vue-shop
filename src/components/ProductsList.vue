<template>
<div class="row">
  <div class="col-lg-4 col-md-6 mb-4" v-for="product in products">
    <div class="card h-100">
      <div class="card-img">
        <a href="#">
          <img class="card-img-top" :src="getImage(product.image)" />
        </a>
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">
            {{product.artist}}.<br /> {{ product.title }}
          </a>
        </h4>
        <h5>${{ product.price | priceFormatterFilter }}</h5>
        <div class="card-text">
          <small class="text-muted">
            Available: {{ product.availableInventory }} pc.
          </small>
        </div>
        <small class="text-muted" v-for="rate in product.rating">
          ★
        </small>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" @click="addToCart(product)"
                                        :disabled="canAddToCart(product)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
  Cart: {{ cart }}, {{ cartitemCount }}
</div>
</template>

<script>
import { eventBus } from '../main'
import { mixin } from './mixins/mixin.js'
import capitalizeFilter from './filters/capitalize.js'
import priceFormatterFilter from './filters/price-formatter.js'


const axios = require('axios')

export default {
  name: 'ProductsList',
  mixins: [mixin],
  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },
  props: {
    parameters: Object
  },
  data () {
    return {
      products: [],
      cart: []
    }
  },
  created: function () {
    this.loadGoods()
  },
  computed: {
    cartitemCount () {
      return this.cart.length || 0
    },
  },
  methods: {

    loadGoods () {
      axios.get('/static/products.json')
      .then(response => {
        this.products = response.data.products
        this.refreshProducts();
      }).catch(error => {
        console.log(error)
      });
    },

    addToCart (product) {
      this.cart.push(product.id)

      eventBus.$emit('set-cart-count', {
        cartitemCount: this.cartitemCount
      })
    },

    canAddToCart (product) {
      return this.cartProductCount(product.id) > product.availableInventory
    },

    cartProductCount (productId) {
      let count = 0
      for (let i = 0; i < this.cart.length; i++) {
        if (productId === this.cart[i]) {
          count++
        }
      }
      return count
    },

    refreshProducts () {
      if (this.parameters.currentCategoryId > 0) {
        let self = this
        this.products = this.products.filter(function (product) {
          return product.categoryId === self.parameters.currentCategoryId
        })
      }
    }
    
  },
  watch: {
    parameters: function () {
      this.loadGoods()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-img {
    height: 240px;
  }
</style>
