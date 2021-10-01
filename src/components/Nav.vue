<template>
  <nav>
    <div>
      <router-link :to="{ name: 'Explorer' }">
        <h1>CG</h1>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Explorer' }"> Home </router-link>
      <router-link :to="{ name: 'Settings' }"> Settings </router-link>
    </div>
    <div :class="{ hidden: !showHotLinks }">
      <router-link
        v-for="(hotLink, index) of hotLinks"
        v-bind:key="index"
        :to="hotLink"
      >
        <div v-if="index > 0">
          <i class="fas fa-caret-right"></i>
        </div>
        <div v-else></div>
        <div>
          <div>
            <i class="fas fa-folder fa-lg"></i>
          </div>
          <div>{{ hotLink.content }}</div>
        </div>
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav",
  computed: {
    hotLinks() {
      const hotLinks = [];
      // if (
      //   this.$route.query.path !== undefined &&
      //   this.$route.query.path !== "/"
      // ) {
      hotLinks.push({
        name: "Explorer",
        content: "root",
        query: { path: "/" }
      });
      // }
      (this.$route.query.path || "/")
        .split("/")
        .filter((path) => path !== "")
        .forEach((path, index) => {
          if (index > 0) {
            hotLinks.push({
              name: "Explorer",
              content: path,
              query: { path: hotLinks[index].query.path + "/" + path }
            });
          } else {
            hotLinks.push({
              name: "Explorer",
              content: path,
              query: { path: "/" + path }
            });
          }
        });
      // hotLinks.pop();
      return hotLinks;
    },
    showHotLinks() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style lang="sass">
::-webkit-scrollbar
  display: none
nav
  position: fixed
  top: 0
  right: 0
  z-index: 9
  width: 100%
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  align-items: center
  backdrop-filter: blur(1rem)
  box-shadow: 0 3.2px 7.2px 0 rgba(0,0,0,.132),0 .6px 1.8px 0 rgba(0,0,0,.108)
  background-color: rgba(255,255,255,0.3)
  @media (prefers-color-scheme: dark)
    background-color: rgba(0,0,0,0.3)
  > div
    width: 50%
    &:nth-child(1)
      a, a:visited
        text-decoration: none
        h1
          padding: 1rem
    &:nth-child(2)
      display: flex
      justify-content: stretch
      a,a:visited
        flex: 1
        text-align: center
        padding: 1rem
        text-decoration: none
        color: inherit
        &:hover
          color: rgba(0,0,0,1)
          color: rgba(222,222,222,1)
          @media (prefers-color-scheme: dark)
            color: rgba(255,255,255,1)
            color: rgba(222,222,222,1)
  >div:nth-child(3)
    width: 100%
    overflow-x: auto
    gap: 0.1rem
    display: flex
    align-items: center
    border-radius: 1rem
    a:last-child
      right: 0
    a
      gap: 0.1rem
      display: flex
      align-items: center
      text-decoration: none
      // text-overflow: ellipsis
      white-space: nowrap
      // word-break: break-all
      >div:nth-child(2)
        &:hover
          div, i
            color: rgba(0,0,0,1)
            color: rgba(222,222,222,1)
            @media (prefers-color-scheme: dark)
              color: rgba(255,255,255,1)
              color: rgba(222,222,222,1)
        display: flex
        // flex-direction: column
        align-items: center
        padding: 1rem
        div:first-child
          padding-right: 0.3rem
.hidden
  visibility: hidden
</style>
