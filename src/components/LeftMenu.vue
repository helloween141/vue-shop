<template>
  <div>
    <div class="input-group mb-3">
       <input type="text" class="form-control" placeholder="Type text for search..." aria-label="" 
              aria-describedby="basic-addon1" v-model="searchText" @input="setSearchText()">
    </div>

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
  </div>  
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import { eventBus } from '../main'
const axios = require('axios')

export default {
  name: 'LeftMenu',
  data () {
    return {
      categories: [],
      currentCategoryId: null,
      searchText: '',
      filters: {}
    }
  },
  created: function () {
    axios.get('/static/categories.json').then(response => {
      this.categories = response.data.categories
    })
  },

  methods: {
    ...mapMutations(['setFilters']),

    selectCategory (categoryId) {
      this.currentCategoryId = categoryId

      this.filters = Object.assign({}, this.filters, { category: categoryId })

      this.setFilters(this.filters)
    },

    setSearchText () {

      this.filters = Object.assign({}, this.filters, { searchText: this.searchText })

      this.setFilters(this.filters)
    }

  }
}
</script>


<style scoped>

</style>
