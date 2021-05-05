<template>
  <nav-bar></nav-bar>
  <hero></hero>
</template>
<script>
import Hero from "./components/Hero.vue";
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Hero
  },
  mounted() {
    this.$el.parentNode.classList.add("has-navbar-fixed-top");
    this.$axios
      // this must be the endpoint API address, this uses "http://collections/"
      // because the testing machine is under a private DNS server with custom DNS entries...
      // so, this must be changed later for production
      .get("http://collections/")
      .then((response) => {
        let tree = {
          name: "root",
          type: "directory",
          content: response.data,
          size: 0
        };
        this.$store.commit("setTree", tree);
        this.$store.commit("breadcrumbsPush", tree);
      })
      .catch((error) => console.log(error));
  }
};
</script>
