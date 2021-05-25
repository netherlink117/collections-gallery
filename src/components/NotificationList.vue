<template>
  <div class="notification-list">
    <div
      v-for="(notification, index) in notifications"
      v-bind:key="index"
      v-bind:class="'notification is-' + notification.kind"
    >
      <button class="delete" v-on:click="dropNotification(index)"></button>
      {{ notification.message }}
      <audio
        autoplay="true"
        type="audio/mp3"
        v-bind:src="getSound(notification)"
      ></audio>
    </div>
  </div>
</template>
<script>
const asuccess = require("@/assets/377017_1172853-lq.mp3");
const adanger = require("@/assets/366108_6687700-lq.mp3");
export default {
  name: "NotificationList",
  data() {
    return {
      asuccess,
      adanger
    };
  },
  computed: {
    notifications() {
      return this.$store.state.notifications;
    }
  },
  methods: {
    getSound(notification) {
      return notification.kind === "danger" ? this.adanger : this.asuccess;
    },
    dropNotification(index) {
      this.$store.commit("dropNotification", {
        index
      });
    }
  }
};
</script>
