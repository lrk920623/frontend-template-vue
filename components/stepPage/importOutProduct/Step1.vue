<template>
  <div class="hs-out-product-upload">
    <div class="upload-import-box">
      <div class="upload-import-way">
        <template v-for="item in ways">
          <div
            :key="item.id"
            :class="{'selected-way': item.id === way}"
            @click="changeWay(item.id)">
            <p>{{ item.name }}<span>{{ item.desc }}</span></p>
          </div>
        </template>
      </div>

      <div class="upload-import-content">
        <transition
          name="fade-top"
          mode="out-in">
          <div
            v-if="way === 1"
            key="product">
            <div class="single-import-module">
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
            <div class="single-import-module">
              <div class="import-header">
                上传门店
              </div>
              <div class="import-file">
                <a-button type="primary">
                  下载门店模版
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
          </div>

          <div
            v-if="way === 2"
            key="productStore">
            <div
              class="single-import-module"
              style="margin-top: 60px;">
              <div class="import-header">
                上传商品门店
              </div>
              <div class="import-file">
                <a-button type="primary">
                  下载商品门店模版
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
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoImportProductUpload',

  data() {
    return {
      way: 1,
      ways: [
        { id: 1, name: '* 导入方式一', desc: '所有商品淘汰门店相同' },
        { id: 2, name: '* 导入方式二', desc: '商品淘汰不同门店' }
      ]
    }
  },

  methods: {
    changeWay(id) {
      this.way = id
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

<style lang='less'>
.hs-out-product-upload {
  .upload-import-box {
    display: flex;
    padding: 0 20px;

    .upload-import-way {
      width: 225px;

      > .selected-way {
        background-color: @background-color;
      }

      > div {
        height: 150px;
        border-right: 1px solid @border-color;

        &:hover {
          cursor: pointer;
        }

        p {
          font-size: 16px;
          padding: 45px 35px;
          color: rgba(0, 0, 0, 0.85);
          margin: 0;
          height: 100%;

          span {
            display: block;
            font-size: 13px;
            color: rgba(0, 0, 0, 0.6);
            padding-top: 6px;
            padding-left: 12px;
          }
        }
      }

      > div:first-child {
        &::after {
          content: '';
          width: 200px;
          height: 1px;
          background: @border-color;
          display: inline-block;
          position: relative;
          top: -16px;
        }
      }
    }

    .upload-import-content {
      flex: 1;
      margin-top: 20px;
    }
  }
}
</style>
