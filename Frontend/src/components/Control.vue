<template>
  <div class="control">
    <div v-if="connectionState === 'closed'" class="div_start">
      <app-button @click.native="start" class="start">Start</app-button>
    </div>
    <div v-else  class="div_stop">
      <app-button @click.native="stop" class="stop">Stop</app-button>
    </div>
    <div  class="div_next">
      <app-button @click.native="next" :disabled="connectionState !== 'open'" class="next">Next</app-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import AppButton from './AppButton'

export default {
  name: 'room-control',
  components: {
    AppButton
  },
  computed: mapState(['localStream', 'connectionState']),

  methods: {
    ...mapMutations(['createPeerConnection', 'closePeerConnection', 'addLocalStream', 'removeLocalStream']),
    ...mapActions(['getUserMedia', 'hangUpCall']),

    start () {
      this.createPeerConnection()
      this.getUserMedia()
    },

    next () {
      this.closePeerConnection()
      this.hangUpCall()
      this.createPeerConnection()
      this.addLocalStream(this.localStream)
    },

    stop () {
      this.closePeerConnection()
      this.hangUpCall()
      this.removeLocalStream()
    }
  }
}
</script>

<style scoped>
.control {
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr 3fr 0.5fr;
  grid-template-rows: 0.5fr 1.5fr 0.5fr;
}
div {
  display: inline-block;
  margin-right: 30px;
}
.div_start {
  grid-column-start: 2;
  grid-row-start: 2;
}
.start {
  font-size: 2vw;
  border-radius: 10px;
  height: 29%;
  width: auto;
  text-align: center;
}
.div_stop {
  grid-column-start: 2;
  grid-row-start: 2;
}
.stop {
  font-size: 2vw;
  border-radius: 10px;
  background: linear-gradient(#c50000,#a10000 25%,#640000);
  height: 29%;
  width: auto;
  text-align: center;
}
.stop:hover {
  background: linear-gradient(#c50000,#a10000 10%,#640000);
}
.div_next {
  grid-column-start: 4;
  grid-row-start: 2;
}
.next {
  font-size: 2vw;
  border-radius: 10px;
  grid-column-start: 3;
  height: 29%;
  width: auto;
  text-align: center;
}
@media screen and (max-width: 452px) and (orientation: portrait){
.control{
	display:block;
	width:100%;
	height:40px;
	  flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align:center;
}
	.start{
	font-size:4vw;
	padding:4vw;
		
		margin-top:0.3rem;
		z-index:100;
	}
	.div_next{
		display:inline-block;
		width:auto;
		ackground:yellow;
		brder:10px solid green;
	}
	.div_start{
		display:inline-block;
		width:auto;
		margin-left:6px;
		ackground:blue;
	}
	.div_stop{
		display:inline-block;
		width:auto;
	}
	.next{
	font-size:4vw;
	padding:4vw;
		margin-top:0.3rem;
		idth:50%;
		margin-left:5px;
		
	}
	
	.stop{
		font-size:4vw;
	padding:4vw;
		
		margin-top:0.3rem;
	
	}
}
</style>
