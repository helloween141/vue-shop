<template>
  <router-link class="nav-link" :to="'/cart'">
    <span class="shopping-cart">
      <font-awesome-icon icon="shopping-cart" />
      <span> Cart: {{ cartCount }} </span>
    </span>
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
