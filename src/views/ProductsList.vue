<template>
  <div v-if="!loading">

    <div id="filter-block">
      <div class="row">
        <div class="col s12">
          <select class="browser-default" v-model="sortType" @change="setSortType">
            <option value="popular" selected>Popular</option>
            <option value="price_desc">Expensive first</option>
            <option value="price_asc">Cheap first</option>
            <option value="id">Newest</option>
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
      products: [],
      filters: [],
      sortType: 'popular',
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
    this.products = await this.$store.dispatch('loadProducts')
    this.setFilters({category: this.$route.params.category_id})
    this.loading = false
  },

  computed: {
    allProducts () {
      const result = this.applyFilters(this.products)
      this.initPagination(result)
      return this.items
    }
  },

  methods: {
    ...mapMutations(['setFilters']),

    setSortType () {
      this.setFilters({ sortType: this.sortType })
    },

    applyFilters(productsList) {
      const filters = this.$store.getters.getFilters

      // Фильтрация по категории
      if (filters.category) {
        productsList = productsList.filter(
          product => product.categories ? (product.categories).includes(+filters.category) : null
        )
      }

      // Фильтрация по тексту
      if (filters.searchText) {
        productsList = productsList.filter(
          product => product.title.toLowerCase().includes(filters.searchText.toLowerCase())
        )
      }

      // Сортировка
      if (filters.sortType) {
        switch (filters.sortType) {
          case 'id': productsList = productsList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
            break
          case 'rating': productsList = productsList.sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0))
            break
          case 'artist_name': productsList = productsList.sort((a, b) => (a.artist > b.artist) ? 1 : ((b.artist > a.artist) ? -1 : 0))
            break
          case 'price_asc': productsList = productsList.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            break
          case 'price_desc': productsList = productsList.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
            break
        }
      }
      return productsList
    }

  }
}

</script>

<style scoped>

</style>
