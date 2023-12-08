<template>
  <div id="container" class="flex">
    <container-webcam id="webcam"></container-webcam>
    <container-room></container-room>
  </div>
</template>

<script>
import ContainerWebcam from './Webcam'
import ContainerRoom from './Room'

export default {
  name: 'container',
  components: {
    ContainerWebcam,
    ContainerRoom
  }
}
</script>

<style lang="less" scoped>
#container {
  display: block;
  height: 100%;
}
</style>
