<script setup lang="ts"></script>

<template>
  <nav
    class="text-xl dark:bg-dark-900 bg-light-900 flex flex-wrap justify-between align-stretch"
  >
    <div class="flex w-1/2">
      <router-link
        :to="{ name: 'Home' }"
        class="dark:text-light-500 text-dark-500 hover:text-emerald-500"
      >
        <h1 class="p-3 font-bold">CG</h1>
      </router-link>
    </div>
    <div class="flex w-1/2 justify-end">
      <router-link
        :to="{ name: 'Settings' }"
        class="p-3 dark:text-light-500 text-dark-500 hover:text-emerald-500"
      >
        Settings
      </router-link>
    </div>
  </nav>
</template>
