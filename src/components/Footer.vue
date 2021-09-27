<template>
  <footer v-if="report">An update of the database is in progress</footer>
</template>
<script>
export default {
  name: "Footer",
  computed: {
    report() {
      return this.$store.state.report;
    }
  }
};
</script>

<style lang="sass">
footer
  backdrop-filter: blur(1rem)
  background-color: rgba(255,255,255,0.3)
  @media (prefers-color-scheme: dark)
    background-color: rgba(0,0,0,0.3)
</style>
