<template>
  <div class="hs-out-product-process">
    <p>
      <span>批量导入中，请耐心等待，不要关闭页面...</span>
      <vo-line-loading :show="true"></vo-line-loading>
    </p>
    <div class="warm-tip">
      <p>温馨提示：</p>
      <p>首次导入时间相对较长，请耐心等候。</p>
      <p>平均100条导入时间约30s；最大20000条的导入时间约3min，如长时间无法导入，请联系管理员。</p>
    </div>
  </div>
</template>

<script>
import VoLineLoading from 'components/basic/LineLoading'
export default {
  name: 'VoImportProductProcess',

  components: {
    VoLineLoading
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='less'>
.hs-out-product-process {
  padding-bottom: 40px;

  > p {
    text-align: center;
    padding: 20px 0;
  }

  .warm-tip {
    border: 1px solid rgba(255, 153, 0, 1);
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 204, 1);
    border-radius: 8px;
  }
}
</style>
