<template>
  <!-- <footer class="hero-foot">2021</footer> -->
  <footer class="hero-foot is-foot-fixed is-primary" v-if="report">
    An update of the database is in progress
  </footer>
</template>
<script>
export default {
  name: "HeroFoot",
  computed: {
    report() {
      return this.$store.state.report;
    }
  }
};
</script>
