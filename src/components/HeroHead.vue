<template>
  <header class="hero-head breadcrumb">
    <ul class="p-3">
      <li v-on:click="reset()">
        <!-- <a class="icon">
          <i class="fas fa-server fa-lg"></i>
        </a> -->
        <a>root</a>
      </li>
      <li
        v-for="(entry, index) of history"
        v-bind:key="index"
        v-on:click="navigate(entry)"
      >
        <a>{{ entry.name }}</a>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  name: "HeroHead",
  computed: {
    history() {
      return this.$store.state.history;
    }
  },
  methods: {
    navigate(entry) {
      const index = this.history.findIndex(
        (_entry) => _entry.name === entry.name
      );
      let history = [];
      for (let i = 0; i <= index; i++) {
        history.push(this.history[i]);
      }
      this.$store.commit("setHistory", history);
    },
    reset() {
      this.$store.commit("setHistory", []);
    }
  }
};
</script>
