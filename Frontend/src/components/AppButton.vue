<template>
  <button class="btn">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppButton'
}
</script>

<style scoped>
.btn {
  padding: 5px;
  transition: background-color 0.2s;
  font-size: 20px;
  cursor: pointer;
  background: linear-gradient(#446ca2,#446ca2 25%,#184076);
  color: #fff;
}
.btn[disabled] {
  background: linear-gradient(#8d8d8d,#868686 25%,#585858);
  cursor: not-allowed;
}
.btn[disabled]:hover {
  background: linear-gradient(#8d8d8d,#868686 25%,#585858);
  cursor: not-allowed;
}
.btn:hover {
  background: linear-gradient(#446ca2,#446ca2 10%,#184076);
}
.btn:active {
  background: linear-gradient(#446ca2,#446ca2 25%,#184076);
}
</style>
