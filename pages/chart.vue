<template>
  <nuxt-child></nuxt-child>
</template>

<script>
import { mixin } from 'utils/constant'

export default {
  meta: {
    title: '可视化',
    noLink: true
  },

  mixins: [mixin]
}
</script>
