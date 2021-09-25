<template>
  <div>
    <div class="field">
      <label class="label">Server Address</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Server address"
          v-model="server"
        />
      </div>
      <div class="control">
        <button v-on:click="setServer()">
          <span class="icon">
            <i class="fas fa-save"></i>
          </span>
        </button>
      </div>
    </div>
    <div class="field">
      <label class="label">Sound</label>
      <div class="control">
        <input type="checkbox" name="sound" checked="checked" />
      </div>
    </div>

    <div class="field">
      <label class="label">About</label>
    </div>
    <div class="field">
      <div class="control">
        <router-link :to="{ name: 'About' }">
          Here you can check more about Collections Gallery
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Settings",
  data() {
    return {
      server: ""
    };
  },
  computed: {
    origin() {
      return this.$store.state.server;
    }
  },
  methods: {
    setServer() {
      this.$store.commit("setServer", this.server);
      this.$store.dispatch("remotePath", "/");
    }
  },
  mounted() {
    this.server = this.origin;
  }
};
</script>
