<template>
  <div>
    <!-- {{ WeatherData.data }} -->
    <b-row class="my-1">
      <b-col lg="3"
        ><clouds-widget
          class="shadow p-3 mb-5 bg-white rounded"
          ref="clouds"
          v-show="showAllWidgets"
        ></clouds-widget>
      </b-col>
      <b-col lg="1"> </b-col>
      <b-col lg="3"
        ><humidity-widget
          class="shadow p-3 mb-5 bg-white rounded"
          ref="humidity"
          v-show="showAllWidgets"
        ></humidity-widget>
      </b-col>
      <b-col lg="1"> </b-col>
      <b-col lg="3"
        ><temperature-widget
          class="shadow p-3 mb-5 bg-white rounded"
          ref="temperature"
          v-show="showAllWidgets"
        ></temperature-widget>
      </b-col>
      <b-col lg="1"> </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import CloudsWidget from "./CloudsWidget/CloudsWidget.vue";
import TemperatureWidget from "./TemperatureWidget/TemperatureWidget.vue";
import HumidityWidget from "./HumidityWidget/HumidityWidget.vue";
import { IWeather } from "../use/IWeatherData";

export default defineComponent({
  name: "WeatherData",
  props: {
    WeatherData: String,
  },
  setup() {
    const humidity = ref(null);
    const clouds = ref(null);
    const temperature = ref(null);
    const showAllWidgets = ref(false);
    async function updateWidgetsData(data: any) {
      const humidityRef: any = humidity.value;
      const cloudsRef: any = clouds.value;
      const temperatureRef: any = temperature.value;
      temperatureRef.updateTemperature(
        data.temp,
        data.temp_max,
        data.temp_min,
        data.temp_feel
      );
      humidityRef.updateHumidity(data.humidity);
      cloudsRef.updateWindSpeed(data.wind_speed);
      showAllWidgets.value = true;
    }

    return {
      humidity,
      clouds,
      updateWidgetsData,
      temperature,
      showAllWidgets,
    };
  },
  components: {
    CloudsWidget,
    HumidityWidget,
    TemperatureWidget,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
