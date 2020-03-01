<template>
  <button type="button" class="btn btn-secondary back-btn" @click="$router.go(-1)">
    <i class="material-icons left">arrow_back</i>Back
  </button>
</template>

<script>
export default {
  name: "BackButton"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
