<template>
  <svg
    :class="svgClass"
    aria-hidden="true">
    <use
      :xlink:href="iconName"
      :class="{inherit: inherit}" />
  </svg>
</template>

<script>
export default {
  name: 'VoSvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    inherit: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },

    svgClass() {
      return 'svg-icon ' + this.className
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.inherit {
  color: red;
  fill: blue;
}

use {
  color: #999;
  fill: #999;
}
</style>
