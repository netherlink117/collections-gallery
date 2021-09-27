<template>
  <nav>
    <div>
      <router-link :to="{ name: 'Explorer' }">
        <h1>Collections gallery</h1>
      </router-link>
    </div>
    <div>
      <router-link :to="{ name: 'Explorer' }"> Home </router-link>
      <router-link :to="{ name: 'Settings' }"> Settings </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Nav"
};
</script>

<style lang="sass">
nav
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
  >div
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
</style>
