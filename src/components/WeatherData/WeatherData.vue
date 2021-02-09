<template>
  <div>
    {{WeatherData.data.name}}
    <!-- {{ WeatherData.data }} -->
    <b-row class="my-1">
      <b-col sm="2"> </b-col>
      <b-col sm="2"> </b-col>
      <b-col sm="1"> </b-col>
      <b-col sm="2"> </b-col>
      <b-col sm="1"> </b-col>
      <b-col sm="2">
        <clouds-widget @></clouds-widget>
      </b-col>
      <b-col sm="2"> </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";

import CloudsWidget from "./Cloudiness/CloudsWidget.vue";
import Temperature from "./Temperature/Temperature.vue";
import Humidity from "./Humidity/Humidity.vue";

export default defineComponent({
  name: "WeatherData",
  props: {
    WeatherData: String,
  },

  components: {
    CloudsWidget,
    Temperature,
    Humidity,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
