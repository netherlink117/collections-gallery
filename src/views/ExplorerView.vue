<script setup lang="ts">
import GridComponent from "@/components/GridComponent.vue";
import { Directory } from "@/classes/Directory";
import { useIndexStore } from "@/stores";

const indexStore = useIndexStore();
const props = defineProps({
  directory: {
    type: String,
    required: true
  }
});

// "p" is the last path used by vue-router, this ios because it seems like it has alot of recursive calls
let d = "";

// this functions creates the directory and uses indexStore to populate it, and asinnate to the state
function getDirectoryFromProps(): Directory {
  if (props.directory !== d) {
    const directory = new Directory(props.directory, props.directory);
    indexStore.getContent(directory);
    d = props.directory;
  }
  return indexStore.current;
}

function loadMore(): void {
  indexStore.getContent(indexStore.current);
}
</script>

<template>
  <GridComponent :directory="getDirectoryFromProps()"></GridComponent>
  <button
    class="fixed bottom-7 right-7 mr-7 w-100px p-3 bg-emerald-500 hover:bg-emerald-700 rounded-4xl shadow text-center"
    v-on:click="loadMore()"
  >
    Load more
  </button>
</template>
