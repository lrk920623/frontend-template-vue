<template>
  <nuxt-child></nuxt-child>
</template>

<script>
import { mixin } from 'utils/constant'

export default {
  meta: {
    title: '模态框',
    noLink: true
  },

  mixins: [mixin]
}
</script>
