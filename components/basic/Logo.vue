<template>
  <div class="logo">
    <nuxt-link :to="{name: 'home'}">
      <img
        src="~@/assets/logo.svg"
        alt="logo">
      <h1 v-if="showTitle">
        {{ title }}
      </h1>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'VLogo',
  props: {
    title: {
      type: String,
      default: 'Nuxt Template',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.logo {
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 24px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;

  img,
  h1 {
    display: inline-block;
    vertical-align: middle;
  }

  img {
    height: 32px;
  }

  h1 {
    color: #fff;
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-weight: 600;
  }
}
</style>
