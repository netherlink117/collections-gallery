<template>
  <NavComponent></NavComponent>
  <HeaderComponent></HeaderComponent>
  <MainComponent></MainComponent>
  <FooterComponent></FooterComponent>
</template>
<script>
import NavComponent from "@/components/NavComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
export default {
  name: "App",
  components: {
    NavComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  }
};
</script>
