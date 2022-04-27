<script setup>
import { useIndexStore } from "../stores";
import normalFolder from "@/assets/folder.svg";
import { computed } from "vue";

const store = useIndexStore();

const emit = defineEmits(["lastIsLoaded"]);

const directories = computed(() => {
  return store.explorer.directories.items;
});
const files = computed(() => {
  return store.explorer.files.items;
});
const lastFile = computed(() => {
  return files.value[files.value.length - 1];
});
function toHumanSize(bytes) {
  const sz = ["B", "K", "M", "G", "T", "P"];
  const factor = Math.floor((bytes.toString().length - 1) / 3);
  return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
}
function getFileSrc(item) {
  if (navigator.onLine) {
    return store.endpoint + item.path.replaceAll("\\", "/");
  } else {
    return item.bin;
  }
}
window.onscroll = window.onscroll
  ? window.onscroll
  : () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        emit("lastIsLoaded", lastFile.value);
      }
    };
</script>

<template>
  <div v-if="directories.length === 0 && files.length === 0" class="pt-3">
    There is no content to show, try updating settings and then reload.
  </div>
  <div v-else class="flex flex-wrap p-3">
    <div
      v-for="(item, index) of directories"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <router-link
        :to="{
          name: 'Explorer',
          query: { path: item.path.replaceAll('\\', '/') }
        }"
        class="flex flex-wrap flex-col justify-center bg-center bg-normal hover:bg-hover w-full duration-300 border-dark-300 hover:border-dark-100 hover:text-lg aspect-square"
        :style="'background-image: url(\'' + normalFolder + '\')'"
      >
        <div class="pt-3 font-bold text-center text-dark-900 w-full truncate">
          {{ item.name }}
        </div>
      </router-link>
    </div>
    <div
      v-for="(item, index) of files"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <router-link
        :to="{
          name: 'Explorer',
          query: {
            path: item.path.replaceAll('\\', '/')
          }
        }"
        class="flex flex-wrap flex-col justify-center bg-center bg-normal hover:bg-hover w-full duration-300 border-1 border-dark-300 hover:border-dark-100 aspect-square"
      >
        <div
          v-if="item.mimetype.indexOf('image') >= 0"
          class="flex flex-wrap flex-col justify-end bg-center bg-normal hover:bg-hover w-full h-full duration-300 aspect-square"
          :style="'background-image: url(\'' + getFileSrc(item) + '\')'"
        >
          <div class="w-full bg-dark-900 bg-opacity-70 px-1.5 pt-1.5 truncate">
            {{ item.name }}
          </div>
          <div class="w-full bg-dark-900 bg-opacity-70 px-1.5 pb-1.5">
            {{ toHumanSize(item.size) }}
          </div>
        </div>
        <div
          v-else-if="item.mimetype.indexOf('video') >= 0"
          class="flex flex-wrap flex-col justify-end bg-center bg-normal hover:bg-hover w-full h-full duration-300 aspect-square"
        >
          <div class="w-full bg-dark-900 bg-opacity-70 px-1.5 pt-1.5 truncate">
            {{ item.name }}
          </div>
          <div class="w-full bg-dark-900 bg-opacity-70 px-1.5 pb-1.5">
            {{ toHumanSize(item.size) }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style>
/* .image {
  background-size: 300% !important;
}
.image:hover {
  background-size: 310% !important;
} */
</style>
