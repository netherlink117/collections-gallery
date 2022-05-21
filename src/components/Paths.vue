<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import normalFolder from "@/assets/folder.svg";

const route = useRoute();

const scroll = ref(undefined);

const paths = computed(() => {
  const paths = [];
  const path = route.query.path || "/";
  const split = path.split("/").filter((p) => p !== "");
  split.forEach((path, index) => {
    if (path !== "") {
      paths.unshift({
        name: "Explorer",
        content: path,
        query: { path: (index ? paths[index - 1].query.path : "") + "/" + path }
      });
    }
  });
  paths.push({
    name: "Explorer",
    content: "Root",
    query: { path: "/" }
  });
  return paths;
});
</script>

<template>
  <div
    ref="scroll"
    class="w-full py-1.5 whitespace-nowrap overflow-x-auto scrollbar-hide bg-dark-800"
    dir="rtl"
  >
    <div
      v-for="(path, index) of paths"
      v-bind:key="index"
      class="inline-flex place-items-center relative right-0"
    >
      <router-link
        :to="path"
        class="inline-flex p-2 mx-3 rounded-3xl border-1px border-dark-300 hover:border-dark-100 shadow"
        replace
      >
        <div class="pb-0.5">{{ path.content }}</div>
        <img :src="normalFolder" alt="A folder icon." class="w-30px pr-1" />
      </router-link>
      <!-- <div v-if="index < paths.length - 1" class="p-1">&LeftTriangle;</div> -->
    </div>
  </div>
</template>
