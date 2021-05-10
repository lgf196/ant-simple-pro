<template>
  <div class="com-page">
    <LayoutTable
      tableTitle="查询表格"
      :loading="loading"
      :tableProps="{
        columns,
        dataSource: userList,
        rowKey: v => v.id,
        rowSelection: { selectedRowKeys, onChange: onSelectChange }
      }"
      :pagination="{
        hideOnSinglePage: true
      }"
      :onRefresh="query"
    >
      <template #buttons>
        <a-radio-group v-model:value="type">
          <a-radio v-for="(item, index) in typeList" :key="index" :value="item">
            {{ item }}
          </a-radio>
        </a-radio-group>
        <a-button type="primary" @click="onExport">导出{{ type }}</a-button>
      </template>
      <template #index="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
      <template #avatar="{ text }">
        <ComImage
          className="avatar"
          :src="text"
          @click="onImageClick(text)"
          fit="cover"
        >
          <template v-slot:error><UserOutlined /></template>
        </ComImage>
      </template>
    </LayoutTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed, unref } from 'vue'
import LayoutTable from '@/components/layout-table'
import { UserOutlined } from '@ant-design/icons-vue'
import { getUsers } from '@/views/user/service'
import { useAsync } from '@/hooks'
import imagePreview from '@/components/image/image-preview'
import { exportJsonToExcel } from '@/utils/excel'
import { UserListItem } from '@/views/user/types'
import { isDefined } from '@/utils/type'
import { excelHeader, excelKeyList, normalizeExcelData } from '../types'
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
  }
]

function getSelectedRows(keys: number[], list: UserListItem[]) {
  return keys.map(key => list.find(item => item.id === key)).filter(isDefined)
}

type FileType = 'xlsx' | 'csv' | 'txt'

type StateType = {
  columns: typeof columns
  typeList: FileType[]
  selectedRowKeys: number[]
}

export default defineComponent({
  name: 'SelectExportExcel',
  components: {
    LayoutTable,
    UserOutlined
  },
  setup() {
    const username = ref('')
    const type = ref('xlsx')
    const state = reactive<StateType>({
      columns,
      typeList: ['xlsx', 'csv', 'txt'],
      selectedRowKeys: []
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

    function onExport() {
      exportJsonToExcel({
        data: normalizeExcelData(
          getSelectedRows(state.selectedRowKeys, unref(userList)),
          excelKeyList
        ),
        header: excelHeader,
        filename: 'user',
        autoWidth: false,
        bookType: unref(type) as FileType
      })
    }

    function onSelectChange(selectedRowKeys: number[]) {
      state.selectedRowKeys = selectedRowKeys
    }

    return {
      userList,
      loading,
      ...toRefs(state),
      username,
      urlList,
      query,
      onReset,
      onImageClick,
      type,
      onExport,
      onSelectChange
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
