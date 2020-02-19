<template>
  <div class="container" v-if="dataProduct">
    <div class="row">
      <div class="col s12">
        <h3>{{ dataProduct.title }}</h3>
      </div>
      <div class="col s12">
        <div class="col s3">
          <img class="img-fluid" :src="dataProduct.thumbnailUrl"/>
        </div>
        <div class="col s9">
          <span> Price: ${{ dataProduct.price | priceFormatterFilter }}</span>
          <span>
              Rating:
              <small class="text-muted" v-for="rate in dataProduct.rating">
                ★
              </small>
            </span>
          <div>
            <buy-button :product="dataProduct"/>
          </div>
        </div>


        <router-link :to="'/'">
          <button type="button" class="btn btn-secondary">Back to catalog</button>
        </router-link>
      </div>

      <div class="col s12 text-lg-left">
        <p class="text" v-if="dataProduct.longDescription">
          {{ dataProduct.longDescription }}
        </p>
        <p v-else>
          No description
        </p>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
  import store from '../store'

  import BuyButton from '../components/BuyButton'

  import capitalizeFilter from '../filters/capitalize.filter'
  import priceFormatterFilter from '../filters/price-formatter.filter'

  export default {
    name: 'Product',

    data() {
      return {
        dataProduct: null
      }
    },

    components: {
      BuyButton
    },

    filters: {
      capitalizeFilter,
      priceFormatterFilter
    },

    async mounted() {
      this.dataProduct = await store.dispatch('loadProductByUrl', this.$route.params.url)
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
