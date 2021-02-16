<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col sm="3"> </b-col>
      <b-col sm="3">
        <b-form-input
          v-model="placeName"
          :id="`type-text`"
          :type="text"
        ></b-form-input>
      </b-col>
      <b-col sm="3"
        ><b-button class="mr-2" @click="callWeatherApi()">Search</b-button>
        <b-button class="ml-2" @click="getCurrentLocation()"
          >Place 📌</b-button
        ></b-col
      >
      <b-col sm="3"> </b-col>
    </b-row>

    <weather-data class="mt-5" ref="weatherData" />
  </b-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import axios from "axios";
import Api from "../use/Api";
import Noty from "noty";
import WeatherData from "../WeatherData/WeatherData.vue";

export default defineComponent({
  name: "WeatherSearch",
  setup() {
    const placeName = ref("");
    const weatherData = ref(null);
    const invalidPlaceName = ref(false);
    const err_ = ref("");
    async function callWeatherApi() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeName.value}&appid=${Api.weatherApiKey}&units=metric`;
        const response = await axios.get(url);
        // weatherData.data = response.data;
        invalidPlaceName.value = false;
        const weatherRef: any = weatherData.value;
        weatherRef.updateWidgetsData(response.data);
      } catch (err) {
        new Noty({
          type: "error",
          theme: "bootstrap-v4",
          layout: "top",
          text: "Invalid place name",
          timeout: 3000,
        }).show();
      }
    }
    async function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${Api.geocodingApiKey}`;
            const response = await axios.get(url);
            placeName.value = response.data.plus_code.compound_code.match(
              /.+\s(.+)[,].+/
            )[1];
            console.log();
          } catch (err) {
            err_.value = err;
            console.log(err);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    }

    return {
      invalidPlaceName,
      callWeatherApi,
      placeName,
      weatherData,
      getCurrentLocation,
    };
  },
  components: {
    WeatherData,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
