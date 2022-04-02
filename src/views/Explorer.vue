<script setup>
import { computed, watch, ref } from "vue";
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

const final = ref(false);
const path = ref("");

watch(route, preload, { immediate: true });

function preload(lastFile = undefined) {
  if (lastFile) {
    lastFile = lastFile.parent ? lastFile : undefined;
  }
  const qp = route.query.path || "/";
  if (qp !== path.value) {
    path.value = qp;
    final.value = false;
  }
  const typePath = /^.*\.(jpg|jpeg|webp|png|bmp|mkv|webm|mp4)$/.test(
    route.query.path || "/"
  )
    ? "file"
    : "directory";
  if (typePath === "directory") {
    store.explorer.file = undefined;
    if (final.value) {
      return;
    }
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
        if (content.directories.length === 0) {
          if (content.files.length === 0) {
            final.value = true;
          } else if (
            !(
              /^.*image.*$/.test(content.files[0].mimetype) ||
              /^.*video.*$/.test(content.files[0].mimetype)
            ) &&
            content.directories.length === 0
          ) {
            final.value = true;
          }
        }
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
  <Grid v-if="view === 'grid'" @last-is-loaded="preload"></Grid>
  <Viewer v-if="file"></Viewer>
</template>
