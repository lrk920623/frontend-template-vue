<template>
  <span
    class="table-page-search-submitButtons"
    :style="toggle && { float: 'right', overflow: 'hidden' } || {} ">
    <a-button
      type="primary"
      @click="$emit('search')">
      查询
    </a-button>
    <a-button
      style="margin-left: 8px"
      @click="$emit('reset', {})">
      重置
    </a-button>
    <a
      style="margin-left: 8px"
      @click="toggleAction">
      {{ toggle ? '收起' : '展开' }}
      <a-icon :type="toggle ? 'up' : 'down'"></a-icon>
    </a>
  </span>
</template>
<script>
export default {
  name: 'VSearchReset',
  model: {
    prop: 'advanced',
    event: 'toggle'
  },
  props: {
    advanced: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      toggle: this.advanced
    }
  },

  methods: {
    toggleAction() {
      this.toggle = !this.toggle
      this.$emit('toggle', this.toggle)
    }
  }
}
</script>
