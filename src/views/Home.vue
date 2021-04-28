<template>
  <div>
    <div class="columns is-multiline">
      <div class="column" v-for="path of paths" v-bind:key="path">
        <div v-if="path.type === 'directory'" class="button is-link">
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
  name: "Home",
  computed: {
    paths() {
      return this.$store.state.paths;
    },
    directory() {
      return this.$store.state.directory;
    }
  }
};
</script>
