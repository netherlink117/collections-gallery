<template>
  <nav class="navbar is-black is-fixed-top">
    <div class="navbar-brand">
      <div>Collections Gallery</div>
      <button class="navbar-burger">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'Home' }">
          Home
        </router-link>
      </div>
      <div class="navbar-end"></div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBarComponent"
};
</script>
