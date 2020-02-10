<template>

  <div class="container">
    <div class="row ">
          <div class="col-md-6 mt-4">
            <img class="img-fluid" :src="getImage(dataProduct.image)" />
          </div>

          <div class="col-md-6 mt-4 text-lg-left">
            <h3 class="title">{{ dataProduct.artist }}. {{ dataProduct.title }}</h3>
            <h4>Price: ${{ dataProduct.price | priceFormatterFilter }}</h4>
            <p class="text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. 
              Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!
          	</p>
            <span>
              Rating: 
              <small class="text-muted" v-for="rate in dataProduct.rating">
                ★
              </small>
            </span>
                
            <div>
              <buy-button :product="dataProduct" />
            </div>  

            <router-link :to="'/'">
                <button type="button" class="btn btn-secondary">Back to catalog</button>
            </router-link>

          </div>

    </div>
  </div>
</template>

<script>
import store from '../store'	
import { mapGetters } from 'vuex'

import BuyButton from '../components/BuyButton'

import { image } from '../mixins/image.mixin'
import capitalizeFilter from '../filters/capitalize.filter'
import priceFormatterFilter from '../filters/price-formatter.filter'

export default {
  name: 'Product',

  components: {
    BuyButton
  },

  mixins: [image],

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },

  async beforeRouteEnter (to, from, next) {
    store.dispatch('loadProduct', { productId: to.params.productId })
    next();
  },

  computed: {
    ...mapGetters(['dataProduct'])
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
