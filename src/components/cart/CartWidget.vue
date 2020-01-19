<template>
  <button type="button" class="btn btn-info" data-toggle="dropdown">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart
      <span class="badge badge-pill badge-danger"> {{ cartCount }}
    </span>
  </button>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'CartWidget',

  computed: mapGetters(['cartCount'])
}
</script>

<style scoped>

</style>
