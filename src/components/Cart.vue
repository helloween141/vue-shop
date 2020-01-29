<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-left">
      	<h1 class="mt-4">Shopping Cart</h1>
      	<hr />
        <div class="cart_section">
            <div class="container-fluid">
                <div class="row">
                        <div class="cart_container">
                            <div class="cart_items">
                                <ul class="cart_list">
                                    <li class="cart_item clearfix" v-for="product in cartAllProducts" :key="product.id">
                                        <div class="cart_item_image">
                                            <img :src="getImage(product.image)" />
                                        </div>
                                        <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                            <div class="cart_item_name cart_info_col">
                                                <div class="cart_item_title">Product</div>
                                                <div class="cart_item_text">{{ product.artist }}.<br /> {{ product.title }}</div>
                                            </div>
                                            <div class="cart_item_quantity cart_info_col">
                                                <div class="cart_item_title">Quantity</div>
                                                <div class="cart_item_text">
                                                    <button @click="decAmount(product)">-</button>
                                                    {{ product.amount }}
                                                    <button @click="incAmount(product)">+</button>
                                                </div>
                                            </div>
                                            <div class="cart_item_price cart_info_col">
                                                <div class="cart_item_title">Price</div>
                                                <div class="cart_item_text">{{ product.price | priceFormatterFilter }}</div>
                                            </div>
                                            <div class="cart_item_total cart_info_col">
                                                <div class="cart_item_title">Total</div>
                                                <div class="cart_item_text">{{ (calcProductTotalPrice(product.price, product.amount)) | priceFormatterFilter  }}</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="order_total">
                                <div class="order_total_content text-md-right">
                                    <div class="order_total_title">Order Total:</div>
                                    <div class="order_total_amount">{{ cartTotalPrice | priceFormatterFilter }}</div>
                                </div>
                            </div>
                            <div class="cart_buttons">
                              <button type="button" class="button cart_button_clear">Continue Shopping</button>
                              <button type="button" class="button cart_button_checkout">Checkout</button>
                            </div>
                        </div>
                    </div>

            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {mapGetters, mapMutations} from 'vuex'

import { mixin } from './mixins/mixin.js'

import priceFormatterFilter from './filters/price-formatter.js'

export default {
  name: 'Cart',

  mixins: [mixin],

  filters: {
    priceFormatterFilter
  },

  computed: { 

    ...mapGetters(['cartAllProducts', 'cartTotalPrice'])

  },

  methods: {

    ...mapMutations(['addProduct', 'removeProduct']),

    calcProductTotalPrice (price, amount) {
        return price * amount
    },

    incAmount (product) {
        this.addProduct(product)
    },

    decAmount (product) {
        this.removeProduct(product)
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

.cart_container {
  width: 100%;
}
.cart_section {
    width: 100%;
    padding-bottom: 111px
}

.cart_title {
    font-size: 30px;
    font-weight: 500
}

.cart_items {
    margin-top: 8px
}

.cart_list {
    border: solid 1px #e8e8e8;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff
}

.cart_item {
    width: 100%;
    padding: 15px;
    padding-right: 46px
}

.cart_item_image {
    width: 133px;
    height: 133px;
    float: left
}

.cart_item_image img {
    max-width: 100%
}

.cart_item_info {
    width: calc(100% - 133px);
    float: left;
    padding-top: 18px
}

.cart_item_name {
    margin-left: 7.53%
}

.cart_item_title {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5)
}

.cart_item_text {
    font-size: 18px;
    margin-top: 35px
}

.cart_item_text span {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 11px;
    -webkit-transform: translateY(4px);
    -moz-transform: translateY(4px);
    -ms-transform: translateY(4px);
    -o-transform: translateY(4px);
    transform: translateY(4px)
}

.cart_item_price {
    text-align: right
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
