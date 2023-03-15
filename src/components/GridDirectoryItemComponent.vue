<script setup lang="ts">
import { Item } from "@/classes/Item";
defineProps({
  directory: {
    type: Item,
    required: true
  }
});
</script>
<template>
  <router-link
    :to="{
      name: 'Explorer',
      query: { path: directory.path }
    }"
    class="flex flex-wrap flex-col justify-center text-center bg-yellow-500 hover:bg-yellow-700 w-full h-full duration-300 hover:text-lg hover:text-yellow-50 shadow hover:shadow-md overflow-hidden relative"
  >
    {{ directory.name }}
  </router-link>
</template>
