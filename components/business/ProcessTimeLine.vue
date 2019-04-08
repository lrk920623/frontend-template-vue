<template>
  <a-timeline class="process-timeline">
    <a-timeline-item
      v-for="(item, index) in list"
      :key="index"
      :color="index === 0 ? 'red' : 'blue'">
      <span class="date">{{ item.date }}</span>
      <span class="user">{{ item.user }}</span>
      <span class="state">{{ item.state }}</span>
      <span class="detail"><nuxt-link :to="{name: 'outManage-apply'}">查看详情</nuxt-link></span>
    </a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  name: 'VoProcessTimeLine',

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {}
}
</script>

<style lang="less">
.process-timeline {
  .ant-timeline-item-content {
    span {
      display: inline-block;
    }

    .date {
      width: 20%;
    }

    .user {
      width: 15%;
    }

    .state {
      width: 15%;
    }

    .detail {
      width: 15%;
    }
  }
}
</style>
