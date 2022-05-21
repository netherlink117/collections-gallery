<script setup lang="ts">
import { Directory } from "@/classes/Directory";
import type { File } from "@/classes/File";
import { useIndexStore } from "@/stores";

const indexStore = useIndexStore();

defineProps({
  directory: {
    type: Directory,
    required: true
  }
});

function toHumanSize(bytes: number) {
  const sz = ["B", "K", "M", "G", "T", "P"];
  const factor = Math.floor((bytes.toString().length - 1) / 3);
  return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
}

function getFileSrc(item: File) {
  if (navigator.onLine) {
    return indexStore.endpoint + item.path.split("\\").join("/");
  } else {
    return item.data;
  }
}
</script>

<template>
  <div
    v-if="
      directory.content.directories.length === 0 &&
      directory.content.files.length === 0
    "
    class="pt-3"
  >
    There is no content to show, try updating settings and then reload.
  </div>
  <div v-else class="flex flex-wrap p-3">
    <div
      v-for="(item, index) of directory.content.directories"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square flex"
    >
      <router-link
        :to="{
          name: 'Explorer',
          query: { directory: item.path }
        }"
        class="flex flex-wrap flex-col justify-center text-center bg-emerald-500 hover:bg-emerald-700 w-full duration-300 hover:text-lg rounded-4xl"
      >
        {{ item.name }}
      </router-link>
    </div>
    <div
      v-for="(item, index) of directory.content.files"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <router-link
        :to="{
          name: 'Viewer',
          query: { file: item.path }
        }"
        class="flex flex-wrap flex-col justify-center bg-center bg-normal hover:bg-hover w-full duration-300 aspect-square"
      >
        <div
          v-if="item.mimetype.indexOf('image') >= 0"
          class="flex flex-wrap flex-col justify-end bg-center bg-normal hover:bg-hover w-full h-full duration-300 aspect-square rounded-4xl"
          :style="'background-image: url(\'' + getFileSrc(item) + '\')'"
        >
          <div
            class="w-full bg-dark-900 bg-opacity-75 text-emerald-500 px-1.5 pt-1.5"
          >
            <div class="w-7/10 mx-auto truncate">
              {{ item.name }}
            </div>
          </div>
          <div
            class="w-full bg-dark-900 bg-opacity-75 text-center text-emerald-500 px-1.5 pb-1.5"
          >
            {{ toHumanSize(item.size) }}
          </div>
        </div>
        <div
          v-else-if="item.mimetype.indexOf('video') >= 0"
          class="flex flex-wrap flex-col justify-end bg-emerald-500 hover:bg-emerald-700 w-full h-full duration-300 aspect-square rounded-4xl"
        >
          <div
            class="w-full bg-dark-900 bg-opacity-75 text-emerald-500 px-1.5 pt-1.5"
          >
            <div class="w-7/10 mx-auto truncate">
              {{ item.name }}
            </div>
          </div>
          <div
            class="w-full bg-dark-900 bg-opacity-75 text-center text-emerald-500 px-1.5 pb-1.5"
          >
            {{ toHumanSize(item.size) }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
