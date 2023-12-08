<template>
  <aside id="webcam">
    <div class="partner">
      <!-- <video autoplay ref="remote" @loadedmetadata="loaded"></video> -->
      <video autoplay ref="remote"></video>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'webcam',
  computed: mapState(['localStream', 'remoteStream']),

  watch: {
    remoteStream (stream) {
      this.$refs.remote.srcObject = stream
    },
    localStream (stream) {
      this.$refs.local.srcObject = stream
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
#webcam {
  overflow: auto;

  .partner {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  video {
    width: 100%;
    min-height: 100%;
    background-color: #333;
    box-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
}
</style>
