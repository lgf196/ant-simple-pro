<template>
  <div class="com-page">
    <LayoutTable
      tableTitle="查询表格"
      :loading="loading"
      :tableProps="{
        columns,
        dataSource: menuList,
        rowKey: v => v.id
      }"
      :pagination="false"
      :onRefresh="query"
    >
      <template #buttons>
        <a-button type="primary">
          <template #icon>
            <ComSvgIcon name="add"></ComSvgIcon>
          </template>
          <span>新增</span>
        </a-button>
      </template>
      <template #index="{ index }">
        <span>
          {{index + 1}}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="onUpdate(record)">编辑</a-button>
        <a-button type="link" @click="onDelete(record)">删除</a-button>
      </template>
    </LayoutTable>
  </div>
</template>

<script>
// import { toRef } from 'vue'
import { mapGetters } from 'vuex'
import LayoutTable from '@/components/layout-table'
import { getMenus } from './service'
const columns = [
  {
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    title: '序号',
    slots: { customRender: 'index' }
  },
  {
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    title: 'id'
  },
  {
    dataIndex: 'pid',
    key: 'pid',
    align: 'center',
    title: 'pid'
  },
  {
    dataIndex: 'title',
    key: 'title',
    align: 'center',
    title: '名称'
  },
  {
    dataIndex: 'url',
    key: 'url',
    align: 'center',
    title: 'url'
  },
  {
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    title: 'icon'
  },
  {
    dataIndex: 'createTime',
    key: 'createTime',
    align: 'center',
    title: '创建时间'
  },
  {
    key: 'action',
    align: 'center',
    title: '操作',
    slots: { customRender: 'action' }
  }
]
export default {
  name: 'Menu',
  components: {
    LayoutTable
  },
  data() {
    return {
      columns,
      menuList: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  created() {
    this.query()
  },
  methods: {
    async query() {
      try {
        const res = await getMenus()
        this.menuList = res.list || []
        this.total = res.total || 0
      } catch (error) {
        console.log(error)
      }
    },
    onUpdate() {
      console.log('onUpdate')
    },
    onDelete() {
      console.log('onDelete')
    }
  }
}
</script>

<style lang="less" scoped>
  // ...
</style>
