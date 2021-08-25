<template>
  <div class="com-page">
    <LayoutTable
      table-title="查询表格"
      :loading="loading"
      :table-props="{
        columns,
        dataSource: menuData.list,
        rowKey: v => v.id
      }"
      :pagination="{
        total: menuData.total,
        current: params.page,
        pageSize: params.size,
        onChange: onPaginationChange
      }"
      :on-refresh="query"
    >
      <template #buttons>
        <a-button type="primary" @click="onCreate">
          <template #icon>
            <ComSvgIcon class="anticon add-button__icon" name="add"></ComSvgIcon>
          </template>
          <span>新增</span>
        </a-button>
      </template>
      <template #index="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #icon="{ text }">
        <span>
          {{ text || '/' }}
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
        <a @click="onUpdate(record)">编辑</a>
        <a-divider type="vertical" />
        <a class="danger" @click="onDelete(record)">删除</a>
      </template>
    </LayoutTable>
    <UpdateMenuModal
      v-model:visible="visible"
      :current-row="currentRow"
      :menu-cascader-options="menuTree"
      @create-success="onCreateSuccess"
      @update-success="onUpdateSuccess"
    ></UpdateMenuModal>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  // ref,
  createVNode,
  computed
} from 'vue'
import { Modal, message } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import store from '@/store'
import LayoutTable from '@/components/layout-table'
import { getMenus, getMenuTree, deleteMenu } from './service'
import { useAsync } from '@/hooks'
import UpdateMenuModal from './update-menu-modal.vue'

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
    title: 'icon',
    slots: { customRender: 'icon' }
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
export default defineComponent({
  name: 'MenuPage',
  components: {
    LayoutTable,
    UpdateMenuModal
  },
  setup() {
    const state = reactive({
      columns,
      params: {
        page: 1,
        size: 10
      },
      visible: false,
      currentRow: {}
    })

    let cancel = null

    const {
      data: menuData,
      loading,
      run: query
    } = useAsync(
      () => {
        return getMenus(state.params)
      },
      {
        initialData: {
          list: [],
          total: 0
        }
      }
    )

    const list = computed(() => menuData.value.list)

    const { data: menuTree } = useAsync(
      () => {
        return getMenuTree()
      },
      {
        initialData: []
      }
    )

    function onSearch() {
      setTimeout(() => {
        query()
      }, 20)
    }

    function onCreate() {
      state.currentRow = {}
      state.visible = true
    }

    function onUpdate(row) {
      state.currentRow = row
      state.visible = true
    }

    function onDelete(row) {
      const modal = Modal.confirm({
        title: '温馨提示',
        content: '确定要删除吗',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => {
          try {
            await deleteMenu(row.id, c => (cancel = c))
            message.destroy()
            message.success('删除成功')
            query()
            store.dispatch('user/getAccessMenus')
          } catch (err) {
            console.log(err)
          }
        },
        onCancel: () => {
          cancel && cancel()
          console.log('onCancel', modal)
        }
      })
    }

    function onPaginationChange(page, size) {
      state.params.page = page
      state.params.size = size
      query()
    }

    function onCreateSuccess() {
      state.params.page = 1
      query()
      store.dispatch('user/getAccessMenus')
    }

    function onUpdateSuccess() {
      query()
      store.dispatch('user/getAccessMenus')
    }

    return {
      ...toRefs(state),
      list,
      menuData,
      menuTree,
      loading,
      query,
      onSearch,
      onCreate,
      onUpdate,
      onDelete,
      onPaginationChange,
      onCreateSuccess,
      onUpdateSuccess
    }
  }
})
</script>

<style lang="less" scoped>
.danger {
  color: rgb(255, 77, 79);
}

.add-button__icon {
  font-size: 18px;
}
</style>
