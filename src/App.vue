<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import NavComponent from "@/components/NavComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import MainHeader from '@/components/MainHeaderComponent.vue'
import { useRoute } from "vue-router";

const store = useIndexStore();
const route = useRoute();

store
  .init()
  .then(() => {
    console.log("Database ready.");
  })
  .catch((error) => console.error(error));
</script>

<template>
  <NavComponent></NavComponent>
  <MainHeader v-if="route.name === 'Explorer'"></MainHeader>
  <MainComponent></MainComponent>
</template>
