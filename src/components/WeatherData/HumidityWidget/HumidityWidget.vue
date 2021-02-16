<template>
  <b-container fluid="md">
    <b-row align-v="start">
      <b-col><h1>Humidity</h1></b-col>
    </b-row>
    <b-row align-v="center">
      <b-col>
        <vue-circle
          ref="myprogress"
          :progress="p"
          :size="100"
          :reverse="false"
          line-cap="round"
          :fill="fill"
          empty-fill="rgba(0, 0, 128, .1)"
          :animation-start-value="0.0"
          :start-angle="0"
          insert-mode="append"
          :animation="{ duration: 1200, easing: 'easeOutBounce' }"
          :thickness="12"
          :show-percent="true"
          @vue-circle-progress="progress"
          @vue-circle-end="progress_end"
        >
        </vue-circle>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import VueCircle from "vue2-circle-progress/src/index.vue";

export default defineComponent({
  emits: ["humidity-updated"],
  name: "HumidityWidget",
  setup() {
    const myprogress = ref(null);
    function updateHumidity(humidity: number) {
      const x: any = myprogress.value;
      x.updateProgress(humidity);
      console.log(x);
    }
    return { updateHumidity, myprogress };
  },
  components: {
    VueCircle,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
