<template>
  <div class="out-process-history content">
    <vo-card>
      <vo-process-step></vo-process-step>
    </vo-card>
    <vo-card>
      <vo-process-time-line :list="list"></vo-process-time-line>
    </vo-card>
  </div>
</template>

<script>
import VoProcessStep from 'components/business/ProcessStep'
import VoProcessTimeLine from 'components/business/ProcessTimeLine'
import { urls } from 'utils/api'

export default {
  name: 'VoOutOrderProcessHistory',

  components: {
    VoProcessStep,
    VoProcessTimeLine
  },

  props: {
    orderId: {
      type: [Number, String],
      required: true
    }
  },

  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.getProcessTimeLine()
  },

  methods: {
    async getProcessTimeLine() {
      const { data } = await this.$axios.post(
        urls.getOutOrderProcessPathTimeline,
        {
          orderId: this.orderId
        }
      )

      this.list = data.list
    }
  }
}
</script>

<style lang='less'>
.out-process-history {
  margin-top: 0 !important;
  background: @basic-background-gray-color !important;

  .ant-card {
    margin: 0 24px 24px 24px;

    .process-timeline {
      padding-top: 24px;
    }
  }

  .ant-divider {
    margin: 35px 0;
  }
}
</style>
