<template>
  <div class="home-container">
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :data-source="dataSource">
      <a-list-item
        slot="renderItem"
        slot-scope="item">
        <a-card :hoverable="true">
          <a-card-meta>
            <div
              slot="title"
              style="margin-bottom: 3px">
              {{ item.title }}
            </div>
            <a-avatar
              slot="avatar"
              class="card-avatar"
              :src="item.avatar"
              size="large"></a-avatar>
            <div
              slot="description"
              class="meta-content">
              {{ item.content }}
            </div>
          </a-card-meta>
          <template
            slot="actions"
            class="ant-card-actions">
            <a>操作一</a>
            <a>操作二</a>
          </template>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
const dataSource = []
for (let i = 0; i < 5; i++) {
  dataSource.push({
    title: 'Alipay',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    content:
      '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。'
  })
}
export default {
  mixins: [window.layoutMixin],

  data() {
    return {
      inputTodo: '',
      dataSource
    }
  }
}
</script>

<style scoped lang="less">
div {
  font-size: 14px;
}

.handle-box {
  margin-bottom: 10px;

  & .add-todo {
    width: 200px;
  }
}
</style>
