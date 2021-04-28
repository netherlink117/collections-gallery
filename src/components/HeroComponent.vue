<template>
  <main class="hero is-black is-fullheight-with-navbar">
    <HeroHeadComponent></HeroHeadComponent>
    <HeroBodyComponent></HeroBodyComponent>
    <HeroFootComponent></HeroFootComponent>
  </main>
</template>

<script>
import HeroHeadComponent from "@/components/HeroHeadComponent.vue";
import HeroFootComponent from "@/components/HeroFootComponent.vue";
import HeroBodyComponent from "@/components/HeroBodyComponent.vue";

export default {
  name: "HeroComponent",
  components: {
    HeroHeadComponent,
    HeroBodyComponent,
    HeroFootComponent
  }
};
</script>
