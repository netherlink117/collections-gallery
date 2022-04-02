<script setup>
import { useIndexStore } from "./stores/index.js";
import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";
import Activities from "./components/Activities.vue";
import { computed } from "vue";

const store = useIndexStore();

const activities = computed(() => {
  return store.activities.length > 0;
});
store.addActivity("Initializing IndexedDB.");
store
  .init()
  .then(() => {
    store.removeActivity("Initializing IndexedDB.");
    store.addActivity("Loading local data.");
    Promise.allSettled([
      store.loadLocalDirectories(),
      store.loadLocalFiles()
    ]).then((results) => {
      store.removeActivity("Loading local data.");
      return results;
    });
  })
  .catch((error) => console.error(error));
</script>

<template>
  <Nav></Nav>
  <Main></Main>
  <Activities v-if="activities"></Activities>
</template>
