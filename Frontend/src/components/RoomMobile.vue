<template>
<div id="room">
  <room-messages id="messages"></room-messages>
  <room-input-mobile id="input"></room-input-mobile>
  <room-control-mobile id="control"></room-control-mobile>
  <room-webcam-mobile id="webcam"></room-webcam-mobile>
</div>
</template>

<script>
import RoomMessages from './Messages'
import RoomInputMobile from './InputMobile'
import RoomControlMobile from './ControlMobile'
import RoomWebcamMobile from './WebcamMobile'

export default {
  name: 'RoomMobile',
  components: {
    RoomControlMobile,
    RoomMessages,
    RoomInputMobile,
    RoomWebcamMobile
  }
}
</script>

<style scoped>
#room {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 17% 17%;
  grid-template-columns: 34% 1fr;
}
#messages {
  grid-column-start: 1;
  grid-column-end: 4;
  height: 80%;
  width: 90%;
}
#input {
  grid-column-start: 3;
}
#control {
  grid-row-start: 3;
  grid-column-start: 3;
}
#webcam {
  grid-column-start: 1;
  width: 100%;
  height: 100%;
  grid-row-start: 2;
  grid-row-end: 4;
}
</style>
