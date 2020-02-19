<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-left">
      	<h1 class="mt-4">Success order</h1>
      	<hr />
    	<p>
        <ul>
          <li> Order id: № {{orderId}} </li>
          <li> Order id: № {{orderId}} </li>
          <li> Order id: № {{orderId}} </li>
        </ul>
      		
	    </p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'  

export default {
  name: 'SuccessOrder',

  data() {
    return {
      orderId: null
    }
  },

  mounted() {
    this.orderId = this.$route.params.orderId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
