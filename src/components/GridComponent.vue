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
    <!--Column-->
    <div
      v-for="(item, index) of directory.content.directories"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <!--Square-->
      <router-link
        :to="{
          name: 'Explorer',
          query: { directory: item.path }
        }"
        class="flex flex-wrap flex-col justify-center text-center bg-yellow-500 hover:bg-yellow-700 w-full h-full duration-300 hover:text-lg hover:text-yellow-50 shadow hover:shadow-md overflow-hidden relative"
      >
        {{ item.name }}
      </router-link>
    </div>
    <!--Column-->
    <div
      v-for="(item, index) of directory.content.files"
      v-bind:key="item.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <!--Square-->
      <router-link
        :to="{
          name: 'Viewer',
          query: { file: item.path }
        }"
        class="block w-full h-full shadow hover:shadow-md overflow-hidden"
      >
        <div
          v-if="item.mimetype.indexOf('image') >= 0"
          class="w-full h-full bg-center bg-normal hover:bg-hover duration-300 relative"
          :style="'background-image: url(\'' + getFileSrc(item) + '\')'"
        >
          <div
            class="px-3 py-1 bg-opacity-90 dark:bg-opacity-90 dark:bg-dark-700 bg-light-700 text-emerald-500 bottom-0 left-0 right-0 absolute"
          >
            <div class="w-full mx-auto truncate">
              {{ item.name }}
            </div>
            <div class="w-full mx-auto truncate">
              {{ toHumanSize(item.size) }}
            </div>
          </div>
        </div>

        <div
          v-else-if="item.mimetype.indexOf('video') >= 0"
          class="w-full h-full bg-purple-500 hover:bg-purple-700 duration-300 relative"
        >
          <div
            class="px-3 py-1 bg-opacity-90 dark:bg-opacity-90 dark:bg-dark-700 bg-light-700 text-purple-500 bottom-0 left-0 right-0 absolute"
          >
            <div class="w-full mx-auto truncate">
              {{ item.name }}
            </div>
            <div class="w-full mx-auto truncate">
              {{ toHumanSize(item.size) }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
