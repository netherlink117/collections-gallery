<script setup lang="ts">
import type { Item } from "@/classes/Item";
import { Directory } from "@/classes/Directory";
import { File } from "@/classes/File";
import { useIndexStore } from "@/stores";
import { computed } from "vue";
import GridDirectoryItemComponent from "@/components/GridDirectoryItemComponent.vue";
import GridFileItemComponent from "@/components/GridFileItemComponent.vue";

const indexStore = useIndexStore();

const children = computed<Item[]>((): Item[] => {
  return indexStore.explorer.directory.children
    ? indexStore.explorer.directory.children
    : [];
});
const directories = computed<Directory[]>((): Directory[] => {
  const d: Directory[] = [];
  children.value.forEach((element) => {
    if (element.type === "directory") {
      d.push(Directory.fromItem(element));
    }
  });
  return d;
});
const files = computed<File[]>((): File[] => {
  const f: File[] = [];
  children.value.forEach((element) => {
    if (element.type === "file") {
      f.push(File.fromItem(element));
    }
  });
  return f;
});
</script>

<template>
  <div v-if="children.length === 0" class="pt-3">
    There is no content to show, try updating settings and then reload.
  </div>
  <div v-else class="flex flex-wrap p-3">
    <!--Column-->
    <div
      v-for="(directory, index) of directories"
      v-bind:key="directory.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <GridDirectoryItemComponent
        :directory="directory"
      ></GridDirectoryItemComponent>
    </div>
    <div
      v-for="(file, index) of files"
      v-bind:key="file.path + index"
      class="p-3 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7 aspect-square"
    >
      <GridFileItemComponent
        :file="file"
        @free="(f) => {}"
      ></GridFileItemComponent>
    </div>
  </div>
</template>
