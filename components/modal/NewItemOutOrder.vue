<template>
  <vo-modal
    :class-name="'hs-new-item-out-order'"
    :width="600"
    :open="visible"
    title="新建淘汰单"
    @close="$emit('close')"
    @handle-ok="ok">
    <a-form :form="form">
      <vo-form-item label="品类组">
        <vo-param-show
          :click-box="changeVisible"
          :data="classSelected"
          :types="types.class"
          :no-clear="true"></vo-param-show>
      </vo-form-item>

      <vo-form-item
        label="执行方式"
        :required="true">
        <a-radio-group
          v-decorator="valid.way.rule"
          :name="valid.way.code">
          <template v-for="cur in radios">
            <a-radio
              :key="cur.v"
              :value="cur.v">
              {{ cur.n }}
            </a-radio>
          </template>
        </a-radio-group>
      </vo-form-item>

      <vo-form-item label="预淘汰时间">
        <a-date-picker
          v-model="query.preDate"
          style="width: 100%"
          placeholder="请选择"></a-date-picker>
      </vo-form-item>

      <vo-form-item
        label="淘汰时间"
        extra="默认预淘汰后的一个月">
        <a-date-picker
          v-model="query.date"
          style="width: 100%"
          placeholder="请选择"></a-date-picker>
      </vo-form-item>

      <vo-form-item
        label="淘汰原因"
        :required="true">
        <a-textarea
          v-decorator="valid.reason.rule"
          :name="valid.reason.code"
          rows="4"
          placeholder="商品亏损，无法继续供货"></a-textarea>
      </vo-form-item>

      <vo-form-item
        label="联系人"
        :required="true">
        <a-input
          v-decorator="valid.title.rule"
          :name="valid.title.code"
          placeholder="请输入"></a-input>
      </vo-form-item>
    </a-form>

    <vo-class-modal
      :open="openClass"
      :types="types"
      :promise="promise"
      :selected="classSelected"
      @close="changeVisible"
      @ok="selectedItems"></vo-class-modal>
  </vo-modal>
</template>

<script>
import VoFormItem from 'components/basic/FormItem'
import { buildValidator } from 'utils/common'
import { types } from 'utils/constant'
import { getUrlByType, buildPromise } from 'utils/common'

const radios = [{ v: '1', n: '立即淘汰' }, { v: '2', n: '月度淘汰' }]
const validator = {
  way: { rule: [['required', '执行方式必填']] },
  title: { rule: [['required', '联系人必填']] },
  reason: { rule: [['required', '淘汰原因必填']] }
}

export default {
  name: 'VoNewItemOutOrder',

  components: {
    VoFormItem
  },

  props: {
    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      openClass: false,
      classSelected: [],
      types,
      form: this.$form.createForm(this),
      valid: buildValidator(validator),
      radios,
      promise: null,
      query: {
        way: 1
      }
    }
  },

  computed: {
    visible: {
      get() {
        return this.open
      },
      set() {}
    }
  },

  methods: {
    selectedItems(data) {
      this.classSelected = data
    },

    changeVisible() {
      this.openClass = !this.openClass

      this.promise = buildPromise(getUrlByType(this.types.class.sign))
    },

    ok() {
      this.form.validateFields((err, values) => {
        if (err) {
          console.log('err: ', values)
          return
        }
        console.log('Received values of form: ', values)
        this.form.resetFields()

        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="less">
.hs-new-item-out-order {
  .ant-form-item {
    .ant-form-item-label {
      width: 24%;
    }

    .ant-form-item-control-wrapper {
      width: 58%;
    }
  }
}
</style>
