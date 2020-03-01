<template>
  <div>
    <div class="section no-pad-bot" id="index-banner">
      <div class="container">
        <br />
        <br />
        <h1 class="header center">Vue Shop</h1>
        <div class="row center">
          <h5 class="header col s12 light">We have all books you need! Let's check it?</h5>
        </div>
        <div class="row center">
          <router-link
            id="download-button"
            class="btn-large waves-effect waves-light btn-secondary"
            :to="'/catalog'"
          >Go to catalog</router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="section">
        <div v-if="!loading">
          <div class="row" v-if="newProducts">
            <h4 class="center">New books</h4>
            <div class="col s12 m6 l4" v-for="product in newProducts" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="progress">
            <div class="indeterminate"></div>
          </div>
        </div>

        <div class="row">
          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center">
                <i class="material-icons">flash_on</i>
              </h2>
              <h5 class="center">Low prices</h5>

              <p class="light center">We have the lowest prices in the world</p>
            </div>
          </div>

          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center">
                <i class="material-icons">all_inclusive</i>
              </h2>
              <h5 class="center">Wide choice</h5>

              <p class="light center">We have wide choice of books</p>
            </div>
          </div>

          <div class="col s12 m4">
            <div class="icon-block">
              <h2 class="center">
                <i class="material-icons">mood</i>
              </h2>
              <h5 class="center">Easy to order</h5>

              <p class="light center">We have provided easy order and delivery</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard";
export default {
  name: "Home",
  data() {
    return {
      newProducts: [],
      loading: true
    };
  },
  components: {
    ProductCard
  },
  async mounted() {
    this.newProducts = await this.$store.dispatch("loadNew", 6);
    this.loading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
