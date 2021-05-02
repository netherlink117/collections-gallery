<template>
  <div>
    <div class="columns is-multiline is-mobile">
      <div
        v-for="path of crumb.content"
        v-bind:key="path"
        v-bind:class="[
          'column is-6-mobile is-4-tablet is-4-desktop is-2-widescreen is-2-fullhd',
          { 'is-hidden': isColumnHidden(path) }
        ]"
      >
        <div
          v-if="path.type === 'directory'"
          class="button is-link is-fullwidth"
          v-on:click="navigate(path)"
        >
          {{ path.name }}
        </div>
        <div v-else>
          {{ path.name }}
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
    tree() {
      return this.$store.state.tree;
    },
    crumb() {
      let crumb = this.$store.state.tree;
      this.$store.state.breadcrumbs.map((c) => (crumb = c));
      return crumb;
    }
  },
  methods: {
    isColumnHidden(path) {
      return (
        (!this.directories && path.type === "directory") ||
        (!this.files && path.type === "file")
      );
    },
    navigate(path) {
      this.$store.commit("breadcrumbsPush", path);
    }
  }
};
</script>
