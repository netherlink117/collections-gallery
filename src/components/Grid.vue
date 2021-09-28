<template>
  <div class="empty" v-if="directories.length === 0 && files.length === 0">
    There is no content to show, try updating settings and then reload.
  </div>
  <div v-else class="grid">
    <router-link
      class="directory"
      v-for="(item, index) of directories"
      v-bind:key="item.path + index"
      :to="{
        name: 'Explorer',
        query: { path: item.path.replaceAll('\\', '/') }
      }"
    >
      <div>
        <i class="fas fa-folder fa-7x"></i>
      </div>
      <div class="data">
        {{ item.name }}
      </div>
    </router-link>
    <router-link
      class="file"
      v-for="(item, index) of files"
      v-bind:key="item.path + index"
      :to="{
        name: 'Explorer',
        query: {
          path: item.path.replaceAll('\\', '/')
        }
      }"
    >
      <div>
        <i class="fas fa-file fa-7x"></i>
      </div>
      <div class="data">
        {{ item.name }}
      </div>
      <div>
        {{ toHumanSize(item.size) }}
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Grid",
  props: {
    directories: {
      type: Array,
      required: true
    },
    files: {
      type: Array,
      required: true
    }
  },
  methods: {
    toHumanSize(bytes) {
      const sz = ["B", "K", "M", "G", "T", "P"];
      const factor = Math.floor((bytes.toString().length - 1) / 3);
      return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
    }
  }
};
</script>

<style lang="sass">
.grid
  padding: 0.5rem
  padding-top: 9rem
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: 1rem
  text-shadow: 0 3.2px 7.2px rgba(0,0,0,0.132)
  > a
    text-decoration: none
    width: calc(50% - 1rem)
    @media screen and (min-width:854px)
      width: calc(25% - 1rem)
    @media screen and (min-width:1280px)
      width: calc(16.6% - 1rem)
    @media screen and (min-width:1600px)
      width: calc(12.5% - 1rem)
    @media screen and (min-width:2560px)
      width: calc(10% - 1rem)
    padding: 0 1rem 0 1rem
    height: 10rem
    > div
      width: 100%
      text-align: center
      text-overflow: ellipsis
      white-space: nowrap
      word-break: break-all
      overflow: hidden
  .directory
    i
      color: rgba(250,225,150, 0.7)
      backdrop-filter: blur(1rem)
      padding-bottom: 0.3rem
  .file
    i
      color: rgba(222,222,222, 0.7)
      backdrop-filter: blur(1rem)
      padding-bottom: 0.3rem
</style>
