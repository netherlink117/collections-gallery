<script setup></script>

<template>
  <nav class="text-xl bg-dark-700 flex flex-wrap justify-between align-stretch">
    <div class="flex w-1/2">
      <router-link :to="{ name: 'Explorer' }" class="hover:text-light-50">
        <h1 class="p-3 font-bold">CG</h1>
      </router-link>
    </div>
    <div class="flex w-1/2 justify-end">
      <router-link :to="{ name: 'Explorer' }" class="p-3 hover:text-light-50">
        Home
      </router-link>
      <router-link :to="{ name: 'Settings' }" class="p-3 hover:text-light-50">
        Settings
      </router-link>
    </div>
  </nav>
</template>
