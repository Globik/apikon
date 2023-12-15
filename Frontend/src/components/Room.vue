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
  height:calc(100% - 60%); 
  grid-template-columns: 1fr 4% 1fr;
  grid-auto-rows: 1fr 110px;
  background:black;
}
#control {
  grid-row-start: 1;
  grid-row-end: 3;
  ackground:green;
}
#messages {
  width: 100%;
  height: 100%;
  grid-column-start: 3;
  bckground:pink;
  border-radius:5px;
}
#input {
  grid-column-start: 3;
  height: 110px;
  width: 100%;
  grid-row-end: 3;
  background: black;
  border-radius:5px;
}
@media screen and (max-width: 452px) and (orientation: portrait){
	#room{
		display:block;
		height:10%;
	}
	#control{
		height:100%;
		width:100%;
	}
	#input {
		height:45px;
	}
	#messages {
	display:block;
	position:absolute;
	bottom:120px;
		bckgund:gray;
		height:60%;
		width:100%;
	
	}
}
</style>
