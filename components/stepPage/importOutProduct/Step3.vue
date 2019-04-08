<template>
  <div class="hs-out-product-result">
    <div>
      <p>成功导入商品数：</p>
      <p>23</p>
    </div>
    <div>
      <p>发现错误数据：</p>
      <p>25</p>
      <p class="export-error">
        <a
          href="javascript:"
          @click="exportError">下载错误数据</a>
      </p>
    </div>
    <a-button @click="back">
      返回列表
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'VoImportProductResult',

  props: {
    back: {
      type: Function,
      required: true
    }
  },

  data() {
    return {}
  },

  methods: {
    exportError() {}
  }
}
</script>

<style lang='less'>
.hs-out-product-result {
  text-align: center;

  > div {
    display: flex;
    font-size: 16px;

    > .export-error > a {
      padding-left: 48px;
      font-size: 13px;
    }

    > p:first-child {
      width: 300px;
      text-align: right;
    }

    > p:last-child {
      flex: 1;
      text-align: left;
    }
  }

  > div:first-child > p:last-child {
    color: blue;
  }

  > div:nth-child(2) > p:nth-child(2) {
    color: red;
  }

  button {
    width: 155px;
    position: relative;
    top: 60px;
  }
}
</style>
