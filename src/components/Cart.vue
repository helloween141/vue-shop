<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-left">
        <h1 class="mt-4">Shopping Cart</h1>
        <hr />
        <div v-if="cartAllProducts.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in cartAllProducts" :key="product.id">
                <td>
                  <router-link :to="{ name: 'product', params: { productId: product.id }}">
                    <img :src="getImage(product.image)" style="width: 150px" />
                  </router-link>  
                </td>
                <td>
                  <router-link :to="{ name: 'product', params: { productId: product.id }}">
                    {{ product.artist }}.<br /> {{ product.title }}
                  </router-link>
                </td>
                <td>
                  <button @click="decAmount(product)">-</button>
                  {{ product.amount }}
                  <button @click="incAmount(product)">+</button>
                </td>
                <td>
                  {{ product.price | priceFormatterFilter }}
                </td>
                <td>
                  {{ (calcProductTotalPrice(product)) | priceFormatterFilter }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="order_total">
            <div class="order_total_content text-md-right">
              <div class="order_total_title">Order Total:</div>
              <div class="order_total_amount">{{ cartTotalPrice | priceFormatterFilter }}</div>
            </div>
          </div>
          <div class="cart_buttons">
            <router-link :to="'/'">
              <button type="button" class="button cart_button_clear">Continue Shopping</button>
            </router-link>
            <button type="button" class="button cart_button_checkout" @click="checkout()" v-if="!isCheckout">
              Checkout
            </button>
            <button type="button" class="button cart_button_checkout" v-if="isCheckout" disabled="">
              Loading...<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div v-else>
          <p> Cart is empty! </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

import { mixin } from './mixins/mixin.js'

import priceFormatterFilter from './filters/price-formatter.js'

export default {
  name: 'Cart',

  data() {
    return {
      isCheckout: false
    }
  },

  mixins: [mixin],

  filters: {
    priceFormatterFilter
  },

  computed: {

    ...mapGetters(['cartAllProducts', 'cartTotalPrice'])

  },

  methods: {

    ...mapMutations(['addProduct', 'removeProduct', 'clear']),

    calcProductTotalPrice(product) {
      return product.price * product.amount
    },

    incAmount(product) {
      this.addProduct(product)
    },

    decAmount(product) {
      this.removeProduct(product)
    },

    async checkout() {
      this.isCheckout = true
      await new Promise(resolve => setTimeout(resolve, 2000))
      this.clear()
      this.isCheckout = false
      this.$router.push('checkout')
    }

  }

}

</script>
<style scoped>
.button {
  display: inline-block;
  background: #0e8ce4;
  border-radius: 5px;
  height: 48px;
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease
}

.button a {
  display: block;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: #FFFFFF;
  padding-left: 35px;
  padding-right: 35px
}

.button:hover {
  opacity: 0.8
}


.cart_item_total {
  text-align: right
}

.order_total {
  width: 100%;
  height: 60px;
  margin-top: 30px;
  border: solid 1px #e8e8e8;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  padding-right: 46px;
  padding-left: 15px;
  background-color: #fff
}

.order_total_title {
  display: inline-block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  line-height: 60px
}

.order_total_amount {
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  margin-left: 26px;
  line-height: 60px
}

.cart_buttons {
  margin-top: 60px;
  text-align: right
}

.cart_button_clear {
  display: inline-block;
  border: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: rgba(0, 0, 0, 0.5);
  background: #FFFFFF;
  border: solid 1px #b2b2b2;
  padding-left: 35px;
  padding-right: 35px;
  outline: none;
  cursor: pointer;
  margin-right: 26px
}

.cart_button_clear:hover {
  border-color: #0e8ce4;
  color: #0e8ce4
}

.cart_button_checkout {
  display: inline-block;
  border: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: #FFFFFF;
  padding-left: 35px;
  padding-right: 35px;
  outline: none;
  cursor: pointer;
  vertical-align: top
}

</style>
