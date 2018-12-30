<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <body>
      <main>
        <div class="container">
          <router-view></router-view>
        </div>
      </main>

      <footer class="footer mt-auto py-3 bg-dark fixed-bottom">
        <div class="container">
          <span>
            Created by Biljana
          </span>
        </div>
      </footer>
    </body>
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
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

footer .container span {
  color: #cc33ff;
  /* margin-top: 5rem; */
}
</style>
