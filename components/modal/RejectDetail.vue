<template>
  <vo-modal
    :width="500"
    :class-name="'hs-product-attribute-modal'"
    :open="open"
    title="填写驳回理由"
    @handle-ok="ok"
    @close="$emit('close')">
    <div>
      <p>请输入驳回理由：</p>
      <a-textarea
        v-model="content"
        placeholder="请输入"
        :autosize="{ minRows: 8, maxRows: 10 }"></a-textarea>
    </div>
  </vo-modal>
</template>

<script>
export default {
  name: 'VoRejectDetail',

  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      content: ''
    }
  },

  methods: {
    ok() {
      this.$emit('ok', this.content)
    }
  }
}
</script>

<style lang='less'>
</style>
