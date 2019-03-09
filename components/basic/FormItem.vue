<template>
  <a-form-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol">
    <slot />
  </a-form-item>
</template>

<script>
export default {
  name: 'VoFormItem',

  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },

    help: {
      type: String,
      required: false,
      default: ''
    },

    wrapperCol: {
      type: Object,
      required: false,
      default: function() {
        return { lg: { span: 10 }, sm: { span: 14 } }
      }
    },

    labelCol: {
      type: Object,
      required: false,
      default: function() {
        return { lg: { span: 7 }, sm: { span: 7 } }
      }
    }
  }
}
</script>

<style lang='less'>
</style>
