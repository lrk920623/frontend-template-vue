<template>
  <a-radio-group
    v-decorator="valid.way.rule"
    :name="valid.way.code">
    <template v-for="cur in list">
      <a-radio
        :key="cur.v"
        :value="cur.v">
        {{ cur.n }}
      </a-radio>
    </template>
  </a-radio-group>
</template>

<script>
export default {
  name: 'VoRadioGroup',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='less'>
</style>
