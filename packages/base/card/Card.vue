<template>
  <a-card
    :class="{'no-padding': noPadding}"
    :bordered="border"
    :loading="loading">
    <slot />
  </a-card>
</template>

<script>
export default {
  name: 'VoCard',

  props: {
    border: {
      type: Boolean,
      default: false,
      required: false
    },

    noPadding: {
      type: Boolean,
      required: false,
      default: false
    },

    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

<style lang='less'>
.no-padding {
  > .ant-card-body {
    padding: 0;
  }
}
/*@import '~ant-design-vue/lib/card/style/index';*/
</style>
