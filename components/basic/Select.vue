<template>
  <a-select
    v-model="select"
    :placeholder="placeholder"
    :default-value="defaultValue"
    @change="selectChange">
    <a-select-option
      v-for="item in list"
      :key="item.value">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>
z
<script>
export default {
  name: 'VSelect',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    selected: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择',
      required: false
    }
  },

  data: function() {
    return {
      select: this.selected || undefined
    }
  },

  computed: {
    defaultValue() {
      return this.list.find(s => s.active).value
    }
  },

  watch: {
    selected(val) {
      console.log('change select')
      this.select = val || undefined
    }
  },

  methods: {
    selectChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
