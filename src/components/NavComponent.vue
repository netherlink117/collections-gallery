<script setup lang="ts"></script>

<template>
  <nav
    class="text-xl dark:bg-dark-700 bg-light-700 flex flex-wrap justify-between align-stretch"
  >
    <div class="flex w-1/2">
      <router-link
        :to="{ name: 'Explorer', query: { directory: '/' } }"
        class="dark:text-emerald-500 dark:hover:text-emerald-700 text-emerald-500"
      >
        <h1 class="p-3 font-bold">CG</h1>
      </router-link>
    </div>
    <div class="flex w-1/2 justify-end">
      <router-link
        :to="{ name: 'Explorer', query: { directory: '/' } }"
        class="p-3 dark:text-emerald-500 dark:hover:text-emerald-700 text-emerald-500"
      >
        Home
      </router-link>
      <router-link
        :to="{ name: 'Settings' }"
        class="p-3 dark:text-emerald-500 dark:hover:text-emerald-700 text-emerald-500"
      >
        Settings
      </router-link>
    </div>
  </nav>
</template>
