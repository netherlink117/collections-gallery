<template>
  <div>
    <div class="columns is-multiline">
      <div
        class="column"
        v-for="directory of directories"
        v-bind:key="directory"
      >
        <div class="button is-link">
          {{ directory.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  computed: {
    directories() {
      return this.$store.state.directories;
    }
  }
};
</script>
