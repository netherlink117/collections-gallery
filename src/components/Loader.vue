<template>
  <div class="loader">
    <div>
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div>{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: {
    message: {
      type: String,
      default: "",
      required: true
    }
  }
};
</script>

<style lang="sass">
.loader
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  position: absolute
  top: 0
  left: 0
  backdrop-filter: blur(1rem)
  >div
    width: 30%
    // height: 20%
    padding: 1rem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    box-shadow: 0 25.6px 57.6px 0 rgba(0,0,0,.22),0 4.8px 14.4px 0 rgba(0,0,0,.18)
    border-radius: 3rem
    background-color: rgba(255,255,255,0.5)
    color: #000000
    @media (prefers-color-scheme: dark)
      background-color: rgba(0,0,0,0.5)
      color: rgb(255,255,255)
    >div:nth-child(2)
      padding: 1rem

.lds-roller
  display: inline-block
  position: relative
  width: 80px
  height: 80px
  div
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
    transform-origin: 40px 40px
    &:after
      content: " "
      display: block
      position: absolute
      width: 7px
      height: 7px
      border-radius: 50%
      background: #fff
      margin: -4px 0 0 -4px
    &:nth-child(1)
      animation-delay: -0.036s
    &:nth-child(1):after
      top: 63px
      left: 63px
    &:nth-child(2)
      animation-delay: -0.072s
    &:nth-child(2):after
      top: 68px
      left: 56px
    &:nth-child(3)
      animation-delay: -0.108s
    &:nth-child(3):after
      top: 71px
      left: 48px
    &:nth-child(4)
      animation-delay: -0.144s
    &:nth-child(4):after
      top: 72px
      left: 40px
    &:nth-child(5)
      animation-delay: -0.18s
    &:nth-child(5):after
      top: 71px
      left: 32px
    &:nth-child(6)
      animation-delay: -0.216s
    &:nth-child(6):after
      top: 68px
      left: 24px
    &:nth-child(7)
      animation-delay: -0.252s
    &:nth-child(7):after
      top: 63px
      left: 17px
    &:nth-child(8)
      animation-delay: -0.288s
    &:nth-child(8):after
      top: 56px
      left: 12px
@keyframes lds-roller
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
