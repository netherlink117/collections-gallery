<script setup>
import { useIndexStore } from "../stores";
import { ref } from "vue";

const store = useIndexStore();
const endpoint = ref(window.location.origin);
function setEndpoint() {
  store.setEndpoint(endpoint.value);
}
</script>

<template>
  <div class="md:container mx-auto mt-3  border-1 border-dark-500 rounded-md">
    <div class="p-3">
      <h1 class="font-bold text-center">Settings</h1>
    </div>
    <div class="p-3">
      <label class="w-full">Server Address:</label>
      <input
        type="text"
        placeholder="Enter endpoint address here..."
        v-model="endpoint"
        class="bg-dark-900 outline-none w-full mt-1 border-b-1 border-b-dark-300 focus:border-b-lime-500"
      />
    </div>
    <div class="p-3">
      <label class="w-full">Alert sound:</label>
      <div class="w-full flex items-center mt-1">
        <div class="text-center">
          <input type="radio" name="audio" id="on" checked="checked" />
          <label for="on" class="p-1">On</label>
        </div>
        <div class="text-center">
          <input type="radio" name="audio" id="off" />
          <label for="off" class="p-1">Off</label>
        </div>
      </div>
    </div>
    <div class="p-3">
      <label class="block w-full">About collection gallery</label>
      <router-link class="underline" :to="{ name: 'About' }">
        Here you can check more about Collections Gallery.
      </router-link>
    </div>
    <div class="text-center p-3">
      <button
        class="inline-flex py-2 px-3 mx-3 rounded-3xl border-1px border-dark-300 hover:border-dark-100 shadow"
        v-on:click="setEndpoint()"
      >
        Save
      </button>
    </div>
  </div>
</template>
