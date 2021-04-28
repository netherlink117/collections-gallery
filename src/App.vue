<template>
  <NavBarComponent></NavBarComponent>
  <HeroComponent></HeroComponent>
</template>
<script>
import NavBarComponent from "@/components/NavBarComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
export default {
  name: "App",
  components: {
    NavBarComponent,
    HeroComponent
  },
  mounted() {
    this.$el.parentNode.classList.add("has-navbar-fixed-top");
    this.$axios
      // this must be the endpoint API address, this uses "http://collections/"
      // because the testing machine is under a private DNS server with custom DNS entries...
      // so, this must be changed later for production
      .get("http://collections/")
      .then((response) => {
        this.$store.commit("setDirectories", response.data);
      })
      .catch((error) => console.log(error));
  }
};
</script>
