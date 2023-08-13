<script setup lang="ts">
import MainHeader from '@/components/MainHeaderComponent.vue'
</script>

<template>
  <main class="flex-1" style="overflow-y: scroll">
    <MainHeader></MainHeader>
    <router-view></router-view>
  </main>
</template>
