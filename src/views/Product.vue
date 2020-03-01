<template>
  <div class="container product-card" v-if="dataProduct">
    <div class="row">
      <div class="col s12">
        <back-button />
        <h1>{{ dataProduct.title }}</h1>
      </div>
      <div class="col s12">
        <div class="col s12 m3 l3">
          <img class="img-fluid" :src="dataProduct.thumbnailUrl" />
        </div>
        <div class="col s12 m3 l3 info">
          <div class="price">
            <span>Price: {{ dataProduct.price | priceFormatterFilter }}</span>
          </div>
          <div class="isbn">
            <span>ISBN: {{ dataProduct.isbn }}</span>
          </div>
          <div class="available">
            <span>In stock: {{ dataProduct.available }} pc.</span>
          </div>
          <div class="rating">
            Rating:
            <small
              class="text-muted"
              v-for="(index, rate) in dataProduct.rating"
              :key="index"
            >★</small>
          </div>
          <div class="buy-btn-block" :in-card-btn="false">
            <buy-button :product="dataProduct" />
          </div>
        </div>
      </div>

      <div v-if="dataProduct.longDescription" class="col s12 text-lg-left">
        <h5>Description</h5>
        <p class="text">{{ dataProduct.longDescription }}</p>
      </div>
      <div v-else>No description</div>
    </div>
  </div>
  <div v-else>
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  </div>
</template>

<script>
import store from "../store";

import BuyButton from "../components/BuyButton";
import BackButton from "../components/BackButton";

import capitalizeFilter from "../filters/capitalize.filter";
import priceFormatterFilter from "../filters/price-formatter.filter";

export default {
  name: "Product",

  data() {
    return {
      dataProduct: null,
      isProductDetail: true
    };
  },

  components: {
    BuyButton,
    BackButton
  },

  filters: {
    capitalizeFilter,
    priceFormatterFilter
  },

  async mounted() {
    this.dataProduct = await store.dispatch(
      "loadProductByUrl",
      this.$route.params.url
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
