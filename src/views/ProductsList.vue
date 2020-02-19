<template>
  <div v-if="!loading">

    <div id="filter-block">
      <div class="row">
        <div class="col s12">
          <select class="browser-default" v-model="sortType" @change="setSortType">
            <option value="rating" selected>Popular</option>
            <option value="price_desc">Expensive first</option>
            <option value="price_asc">Cheap first</option>
            <option value="id">New</option>
          </select>
        </div>
      </div>
    </div>

    <div class="row" v-if="allProducts">

      <div class="col s12 m6 l4" v-for="product in allProducts" :key="product.id">
        <div class="card">
          <div class="card-image">
            <router-link :to="{ name: 'product', params: { productId: product.id, url: product.isbn }}">
              <img class="activator" :src="product.thumbnailUrl">
            </router-link>
          </div>
          <div class="card-content">
            <router-link class="card-title" :to="{ name: 'product', params: { url: product.isbn }}">
               {{ product.title }}
            </router-link>
            <div>
              <b>{{ product.price | priceFormatterFilter }}</b>
            </div>
            <div>
              <small> In stock: {{ product.available }} pc. </small>
            </div>
            <div>
              <small v-for="(index, rate) in product.rating" :key="index" class="red-text">
                ★
              </small>
            </div>
          </div>
          <buy-button :product="product" />
        </div>
      </div>

      <div class="col s12" v-if="pageCount > 1">
        <paginate
          v-model="page"
          :page-count="pageCount"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
          :page-class="'waves-effect'"
          >
        </paginate>
      </div>

    </div>

    <div class="row" v-else>
      <p> Sorry, products not found! </p>
    </div>

  </div>
  <div v-else>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>

</template>
<script>
import { mapMutations } from 'vuex'

import BuyButton from '../components/BuyButton'

import paginationMixin from '../mixins/pagination.mixin'

import capitalizeFilter from '../filters/capitalize.filter'
import priceFormatterFilter from '../filters/price-formatter.filter'

export default {
  name: 'ProductsList',

  components: {
    BuyButton
  },

  data () {
    return {
      sortType: 'id',
      loading: true
    }
  },

  mixins: [paginationMixin],

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },

  props: {
    parameters: Object
  },

  async mounted () {
    await this.$store.dispatch('loadProducts')
    this.loading = false
  },

  computed: {
    allProducts () {
      this.initPagination(this.$store.getters.allProducts)
      return this.items
    }
  },

  methods: {
    ...mapMutations(['setFilters']),

    setSortType () {
      this.setFilters({ sortType: this.sortType })
    }
  }
}

</script>

<style scoped>

</style>
