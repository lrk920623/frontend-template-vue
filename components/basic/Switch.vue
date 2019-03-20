<template>
  <a-switch
    checked-children="开"
    un-checked-children="关"
    :default-checked="checked"
    @change="change"></a-switch>
</template>

<script>
export default {
  name: 'VoSwitch',
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  methods: {
    change(check) {
      this.$emit('change', check)
    }
  }
}
</script>

<style lang='less'>
</style>
