<template>
  <div class="settings">
    <div>
      <h1>Settings</h1>
    </div>
    <div>
      <label>Server Address</label>
      <div>
        <input type="text" placeholder="Server address" v-model="server" />
        <button v-on:click="setServer()">
          <i class="fas fa-save fa-lg"></i>
        </button>
      </div>
    </div>
    <div>
      <label>Sound</label>
      <div>
        <input type="radio" name="audio" id="on" checked="checked" />
        <label for="on">On</label>
        <div></div>
        <input type="radio" name="audio" id="off" />
        <label for="off">Off</label>
      </div>
    </div>
    <div>
      <label>About</label>
      <div>
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

<style lang="sass">
.settings
  display: flex
  flex-wrap: wrap
  flex-direction: column
  justify-content: space-around
  align-items: center
  border-radius: 1rem
  padding: 1rem
  margin-left: auto
  margin-right: auto
  backdrop-filter: blur(1rem)
  box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
  background-color: rgba(255,255,255,0.3)
  @media (prefers-color-scheme: dark)
    background-color: rgba(0,0,0,0.3)
  margin-top: 9rem
  width: calc(90% - 1rem)
  @media screen and (min-width:854px)
    width: calc(55% - 1rem)
  @media screen and (min-width:1280px)
    width: calc(43% - 1rem)
  @media screen and (min-width:1600px)
    width: calc(31% - 1rem)
  @media screen and (min-width:2560px)
    width: calc(20% - 1rem)
  div, label
    width: 100%
  >div
    padding: 0.3rem
  div
    vertical-align: middle
    input[type=text]
      width: 90%
      display: inline
      color: rgba(0,0,0,1)
      padding: 0.3rem
      border: none
    button
      width: 10%
      background: none
      display: inline
      border: none
      marging-bottom: -5rem
    input[type=radio]
      margin-right: 0.5rem
      margin-bottom: 0.3rem
</style>
