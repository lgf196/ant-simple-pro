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
      :pagination="{
        total,
        ...params,
        onChange: onPaginationChange
      }"
      :onRefresh="query"
    >
      <template #buttons>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <ComSvgIcon
              class="anticon add-button__icon"
              name="add"
            ></ComSvgIcon>
          </template>
          <span>新增</span>
        </a-button>
      </template>
      <template #index="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #createTime="{ text }">
        <span>
          {{ $formatDateTime(text) }}
        </span>
      </template>
      <template #action="{ record }">
        <!-- <a-button type="link" @click="onUpdate(record)">编辑</a-button>
        <a-button type="link" @click="onDelete(record)">删除</a-button> -->
        <a @click="onUpdate(record)"> 编辑 </a>
        <a-divider type="vertical" />
        <a class="danger" @click="onDelete(record)"> 删除 </a>
      </template>
    </LayoutTable>
    <UpdateMenuModal
      v-model:visible="visible"
      :currentRow="currentRow"
      :menuCascaderOptions="menuTree"
      @createSuccess="onCreateSuccess"
      @updateSuccess="onUpdateSuccess"
    >
    </UpdateMenuModal>
  </div>
</template>

<script>
// import { toRef } from 'vue'
import { mapGetters } from 'vuex'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import LayoutTable from '@/components/layout-table'
import { getMenus, getMenuTree, deleteMenu } from './service'
import UpdateMenuModal from './update-menu-modal'
import useAsync from '@/hooks/useAsync'
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
    title: '创建时间',
    slots: { customRender: 'createTime' }
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
    LayoutTable,
    UpdateMenuModal
  },
  data() {
    return {
      columns,
      menuList: [],
      menuTree: [],
      total: 0,
      params: {
        page: 1,
        size: 10
      },
      visible: false,
      currentRow: {}
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  created() {
    // this.query()
    this.queryMenuTree()
  },
  setup() {
    const data = useAsync(() => {
      return getMenus({
        page: 1,
        size: 10
      })
    })
    console.log(data)
  },
  methods: {
    async query() {
      try {
        const res = await getMenus(this.params)
        this.menuList = res.list || []
        this.total = res.total || 0
      } catch (err) {
        console.log(err)
      }
    },
    async queryMenuTree() {
      try {
        const res = await getMenuTree()
        this.menuTree = res || []
      } catch (err) {
        console.log(err)
      }
    },
    onCreate() {
      this.currentRow = {}
      this.visible = true
    },
    onUpdate(row) {
      this.currentRow = row
      this.visible = true
    },
    onDelete(row) {
      console.log(row)
      const modal = this.$confirm({
        title: '温馨提示',
        content: '确定要删除吗',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          try {
            await deleteMenu(row.id, cancel => (this.cancel = cancel))
            this.query()
            this.$store.dispatch('user/GetAccessMenus')
          } catch (err) {
            console.log(err)
          }
        },
        onCancel: () => {
          // modal.destroy()
          this.cancel && this.cancel()
          console.log('onCancel', modal)
        }
      })
    },
    onPaginationChange(page, size) {
      this.params.page = page
      this.params.size = size
      this.query()
    },
    onCreateSuccess() {
      this.params.page = 1
      this.query()
      this.$store.dispatch('user/GetAccessMenus')
    },
    onUpdateSuccess() {
      this.query()
      this.$store.dispatch('user/GetAccessMenus')
    }
  }
}
</script>

<style lang="less" scoped>
.danger {
  color: rgb(255, 77, 79);
}
.add-button__icon {
  font-size: 18px;
}
</style>
