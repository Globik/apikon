<template>
  <div id="app">
    <app-container></app-container>
  </div>
</template>

<script>
import AppContainer from '../components/Container'
// import AppContainerMobile from '../components/ContainerMobile'

export default {
  name: 'home',
  components: {
    AppContainer
  },
  setup () {
    return {
      isMobile: false//(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }
}
</script>

<style scoped>
#app {
  brder-right: 1px solid #ddd;
  width: 100%;
  margin: 0;
  ackground:red;
  boder-left: 1px solid #ddd;
 overflow:auto;
  height:100vh;
}
</style>
