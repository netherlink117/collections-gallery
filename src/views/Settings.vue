<template>
  <div class="field">
    <label class="label">Server Address</label>
  </div>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Server address"
        v-model="server"
      />
    </div>
    <div class="control">
      <button class="button is-link" v-on:click="setServer()">
        <span class="icon">
          <i class="fas fa-save"></i>
        </span>
      </button>
    </div>
  </div>
  <div class="field">
    <label class="label">Sound</label>
  </div>
  <div class="field">
    <p style="display: inline-block">Notification sound</p>
    <input
      id="switchRoundedDefault"
      type="checkbox"
      name="switchRoundedDefault"
      class="switch is-rounded"
      checked="checked"
    />
    <label for="switchRoundedDefault" style="float: right"></label>
  </div>
  <div class="field">
    <label class="label">Database date version</label>
  </div>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="text"
        placeholder="Database date version"
        readonly
        v-bind:value="version"
      />
    </div>
    <div class="control">
      <button class="button is-link" v-on:click="update()">
        <span class="icon">
          <i class="fas fa-sync"></i>
        </span>
      </button>
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
    },
    version() {
      const v = this.$store.state.collections.version || 0;
      const d = new Date(v * 1000);
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
  },
  methods: {
    setServer() {
      this.$store.commit("setServer", this.server);
      this.$axios
        .get(this.$store.state.server + "/")
        .then((response) => {
          this.$store.commit("setCollections", response.data);
          this.$store.commit("addNotification", {
            message: "Collections updated",
            kind: "success"
          });
        })
        .catch((error) => {
          this.$store.commit("addNotification", {
            message: error.message,
            kind: "danger"
          });
        });
    },
    update() {
      this.$axios
        .get(this.$store.state.server + "/?update")
        .then((response) => {
          console.log(response);
          this.$store.commit("setReport", true);
        })
        .catch((error) => console.log(error));
    }
  },
  mounted() {
    this.server = this.origin;
  }
};
</script>
