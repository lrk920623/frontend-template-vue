<template>
  <a-col :span="span">
    <div class="description">
      <span v-if="name">{{ name }}：</span>
      <slot />
    </div>
  </a-col>
</template>

<script>
export default {
  name: 'VoCol',

  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    span: {
      type: Number,
      required: false,
      default: 12
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>
