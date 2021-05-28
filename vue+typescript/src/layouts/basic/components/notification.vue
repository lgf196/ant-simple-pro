<template>
  <a-dropdown :trigger="['click']" v-model:visible="visible">
    <a-badge :count="unreadCount">
      <BellOutlined class="icon-bell" />
    </a-badge>
    <template #overlay>
      <div class="notification-overlay">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" :tab="`通知(${noticeUnreadCount})`">
            <a-list itemLayout="horizontal" :dataSource="tab1Data">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta description="简单上手快，ui设计漂亮">
                    <template #avatar>
                      <a-avatar :size="30" style="backgroundcolor: #fff">
                        <template #icon>
                          <ComSvgIcon name="logo" class="icon-logo"></ComSvgIcon>
                        </template>
                      </a-avatar>
                    </template>
                    <template #title>
                      <span>{{ item.title }}</span>
                    </template>
                  </a-list-item-meta>
                  <a-button type="primary" size="small" ghost :disabled="item.isRead" @click="onRead(item)">
                    未读
                  </a-button>
                </a-list-item>
              </template>
            </a-list>
          </a-tab-pane>
          <a-tab-pane key="2" :tab="`消息(${newsUnreadCount})`">
            <a-list itemLayout="horizontal" :dataSource="tab2Data">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-list-item-meta description="简单上手快，ui设计漂亮">
                    <template #avatar>
                      <a-avatar :size="30" style="backgroundcolor: #fff">
                        <template #icon>
                          <ComSvgIcon name="logo" class="icon-logo"></ComSvgIcon>
                        </template>
                      </a-avatar>
                    </template>
                    <template #title>
                      <span>{{ item.title }}</span>
                    </template>
                  </a-list-item-meta>
                  <a-button type="primary" size="small" ghost :disabled="item.isRead" @click="onRead(item)">
                    未读
                  </a-button>
                </a-list-item>
              </template>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BellOutlined } from '@ant-design/icons-vue'
type TabDataItem = {
  title: string
  index: number
  isRead: boolean
}
const tab1Data: TabDataItem[] = [
  {
    title: 'Ant Simple Pro 1',
    index: 0,
    isRead: false
  },
  {
    title: 'Ant Simple Pro 2',
    index: 1,
    isRead: false
  },
  {
    title: 'Ant Simple Pro 3',
    index: 2,
    isRead: false
  }
]
const tab2Data: TabDataItem[] = [
  {
    title: 'Ant Simple Pro 4',
    index: 0,
    isRead: false
  },
  {
    title: 'Ant Simple Pro 5',
    index: 1,
    isRead: false
  }
]
type DataType = {
  tab1Data: TabDataItem[]
  tab2Data: TabDataItem[]
  visible: boolean
  activeKey: string
}
export default defineComponent({
  components: {
    BellOutlined
  },
  data() {
    return {
      tab1Data,
      tab2Data,
      visible: false,
      activeKey: '1'
    }
  },
  computed: {
    unreadCount(): number {
      return this.noticeUnreadCount + this.newsUnreadCount
    },
    noticeUnreadCount(): number {
      return this.tab1Data.filter(v => !v.isRead).length
    },
    newsUnreadCount(): number {
      return this.tab2Data.filter(v => !v.isRead).length
    }
  },
  methods: {
    onRead(row: TabDataItem) {
      if (this.activeKey === '1') {
        this.tab1Data = this.tab1Data.map(item => {
          if (item.index === row.index) {
            return {
              ...item,
              isRead: true
            }
          }
          return item
        })
      } else {
        this.tab2Data = this.tab2Data.map(item => {
          if (item.index === row.index) {
            return {
              ...item,
              isRead: true
            }
          }
          return item
        })
      }
    }
  }
})
</script>

<style lang="less" scoped>
.notification-overlay {
  width: 300px;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}
</style>
