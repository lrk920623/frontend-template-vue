<template>
  <div class="pager">
    <a-pagination
      v-model="current"
      show-quick-jumper
      :default-page-size="pageSize"
      :total="total"
      @change="onChange"></a-pagination>
  </div>
</template>

<script>
export default {
  name: 'VoPage',
  props: {
    total: {
      type: Number,
      required: true
    },

    pageSize: {
      type: Number,
      required: false,
      default: 100
    },

    pageNo: {
      type: Number,
      required: true
    }
  },

  computed: {
    current: {
      get: function() {
        return this.pageNo
      },
      set: () => {}
    }
  },

  methods: {
    onChange(pageNo) {
      this.$emit('pageNoChange', pageNo)
    }
  }
}
</script>

<style scoped>
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.ant-pagination {
  li {
    height: 30px;
    line-height: 30px;
  }
}
</style>
