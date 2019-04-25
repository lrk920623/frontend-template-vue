<template>
  <div class="single-import-module only-product-upload">
    <div class="import-header">
      上传商品
    </div>
    <div class="import-file">
      <a-button type="primary">
        下载商品模版
      </a-button>
      <a-upload
        name="file"
        :accept="'.xls'"
        action="//jsonplaceholder.typicode.com/posts/"
        @change="handleChange">
        <a-button>
          <a-icon type="upload"></a-icon> 上传模板文件
        </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoImportProductOnly',

  data() {
    return {}
  },

  methods: {
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

<style lang='less'>
.only-product-upload {
  padding: 50px 100px 0 150px;
}
</style>
