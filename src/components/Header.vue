<template>
  <div>
    <nav>
      <div class="nav-wrapper">
        <router-link class="brand-logo" :to="'/'">Vue Shop</router-link>

        <a href="#" data-target="nav-mobile" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>

        <ul class="right hide-on-med-and-down">
          <li v-for="link in links" v-bind:key="link.id">
            <router-link class="nav-link" :to="link.url">{{ link.name }}</router-link>
          </li>
          <ul class="right hide-on-med-and-down">
            <li>
              <CartWidget />
            </li>
          </ul>
        </ul>
      </div>
    </nav>
    <ul class="sidenav" id="nav-mobile">
      <li v-for="link in links" v-bind:key="link.id">
        <router-link class="nav-link" :to="link.url">{{ link.name }}</router-link>
      </li>
      <li>
        <CartWidget />
      </li>
    </ul>
  </div>
</template>
<script>
import CartWidget from "./CartWidget";

export default {
  name: "Header",
  components: {
    CartWidget
  },
  data() {
    return {
      links: [
        {
          id: 1,
          name: "Home",
          url: "/",
          isCurrent: true
        },
        {
          id: 2,
          name: "Catalog",
          url: "/catalog",
          isCurrent: false
        },
        {
          id: 3,
          name: "About",
          url: "/about",
          isCurrent: false
        }
      ]
    };
  },
  mounted() {
    M.Sidenav.init(document.querySelector(".sidenav"), {
      edge: "left",
      draggable: true,
      inDuration: 250,
      outDuration: 200,
      onOpenStart: null,
      onOpenEnd: null,
      onCloseStart: null,
      onCloseEnd: null,
      preventScrolling: true
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
