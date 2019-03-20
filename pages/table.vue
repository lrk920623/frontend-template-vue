<template>
  <nuxt-child></nuxt-child>
</template>

<script>
import { mixin } from 'utils/constant'

export default {
  meta: {
    title: '列表页',
    noLink: true
  },

  mixins: [mixin]
}
</script>
