<template>
  <div class="hs-button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VoButtonGroup'
}
</script>

<style lang='less' scoped>
/* 所有组合按钮的通用布局样式 */
.hs-button-group {
  margin-bottom: 10px;

  button {
    margin-left: 10px;
  }

  button:first-child {
    margin-left: 0;
  }
}
</style>
