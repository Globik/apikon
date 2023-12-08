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
      isMobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }
}
</script>

<style scoped>
#app {
  border-right: 1px solid #ddd;
  width: 90%;
  margin-left: 5%;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
