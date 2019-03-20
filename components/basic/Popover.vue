<template>
  <a-popover
    :title="title"
    :trigger="trigger"
    :placement="placement">
    <template slot="content">
      <slot name="content" />
    </template>
    <slot />
  </a-popover>
</template>

<script>
export default {
  name: 'VoPopover',

  props: {
    title: {
      type: String,
      required: false,
      default: '信息'
    },

    placement: {
      type: String,
      required: false,
      default: 'topLeft'
    },

    trigger: {
      type: String,
      required: false,
      default: 'hover'
    }
  }
}
</script>

<style lang='less'>
</style>
