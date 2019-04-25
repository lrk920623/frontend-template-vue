<template>
  <vo-page-layout :header-title="'基础表单'">
    <div slot="content">
      <a-form
        :form="form"
        @submit="handleSubmit">
        <vo-form-item label="标题">
          <a-input
            v-decorator="valid.title.rule"
            :name="valid.title.code"
            placeholder="给目标起个名字"></a-input>
        </vo-form-item>
        <vo-form-item label="描述">
          <a-textarea
            v-decorator="valid.desc.rule"
            rows="4"
            placeholder="请输入你阶段性工作目标"></a-textarea>
        </vo-form-item>
        <vo-form-item
          label="客户"
          :required="false">
          <vo-input
            v-model="customer"
            placeholder="请输入客户名称"></vo-input>
        </vo-form-item>
        <vo-form-item
          label="权重"
          :required="false">
          <a-input-number
            v-model="weight"
            :min="0"
            :max="100"></a-input-number>
          <span> %</span>
        </vo-form-item>
        <vo-form-item
          label="目标公开"
          :required="false"
          help="客户、邀评人默认被分享">
          <a-radio-group v-model="radioValue">
            <template v-for="cur in radios">
              <a-radio
                :key="cur.v"
                :value="cur.v">
                {{ cur.n }}
              </a-radio>
            </template>
          </a-radio-group>
        </vo-form-item>
        <vo-form-item
          :wrapper-col="{ span: 24 }"
          style="text-align: center">
          <a-button
            html-type="submit"
            type="primary">
            提交
          </a-button>
          <a-button style="margin-left: 8px">
            保存
          </a-button>
        </vo-form-item>
      </a-form>
    </div>
  </vo-page-layout>
</template>

<script>
import VoPageLayout from 'components/layout/PageLayout'
import VoFormItem from 'components/basic/FormItem'

import { buildValidator } from 'utils/factory/common'

const validator = {
  title: { rule: [['required', '请输入标题']] },
  desc: { rule: [['required', '请输入目标描述']] }
}

const radios = [{ v: 1, n: '公开' }, { v: 2, n: '不公开' }]

export default {
  components: {
    VoPageLayout,
    VoFormItem
  },

  mixins: [window.layoutMixin],

  meta: {
    title: '基础表单'
  },

  data() {
    return {
      form: this.$form.createForm(this),
      valid: buildValidator(validator),
      radios,
      radioValue: 1,
      weight: 0,
      customer: ''
    }
  },

  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          console.log(this.radioValue, this.customer, this.weight)
        }
      })
    }
  }
}
</script>

<style>
</style>
