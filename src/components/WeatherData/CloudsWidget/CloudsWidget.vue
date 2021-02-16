<template>
  <b-container fluid="md">
    <b-row>
      <b-col><h1>Clouds</h1></b-col>
    </b-row>
    <b-row>
      <b-col
        ><b-img
          :src="require('../../../assets/cloud.png')"
          fluid
          alt="Responsive image"
        ></b-img
      ></b-col>
      <b-col
        ><h5>Wind speed: {{ windSpeed }} m/s</h5></b-col
      >
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "CloudsWidget",
  setup() {
    const windSpeed = ref(0);
    function updateWindSpeed(speed: number) {
      windSpeed.value = speed;
    }
    return { windSpeed, updateWindSpeed };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
