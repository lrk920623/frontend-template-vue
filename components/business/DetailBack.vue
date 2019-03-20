<template>
  <div class="back">
    <a-icon
      type="arrow-left"
      @click="click"></a-icon>
  </div>
</template>

<script>
export default {
  name: 'VoDetailBack',
  data() {
    return {}
  },

  methods: {
    click() {
      this.$emit('back')
    }
  }
}
</script>
