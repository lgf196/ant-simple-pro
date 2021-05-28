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
      <template #buttons>
        <a-button type="primary" @click="onExport">
          <template #icon>
            <FileZipOutlined />
          </template>
          下载zip
        </a-button>
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
    </LayoutTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, computed, unref } from 'vue'
import LayoutTable from '@/components/layout-table'
import { UserOutlined, FileZipOutlined } from '@ant-design/icons-vue'
import { getUsers } from '@/views/user/service'
import { useAsync } from '@/hooks'
import imagePreview from '@/components/image/image-preview'
import { exportTxtToZip } from '@/utils/zip'
import { excelHeader, excelKeyList, normalizeExcelData } from '@/views/excel/types'
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

export default defineComponent({
  name: 'Zip',
  components: {
    LayoutTable,
    UserOutlined,
    FileZipOutlined
  },
  setup() {
    const username = ref('')
    const type = ref('xlsx')
    const state = reactive({
      columns,
      visible: false,
      currentRow: {},
      typeList: ['xlsx', 'csv', 'txt']
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
      exportTxtToZip(excelHeader, normalizeExcelData(unref(userList), excelKeyList), 'user', 'user')
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
      onExport
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
