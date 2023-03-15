<script setup lang="ts">
import GridComponent from "@/components/GridComponent.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";
import { useIndexStore } from "@/stores";

const indexStore = useIndexStore();
</script>

<template>
  <GridComponent v-if="indexStore.explorer.mode === 'grid'"></GridComponent>
  <button
    class="fixed bottom-7 right-7 mr-7 w-100px p-3 bg-emerald-500 hover:bg-emerald-700 rounded-4xl shadow text-center"
    v-on:click="
      () => {
        indexStore.getChildrenFromDirectory();
      }
    "
  >
    Load more
  </button>
  <LoaderComponent
    v-if="indexStore.explorer.directory.status === 'busy'"
  ></LoaderComponent>
</template>
