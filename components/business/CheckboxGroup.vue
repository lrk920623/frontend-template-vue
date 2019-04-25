<template>
  <div class="checkbox-group-box">
    <slot />
    <div
      v-for="item in list"
      :key="item.name">
      <span>{{ item.name }}：</span>
      <a-checkbox-group
        v-model="item.checkedList"
        :options="item.list"></a-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoCheckboxGroup',

  props: {
    group: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      list: _.cloneDeep(this.group)
    }
  },

  methods: {}
}
</script>

<style lang='less'>
.checkbox-group-box {
  font-size: 12px;

  > span {
    position: absolute;
    right: 15px;
    top: 10px;
    color: #000;

    &:hover {
      opacity: 0.85;
      cursor: pointer;
    }
  }

  .ant-checkbox-wrapper {
    font-size: 12px;
  }

  > div {
    margin-bottom: 13px;

    > span {
      min-width: 60px;
      display: inline-block;
    }
  }

  > div:last-child {
    margin-bottom: 0;
  }
}
</style>
