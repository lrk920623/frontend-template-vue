<template>
  <a-card :bordered="border">
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
    }
  }
}
</script>

<style lang='less'>
</style>
