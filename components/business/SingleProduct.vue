<template>
  <div class="single-product-inner-list">
    <div class="product-name">
      <slot />
    </div>
    <a-tag
      v-if="info"
      :color="info.color">
      {{ info.name }}
    </a-tag>
  </div>
</template>
<script>
export default {
  name: 'VoSingleProduct',

  props: {
    info: {
      type: Object,
      required: true
    }
  },

  data() {
    return {}
  }
}
</script>

<style lang='less' scoped>
.single-product-inner-list {
  display: flex;

  > .product-name {
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
