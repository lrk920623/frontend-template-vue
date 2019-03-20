<template>
  <a-tooltip
    :placement="placement"
    :title="title"
    :get-popup-container="getPopupContainer">
    <slot />
  </a-tooltip>
</template>

<script>
export default {
  name: 'VoTooltip',

  props: {
    title: {
      type: String,
      required: true
    },

    placement: {
      type: String,
      required: false,
      default: 'top'
    }
  },

  methods: {
    getPopupContainer(trigger) {
      return trigger.parentElement
    }
  }
}
</script>

<style lang='less'>
</style>
