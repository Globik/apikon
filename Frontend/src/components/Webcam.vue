<template>
  <aside id="webcam">
  <div class="head">
    <online class="online"></online>
    </div>
    <div class="partner">
     <!-- <h2>Partner</h2> -->
      <!-- <video autoplay ref="remote" @loadedmetadata="loaded"></video> -->
      <video autoplay ref="remote"></video>
    </div>
    <div class="you">
     <!-- <h2>You</h2> -->
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
  background:black;
  
  padding: 0;
  
  height: 60%;
  margin: 0;
  box-sizing: border-box;
  

  .partner, .you {
  box-sizing: border-box;
  display:inline-block;
    height: calc(100% - 40px);
    width: 50%;
    verflow: hidden;
    margin:0;
    padding:0;
  }
  .partner video{
	  background:silver;
  }
 .you video{
	 background-image: url("/webcam.png");
	 background-repeat: no-repeat;
	 background-position: center;
	 position:relative;
 }
 
.head{
display:block;
position:relative;
	height:40px;
	background: black;
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
	height:100%;
	overflow:auto;
}
	h2{
	background:yellow;
	}
	.partner{
		display:block;
		position:relative;
		order:1px solid blue;
		width:100%;
		background:red;
	}
	.you{
		display:block;
		position:absolute;
		width:35%;
		height:25%;
		brder:1px solid green;
		top:40px;
			left:0;
	}

	}
  .online {
    position: absolute;
    top: 25%;
    left: 10px;
    padding: 0 10px;
    z-index: 1;
    color:white;
    font-weight:bold;
    background:rgba(45,3,55);
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
display:block;
position:relative;
	height:calc(100% - 120px);
}}
</style>
