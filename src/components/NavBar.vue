<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <div class="navbar-item">
        <button
          class="button"
          v-on:click="navigateBack()"
          :disabled="isBackDisabled"
        >
          <span class="icon">
            <i class="fas fa-arrow-left"></i>
          </span>
        </button>
      </div>
      <div class="navbar-item">Collections Gallery</div>
      <div
        v-bind:class="['navbar-burger', { 'is-active': isActive }]"
        v-on:click="toggle()"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div v-bind:class="['navbar-menu', { 'is-active': isActive }]">
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <router-link class="navbar-item" :to="{ name: 'Explorer' }">
          Home
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    isBackDisabled() {
      return this.$store.state.breadcrumbs.length == 1;
    }
  },
  methods: {
    toggle() {
      console.log(this.isActive);
      this.isActive = !this.isActive;
    },
    navigateBack() {
      this.$store.commit("breadcrumbsPop");
    }
  }
};
</script>
