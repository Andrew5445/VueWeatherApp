<template>
  <b-container fluid="md">
    <b-row>
      <b-col
        ><h1>Temperature: {{ tempData.temp }} °C</h1></b-col
      >
    </b-row>
    <b-row>
      <b-col
        ><h5>Min: {{ tempData.temp_min }} °C</h5></b-col
      >
      <b-col
        ><h5>Max: {{ tempData.temp_max }} °C</h5></b-col
      >
    </b-row>
    <b-row>
      <b-col
        ><h3>Temp feel: {{ tempData.feels_like }} °C</h3></b-col
      >
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { IMain } from "@/components/use/IWeatherData";
import { defineComponent, ref, reactive } from "@vue/composition-api";

export default defineComponent({
  name: "TemperatureWidget",
  setup() {
    const tempData = reactive({
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
    });
    function updateTemperature(
      temp: number,
      temp_max: number,
      temp_min: number,
      temp_feel: number
    ) {
      tempData.temp = temp;
      tempData.feels_like = temp_feel;
      tempData.temp_min = temp_min;
      tempData.temp_max = temp_max;
      // tempData=main;
    }

    return { updateTemperature, tempData };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
