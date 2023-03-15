<script setup lang="ts">
import type { File } from "@/classes/File";
import { onMounted, onBeforeUnmount } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useIndexStore } from "../stores";

const indexStore = useIndexStore();
const router = useRouter();

function getFileSrc(file: File): string {
  if (navigator.onLine) {
    return indexStore.endpoint + file.path; //.replaceAll("\\", "/");
  } else {
    return file.data;
  }
}

onMounted(() => {
  window.addEventListener("keydown", navigation);
  console.log("regitered");
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", navigation);
  console.log("unregitered");
});
function navigation(event: KeyboardEvent) {
  console.log(event.key);
  if (event.key === "Escape" || event.key === "Esc") {
    goBack();
  }
  if (event.key === "ArrowRight") {
    goNext();
  }
  if (event.key === "ArrowLeft") {
    goPrevious();
  }
}
function goBack() {
  router.replace({
    name: "Explorer",
    query: { path: indexStore.viewer.file?.getParentPath() }
  });
}
function goNext() {
  if (indexStore.viewer.file?.nextFilePath()) {
    router.replace({
      name: "Viewer",
      query: { path: indexStore.viewer.file?.nextFilePath() }
    });
  }
}
function goPrevious() {
  if (indexStore.viewer.file?.previousFilePath()) {
    router.replace({
      name: "Viewer",
      query: { path: indexStore.viewer.file?.previousFilePath() }
    });
  }
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-900"
    v-touch:swipe.left="goNext"
    v-touch:swipe.right="goPrevious"
    v-touch:swipe.down="goBack"
  >
    <div
      v-if="indexStore.viewer.file?.path"
      class="flex items-center justify-center z-1 h-screen w-screen"
    >
      <div
        v-if="indexStore.viewer.file?.mimetype.includes('image')"
        class="flex items-center justify-center"
      >
        <img
          v-bind:src="getFileSrc(indexStore.viewer.file)"
          v-bind:alt="indexStore.viewer.file?.path"
          class="max-h-screen mx-auto"
        />
      </div>
      <div
        v-else-if="indexStore.viewer.file?.mimetype.includes('video')"
        class="flex items-center justify-center"
      >
        <video
          v-bind:src="getFileSrc(indexStore.viewer.file)"
          class="max-h-screen mx-auto"
          controls
          autoplay
          muted
        ></video>
      </div>
      <div
        class="absolute opacity-7 hover:opacity-100 bottom-3 w-8/10 flex bg-emerald-500 p-3 rounded-full"
      >
        <div class="flex-1 px-3">
          {{ indexStore.viewer.file?.name }}
        </div>
        <RouterLink
          v-if="indexStore.viewer.file?.previousFilePath()"
          :to="{
            name: 'Viewer',
            query: { path: indexStore.viewer.file?.previousFilePath() }
          }"
          class="px-3 border-l-1 border-emerald-700"
          replace
        >
          Previous
        </RouterLink>
        <RouterLink
          v-if="indexStore.viewer.file?.nextFilePath()"
          :to="{
            name: 'Viewer',
            query: { path: indexStore.viewer.file?.nextFilePath() }
          }"
          class="px-3 border-l-1 border-emerald-700"
          replace
        >
          Next
        </RouterLink>
        <RouterLink
          v-if="indexStore.viewer.file?.getParentPath()"
          :to="{
            name: 'Explorer',
            query: { path: indexStore.viewer.file?.getParentPath() }
          }"
          class="px-3 border-l-1 border-emerald-700"
          replace
        >
          Back
        </RouterLink>
      </div>
    </div>
    <div
      v-else
      class="p-40px z-1 bg-dark-900 border-1 border-dark-500 rounded-md text-emerald-500"
    >
      Nothing to show here
    </div>
  </div>
</template>
