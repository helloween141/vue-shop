<template>
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
</template>

<script>
import BuyButton from './BuyButton'

import capitalizeFilter from '../filters/capitalize.filter'
import priceFormatterFilter from '../filters/price-formatter.filter'

export default {
  name: 'ProductCard',

  components: {
    BuyButton
  },
  
  props: {
    product: Object
  },

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
