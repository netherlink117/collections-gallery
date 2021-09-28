<template>
  <div class="viewer">
    <div
      v-if="metadata.mimetype.includes('image')"
      v-bind:style="{
        backgroundImage: 'url(\'' + currentFileURL + '\')'
      }"
    >
      Some awesome background
    </div>
    <div v-else @click="$router.push(path)">Some awesome background</div>
    <div v-if="metadata.mimetype.includes('image')">
      <img v-bind:src="currentFileURL" v-bind:alt="metadata.name" />
    </div>
    <div v-else-if="metadata.mimetype.includes('video')">
      <video v-bind:src="currentFileURL" controls></video>
    </div>
    <div>
      <div>
        <div>
          {{ name }}
        </div>
        <div>
          <!-- <router-link :to="{ name: 'Explorer', query: { path } }">
            <i class="fas fa-th fa-2x"></i>
          </router-link>
          <div></div> -->
          <router-link
            :to="{ name: 'Explorer', query: { path: previusFileURL } }"
          >
            <i class="fas fa-arrow-left fa-2x"></i>
          </router-link>
          <div></div>
          <router-link :to="{ name: 'Explorer', query: { path: nextFileURL } }">
            <i class="fas fa-arrow-right fa-2x"></i>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div>Collections Gallery</div> -->
    <router-link :to="{ name: 'Explorer', query: { path } }">
      <i class="fas fa-times fa-2x"></i>
    </router-link>
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
    name() {
      const name = this.metadata.name.split(".");
      name.pop();
      return name.join(".");
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
      if (this.currentFileIndex - 1 < 0) {
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
  background: rgba(65,184,131,1)
  @media (prefers-color-scheme: dark)
    background: rgba(53,73,94,1)
  height: 100vh
  width: 100vw
  overflow: hidden
  position: fixed
  top: 0
  right: 0
  z-index: 10
  display: grid
  grid-template-rows: 80vh 20vh
  @media screen and (min-width:854px)
    grid-template-rows: 82.5vh 17.5vh
  @media screen and (min-width:1280px)
    grid-template-rows: 85vh 15vh
  @media screen and (min-width:1600px)
    grid-template-rows: 87.5vh 12.5vh
  @media screen and (min-width:2560px)
    grid-template-rows: 90vh 10vh
  grid-template-columns: 100vw
  flex-direction: column
  justify-content: stretch
  align-content: stretch
  align-items: stretch
  >div:first-child
    grid-area: 1 / 1 / 3 / 2
    filter: blur(1rem)
    height: 120vh
    width: 120vw
    margin: -10%
    background-color: rgba(0,0,0,0)
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    z-index: 11
  >div:nth-child(2)
    grid-area: 1 / 1 / 2 / 2
    display: flex
    align-items: center
    align-content: center
    justify-content: center
    z-index: 12
    img, video
      backdrop-filter: blur(1rem)
      max-height: 95%
      max-width: 95%
      margin: auto
      padding: 7px
      background-color: rgba(255,255,255,0.3)
      border-radius: 1rem
      box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
      @media (prefers-color-scheme: dark)
        background-color: rgba(0,0,0,0.3)
  >div:nth-child(3)
    grid-area: 2 / 1 / 3 / 2
    padding: 0px 2.5%
    z-index: 13
    display: flex
    justify-content: stretch
    align-items: center
    >div
      width: 100%
      padding: 1rem
      display: flex
      justify-content: space-between
      backdrop-filter: blur(1rem)
      align-items: center
      align-content: stretch
      border-radius: 1rem
      background-color: rgba(255,255,255,0.3)
      box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
      @media (prefers-color-scheme: dark)
        background-color: rgba(0,0,0,0.3)
      >div
        display: flex
        gap: 1rem
        &:first-child
          text-overflow: ellipsis
          white-space: nowrap
          word-break: break-all
          overflow: hidden
        div
          width: 1px
          background-color: rgba(255,255,255,0.3)
          @media (prefers-color-scheme: dark)
            background-color: rgba(0,0,0,0.3)
        a
          align-self: center
          justify-self: center
          text-decoration: none
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          align-content: center
  >a:nth-child(4)
    grid-area: 1 / 1 / 2 / 2
    position: fixed
    top: 0
    right: 0
    z-index: 13
    margin: 2.5vh 2.5vw
    border-radius: 1rem
    height: 3.5rem
    text-decoration: none
    width: 3.5rem
    padding: 1rem
    display: flex
    align-items: center
    background-color: rgba(255,255,255,0.3)
    backdrop-filter: blur(1rem)
    box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
    @media (prefers-color-scheme: dark)
      background-color: rgba(0,0,0,0.3)
</style>
