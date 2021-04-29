<template>
  <main class="hero is-fullheight-with-navbar">
    <hero-head></hero-head>
    <hero-body></hero-body>
    <hero-foot></hero-foot>
  </main>
</template>

<script>
import HeroBody from "./HeroBody.vue";
import HeroFoot from "./HeroFoot.vue";
import HeroHead from "./HeroHead.vue";
export default {
  name: "Hero",
  components: {
    HeroHead,
    HeroBody,
    HeroFoot
  }
};
</script>
