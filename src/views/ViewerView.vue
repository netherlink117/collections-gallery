<script setup lang="ts">
import { Directory } from "@/classes/Directory";
import { File } from "@/classes/File";
import { computed, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useIndexStore } from "../stores";

const indexStore = useIndexStore();
const router = useRouter();

const props = defineProps({
  file: {
    type: String,
    required: true
  }
});

const file = computed<File>(() => {
  let cfIndex = indexStore.current.content.files.findIndex(
    (f) => f.path === props.file
  );
  return indexStore.current.content.files[cfIndex] || new File();
});

const pre = computed<File>(() => {
  let cfIndex = indexStore.current.content.files.findIndex(
    (f) => f.path === props.file
  );
  const prIndex = cfIndex > 0 ? --cfIndex : cfIndex;
  return indexStore.current.content.files[prIndex] || new File();
});

const nex = computed<File>(() => {
  let cfIndex = indexStore.current.content.files.findIndex(
    (f) => f.path === props.file
  );
  const fLength = indexStore.current.content.files.length - 1;
  const neIndex = cfIndex < fLength ? ++cfIndex : cfIndex;
  return indexStore.current.content.files[neIndex];
});

// try to load directory after navigation, so file can be shown using direct url
onMounted(() => {
  // try get the parent directory
  let parent: string | Array<string> = props.file.split("/");
  if (parent.length === 2) {
    parent = "/";
  } else {
    parent.pop();
    parent = parent.join("/");
  }
  console.log(parent);
  if (indexStore.current.path !== parent || parent === "/") {
    // set to directory
    const directory = new Directory("", parent);
    indexStore.getContent(directory);
  }
});

function getFileSrc(file: File): string {
  if (navigator.onLine) {
    return indexStore.endpoint + file.path; //.replaceAll("\\", "/");
  } else {
    return file.data;
  }
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-900"
  >
    <div
      v-if="file.path"
      class="flex items-center justify-center z-1 h-screen w-screen"
    >
      <div
        v-if="file.mimetype.includes('image')"
        class="flex items-center justify-center"
      >
        <img
          v-bind:src="getFileSrc(file)"
          v-bind:alt="file.name"
          class="max-h-screen mx-auto"
        />
      </div>
      <div
        v-else-if="file.mimetype.includes('video')"
        class="flex items-center justify-center"
      >
        <video
          v-bind:src="getFileSrc(file)"
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
          {{ file.name }}
        </div>
        <RouterLink
          v-if="pre"
          :to="{ name: 'Viewer', query: { file: pre.path } }"
          class="px-3 border-l-1 border-emerald-700"
          replace
        >
          Previous
        </RouterLink>
        <RouterLink
          v-if="nex"
          :to="{ name: 'Viewer', query: { file: nex.path } }"
          class="px-3 border-l-1 border-emerald-700"
          replace
        >
          Next
        </RouterLink>
        <div
          class="cursor-pointer px-3 border-l-1 border-emerald-700"
          @click="
            router.replace({
              name: 'Explorer',
              query: { directory: file.parent || '/' }
            })
          "
        >
          Return
        </div>
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
