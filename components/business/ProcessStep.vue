<template>
  <a-steps
    class="process-steps"
    :current="currentStep">
    <template v-for="(item, index) in steps">
      <a-step
        :key="item.name"
        :title="item.name">
        <template slot="icon">
          <img :src="require(`~/assets/iconfont/${item.icon}.svg`)">
          <span
            v-if="index !== steps.length - 1"
            class="step-icon-box">
            <span class="step-icon-line" />
            <span class="step-icon-arrow" />
          </span>
        </template>
      </a-step>
    </template>
  </a-steps>
</template>

<script>
const steps = [
  { name: '供应商发起零星淘汰', icon: 'approve' },
  { name: '采购部门审批', icon: 'approve' },
  { name: '商综部门审批', icon: 'approve' },
  { name: '执行淘汰', icon: 'approve' }
]
export default {
  name: 'VoProcessStep',

  data() {
    return {
      steps,
      currentStep: 2
    }
  },

  methods: {}
}
</script>

<style>
</style>

<style lang='less'>
.process-steps {
  width: 85%;
  margin: 0 auto;

  .ant-steps-item-finish .ant-steps-item-title {
    color: #1890ff;
  }

  .ant-steps-item-process .ant-steps-item-title {
    font-weight: bold;
  }

  .ant-steps-item-wait {
    use {
      fill: #999;
    }

    img {
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      position: relative;
      left: 0;
    }

    .ant-steps-item-title {
      color: #999 !important;
    }
  }

  .ant-steps-item-content {
    display: block;

    .ant-steps-item-title {
      color: #408bf9;
      font-size: 14px;
      line-height: 16px;

      &::after {
        display: none;
      }
    }
  }

  .ant-steps-item-icon {
    width: 100%;
    text-align: left;
    line-height: 16px;

    > .ant-steps-icon {
      width: 100%;
      display: inline-flex;
      height: 100%;

      img,
      svg {
        width: 60px;
        height: 80px;
      }

      > .step-icon-box {
        flex: 1;
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-top: 20px;
        color: #90c76d;

        > .step-icon-line {
          width: 92%;
          border-top: 2px dashed;
          display: inline-block;
        }

        > .step-icon-arrow {
          width: 8px;
          height: 8px;
          border-top: 2px solid;
          border-right: 2px solid;
          transform: rotate(45deg);
          position: relative;
          right: 1px;
        }
      }
    }
  }
}
</style>
