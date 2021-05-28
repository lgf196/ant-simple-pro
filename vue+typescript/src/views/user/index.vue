<template>
  <div class="com-page">
    <LayoutTable
      tableTitle="查询表格"
      :loading="loading"
      :tableProps="{
        columns,
        dataSource: userList,
        rowKey: v => v.id
      }"
      :pagination="{
        hideOnSinglePage: true
      }"
      :onRefresh="query"
    >
      <template #search>
        <a-form ref="form" layout="inline" :model="{}">
          <a-form-item label="名称">
            <a-input v-model:value="username" placeholder="请输入" allowClear></a-input>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" @click="query">查询</a-button>
              <a-button @click="onReset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </template>
      <template #buttons>
        <a-input-search
          v-model:value="username"
          placeholder="请输入用户名"
          enter-button
          allowClear
          @search="onSearch"
        />
      </template>
      <template #extraIcons>
        <a-tooltip title="下载" placement="bottom">
          <ArrowDownOutlined @click="onDownload" />
        </a-tooltip>
      </template>
      <template #index="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #avatar="{ text }">
        <ComImage className="avatar" :src="text" @click="onImageClick(text)" fit="cover">
          <template v-slot:error><UserOutlined /></template>
        </ComImage>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="onUpdate(record)">编辑</a>
        </span>
      </template>
    </LayoutTable>
    <UpdateUserModal
      v-model:visible="visible"
      :currentRow="currentRow"
      @update-success="onUpdateSuccess"
    ></UpdateUserModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed, unref } from 'vue'
import userStore from '@/store/modules/user'
import LayoutTable from '@/components/layout-table'
import { ArrowDownOutlined, UserOutlined } from '@ant-design/icons-vue'
import { getUsers, getUsersBuffer } from './service'
import { useAsync } from '@/hooks'
import { downloadExcel } from '@/utils'
import UpdateUserModal from './update-user-modal.vue'
import imagePreview from '@/components/image/image-preview'
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
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    title: 'email'
  },
  {
    dataIndex: 'username',
    key: 'username',
    align: 'center',
    title: '名称'
  },
  {
    dataIndex: 'introduct',
    key: 'introduct',
    align: 'center',
    title: '介绍'
  },
  {
    dataIndex: 'iconUrl',
    key: 'iconUrl',
    align: 'center',
    title: '头像',
    slots: { customRender: 'avatar' }
  },
  {
    key: 'action',
    align: 'center',
    title: '操作',
    slots: { customRender: 'action' }
  }
]

export default defineComponent({
  name: 'User',
  components: {
    LayoutTable,
    ArrowDownOutlined,
    UserOutlined,
    UpdateUserModal
  },
  setup() {
    const username = ref('')
    const state = reactive({
      columns,
      visible: false,
      currentRow: {}
    })

    const { data: userList, loading, run: query } = useAsync(
      () => {
        return getUsers({
          username: username.value
        })
      },
      {
        initialData: []
      }
    )

    const urlList = computed(() => {
      return userList.value.map(v => v.iconUrl)
    })

    function onUpdate(row: Record<string, unknown>) {
      state.currentRow = row
      state.visible = true
    }

    function onSearch() {
      setTimeout(() => {
        query()
      }, 20)
    }

    function onReset() {
      username.value = ''
      query()
    }

    function onImageClick(url: string) {
      const urls = unref(urlList)
      imagePreview({
        urlList: urls,
        initialIndex: urls.findIndex(v => v === url)
      })
    }

    function onUpdateSuccess() {
      query()
      userStore.getUserInfo()
    }

    async function onDownload() {
      try {
        const data = await getUsersBuffer()
        downloadExcel(data, '用户信息.xlsx')
      } catch (err) {
        console.log(err)
      }
    }

    return {
      userList,
      loading,
      ...toRefs(state),
      username,
      urlList,
      onDownload,
      query,
      onUpdate,
      onSearch,
      onReset,
      onImageClick,
      onUpdateSuccess
    }
  }
})
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
