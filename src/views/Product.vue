<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">	
        <div class="card mt-4">
          <img class="card-img-top img-fluid" :src="getImage(dataProduct.image)" style="margin: 0 auto; width: 30%"/>
          <div class="card-body">
            <h3 class="card-title">{{ dataProduct.artist }}.<br /> {{ dataProduct.title }}</h3>
            <h4>${{ dataProduct.price | priceFormatterFilter }}</h4>
            <p class="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. 
                Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!
        	</p>
            <span class="text-warning"></span>
                {{ dataProduct.rating }} stars
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'	
import { mapGetters } from 'vuex'

import { mixin } from '../mixins/mixin.js'
import capitalizeFilter from '../filters/capitalize.js'
import priceFormatterFilter from '../filters/price-formatter.js'

export default {
  name: 'Product',

  mixins: [mixin],

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('loadProducts', { productId: to.params.productId })
    next();
  },

  computed: {
    ...mapGetters(['dataProduct'])
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
