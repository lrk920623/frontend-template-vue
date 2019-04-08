<template>
  <nuxt-child></nuxt-child>
</template>

<script>
import { mixin } from 'utils/constant'

export default {
  meta: {
    title: '商品淘汰管理',
    noLink: true
  },

  mixins: [mixin]
}
</script>
