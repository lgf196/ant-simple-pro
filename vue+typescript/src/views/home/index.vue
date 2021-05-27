<template>
  <div class="com-page">
    <a-row type="flex" :gutter="[10, 10]">
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <a-card hoverable>
          <template #cover>
            <ComSvgIcon name="pic" class="cover"></ComSvgIcon>
          </template>
          <a-card-meta title="Ant-Simple-Pro">
            <template #avatar>
              <ComSvgIcon name="logo" class="avatar"></ComSvgIcon>
            </template>
            <template #description>
              <span>
                简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks
              </span>
            </template>
          </a-card-meta>
          <ul>
            <li v-for="(item, index) in chartData" :key="index">
              <div>{{ item.name }}</div>
              <a-progress :percent="item.value" status="active"></a-progress>
            </li>
          </ul>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <Pie :list="chartData"></Pie>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <Bar :list="chartData"></Bar>
      </a-col>
    </a-row>
    <a-list
      class="list"
      :grid="{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4
      }"
      :dataSource="list"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card hoverable>
            <template #cover>
              <!-- <ComSvgIcon name="pic" class="cover"></ComSvgIcon> -->
              <img src="@/assets/images/login@2x.png" width="100%" />
            </template>
            <a-card-meta :title="item.title">
              <template #avatar>
                <a-avatar :src="item.img" shape="square"></a-avatar>
              </template>
              <template #description>
                <span>{{ item.des }}</span>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Pie from './components/pie.vue'
import Bar from './components/bar.vue'
const chartOriData = [
  {
    name: 'ts',
    value: 40
  },
  {
    name: 'react',
    value: 20
  },
  {
    name: 'vue3.0',
    value: 20
  },
  {
    name: 'angular',
    value: 10
  },
  {
    name: 'css',
    value: 10
  }
]
const oriList = [
  {
    title: 'vue',
    img:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606222411854&di=f097ace643e702e80a45436d3b9b3c1f&imgtype=0&src=http%3A%2F%2Fimg.php.cn%2Fupload%2Farticle%2F000%2F000%2F013%2F58452323389fc205.png',
    des: '一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。'
  },
  {
    title: 'react',
    img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2562962807,8352544&fm=26&gp=0.jpg',
    des:
      '用于构建用户界面的 JavaScript 库,React 使创建交互式 UI 变得轻而易举，强大的生态支持，hooks使代码更加减少和实用'
  },
  {
    title: 'angular',
    img:
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606223295087&di=1bd6c1d9c87c24458edc77f051eb00ba&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180226%2F28d9ed8bd555408cbe1fd4a446c4b671.jpeg',
    des: 'Angular构建应用，把这些代码和能力复用在多种多种不同平台的应用上，Web、移动 Web、移动应用等'
  },
  {
    title: 'webpack',
    img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1768538313,3737670186&fm=26&gp=0.jpg',
    des: 'webpack找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（TypeScript等），将其转换和打包'
  }
]
export default defineComponent({
  components: {
    Pie,
    Bar
  },
  setup() {
    const chartData = reactive(chartOriData)
    const list = reactive(oriList)
    return {
      chartData,
      list
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  background-color: transparent;
  ::v-deep(.ant-col) {
    > .ant-card > .ant-card-cover {
      text-align: center;
      > .svg-icon {
        display: inline-block;
      }
    }
  }
}
.cover {
  font-size: 250px;
}
.avatar {
  font-size: 30px;
}
.list {
  margin-top: 8px;
}
</style>
