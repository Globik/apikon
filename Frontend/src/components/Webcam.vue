<template>
  <aside id="webcam">
    <online class="online"></online>
    <div class="partner">
      <h2>Partner</h2>
      <!-- <video autoplay ref="remote" @loadedmetadata="loaded"></video> -->
      <video autoplay ref="remote"></video>
    </div>
    <div class="you">
      <h2>You</h2>
      <!-- <video autoplay muted ref="local" @loadedmetadata="loaded"></video> -->
      <video autoplay muted ref="local"></video>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import Online from './Online'

export default {
  name: 'webcam',
  components: {
    Online
  },

  computed: mapState(['localStream', 'remoteStream']),

  watch: {
    remoteStream (stream) {
      this.$refs.remote.srcObject = stream
    },
    localStream (stream) {
      this.$refs.local.srcObject = stream
    }
  },

  methods: {
    // loaded (event) {
    //   event.currentTarget.play()
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#webcam {
  display: flex;
  flex-direction: row;
  overflow: auto;
  padding: 0 10px;
  height: 60%;
  margin-top: 10px;
  box-sizing: border-box;
  justify-content: space-between;

  .partner, .you {
    height: 100%;
    width: 48%;
    overflow: hidden;
  }

  h2 {
    color: #767676;
    font-size: 0.8rem;
    margin-bottom: 5px;
  }

  .online {
    position: absolute;
    top: 40px;
    right: 10px;
    padding: 0 10px;
    z-index: 1;
  }

  video {
    width: 100%;
    min-height: 100%;
    background-color: #333;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
}
</style>
