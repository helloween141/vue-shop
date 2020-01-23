<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-left">
          <h1 class="mt-4">Catalog</h1>
          <hr />
      </div>
      <div class="col-lg-3">
        <LeftMenu />
      </div>
      <div class="col-lg-9">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu'
import ProductsList from './ProductsList'

export default {
  name: 'Catalog',

  components: {
    LeftMenu,
    ProductsList
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
