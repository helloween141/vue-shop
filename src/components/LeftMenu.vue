<template>
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Type text for search..." aria-label=""
             aria-describedby="basic-addon1" v-model="searchText" @input="setSearchText()">
    </div>
    <div class="collection">
      <a href="#" @click="selectCategory(null)" :class="{'active': !currentCategoryId}" class="collection-item">
        All categories
      </a>
      <a href="#"
         v-for="category in categories"
         v-bind:key="category.id"
         @click="selectCategory(category.id)"
         :class="{'active': currentCategoryId === category.id}"
         class="collection-item">
        {{ category.title }}
      </a>
    </div>
  </div>
</template>
<script>

  import {mapMutations} from 'vuex'
  import firebase from 'firebase'

  export default {
    name: 'LeftMenu',
    data() {
      return {
        categories: [],
        currentCategoryId: null,
        searchText: '',
        filters: {}
      }
    },

    async mounted() {
      await firebase.database().ref('categories').once('value', snapshot => {
        snapshot.forEach(category => {
          this.categories.push(category.val())
        })
      })
    },

    methods: {
      ...mapMutations(['setFilters']),

      selectCategory(categoryId) {
        this.currentCategoryId = categoryId
        this.setFilters({category: categoryId})
      },

      setSearchText() {
        this.setFilters({searchText: this.searchText})
      }
    }
  }
</script>

<style scoped>
</style>
