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
        url: '/catalog',
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
