<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">	
        <div class="card mt-4">
          <img class="card-img-top img-fluid" src="http://placehold.it/900x400" alt="">
          <div class="card-body">
            <h3 class="card-title">Product Name </h3>
            <h4>$24.99</h4>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
            <span class="text-warning"></span>
            4.0 stars
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { mixin } from './mixins/mixin.js'
import capitalizeFilter from './filters/capitalize.js'
import priceFormatterFilter from './filters/price-formatter.js'

export default {
  name: 'Product',

  data(){
    return {
      product: null
    };
  },

  mixins: [mixin],

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },
  beforeMount() {
  	console.log(2)
  },

  beforeRouteEnter (to, from, next) {
    //this.$store.dispatch('loadProducts', { productId: to.params.productId })
    next();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
