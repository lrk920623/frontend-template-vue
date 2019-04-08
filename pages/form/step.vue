<template>
  <vo-page-layout :header-title="'分步表单'">
    <div slot="content">
      <a-card :bordered="false">
        <a-steps
          class="steps"
          :current="currentTab">
          <a-step title="填写转账信息"></a-step>
          <a-step title="确认转账信息"></a-step>
        </a-steps>
        <div class="content">
          <step1
            v-if="currentTab === 0"
            @nextStep="nextStep"></step1>
          <step2
            v-if="currentTab === 1"
            @nextStep="nextStep"
            @prevStep="prevStep"></step2>
        </div>
      </a-card>
    </div>
  </vo-page-layout>
</template>

<script>
import Step1 from 'components/tabPage/Step1'
import Step2 from 'components/tabPage/Step2'
import VoPageLayout from 'components/layout/PageLayout'
import { successModal } from 'utils/modal'

export default {
  components: {
    Step1,
    Step2,
    VoPageLayout
  },

  meta: {
    title: '分步表单'
  },

  data() {
    return {
      description:
        '将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。',
      currentTab: 0,

      // form
      form: null
    }
  },
  methods: {
    // handler
    nextStep() {
      if (this.currentTab < 1) {
        this.currentTab += 1
      } else {
        successModal('this is a success message')
      }
    },
    prevStep() {
      if (this.currentTab > 0) {
        this.currentTab -= 1
      }
    },
    finish() {
      this.currentTab = 0
    }
  }
}
</script>

<style lang="less" scoped>
.steps {
  max-width: 750px;
  margin: 16px auto;
}
</style>
