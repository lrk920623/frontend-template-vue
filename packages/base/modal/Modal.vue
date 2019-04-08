<script>
export default {
  name: 'VoModal',
  props: {
    className: {
      type: String,
      required: false,
      default: ''
    },

    width: {
      type: Number,
      required: false,
      default: 800
    },

    open: {
      type: Boolean,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    footer: {
      type: String,
      default: ''
    }
  },

  computed: {
    innerOpen: {
      get: function() {
        return this.open
      },
      set: function() {}
    }
  },

  methods: {
    close() {
      console.log('close')
      this.$emit('close')
    },

    handleCancel() {
      this.close()
    },

    handleOk() {
      this.$emit('handle-ok')
    }
  },

  render(h) {
    let props = {
      visible: this.innerOpen,
      wrapClassName: this.className,
      title: this.title,
      style: 'top: 40px;',
      width: this.width,
      keyboard: false,
      maskClosable: false,
      destroyOnClose: true
    }

    let event = {
      ok: this.handleOk,
      cancel: this.handleCancel
    }

    if (this.footer !== '') props.footer = this.footer

    return h(
      'a-modal',
      {
        tag: 'component',
        props: props,
        on: event,
        scopedSlots: this.$scopedSlots
      },
      [
        h(
          'div',
          {
            class: 'hs-modal-body'
          },
          this.$slots.default
        )
      ]
    )
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

.alert-special-modal {
  .ant-modal-body {
    padding: 0 0 15px 0;

    .ant-alert {
      margin-bottom: 15px;
      font-size: 12px;
    }
  }
}
</style>
