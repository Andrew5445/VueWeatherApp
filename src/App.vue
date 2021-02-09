<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <weather-search/>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";

import WeatherSearch from "./components/WeatherSearch/WeatherSearch.vue";


import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCompositionAPI);

export default Vue.extend({
  name: "App",
  components: {
    WeatherSearch
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
