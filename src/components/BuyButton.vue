<template>
  <a
    class='btn-floating waves-effect waves-light red'
    :class="{ 'halfway-fab': inCardBtn }"
    @click="addToCart(product)"
    :disabled="!canAddToCart(product)"
  >
    <i class="material-icons">add_shopping_cart</i>
  </a>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BuyButton",
 
  props: {
    product: Object,
    inCardBtn: Boolean
  },

  computed: {
    ...mapGetters(["cartProductAmount"])
  },

  methods: {
    ...mapMutations(["addProduct"]),

    canAddToCart(product) {
      return this.cartProductAmount(product.id) < product.available;
    },

    addToCart(product) {
      this.$message("Product added to cart!");
      this.addProduct(product);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
