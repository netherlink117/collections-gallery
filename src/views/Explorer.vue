<script setup>
import { computed, watch } from "vue";
import { useIndexStore } from "../stores";
import Grid from "../components/Grid.vue";
import Viewer from "../components/Viewer.vue";
import { useRoute } from "vue-router";
import Paths from "../components/Paths.vue";

const store = useIndexStore();
const route = useRoute();

const view = computed(() => {
  return store.explorer.view;
});

const file = computed(() => {
  return store.explorer.file;
});

const files = computed(() => {
  return store.explorer.files;
});

watch(route, preload, { immediate: true });

function preload() {
  let lastFile = undefined;
  if (files.value.items.length > 0) {
    lastFile = files.value.items[files.value.items.length - 1];
  }
  console.log(lastFile);
  const typePath = /^.*\.(jpg|jpeg|webp|png|bmp|mkv|webm|mp4)$/.test(
    route.query.path || "/"
  )
    ? "file"
    : "directory";
  if (typePath === "directory") {
    store.explorer.file = undefined;
    store.addActivity("Loading local directory.");
    // always load cache as "skeleton"
    store
      .getContent(route.query.path || "/", lastFile, true)
      .then((content) => {
        store.removeActivity("Loading local directory.");
        return content;
      })
      .catch((error) => {
        store.removeActivity("Loading local directory.");
        store.addActivity(error);
      });
    store.addActivity("Loading remote directory.");
    // always get remote path even if "skeleton" is empty
    store
      .getContent(route.query.path || "/", lastFile)
      .then((content) => {
        store.removeActivity("Loading remote directory.");
        return content;
      })
      .catch((error) => {
        store.removeActivity("Loading remote directory.");
        store.addActivity(error);
      });
  } else if (typePath === "file") {
    store.addActivity("Loading file.");
    store
      .getCurrent(route.query.path || "/")
      .then((file) => {
        store.removeActivity("Loading file.");
        return file;
      })
      .catch((error) => {
        store.removeActivity("Loading file.");
        store.addActivity(error);
      });
  }
}
</script>

<template>
  <Paths></Paths>
  <Grid v-if="view === 'grid'"></Grid>
  <button
    class="fixed bottom-0 w-1/3 p-2 mx-1/3 mb-3 rounded-3xl bg-dark-900 opacity-90 backdrop-filter backdrop-blur-sm border-1px border-dark-300 hover:border-dark-100 shadow"
    @click="preload"
  >
    More &amp; update
  </button>
  <Viewer v-if="file"></Viewer>
</template>
