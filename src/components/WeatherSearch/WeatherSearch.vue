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
    <b-list-group>
      <b-list-group-item>Search history:</b-list-group-item>
      <b-list-group-item
        href="#some-link"
        @click="loadFromSearchHistory(item)"
        v-for="item in s.history"
        :key="item"
      >
        date: {{ item.createdAt }} place: {{ item.place }} ip:
        {{ item.Visitor.ip_address }}</b-list-group-item
      >
    </b-list-group>
  </b-container>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
} from "@vue/composition-api";
import axios from "axios";
import Api from "../use/Api";
import Noty from "noty";
import WeatherData from "../WeatherData/WeatherData.vue";
import store from "@/store";

export default defineComponent({
  name: "WeatherSearch",
  setup() {
    const s = reactive({
      history: computed(() => store.state.weatherSearch.searchHistory),
    });
    const placeName = ref("");
    const weatherData = ref(null);
    const invalidPlaceName = ref(false);
    const err_ = ref("");

    onMounted(async () => {
      const res = await store.dispatch.weatherSearch.getSearchHistory();
      console.log(res);
    });
    async function callWeatherApi() {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${placeName.value}&appid=${Api.weatherApiKey}&units=metric`;
        const getRes = await axios.get(url);
        const weatherRef: any = weatherData.value;
        const currentTime = new Date();
        const getIpRes = await axios.get(`https://api.ipify.org?format=json`);
        const entry = {
          place: placeName.value,
          createdAt: currentTime,
          updatedAt: currentTime,
          ip_address: getIpRes.data.ip,
          humidity: getRes.data.main.humidity,
          wind_speed: getRes.data.wind.speed,
          temp: getRes.data.main.temp,
          temp_min: getRes.data.main.temp_min,
          temp_max: getRes.data.main.temp_max,
          temp_feel: getRes.data.main.feels_like,
        };
        const postRes = await axios.post(
          `http://localhost:8082/weather`,
          entry
        );
        if (postRes.status === 200) {
          await store.dispatch.weatherSearch.getSearchHistory();
        }

        weatherRef.updateWidgetsData(entry);
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
    function loadFromSearchHistory(item: any) {
      const weatherRef: any = weatherData.value;
      weatherRef.updateWidgetsData(item);
      placeName.value = item.place;
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
      s,
      loadFromSearchHistory,
    };
  },
  components: {
    WeatherData,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
