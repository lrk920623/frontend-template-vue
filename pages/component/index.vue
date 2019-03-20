<template>
  <vo-page-layout :header-title="'基础组件'">
    <div slot="content">
      <h1>通知控件</h1>
      <a-button @click="showNotify">
        全局展示通知提醒信息
      </a-button>
      <a-button @click="showMessage">
        全局展示操作反馈信息
      </a-button>


      <h1>上传控件</h1>
      <a-upload
        name="file"
        :accept="'.jpg, .jpeg, .png'"
        :multiple="true"
        action="//jsonplaceholder.typicode.com/posts/"
        :before-upload="beforeUpload"
        @change="handleChange">
        <a-button>
          <a-icon type="upload"></a-icon> Click to Upload
        </a-button>
      </a-upload>

      <a-button style="margin-top: 10px;">
        <a
          href="~/static/aaa.csv"
          download="">download</a>
      </a-button>

      <h1>文字提示</h1>
      <vo-tooltip :title="'提示文字'">
        <a-button>Tooltip</a-button>
      </vo-tooltip>
      <vo-popover>
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <a-button>Popover</a-button>
      </vo-popover>

      <h1>开关</h1>
      <vo-switch
        :checked="switchState"
        @change="switchChange"></vo-switch>
      <span>{{ switchState ? '开了' : '关了' }}</span>
    </div>
  </vo-page-layout>
</template>

<script>
import VoPageLayout from 'components/layout/PageLayout'
import VoTooltip from 'components/basic/Tooltip'
import VoPopover from 'components/basic/Popover'
import VoSwitch from 'components/basic/Switch'
import { notify, inform } from 'utils/common'

import { mixin } from 'utils/constant'

export default {
  components: {
    VoPageLayout,
    VoTooltip,
    VoPopover,
    VoSwitch
  },

  mixins: [mixin],

  meta: {
    title: '基础组件'
  },

  data() {
    return {
      weight: 0,
      customer: '',
      switchState: false
    }
  },

  methods: {
    switchChange(check) {
      this.switchState = check
    },

    showNotify() {
      notify('通知', '测试')
    },

    showMessage() {
      inform('message')
    },

    beforeUpload(file) {
      console.log(file)
    },

    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style>
.content h1 {
  margin-top: 20px;
}
</style>
