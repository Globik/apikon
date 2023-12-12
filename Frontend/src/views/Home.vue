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
  border-right: 1px solid #ddd;
  width: 90%;
  margin: 0.5vh auto;
  background:red;
  border-left: 1px solid #ddd;
 
  height:99vh;
}
</style>
