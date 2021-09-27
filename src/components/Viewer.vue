<template>
  <div class="viewer">
    <div>
      <router-link :to="{ name: 'Explorer', query: { path: previusFileURL } }">
        <i class="fas fa-arrow-left fa-3x"></i>
      </router-link>
    </div>
    <div>
      <div
        v-if="metadata.mimetype.includes('image')"
        v-bind:style="{
          backgroundImage: 'url(' + currentFileURL + ')'
        }"
      >
        Some awesome background
      </div>
      <div v-else></div>
      <div v-if="metadata.mimetype.includes('image')">
        <img v-bind:src="currentFileURL" v-bind:alt="metadata.name" />
      </div>
      <div v-else-if="metadata.mimetype.includes('video')">
        <video v-bind:src="currentFileURL" controls></video>
      </div>
    </div>
    <div>
      <router-link :to="{ name: 'Explorer', query: { path: nextFileURL } }">
        <i class="fas fa-arrow-right fa-3x"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Viewer",
  computed: {
    server() {
      return this.$store.state.server;
    },
    path() {
      const path = this.$route.query.path.split("/");
      path.pop();
      return path.join("/");
    },
    files() {
      return this.$store.getters.getPathFiles(this.path);
    },
    metadata() {
      return this.files[this.currentFileIndex];
    },
    currentFileIndex() {
      return this.files.findIndex((file) => {
        return file.path.replaceAll("\\", "/") === this.$route.query.path;
      });
    },
    currentFileURL() {
      return (
        this.server +
        this.files[this.currentFileIndex].path.replaceAll("\\", "/")
      );
    },
    nextFileIndex() {
      if (this.currentFileIndex + 1 >= this.files.length) {
        return this.currentFileIndex;
      } else {
        return this.currentFileIndex + 1;
      }
    },
    nextFileURL() {
      return this.files[this.nextFileIndex].path.replaceAll("\\", "/");
    },
    previusFileIndex() {
      if (this.currentFileIndex - 1 <= 0) {
        return this.currentFileIndex;
      } else {
        return this.currentFileIndex - 1;
      }
    },
    previusFileURL() {
      return this.files[this.previusFileIndex].path.replaceAll("\\", "/");
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
.viewer
  position: fixed
  display: grid
  grid-template-columns: 15% 70% 15%
  grid-template-rows: 90% 10%
  justify-content: stretch
  align-content: stretch
  height: 100vh
  width: 100vw
  overflow: hidden
  >div:nth-child(1)
    grid-area: 1 / 1 / 3 / 2
    z-index: 8
  >div:nth-child(2)
    height: 100vh
    width: 100vw
    grid-template-columns: 100%
    grid-template-rows: 90% 10%
    display: grid
    justify-content: center
    align-items: center
    align-content: center
    grid-area: 1 / 1 / 3 / 4
    div:first-child
      filter: blur(1rem)
      height: 120vh
      width: 120vw
      margin: -10%
      background-size: cover
      background-repeat: no-repeat
      background-position: center
      z-index: 6
      grid-area: 1 / 1 / 2 / 2
    div:nth-child(2)
      display: flex
      align-items: center
      align-content: center
      justify-content: right
      height: 100vh
      width: 100vw
      // background: rgba(222,233,222, 0.4)
      z-index: 7
      grid-area: 1 / 1 / 3 / 2
      img, video
        max-height: 77%
        max-width: 90%
        margin: auto
        padding: 7px
        background-color: rgba(255,255,255,0.3)
        border-radius: 1rem
        box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
        @media (prefers-color-scheme: dark)
          background-color: rgba(0,0,0,0.3)
  >div:nth-child(3)
    grid-area: 1 / 3 / 3 / 4
    z-index: 8
  >div:nth-child(1), div:nth-child(3)
    opacity: 0
    display: flex
    align-content: stretch
    justify-content: center
    cursor: pointer
    a
      border-radius: 1rem
      height: 5rem
      width: 5rem
      align-self: center
      justify-self: center
      padding: 1rem
      backdrop-filter: blur(0.5rem)
      text-decoration: none
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      align-content: center
      background-color: rgba(255,255,255,0.3)
      box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
      @media (prefers-color-scheme: dark)
        background-color: rgba(0,0,0,0.3)
    &:hover
      opacity: 1
</style>
