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
                <th scope="col"></th>
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
                <td>
                  <span @click="deleteProduct(product)">X</span>
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

          <form>
            <h3> Order </h3>
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Enter name" v-model.trim="$v.form.name.$model">
              <small class="form-text error" v-if="!$v.form.name.required && $v.$dirty"> Name must be required </small>
              <small class="form-text error" v-if="!$v.form.name.minLength && $v.$dirty"> Name must have at least {{$v.form.name.$params.minLength.min}} letters. </small>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Enter email" v-model.trim="$v.form.email.$model">
              <small class="form-text error" v-if="!$v.form.email.required && $v.$dirty"> Email must be required </small>
              <small class="form-text error" v-if="!$v.form.email.email && $v.$dirty"> Incorrect format of email </small>
            </div>

            <div class="form-group">
              <label for="exampleInputEmail1">Comment</label>
              <textarea class="form-control"></textarea>
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="policy">
              <label class="form-check-label" for="exampleCheck1">I agree to the terms and privacy policy</label>
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

          </form>
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

import { image } from '../mixins/image.mixin'
import priceFormatterFilter from '../filters/price-formatter.filter'
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'Cart',

  data() {
    return {
      isCheckout: false,
      form: {
       name: '',
       email: '',
       comment: ''       
      }
    }
  },

  mixins: [image],

  filters: {
    priceFormatterFilter
  },

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      }
    }
  },

  computed: {

    ...mapGetters(['cartAllProducts', 'cartTotalPrice'])

  },

  methods: {

    ...mapMutations(['changeAmountProduct', 'removeProduct', 'clear']),

    calcProductTotalPrice(product) {
      return product.price * product.amount
    },

    incAmount(product) {
      this.changeAmountProduct({productId: product.id, type: 'inc'})
    },

    decAmount(product) {
      this.changeAmountProduct({productId: product.id, type: 'dec'})
    },

    deleteProduct(product) {
      this.removeProduct(product)
    },

    async checkout() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.isCheckout = true
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.clear()
        this.isCheckout = false
        this.$router.push('checkout')
      }
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

.order_total, form {
  width: 100%;
  margin-bottom: 20px;
  border: solid 1px #e8e8e8;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  padding-right: 30px;
  background-color: #fff
}

form {
  padding: 25px;
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
  margin-bottom: 20px;
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
