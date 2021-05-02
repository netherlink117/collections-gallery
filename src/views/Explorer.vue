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
  }
};
</script>
