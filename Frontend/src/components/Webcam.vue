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
  display: block;
  position:relative;
  background:yellow;
  
  padding: 0;
  
  height: 60%;
  margin: 0;
  box-sizing: border-box;
  

  .partner, .you {
  box-sizing: border-box;
  display:inline-block;
    height: calc(100% - 2rem);
    width: 50%;
    verflow: hidden;
    margin:0;
    padding:0;
  }
 

  h2 {
    color: #767676;
    font-size: 1rem;
    padding-left: 0.8rem;
    background:brown;
    height:2rem;
    line-height:2rem;
  }
@media screen and (max-width: 452px) and (orientation: portrait){
#webcam{
	height:4%;
}
	h2{
	background:yellow;
	}
	.partner{
		display:block;
		position:relative;
		border:1px solid blue;
		width:100%;
	}
	.you{
		display:block;
		position:absolute;
		width:25%;
		height:20%;
		brder:1px solid green;
		bottom:calc(0px + 3.2rem);
		left:1.2rem;
	}
	}
  .online {
    position: absolute;
    top: 40px;
    right: 10px;
    padding: 0 10px;
    z-index: 1;
  }

  video {
  object-fit:cover;
    width: 100%;
    order:1px solid red;
    height: 99.9%;
    background-color: #333;
    ox-shadow: 0 12px 15px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
}

 @media screen and (max-width: 452px) and (orientation: portrait){
#webcam{
	height:40%;
}}
</style>
