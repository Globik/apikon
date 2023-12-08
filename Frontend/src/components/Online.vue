<template>
  <div class="online">
    <h3>Online: {{$store.state.online}}</h3>
  </div>
</template>

<script>
export default {
  name: 'Online'
}
</script>

<style scoped>
  .online {
    color: #fff;
    border-radius: 10px;
    margin-right: 10px;
    opacity: .3;
    background: #000;
  }
</style>
