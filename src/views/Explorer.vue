<template>
  <component v-bind:is="view"></component>
</template>
<script>
import Grid from "../components/Grid.vue";
export default {
  name: "Explorer",
  components: {
    Grid
  },
  computed: {
    view() {
      return this.$store.state.view;
    }
  },
  methods: {
    directories(to) {
      return this.$store.state.collections.directories.items.filter((item) => {
        return item.parent.replace("\\", "/") === (to.query.path || "/");
      });
    },
    files(to) {
      return this.$store.state.collections.files.items.filter((item) => {
        return item.parent.replace("\\", "/") === (to.query.path || "/");
      });
    }
  },
  async beforeRouteUpdate(to) {
    if (this.directories(to).length <= 0 && this.files(to).length <= 0) {
      this.$store.dispatch("remotePath", to.query.path);
    }
  }
};
</script>
