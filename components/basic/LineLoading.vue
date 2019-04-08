<template>
  <div
    v-show="show"
    class="hs-line-loading">
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<script>
export default {
  name: 'VoLineLoading',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='less' scoped>
.hs-line-loading {
  width: 150px;
  height: 15px;
  margin: 0 auto;
  margin-top: 10px;

  span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    border-radius: 50%;
    background: #787c82;
    -webkit-animation: load 1.04s ease infinite;
  }
  span:last-child {
    margin-right: 0;
  }
  @-webkit-keyframes load {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
  }
  span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
  }
  span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
  }
  span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
  }
  span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
  }
}
</style>
