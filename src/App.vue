<template>
  <nav-bar></nav-bar>
  <hero></hero>
  <modal></modal>
</template>
<script>
import Hero from "./components/Hero.vue";
import NavBar from "./components/NavBar.vue";
import Modal from "./components/Modal.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Hero,
    Modal
  },
  mounted() {
    this.$el.parentNode.classList.add("has-navbar-fixed-top");
    this.$axios
      .get(this.$store.state.server)
      .then((response) => {
        this.$store.commit("setCollections", response.data);
      })
      .catch((error) => console.log(error));
    if (localStorage.getItem("report") === "true") {
      const pid = setInterval(() => {
        this.$axios
          .get(this.$store.state.server + "/?report")
          .then((response) => {
            if (response.data.message === "update active") {
              this.$store.commit("setReport", true);
            } else if (response.data.message === "update inactive") {
              clearInterval(pid);
              this.$store.commit("setReport", false);
            }
          })
          .catch((error) => console.log(error));
      }, 5000);
    }
  }
};
</script>
