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
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}
div {
  display: inline-block;
  /*margin-right: 30px;*/
}
.start {
  border-radius: 10px;
  height: 100%;
  width: 100%;
  text-align: center;
}
.stop {
  border-radius: 10px;
  background: linear-gradient(#c50000,#a10000 25%,#640000);
  height: 100%;
  width: 100%;
  text-align: center;
}
.stop:hover {
  background: linear-gradient(#c50000,#a10000 10%,#640000);
}
.next {
  border-radius: 10px;
  height: 100%;
  width: 100%;
  text-align: center;
}
.div_next {
  padding: 8px 4px;
  padding-left: 0;
}
.div_start {
  padding: 8px 4px;
}
</style>
