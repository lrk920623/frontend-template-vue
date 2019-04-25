<template>
  <div class="hs-common-attribute-box">
    <div
      v-for="item in attribute"
      :key="item.name"
      class="single-attribute-module">
      <a-checkbox
        :indeterminate="!item.indeterminate"
        :checked="item.checkAll"
        @change="(e) => onCheckAllChange(e, item)">
        {{ item.name }}
      </a-checkbox>

      <vo-input
        v-model="item.filter"
        placeholder="筛选"
        @change="(val) => inputChange(val, item)"></vo-input>

      <a-checkbox-group
        v-model="item.checkedList"
        :options="item.list"
        @change="(checked) => changeSingle(checked, item)"></a-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoCommonAttribute',

  props: {
    origin: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      attribute: _.cloneDeep(this.origin)
    }
  },

  created() {
    _.forIn(this.attribute, (v, k) => {
      v.copyList = Object.assign([], v.list)
    })
  },

  methods: {
    emit(list) {
      this.$emit('getList', list)
    },

    inputChange(val, item) {
      item.list = item.copyList.filter(s => s.label.includes(val))
    },

    changeSingle(checked, item) {
      this.$set(item, 'checkAll', checked.length === item.list.length)
      this.$set(
        item,
        'indeterminate',
        !(!!checked.length && checked.length < item.list.length)
      )

      this.emit(this.attribute)
    },

    onCheckAllChange(e, item) {
      const checkedAll = e.target.checked

      this.$set(
        item,
        'checkedList',
        checkedAll ? item.list.map(s => s.value) : []
      )
      this.$set(item, 'checkAll', checkedAll)
      this.$set(item, 'indeterminate', true)

      this.emit(this.attribute)
    }
  }
}
</script>

<style lang='less'>
/* 所有数据设定的统一样式 */
.hs-common-attribute-box {
  display: flex;

  > .single-attribute-module {
    width: 25%;

    > label > span:last-child {
      color: rgba(0, 0, 0, 0.95);
      font-size: 15px;
    }

    > input {
      margin: 9px 0 5px;
      width: 92%;
    }

    .ant-checkbox-group-item {
      display: block;
      margin: 14px 0;
    }
  }
}
</style>
