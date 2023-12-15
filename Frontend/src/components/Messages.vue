<template>
  <transition-group tag="ul" id="messages" name="messages" @enter="enter" ref="chat"  :class="hide"  @click="fucker(this);">
  
    <li key="open" v-if="connectionState === 'open'" class="system message">
      <p class="text">
        <span class="tip"><i class="fas fa-check"></i></span>
        Just say hello to each other :D
      </p>
    </li>

    <li key="connecting" v-if="connectionState === 'connecting'" class="system message">
      <p class="text">
        <span class="tip"><i class="fas fa-spinner fa-spin"></i></span>
        Life is like a non-stop roulette. You never know who you will meet next...
      </p>
    </li>

    <li v-for="(message, index) of messages" :key="`${index}`" :class="message.role" class="message" @click="fucker(this);">
      <p class="text"><span class="tip" v-html="message.html"></span>{{message.text}}</p>
    </li>
   
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'messages',

  computed: mapState(['messages', 'connectionState']),

  methods: {
    enter (el) {
      el.scrollIntoView({ block: 'end', behavior: 'auto' })
      // let chatWrapper = el.parentNode.parentNode
      // chatWrapper.scrollTop = chatWrapper.scrollHeight - chatWrapper.clientHeight
    },
    fucker(el){
   // alert(1)
    this.$refs.chat.className="hide";
		//alert(this.$refs.chat.className);
	}
 
}
}
</script>

<style lang="less" scoped>
.chatbox{
	background:blue;
	height:100%;
}
#messages {
  display: block;
  padding: 20px;
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  order-left: 1px solid #ddd;
  position: relative;
  backound:yellow;
  
#messages.hide{
	display:none;
	color:red;
}
  .messages-enter {
    opacity: 0;
    transform: translateY(20px);
  }

  .messages-move {
    transition: all 0.5s;
  }

  .message {
    border-radius: 5px;
    padding: 10px;
    clear: both;
    max-width: 70%;
    list-style-type: none;
    margin: 0px 0;
    transition: all 0.5s;
  }

  .text {
    margin: 0;
    line-height: 1.5;
  }

  .system {
    .tip {
      margin-right: 10px;
    }
  }

  .you {
    float: right;
    background-color: lawnGreen;
    position: relative;
    margin-top:10px;
    .text::after {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid lawnGreen;
      position: absolute;
      top: 0;
      right: -10px;
      border-color: lawnGreen transparent transparent transparent;
    }
  }

  .partner {
    float: left;
    background-color: whiteSmoke;
    position: relative;

    .text::before {
      content: '';
      width: 0;
      height: 0;
      border: 10px solid lawnGreen;
      position: absolute;
      top: 0;
      left: -10px;
      border-color: whiteSmoke transparent transparent transparent;
    }
     
#messages.hide{
	display:none;
	color:red;
}
  }
  
   
#messages.hide{
	display:none;
	color:red;
}
  @media screen and (max-width: 452px) and (orientation: portrait){

	
}
}
</style>
