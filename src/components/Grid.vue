<template>
  <div>
    <div class="columns is-multiline is-mobile">
      <div
        v-for="(path, index) of content"
        v-bind:key="index"
        v-bind:class="[
          'column is-6-mobile is-4-tablet is-4-desktop is-2-widescreen is-2-fullhd',
          { 'is-hidden': isColumnHidden(path) }
        ]"
      >
        <div
          v-if="path.type === 'directory'"
          class="has-text-centered"
          v-on:click="navigate(path)"
        >
          <div class="icon is-large has-text-warning p-6">
            <i class="fas fa-folder fa-7x"></i>
          </div>
          <div>
            {{ path.name }}
          </div>
          <div>
            {{ toHumanSize(path.size) }}
          </div>
        </div>
        <div v-else class="has-text-centered" v-on:click="show(index)">
          <div class="icon is-large p-6">
            <i class="fas fa-file fa-5x"></i>
          </div>
          <div>
            {{ path.name }}
          </div>
          <div>
            {{ toHumanSize(path.size) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Grid",
  computed: {
    order() {
      return this.$store.state.order;
    },
    directories() {
      return this.$store.state.directories;
    },
    files() {
      return this.$store.state.files;
    },
    history() {
      return this.$store.state.history;
    },
    content() {
      try {
        const entries = this.history.length;
        return entries > 0
          ? this.history[entries - 1].content
          : this.$store.state.collections.content;
      } catch (e) {
        return [];
      }
    }
  },
  methods: {
    isColumnHidden(path) {
      return (
        (!this.directories && path.type === "directory") ||
        (!this.files && path.type === "file")
      );
    },
    toHumanSize(bytes) {
      const sz = ["B", "K", "M", "G", "T", "P"];
      const factor = Math.floor((bytes.toString().length - 1) / 3);
      return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
    },
    navigate(path) {
      this.$store.commit("historyPush", path);
    },
    show(index) {
      this.$store.commit("setIndex", index);
    }
  }
};
</script>
