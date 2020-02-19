<template>
  <router-link class="nav-link" :to="'/cart'">
  	<i class="material-icons">shopping_cart</i>
  	Cart: {{ cartCount }}
  </router-link>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartWidget',
  computed: mapGetters(['cartCount'])
}
</script>

<style scoped>
</style>
