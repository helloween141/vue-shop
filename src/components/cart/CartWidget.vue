<template>
  <button type="button" class="btn btn-info" data-toggle="dropdown">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart
      <span class="badge badge-pill badge-danger"> {{ cartitemCount }}
    </span>
  </button>
</template>

<script>
import { eventBus } from '../../main'

export default {
  name: 'CartWidget',
  data () {
    return {
      cartitemCount: 0
    }
  },
  mounted() {
    eventBus.$on('set-cart-count', (data) => {
      this.cartitemCount = data.cartitemCount;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
