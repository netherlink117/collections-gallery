<script setup lang="ts">
import { useIndexStore } from "@/stores";
import { File } from "@/classes/File";
import { type Ref, ref } from "vue";
// import { } from "vue";
const props = defineProps({
  file: {
    type: File,
    required: true
  }
});

const f: Ref<File> = ref(props.file);
const indexStore = useIndexStore();
f.value.getDetailsFromBackend(indexStore.endpoint); //.then(() => emit('free', props.file));

function toHumanSize(bytes: number) {
  const sz = ["B", "K", "M", "G", "T", "P"];
  const factor = Math.floor((bytes.toString().length - 1) / 3);
  return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
}
function getFileSrc(file: File) {
  if (navigator.onLine) {
    return indexStore.endpoint + file.path.split("\\").join("/");
  } else {
    return file.name;
  }
}
</script>
<template>
  <router-link
    :to="{
      name: 'Viewer',
      query: { path: f.path }
    }"
    class="block w-full h-full shadow hover:shadow-md overflow-hidden"
    :class="{ 'animate-pulse': f.status === 'busy' }"
  >
    <div
      v-if="f.mimetype.includes('image')"
      class="w-full h-full bg-center bg-normal hover:bg-hover duration-300 relative"
      :style="'background-image: url(\'' + getFileSrc(f) + '\')'"
    >
      <div
        class="px-3 py-1 bg-opacity-90 dark:bg-opacity-90 dark:bg-dark-700 bg-light-700 text-emerald-500 bottom-0 left-0 right-0 absolute"
      >
        <div class="w-full mx-auto truncate">
          {{ f.name }}
        </div>
        <div class="w-full mx-auto truncate">
          {{ f.mimetype }}
        </div>
        <div class="w-full mx-auto truncate">
          {{ toHumanSize(f.size) }}
        </div>
      </div>
    </div>

    <div
      v-else-if="f.mimetype.includes('video')"
      class="w-full h-full bg-purple-500 hover:bg-purple-700 duration-300 relative"
    >
      <div
        class="px-3 py-1 bg-opacity-90 dark:bg-opacity-90 dark:bg-dark-700 bg-light-700 text-purple-500 bottom-0 left-0 right-0 absolute"
      >
        <div class="w-full mx-auto truncate">
          {{ f.name }}
        </div>
        <div class="w-full mx-auto truncate">
          {{ f.mimetype }}
        </div>
        <div class="w-full mx-auto truncate">
          {{ toHumanSize(f.size) }}
        </div>
      </div>
    </div>

    <div
      v-else
      class="w-full h-full bg-gray-500 hover:bg-gray-700 duration-300 relative"
    >
      <div
        class="px-3 py-1 bg-opacity-90 dark:bg-opacity-90 dark:bg-dark-700 bg-light-700 text-gray-500 bottom-0 left-0 right-0 absolute"
      >
        <div class="w-full mx-auto truncate">
          {{ f.name }}
        </div>
        <div class="w-full mx-auto truncate">
          {{ toHumanSize(f.size) }}
        </div>
      </div>
    </div>
  </router-link>
</template>
