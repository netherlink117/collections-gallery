<script setup>
import { computed } from "vue";
import { useIndexStore } from "../stores/index";
// import asuccess from "@/assets/377017_1172853-lq.mp3";
// import awarning from "@/assets/74233_47306-lq.mp3";
// import adanger from "@/assets/366108_6687700-lq.mp3";

const store = useIndexStore();
const activities = computed(() => store.activities);
// add watcher later to play sounds
function removeActivity(activity) {
  store.removeActivity(activity);
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen z-3 bg-dark-900 opacity-95 backdrop-filter backdrop-blur-sm"
  >
    <div
      class="block p-2 mx-3 my-2 rounded-3xl border-1px border-dark-300 hover:border-dark-100 float-right shadow"
      v-for="(activity, index) in activities"
      v-bind:key="index"
      @click="removeActivity(activity)"
    >
      {{ activity }}
    </div>
  </div>
</template>
