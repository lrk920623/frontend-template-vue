<template>
  <div class="page-header">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index">
        <nuxt-link
          v-if="item.name !== name && !item.meta.noLink"
          :to="{ name: item.name }">
          {{ item.meta.title }}
        </nuxt-link>
        <span v-else>{{ item.meta.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="detail">
      <div class="main">
        <div
          v-if="title"
          class="row">
          <h1 class="title">
            {{ title }}
          </h1>
        </div>
        <div class="row">
          <div class="table-page-search-wrapper">
            <slot name="search" />
          </div>
        </div>

        <div class="head">
          <slot name="head" />
        </div>

        <slot name="pageTabs" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoPageHeader',

  props: {
    title: {
      type: String,
      default: '',
      required: false
    }
  },

  data() {
    return {
      name: '',
      breadList: []
    }
  },

  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },

  created() {
    this.getBreadcrumb()
  },

  methods: {
    getBreadcrumb() {
      this.breadList = []

      this.name = this.$route.name
      this.$route.matched.forEach(item => {
        if (item.meta.father) this.breadList.push(item.meta.father)

        this.breadList.push(item)
      })

      console.log('list', this.breadList)
    }
  }
}
</script>

<style lang="less">
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;

  .head {
    display: flex;

    .back {
      width: 50px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      color: #1790ff;
      position: relative;

      > i:hover {
        cursor: pointer;
      }

      &:after {
        content: '';
        border-left: 1px solid;
        height: 18px;
        position: absolute;
        right: 15px;
        top: 13px;
        color: #ccc;
      }
    }
  }

  .breadcrumb {
    margin-bottom: 16px;
  }

  .detail {
    display: flex;
    /*margin-bottom: 16px;*/

    .avatar {
      flex: 0 1 72px;
      margin: 0 24px 8px 0;

      & > span {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
      }
    }

    .main {
      width: 100%;
      flex: 0 1 auto;

      .row {
        display: flex;
        width: 100%;

        .avatar {
          margin-bottom: 16px;
        }
      }

      .title {
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
        flex: auto;
      }
      .logo {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        margin-right: 16px;
      }
      .content,
      .headerContent {
        flex: auto;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 32px;
          }
        }
      }
      .extra {
        flex: 0 1 auto;
        margin-left: 88px;
        min-width: 242px;
        text-align: right;
      }
      .action {
        margin-left: 56px;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: right;
        &:empty {
          display: none;
        }
      }
    }
  }
}

.table-page-search-wrapper {
  width: 100%;
  z-index: 100;

  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 24px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        height: 32px;
        min-width: 0;
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    white-space: nowrap;
  }
}
</style>
