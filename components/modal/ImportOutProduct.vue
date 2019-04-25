<template>
  <vo-modal
    :width="700"
    :class-name="'hs-import-out-product alert-special-modal'"
    :open="open"
    :footer="null"
    :title="title"
    @close="$emit('close')">
    <a-alert
      message="请导入符合同一单据要求（品类组、执行方式、淘汰时间、淘汰理由）的商品"
      type="info"
      show-icon></a-alert>
    <a-steps
      :current="currentStep"
      progress-dot>
      <a-step
        v-for="item in steps"
        :key="item"
        :title="item"></a-step>
    </a-steps>

    <div class="step-content">
      <component
        :is="currentComponent"
        :back="ok"></component>
    </div>
    <div
      v-show="!currentStep"
      class="upload-import-footer">
      <a-button
        type="primary"
        @click="startImport">
        开始导入
      </a-button>
    </div>
  </vo-modal>
</template>

<script>
import VoImportProductOnly from 'components/stepPage/importOutProduct/OnlyProductStep1'
import VoImportProductUpload from 'components/stepPage/importOutProduct/Step1'
import VoImportProductProcess from 'components/stepPage/importOutProduct/Step2'
import VoImportProductResult from 'components/stepPage/importOutProduct/Step3'
export default {
  name: 'VoImportOutProduct',

  components: {
    VoImportProductUpload,
    VoImportProductProcess,
    VoImportProductResult,
    VoImportProductOnly
  },

  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
    },

    onlyProduct: {
      type: Boolean,
      required: false,
      default: false
    },

    title: {
      type: String,
      required: false,
      default: '导入淘汰商品门店'
    }
  },

  data() {
    return {
      currentStep: 0,
      steps: ['上传数据', '导入数据', '导入完成']
    }
  },

  computed: {
    currentComponent() {
      switch (this.currentStep) {
        case 0:
          return this.onlyProduct
            ? 'VoImportProductOnly'
            : 'VoImportProductUpload'
        case 1:
          return 'VoImportProductProcess'
        case 2:
          return 'VoImportProductResult'
      }

      return ''
    }
  },

  watch: {
    open(val) {
      if (!val) return

      this.currentStep = 0
    }
  },

  methods: {
    ok() {
      this.$emit('close')
    },

    startImport() {
      // todo 异步上传
      this.currentStep = 1

      setTimeout(() => {
        this.currentStep = 2
      }, 3000)
    }
  }
}
</script>

<style lang='less'>
.hs-import-out-product {
  .upload-import-footer {
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    border-radius: 0 0 4px 4px;
  }

  .ant-modal-body {
    padding: 0;

    .ant-steps {
      width: 70%;
      margin: 0 auto;
      padding-top: 30px;
      padding-bottom: 40px;

      .ant-steps-item-title {
        font-size: 13px;
      }
    }

    .step-content {
      min-height: 250px;
    }
  }
}
</style>
