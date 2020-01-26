<template>
  <button type="button" class="btn btn-info" data-toggle="dropdown">

  	<router-link class="nav-link" :to="'/cart'">
	      <span class="badge badge-pill badge-danger">Cart {{ cartCount }}</span>
    </router-link>

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
