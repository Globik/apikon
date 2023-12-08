<template>
  <div id="room">
    <room-control id="control"></room-control>
    <room-messages id="messages"></room-messages>
    <room-input id="input"></room-input>
  </div>
</template>

<script>
import RoomMessages from './Messages'
import RoomInput from './Input'
import RoomControl from './Control'

export default {
  name: 'room',
  components: {
    RoomControl,
    RoomMessages,
    RoomInput
  }
}
</script>

<style lang="less" scoped>
#room {
  display: grid;
  height: 40%;
  grid-template-columns: 1fr 4% 1fr;
  grid-auto-rows: 1fr 110px;
}
#control {
  grid-row-start: 1;
  grid-row-end: 3;
}
#messages {
  width: 95%;
  height: 85%;
  grid-column-start: 3;
}
#input {
  grid-column-start: 3;
  height: 110px;
  width: 100%;
  grid-row-end: 3;
}
</style>
