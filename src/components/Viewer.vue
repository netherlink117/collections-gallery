<script setup>
import { computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useIndexStore } from "../stores";

const store = useIndexStore();
const router = useRouter();

const file = computed(() => {
  return store.explorer.file;
});

const final = ref(false);

const pre = computed(() => {
  let index = store.explorer.files.items.findIndex(
    (f) => f.path === file.value.path
  );
  if (index > 0) {
    index--;
  } else {
    return file.value;
  }
  return store.explorer.files.items[index];
});

const nex = computed(() => {
  let index = store.explorer.files.items.findIndex(
    (f) => f.path === file.value.path
  );
  if (index < store.explorer.files.items.length - 1) {
    index++;
  } else {
    if (!final.value) {
      preload(file.value);
    }
    return file.value;
  }
  return store.explorer.files.items[index];
});

function preload(last) {
  store.addActivity("Loading remote files.");
  store
    .getContent(last.parent || "/", last)
    .then((content) => {
      store.removeActivity("Loading remote files.");
      if (content.directories.length === 0) {
        if (content.files.length === 0) {
          final.value = true;
        } else if (
          !(
            /^.*image.*$/.test(content.files[0].mimetype) ||
            /^.*video.*$/.test(content.files[0].mimetype)
          ) &&
          content.directories.length === 0
        ) {
          final.value = true;
        }
      }
      return content;
    })
    .catch((error) => {
      final.value = true;
      store.removeActivity("Loading remote files.");
      store.addActivity(error);
    });
}

function getFileSrc(item) {
  if (navigator.onLine) {
    return store.endpoint + item.path.replaceAll("\\", "/");
  } else {
    return item.bin;
  }
}
</script>

<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
  >
    <div
      class="fixed top-0 left-0 w-screen h-screen z-0 bg-dark-900 opacity-95 backdrop-filter backdrop-blur-sm"
      @click="
        router.replace({ name: 'Explorer', query: { path: file.parent } })
      "
    ></div>
    <div
      class="md:container mx-auto flex items-stretch z-1 bg-dark-900 border-1 border-dark-500 rounded-md"
    >
      <div class="flex items-center m-3">
        <RouterLink
          v-if="pre"
          :to="{ name: 'Explorer', query: { path: pre.path } }"
          :class="{ 'opacity-25': pre.path === file.path }"
          replace
        >
          <div
            class="p-3 opacity-75 bg-dark-500 border-1 border-dark-500 hover:border-dark-100 rounded-full aspect-square"
          >
            &lt;
          </div>
        </RouterLink>
      </div>
      <div
        class="flex-1 flex justify-center"
        style="max-height: calc(100vh - 3vh)"
        v-if="file.mimetype.includes('image')"
      >
        <img
          class="max-h-full"
          v-bind:src="getFileSrc(file)"
          v-bind:alt="file.name"
        />
      </div>
      <div
        class="flex-1 max-h-screen flex justify-center"
        v-else-if="file.mimetype.includes('video')"
      >
        <video
          class="max-h-full"
          v-bind:src="getFileSrc(file)"
          controls
          autoplay
          muted
        ></video>
      </div>
      <div class="flex items-center m-3">
        <RouterLink
          v-if="nex"
          :to="{ name: 'Explorer', query: { path: nex.path } }"
          :class="{ 'opacity-25': nex.path === file.path }"
          replace
        >
          <div
            class="p-3 opacity-75 bg-dark-500 border-1 border-dark-500 hover:border-dark-100 rounded-full aspect-square"
          >
            &gt;
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
