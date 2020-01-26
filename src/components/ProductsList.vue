<template>
  <div>
    <div class="row">
     
      <ul class="nav justify-content-left">
        <li class="nav-item">
           <span> 
            <font-awesome-icon icon="filter" /> Sort by:
           </span> 
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="setSortType('id')">Newest</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#" @click="setSortType('artist_name')">Artist name</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="setSortType('price_desc')">Price DESC</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="setSortType('price_asc')">Price ASC</a>
        </li>
      </ul>
    </div>  

    <div class="row" v-if="allProducts.length">
      <div class="col-lg-4 col-md-6 mb-4" v-for="product in allProducts" :key="product.id">
        <div class="card h-100">
          <div class="card-img">
            <a href="#">
              <img class="card-img-top" :src="getImage(product.image)" />
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">
              <a href="#">
                {{ product.artist }}.<br /> {{ product.title }}
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
                    :disabled="!canAddToCart(product)">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>  
    <div class="row" v-else>
      <p> Sorry, products not found! </p>
    </div>  
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

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


  mounted: function () {
    this.$store.dispatch('loadProducts')
  },

  computed: { 
    ...mapGetters(['allProducts', 'cartCount', 'cartProductAmount'])
  },

  methods: {

    ...mapMutations(['addProduct', 'refreshProducts', 'setFilters']),

    canAddToCart (product) {
      return this.cartProductAmount(product.id) < product.availableInventory
    },

    addToCart (product) {
      this.addProduct(product)
    },

    setSortType (sortType) {
      this.setFilters({ sortType: sortType })
    }

  }
}
</script>

<style scoped>

</style>
