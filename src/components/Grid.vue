<template>
  <div>
    <div>
      <div v-if="content.length === 0">
        There is no content to show, try updating settings and then reload.
      </div>
      <div v-for="(item, index) of content" v-bind:key="index">
        <div v-if="item.type === 'directory'">
          <div>
            <i class="fas fa-folder fa-7x"></i>
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
        <div v-else>
          <div>
            <i class="fas fa-file fa-5x"></i>
          </div>
          <div>
            {{ item.name }}
          </div>
          <div>
            {{ toHumanSize(item.size) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Grid",
  computed: {
    order() {
      return this.$store.state.order;
    },
    directories() {
      return this.$store.state.collections.directories.items;
    },
    files() {
      return this.$store.state.collections.files.items;
    },
    content() {
      return [...this.directories, ...this.files];
    }
  },
  methods: {
    toHumanSize(bytes) {
      const sz = ["B", "K", "M", "G", "T", "P"];
      const factor = Math.floor((bytes.toString().length - 1) / 3);
      return (bytes / Math.pow(1024, factor)).toFixed(2) + sz[factor];
    }
  }
};
</script>
