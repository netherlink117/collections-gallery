<template>
  <nav>
    <div>
      <h1>Collections gallery</h1>
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
  background-color: rgba(255,255,255,0.5)
  color: #000000
  @media (prefers-color-scheme: dark)
    background-color: rgba(0,0,0,0.5)
    color: rgb(255,255,255)
  >div
    width: 50%
    &:nth-child(1)
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
          color: rgb(53,73,94)
          @media (prefers-color-scheme: dark)
            color: rgb(65,184,131)
</style>
