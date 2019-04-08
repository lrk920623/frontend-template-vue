<template>
  <div class="page-header-main">
    <div class="page-header-view">
      <span class="page-header-view-title">{{ title }}</span>
      <span class="page-header-view-sub-title">
        <slot name="subTitle" />
      </span>
      <div class="page-header-view-action">
        <slot name="action" />
      </div>
    </div>
    <div
      class="page-header-view"
      style="padding-top: 12px;">
      <div class="page-header-view-content">
        <vo-card
          :loading="loading"
          :no-padding="true">
          <slot name="content" />
        </vo-card>
      </div>
      <div class="page-header-view-extra-content">
        <slot name="extraContent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoPageDetailHeader',

  props: {
    title: {
      type: String,
      required: true
    },

    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='less'>
.page-header-main {
  width: 100%;

  .page-header-view {
    display: flex;
    width: 100%;
    position: relative;

    .page-header-view-title {
      display: inline-block;
      padding-right: 12px;
      color: rgba(0, 0, 0, 1);
      font-size: 16px;
      line-height: 1.4;
    }

    .page-header-view-sub-title {
      display: inline-block;
      padding-right: 12px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 1.8;
    }

    .page-header-view-action {
      position: absolute;
      right: 0;
    }

    .page-header-view-content {
      flex: 1;

      .description {
        padding-bottom: 6px;
      }
    }

    .page-header-view-extra-content {
      min-width: 200px;
      text-align: right;

      .title {
        margin-bottom: 4px;
        font-size: 14px;
      }

      .value {
        font-size: 24px;
      }
    }
  }
}
</style>
