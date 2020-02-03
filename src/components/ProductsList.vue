<template>
  <div>
    <div id="filter-block">
      <div class="row">
        <label class="col-sm-2 col-form-label">
          <font-awesome-icon icon="filter" />Sort by:
        </label>
        <div class="col-sm-10">
          <select class="form-control" v-model="sortType" @change="setSortType">
            <option value="id">Newest</option>
            <option value="artist_name">Artist name</option>
            <option value="price_desc">Price DESC</option>
            <option value="price_asc">Price ASC</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" v-if="allProducts.length">
      <div class="col-lg-4 col-md-6 mb-4" v-for="product in allProducts" :key="product.id">
        <div class="card h-100">
          <div class="card-img">
            <router-link :to="{ name: 'product', params: { productId: product.id, url: product.url }}">
              <img class="card-img-top" :src="getImage(product.image)" />
            </router-link>
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title">
              <router-link :to="{ name: 'product', params: { productId: product.id, url: product.url }}">
                {{ product.artist }}.<br /> {{ product.title }}
              </router-link>
            </h4>
            <h5>
              ${{ product.price | priceFormatterFilter }}
            </h5>
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
            <button class="btn btn-primary" @click="addToCart(product)" :disabled="!canAddToCart(product)">
              <font-awesome-icon icon="cart-plus" />
              Buy
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
import { mapGetters, mapMutations } from 'vuex'

import { mixin } from './mixins/mixin.js'
import capitalizeFilter from './filters/capitalize.js'
import priceFormatterFilter from './filters/price-formatter.js'

export default {
  name: 'ProductsList',

  data() {
    return {
      sortType: 'id'
    }
  },

  mixins: [mixin],

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },

  props: {
    parameters: Object
  },


  mounted: function() {
    this.$store.dispatch('loadProducts')
  },

  computed: {
    ...mapGetters(['allProducts', 'cartCount', 'cartProductAmount'])
  },

  methods: {

    ...mapMutations(['addProduct', 'refreshProducts', 'setFilters']),

    canAddToCart(product) {
      return this.cartProductAmount(product.id) < product.availableInventory
    },

    addToCart(product) {
      this.addProduct(product)
    },

    setSortType() {
      this.setFilters({ sortType: this.sortType })
    }

  }
}

</script>
<style scoped>
</style>
