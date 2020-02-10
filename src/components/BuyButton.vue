<template>
    <button class="btn btn-primary" @click="addToCart(product)" :disabled="!canAddToCart(product)">
        <font-awesome-icon icon="cart-plus" />
          {{ status }}
    </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BuyButton',
  
  data () {
  	return {
  		status: 'Add to cart'
  	}
  },

  props: {
  	product: Object
  },

  computed: {
    ...mapGetters(['cartProductAmount'])
  },

  methods: {

    ...mapMutations(['addProduct']),

    canAddToCart(product) {
      return this.cartProductAmount(product.id) < product.availableInventory
    },

    addToCart(product) {
      this.addProduct(product)
      this.status = 'In cart'
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
