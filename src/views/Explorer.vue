<template>
  <component
    v-bind:directories="directories"
    v-bind:files="files"
    v-bind:is="view"
  ></component>
</template>
<script>
import Grid from "../components/Grid.vue";
import Viewer from "../components/Viewer.vue";
export default {
  name: "Explorer",
  components: {
    Grid,
    Viewer
  },
  computed: {
    view() {
      if (
        this.$store.state.collections.files.items.findIndex((file) => {
          return (
            file.path.replaceAll("\\", "/") ===
            decodeURI(this.$route.query.path)
          );
        }) >= 0
      ) {
        return "viewer";
      }
      return this.$store.state.view;
    },
    order() {
      return this.$store.state.order;
    },
    directories() {
      return this.$store.getters.getPathDirectories(this.$route.query.path);
    },
    files() {
      return this.$store.getters.getPathFiles(this.$route.query.path);
    }
  },
  watch: {
    $route: "tryLoad"
  },
  methods: {
    tryLoad() {
      if (
        this.$store.getters.getPathDirectories(this.$route.query.path).length <=
          0 &&
        this.$store.getters.getPathFiles(this.$route.query.path).length <= 0 &&
        this.$route.fullPath !== "/settings"
      ) {
        if (this.view !== "viewer") {
          this.$store.dispatch("remotePath", this.$route.query.path);
        }
      }
    }
  },
  mounted() {
    this.tryLoad();
  }
};
</script>
