<template>
  <aside id="webcam">
    <online class="online"></online>
    <div class="you">
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
  height: calc(100% - 310px);
  justify-content: space-between;

  .you {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .online {
    position: absolute;
    top: 10px;
    right: 0;
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
