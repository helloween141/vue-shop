<template>
  <div id="app">
    <Header />
    <Toasts
      :time-out="1000"
      :closeable="false"
    ></Toasts>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
  @import 'assets/index.css'
</style>
