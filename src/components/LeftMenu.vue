<template>
  <div class="list-group">
      <a href="#" class="list-group-item"
         @click="selectCategory(null)"
         :class="{'active': !currentCategoryId}"
      > 
        All
      </a>    
      <a href="#" class="list-group-item"
         v-for="category in categories"
         @click="selectCategory(category.id)"
         :class="{'active': currentCategoryId === category.id}"
      >
        {{ category.title }}
      </a>     
  </div>
</template>

<script>
import { eventBus } from '../main'
const axios = require('axios')

export default {
  name: 'LeftMenu',
  data () {
    return {
      categories: [],
      currentCategoryId: null
    }
  },
  created: function () {
    axios.get('/static/categories.json').then(response => {
      this.categories = response.data.categories
    })
  },
  methods: {
    selectCategory (categoryId) {
      this.currentCategoryId = categoryId

      this.$emit('setCategoryFilter', categoryId)
    }
  }
}
</script>


<style scoped>

</style>
