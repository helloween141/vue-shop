<template>
  <nav>
    <div class="nav-wrapper">
       <router-link class="brand-logo" :to="'/'">
        Books Store
      </router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-for="link in links">
            <router-link class="nav-link" :to="link.url">
              {{ link.name }}
            </router-link>
          </li>
          <ul class="right hide-on-med-and-down">
           <li>
             <CartWidget />
           </li>
        </ul>
      </ul>
    </div>
  </nav>

 <!--<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand" :to="'/'">
        i-shop
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-for="link in links">
            <router-link class="nav-link" :to="link.url">
              {{ link.name }}
            </router-link>
          </li>
        </ul>
        <CartWidget />
      </div>
    </div>
  </nav>-->
</template>
<script>
import CartWidget from './cart/CartWidget'

export default {
  name: 'Header',
  components: {
    CartWidget
  },
  data () {
    return {
      links: [{
        name: 'Catalog',
        url: '/',
        isCurrent: true
      },
      {
        name: 'About',
        url: '/about',
        isCurrent: false
      }
      ]
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
