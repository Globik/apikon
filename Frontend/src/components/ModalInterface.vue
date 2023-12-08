<template>
    <div class="modal" :style="{display: isOpen ? 'flex' : 'none'}">
      <div class="modal-container" :style="{width: containerWidth ? containerWidth : '400px'}">
          <slot name="container"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ModalIntrface',
  props: ['isOpen', 'containerWidth'],
  setup (props) {
    console.log(props)
  }
}
</script>

<style scoped>
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgb(0 0 0 / 30%);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  .modal-container {
    background: white;
    padding: 0;
    margin: 14px;
    width: 450px;
    max-height: 90vh;
    position: relative;
    border-radius: 10px;
    -webkit-box-shadow: 1px 2px 12px 0px;
    box-shadow: 1px 2px 12px 0px;
  }

  .modal-body {
    overflow-y: auto;
    max-height: 80vh;
  }

  li {
    word-break: break-word;
  }
</style>
