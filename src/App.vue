<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import About from '@/components/About/about.vue'
  export default {
    name: 'app',
    components: {
    About: About
    }
  }
</script>

<style>
  #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background: rgb(46, 46, 46);
    color: white;
  }
</style>