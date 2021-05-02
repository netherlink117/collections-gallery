<template>
  <header class="hero-head breadcrumb is-centered">
    <ul>
      <li
        v-for="breadcrumb of breadcrumbs"
        v-bind:key="breadcrumb"
        v-on:click="navigate(breadcrumb)"
      >
        <a>{{ breadcrumb.name }}</a>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  name: "HeroHead",
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs;
    }
  },
  methods: {
    navigate(breadcrumb) {
      const index = this.breadcrumbs.findIndex(
        (b) => breadcrumb.name === b.name
      );
      let breadcrumbs = [];
      for (let i = 0; i <= index; i++) {
        breadcrumbs.push(this.breadcrumbs[i]);
      }
      this.$store.commit("setBreadcrumbs", breadcrumbs);
    }
  }
};
</script>
