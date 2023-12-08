<template>
  <div id="input" class="flex">
    <div class="input-area">
      <input-toolbar @addEmoji="addEmoji"></input-toolbar>
      <textarea class="textarea" ref="textarea" @keypress.stop="handleInput"></textarea>
    </div>

    <div class="action-area">
      <app-button @click.native="sendMessage" class="send" variant="default">
        <img src="/icons/send.svg" style="padding-right: 3px;padding-top: 4px;filter: invert(100%) sepia(0%) saturate(699%) hue-rotate(165deg) brightness(108%) contrast(108%); width: 35px;">
      </app-button>
    </div>
  </div>
</template>

<script>
import InputToolbar from './Toolbar'
import { mapState, mapMutations } from 'vuex'
import AppButton from './AppButton'

export default {
  name: 'chat-input',

  components: {
    InputToolbar,
    AppButton
  },

  computed: mapState(['socket', 'connectionState']),

  methods: {
    ...mapMutations(['addMessage']),

    handleInput (event) {
      if (!event.shiftKey && event.key === 'Enter') {
        event.preventDefault()
        this.sendMessage()
      }
    },

    addEmoji (emoji) {
      let textarea = this.$refs.textarea
      let value = textarea.value
      let start = textarea.selectionStart
      let end = textarea.selectionEnd

      textarea.value = value.slice(0, start) + emoji + value.slice(end)
      textarea.setSelectionRange(start + 2, start + 2) // emoji takes up two code units
      textarea.focus()
    },

    sendMessage (event) {
      let textarea = this.$refs.textarea
      let text = textarea.value

      if (text) {
        this.addMessage({ text, role: 'you' })
        textarea.value = ''
        if (this.connectionState === 'open') {
          this.socket.emit('message', { text, role: 'partner' })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#input {
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;

  .input-area {
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    padding: 5px 10px;

    .emoji {
      width: 20px;
      height: 20px;
    }

    .textarea {
      width: 100%;
      height: 60px;
      resize: none;
      border: none;
      padding: 0;
      outline: none;
      font-size: 1rem;
    }
  }

  .action-area {
    border-left: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 4px;
    .send {
      width: 80px;
      text-align: center;
      border-radius: 10px;
    }
  }
}
</style>
