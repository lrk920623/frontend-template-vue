<template>
  <div class="exception">
    <div class="img">
      <img src="~/assets/error.svg">
    </div>
    <div class="content">
      <h1>出错了</h1>
      <div class="desc">
        抱歉，你访问的页面不存在或仍在开发中
      </div>
      <div class="action">
        <a-button
          type="primary"
          @click="handleToHome">
          返回首页
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '404'
    }
  },
  data() {
    return {
      img: ''
    }
  },
  methods: {
    handleToHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
.exception {
  background: #f0f2f5;
  min-height: 100vh;
  height: 80%;
  align-items: center;
  text-align: center;
  padding-top: 150px;
  .img {
    display: inline-block;
    padding-right: 52px;
    zoom: 1;
    img {
      height: 360px;
      max-width: 430px;
    }
  }
  .content {
    display: inline-block;
    flex: auto;
    position: relative;
    top: 60px;

    h1 {
      color: #434e59;
      font-size: 42px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 0;
    }
    .desc {
      color: rgba(0, 0, 0, 0.45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}

.mobile {
  .exception {
    margin-top: 30px;
    .img {
      padding-right: unset;

      img {
        height: 40%;
        max-width: 80%;
      }
    }
  }
}
</style>
