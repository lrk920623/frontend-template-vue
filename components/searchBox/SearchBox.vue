<template>
  <a-form layout="inline">
    <a-row :gutter="48">
      <slot />
    </a-row>
  </a-form>
</template>

<script>
export default {
  name: 'VoSearchBox'
}
</script>
