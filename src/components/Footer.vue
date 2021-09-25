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
  background-color: rgba(255,255,255,0.3)
  color: #000000
  @media (prefers-color-scheme: dark)
    background-color: rgba(0,0,0,0.3)
    color: rgb(255,255,255)
</style>
