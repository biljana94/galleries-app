<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>

    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>

    <footer class="footer mt-auto py-3">
      <div class="container">
        <span>
          Created by Biljana
        </span>
      </div>
    </footer>
  </div>
</template>

<script>

import NavBar from './components/partials/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
