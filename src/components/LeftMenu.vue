<template>
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Type text for search..." aria-label=""
             aria-describedby="basic-addon1" v-model="searchText" @input="setSearchText()">
    </div>
    <div class="collection">
      <router-link :to="'/catalog'"
                   :class="{'active': !currentCategoryId}"
                   class="collection-item">
        All categories
      </router-link>

      <router-link  v-for="category in categories"
                    v-bind:key="category.id"
                    :to="{ name: 'catalog', params: { category_id: category.id }}"
                    :class="{'active': currentCategoryId === category.id}"
                    class="collection-item">
          {{ category.title }}
      </router-link>
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

    computed: {
      currentCategoryId () {
        this.setFilters({category: this.$route.params.category_id})
        return this.$route.params.category_id
      }
    },

    methods: {
      ...mapMutations(['setFilters']),

      setSearchText() {
        this.setFilters({searchText: this.searchText})
      }
    }
  }
</script>

<style scoped>
</style>
