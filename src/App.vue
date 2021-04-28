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
      .get("http://collections/")
      .then((response) => {
        this.$store.commit("setDirectories", response.data);
      })
      .catch((error) => console.log(error));
  }
};
</script>
