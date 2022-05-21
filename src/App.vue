<script setup lang="ts">
import { useIndexStore } from "@/stores/index";
import NavComponent from "@/components/NavComponent.vue";
import MainComponent from "@/components/MainComponent.vue";

const store = useIndexStore();

store
  .init()
  .then(() => {
    console.log("Database ready.");
  })
  .catch((error) => console.error(error));
</script>

<template>
  <NavComponent></NavComponent>
  <MainComponent></MainComponent>
</template>
