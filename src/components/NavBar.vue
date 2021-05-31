<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <div class="navbar-item">
        <button
          v-bind:class="[
            'button is-shadowless is-borderless',
            { 'is-invisible': isBackDisabled }
          ]"
          style="border: 0; background: transparent"
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
    <div
      v-bind:class="['navbar-menu', { 'is-active': isActive }]"
      v-on:click="close()"
    >
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <router-link class="navbar-item" :to="{ name: 'Explorer' }">
          Home
        </router-link>
        <router-link class="navbar-item" :to="{ name: 'Settings' }">
          Settings
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
      return this.$store.state.history.length === 0;
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
    close() {
      this.isActive = false;
    },
    navigateBack() {
      this.$store.commit("historyPop");
    }
  }
};
</script>
