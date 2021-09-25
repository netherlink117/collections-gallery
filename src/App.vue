<template>
  <Nav />
  <Main />
  <NotificationList />
  <!-- <Loader v-if="status != 'Ready.'" v-bind:message="status" /> -->
</template>
<script>
import Nav from "./components/Nav.vue";
import Main from "./components/Main.vue";
import NotificationList from "./components/NotificationList.vue";
// import Loader from "./components/Loader.vue";
export default {
  name: "App",
  components: {
    Nav,
    Main,
    NotificationList
    // Loader
  },
  methods: {},
  mounted() {
    this.$store.dispatch("init");
    // this.$store.dispatch("localDirectories");
    // this.$store.dispatch("localFiles");
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
  background-color: rgb(65,184,131)
  @media (prefers-color-scheme: dark)
    background-color: rgb(53,73,94)
    background-image: url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%2341b883' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")
    background-image: linear-gradient(315deg,rgb(53,73,94)30%,rgb(65,184,131)100%)
</style>
