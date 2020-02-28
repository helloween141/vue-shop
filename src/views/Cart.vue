<template>
  <div class="container">
    <div class="row">
      <back-button />
      <div class="col-lg-12 text-left">
        <h3 class="mt-4">Shopping Cart</h3>
        <div class="cart" v-if="products.length > 0">
          <table class="responsive-table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <router-link :to="{ name: 'product', params: { url: product.isbn }}">
                  <img :src="product.thumbnailUrl" style="width: 90px"/>
                </router-link>
              </td>
              <td>
                <router-link :to="{ name: 'product', params: { url: product.isbn }}">
                  {{ product.title }}
                </router-link>
              </td>
              <td>
                {{ product.price | priceFormatterFilter }}
              </td>
              <td>
                <button class="btn btn-small  waves-effect waves-light" @click="decAmount(product)">-</button>
                {{ calcProductAmount(product) }}
                <button class="btn btn-small waves-effect waves-light" @click="incAmount(product)">+</button>
              </td>
              <td>
                {{ calcProductTotalPrice(product) | priceFormatterFilter }}
              </td>
              <td>
                  <span class="remove-ico" @click="deleteProduct(product)">
                    <i class="material-icons">remove_circle</i>
                  </span>
              </td>
            </tr>
            </tbody>
          </table>

          <div class="col s12 order-total-block ">
            Order Total: {{ cartTotalPrice | priceFormatterFilter }}
          </div>

          <form>
            <div class="row">
              <h3> Checkout </h3>

              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="name" type="text" class="validate" placeholder="Enter name"
                       v-model.trim="$v.form.name.$model">
                <span class="helper-text" data-error="wrong" v-if="!$v.form.name.required && $v.$dirty">
                  Name must be required!
                </span>
                <span class="helper-text" data-error="wrong" v-if="!$v.form.name.minLength && $v.$dirty">
                  Name must have at least {{ $v.form.name.$params.minLength.min }} letters!
                </span>
              </div>

              <div class="input-field col s6">
                <i class="material-icons prefix">email</i>
                <input id="email" type="email" class="validate" placeholder="Enter email"
                       v-model.trim="$v.form.email.$model">
                <span class="helper-text" data-error="wrong" v-if="!$v.form.email.required && $v.$dirty">
                  Email must be required!
                </span>
                <span class="helper-text" data-error="wrong" v-if="!$v.form.email.email && $v.$dirty">
                  Incorrect format of email!
                </span>
              </div>


              <div class="input-field col s12">
                <i class="material-icons prefix">mode_edit</i>
                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                <label for="icon_prefix2">Comment</label>
              </div>


              <div class="input-field col s12">
                <label>
                  <input type="checkbox" id="policy" class="filled-in" checked="checked"/>
                  <span>I agree to the terms and privacy policy</span>
                </label>
              </div>

              <div class="input-field col s12 right-align">
                <button type="button" class="btn waves-effect waves-light" @click="handleOrderForm()"
                        v-if="!isCheckout">
                  Checkout
                </button>
                <button type="button" class="btn cart_button_checkout" v-if="isCheckout" disabled="">
                  Loading...<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
              </div>
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
  import {mapGetters, mapMutations} from 'vuex'
  import priceFormatterFilter from '../filters/price-formatter.filter'
  import {email, required, minLength} from 'vuelidate/lib/validators'
  import BackButton from '../components/BackButton'

  export default {
    name: 'Cart',

    data() {
      return {
        products: [],
        isCheckout: false,
        form: {
          name: '',
          email: '',
          comment: ''
        }
      }
    },

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

    components: {
      BackButton
    },

    computed: {
      ...mapGetters(['cartProductAmount']),

      cartTotalPrice() {
        return this.products.length > 0 ? this.products.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price || 0), 0) : 0
      }
          
    },

    async mounted() {
      this.products = await this.$store.dispatch('cartAllProducts')
      console.log(this.products)
    },

    methods: {
      ...mapMutations(['changeAmountProduct', 'removeProduct', 'clear', 'createOrder']),

      calcProductTotalPrice(product) {
        return product.price * product.amount
      },

      calcProductAmount(product) {
        return this.cartProductAmount(product.id)
      },

      incAmount(product) {
        product.amount++
        this.changeAmountProduct({productId: product.id, amount: product.amount})
      },

      decAmount(product) {
        product.amount - 1 > 0 ? product.amount-- : 1 
        this.changeAmountProduct({productId: product.id, amount: product.amount})
      },

      deleteProduct(product) {
        const index = this.products.findIndex(item => item.id === product.id)
        this.products.splice(index, 1);
        this.removeProduct(product)
      },

      async handleOrderForm() {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.isCheckout = true
          const orderId = await this.$store.dispatch('createOrder', this.form)
          this.isCheckout = false

          if (orderId) {
            this.$router.push({name: 'success-order', params: { orderId }})
          }
        }
      }
    }
  }

</script>
