<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div
    class="md:container mx-auto mt-3 bg-dark-300 rounded-4xl text-white"
    @click="router.push({ name: 'Explorer', query: { path: '/' } })"
  >
    <div class="p-3">
      <h1 class="font-bold text-center">Explore</h1>
    </div>
    <div class="p-3">
      <p>Explore your remote directories using the file explorer.</p>
    </div>
  </div>
  <div class="md:container mx-auto mt-3 bg-dark-300 rounded-4xl text-white">
    <div class="p-3">
      <h1 class="font-bold text-center">Favorites</h1>
    </div>
    <div class="p-3">
      <p>Explore your remote directories using the file explorer.</p>
    </div>
  </div>
  <div class="md:container mx-auto mt-3 bg-dark-300 rounded-4xl text-white">
    <div class="p-3">
      <h1 class="font-bold text-center">Recent</h1>
    </div>
    <div class="p-3">
      <p>Explore your remote directories using the file explorer.</p>
    </div>
  </div>
</template>
