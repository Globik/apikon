<template>
  <div id="container" class="flex">
    <partner-webcam-mobile id="webcam"></partner-webcam-mobile>
    <room-mobile id="room"></room-mobile>
  </div>
</template>

<script>
import PartnerWebcamMobile from './PartnerWebcamMobile'
import RoomMobile from './RoomMobile'

export default {
  name: 'container',
  components: {
    PartnerWebcamMobile,
    RoomMobile
  }
}
</script>

<style lang="less" scoped>
#container {
  display: block;
  width: 100%;
  height: 100%;
}
#webcam {
  box-sizing: border-box;
  height: 50%;
}
#room {
  width: 100%;
  height: 50%;
}
</style>
