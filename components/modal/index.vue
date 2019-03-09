<template>
  <a-modal
    v-model="innerOpen"
    :title="title"
    style="top: 40px;"
    :width="800"
    :destroy-on-close="true"
    @ok="handleOk"
    @cancel="handleCancel">
    <div class="hs-modal-body">
      <slot />
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'VoModal',
  props: {
    title: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      innerOpen: true
    }
  },

  methods: {
    close() {
      this.$emit('close')
    },

    handleCancel() {
      this.close()
    },

    handleOk() {
      this.close()
      this.$emit('handle-ok')
    }
  }
}
</script>

<style lang='less'>
.hs-modal-body {
  .search {
    margin-bottom: 8px;
    width: 40%;
  }

  .error {
    margin-left: 10px;
    color: @font-error-color;
  }

  .condition-box {
    margin-bottom: 8px;
    display: flex;

    > .search {
      margin-bottom: 0;
    }

    .ant-select {
      width: 25%;
      margin-left: 8px;
    }
  }
}
</style>
