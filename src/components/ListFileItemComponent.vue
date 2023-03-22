<script setup lang="ts">
import { useIndexStore } from "@/stores";
import { File } from "@/classes/File";
import { type Ref, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  file: {
    type: File,
    required: true
  }
});

const router = useRouter();
const indexStore = useIndexStore();
const f: Ref<File> = ref(props.file);

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
function navigate() {
  router.push({
    name: "Viewer",
    query: { path: props.file.path }
  });
}
</script>
<template>
  <div
    v-if="f.mimetype.includes('image')"
    class="flex items-center justify-between w-full p-3 text-dark-500 dark:text-light-500 group hover:text-emerald-500"
    @click="navigate"
  >
    <div class="flex items-center">
      <div
        class="aspect-square w-70px bg-dark-500 dark:bg-light-500 group-hover:bg-emerald-500 filter brightness-75 group-hover:brightness-95 bg-contain bg-center bg-no-repeat m-3"
        :style="'background-image: url(\'' + getFileSrc(f) + '\')'"
      ></div>
      <div>
        {{ f.name }}
      </div>
    </div>
    <div>{{ toHumanSize(f.size) }}</div>
  </div>

  <div
    v-else-if="f.mimetype.includes('video')"
    class="flex items-center justify-between w-full p-3 text-dark-500 dark:text-light-500 group hover:text-indigo-500"
    @click="navigate"
  >
    <div class="flex items-center">
      <div
        class="aspect-square border-t-35px border-t-transparent border-b-35px border-b-transparent border-l-70px border-l-dark-500 dark:border-l-light-500 group-hover:border-l-indigo-500 w-21px m-3"
      ></div>
      <div>
        {{ f.name }}
      </div>
    </div>
    <div>{{ toHumanSize(f.size) }}</div>
  </div>

  <div
    v-else
    class="flex items-center justify-between w-full p-3 text-dark-500 dark:text-light-500 group hover:text-stone-500"
  >
    <div class="flex items-center">
      <div
        class="rounded-1/2 aspect-square w-70px bg-dark-500 dark:bg-light-500 group-hover:bg-stone-500 m-3"
      ></div>
      <div>
        {{ f.name }}
      </div>
    </div>
    <div>{{ toHumanSize(f.size) }}</div>
  </div>
</template>
