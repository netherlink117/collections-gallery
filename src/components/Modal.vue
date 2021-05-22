<template>
  <div
    style="
      position: fixed;
      width: 100vw;
      height: 100vh;
      z-index: 9998;
      top: 0;
      left: 0;
    "
    v-if="active"
  >
    <div
      class="background-buttons"
      style="
        position: fixed;
        width: 50vw;
        height: 100vh;
        z-index: 9998;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
      "
      v-on:click="decreaseIndex()"
    >
      <div style="position: fixed; bottom: 10px; left: 10px">Previous</div>
    </div>
    <div
      class="background-buttons"
      style="
        position: fixed;
        width: 50vw;
        height: 100vh;
        z-index: 9998;
        right: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.7);
      "
      v-on:click="increaseIndex()"
    >
      <div style="position: fixed; bottom: 10px; right: 10px">Next</div>
    </div>
    <div
      class="background-buttons"
      style="position: fixed; z-index: 9999; right: 10px; top: 10px"
      v-on:click="hidde()"
    >
      Close
    </div>
    <img
      style="
        position: fixed;
        z-index: 9999;
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - 40px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
      v-if="kind === 'image'"
      :src="path + content.name"
    />
    <video
      style="
        position: fixed;
        z-index: 9999;
        max-width: calc(100vw - 40px);
        max-height: calc(100vh - 40px);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
      v-else-if="kind === 'video'"
      :src="path + content.name"
      :type="mimetype"
      controls
    ></video>
    <div v-else>Can not display this file.</div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  computed: {
    content() {
      let index = this.$store.state.history.length - 1;
      return (
        this.$store.state.history[index].content[this.$store.state.index] ||
        null
      );
    },
    kind() {
      if (this.content.mimetype.includes("video")) {
        return "video";
      }
      if (this.content.mimetype.includes("image")) {
        return "image";
      }
      return "";
    },
    mimetype() {
      return this.content.mimetype.replace("mkv", "webm");
    },
    path() {
      let path = "http://collections/";
      this.$store.state.history.forEach((entry) => {
        path += entry.name + "/";
      });
      return path;
    },
    active() {
      return this.$store.state.index !== null;
    }
  },
  methods: {
    toHumanSize(bytes) {
      const sz = ["B", "K", "M", "G", "T", "P"];
      const factor = Math.floor((bytes.toString().length - 1) / 3);
      return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
    },
    hidde() {
      this.$store.commit("setIndex", null);
    },
    increaseIndex() {
      this.$store.commit("increaseIndex");
    },
    decreaseIndex() {
      this.$store.commit("decreaseIndex");
    }
  }
};
</script>
