<template>
  <Nav />
  <Main />
  <NotificationList />
  <Loader v-if="!ready" />
</template>
<script>
import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";
import NotificationList from "./components/NotificationList.vue";
import Loader from "./components/Loader.vue";
export default {
  name: "App",
  components: {
    Nav,
    Main,
    NotificationList,
    Loader
  },
  computed: {
    ready() {
      return (
        this.$store.state.process.remote === "Done." &&
        this.$store.state.process.local === "Done."
      );
    }
  },
  mounted() {
    this.$store.dispatch("init");
  }
};
</script>

<style lang="sass">
*
  box-sizing: border-box
  padding: 0
  margin: 0
  font-family: Segoe UI, sans serif
body
  min-height: 100vh
  background: rgba(65,184,131,1)
  @media (prefers-color-scheme: dark)
    background: rgba(53,73,94,1)
  *
    color: rgba(53,73,94,1)
    color: rgba(255,255,255,1)
    @media (prefers-color-scheme: dark)
      color: rgba(65,184,131,1)
      color: rgba(255,255,255,1)
</style>
