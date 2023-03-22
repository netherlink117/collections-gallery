<script setup lang="ts">
import { Item } from "@/classes/Item";
import { useRouter } from "vue-router";

const props = defineProps({
  directory: {
    type: Item,
    required: true
  }
});

const router = useRouter();
function navigate() {
  router.push({
    name: "Explorer",
    query: { path: props.directory.path }
  });
}
</script>
<template>
  <div
    class="flex items-center justify-between w-full p-3 text-dark-500 dark:text-light-500 group hover:text-amber-500"
    @click="navigate"
  >
    <div class="flex items-center">
      <div
        class="aspect-square w-70px bg-dark-500 dark:bg-light-500 group-hover:bg-amber-500 m-3"
      ></div>
      <div>
        {{ directory.name }}
      </div>
    </div>
    <div></div>
  </div>
</template>
