<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-left">
          <h1 class="mt-4">Catalog</h1>
          <hr />
      </div>  
      <div class="col-lg-3">
        <Filters />
      </div>
      <div class="col-lg-9">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script>
import Filters from './Filters';
import ProductsList from './ProductsList';

export default {
  name: 'Catalog',
  components: {
    Filters,
    ProductsList
  },
  data () {
    return {
    }
  },
 methods: function() {

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
