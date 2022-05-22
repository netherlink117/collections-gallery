<script setup lang="ts">
import GridComponent from "@/components/GridComponent.vue";
import { Directory } from "@/classes/Directory";
import { useIndexStore } from "@/stores";
import { computed } from "vue";

const indexStore = useIndexStore();
const props = defineProps({
  directory: {
    type: String,
    required: true
  }
});

let loaded = "";
const current = computed<Directory>(() => {
  if (props.directory === loaded) return indexStore.current;
  if (props.directory !== indexStore.current.path) {
    indexStore.getContent(new Directory(props.directory.split("/").pop(), props.directory));
  } else {
    indexStore.getContent(indexStore.current);
  }
  loaded = indexStore.current.path;
  return indexStore.current;
})

function loadMore(): void {
  indexStore.getContent(indexStore.current);
}
</script>

<template>
  <GridComponent :directory="current"></GridComponent>
  <button
    class="fixed bottom-7 right-7 mr-7 w-100px p-3 bg-emerald-500 hover:bg-emerald-700 rounded-4xl shadow text-center"
    v-on:click="loadMore">
    Load more
  </button>
</template>
