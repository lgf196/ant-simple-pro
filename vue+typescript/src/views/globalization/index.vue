<template>
  <div class="com-page">
    <div>
      <a-radio-group
        v-model:value="language"
        button-style="solid"
        @change="onToggle"
      >
        <a-radio-button
          v-for="(item, index) in languages"
          :key="index"
          :value="item.value"
        >
          {{ item.title }}
        </a-radio-button>
      </a-radio-group>
      <a href="https://github.com/intlify/vue-i18n-next" target="_blank">
        <a-button type="link">了解vue-i18n-next</a-button>
      </a>
    </div>
    <a-list item-layout="vertical" size="large" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <span v-for="{ type, text } in actions" :key="type">
              <component v-bind:is="type" style="margin-right: 8px" />
              {{ text }}
            </span>
          </template>
          <template #extra>
            <img
              width="272"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="$t('description')">
            <template #title>
              <a :href="item.href">Ant Simple Pro</a>
            </template>
            <template #avatar>
              <a-avatar :size="30" style="backgroundcolor: #fff">
                <template #icon>
                  <ComSvgIcon name="logo" class="icon-logo"></ComSvgIcon>
                </template>
              </a-avatar>
            </template>
          </a-list-item-meta>
          {{ $t('content') }}
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons-vue'
type ListDataItem = {
  href: string
  avatar: string
}
const listData: ListDataItem[] = []
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'https://github.com/lgf196/ant-simple-pro',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  })
}
type GlobalizationDataType = {
  language: string
  languages: {
    title: string
    value: string
  }[]
  listData: ListDataItem[]
  actions: {
    type: string
    text: string
  }[]
}
export default defineComponent({
  name: 'Globalization',
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  },
  data(): GlobalizationDataType {
    return {
      language: 'en',
      languages: [
        { title: '英文', value: 'en' },
        { title: '中文', value: 'zh' },
        { title: '日文', value: 'ja' }
      ],
      listData,
      actions: [
        { type: 'StarOutlined', text: '156' },
        { type: 'LikeOutlined', text: '156' },
        { type: 'MessageOutlined', text: '2' }
      ]
    }
  },
  methods: {
    onToggle() {
      this.$i18n.locale = this.language
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  padding: 20px;
}
.icon-logo {
  font-size: 30px;
}
::v-deep(.ant-list-item) {
  padding: 16px 24px;
}
</style>
