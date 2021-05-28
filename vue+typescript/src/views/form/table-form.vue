<template>
  <div class="com-page p20">
    <a-form ref="formRef" class="form" :model="form" label-align="left">
      <a-row :gutter="[15, 15]" type="flex" class="flex-wrap pb10">
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <a-form-item label="日期" name="date">
            <TimeRangeSelection v-model:value="form.date" style="width: 100%"></TimeRangeSelection>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <a-form-item label="语言" name="lang">
            <a-select v-model:value="form.lang" show-search option-filter-prop="children" filter-option>
              <a-select-option v-for="item in langeListOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <a-form-item label="介绍" name="platform">
            <a-input v-model:value="form.platform" placeholder="请填写"></a-input>
          </a-form-item>
        </a-col>
        <a-col style="flex: 0 0 160px; width: 160px">
          <a-form-item label="年龄" name="age">
            <a-input-number v-model:value="form.age"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <a-form-item>
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      <a-table :columns="columns" :data-source="form.dataSource" rowKey="productId">
        <template #index="{ index }">
          <span>
            {{ index + 1 }}
          </span>
        </template>
        <template #productNumber="{ index }">
          <a-form-item
            label="数量"
            :name="['dataSource', index, 'productNumber']"
            :rules="[{ required: true, message: '请填写' }]"
          >
            <a-input-number v-model:value="form.dataSource[index].productNumber" :min="0"></a-input-number>
          </a-form-item>
        </template>
        <template #firstJourneyExpenses="{ index }">
          <a-form-item
            label="购买量"
            :name="['dataSource', index, 'firstJourneyExpenses']"
            :rules="[{ required: true, message: '请填写' }]"
          >
            <a-input-number v-model:value="form.dataSource[index].firstJourneyExpenses" :min="0"></a-input-number>
          </a-form-item>
        </template>
        <template #pictureurls="{ text }">
          <ComImage v-if="text" className="avatar" :src="text" @click="onImageClick(text)" fit="cover">
            <template v-slot:error><UserOutlined /></template>
          </ComImage>
        </template>
      </a-table>
    </a-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, unref } from 'vue'
import { UserOutlined } from '@ant-design/icons-vue'
import type { Form } from 'ant-design-vue/types/form/form'
import TimeRangeSelection from '@/components/time-range-selection/index.vue'
import { enumLangList } from '@/utils/enum'
import imagePreview from '@/components/image/image-preview'

const columnsData = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '序号',
    align: 'center',
    slots: { customRender: 'index' },
    width: 200
  },
  {
    key: 'pictureurls',
    dataIndex: 'pictureurls',
    title: '图片',
    align: 'center',
    slots: { customRender: 'pictureurls' }
  },
  {
    key: 'productNumber',
    dataIndex: 'productNumber',
    title: '数量',
    align: 'center',
    slots: { customRender: 'productNumber' }
  },
  {
    key: 'firstJourneyExpenses',
    dataIndex: 'firstJourneyExpenses',
    title: '购买量',
    align: 'center',
    slots: { customRender: 'firstJourneyExpenses' }
  },
  {
    key: 'remarks',
    dataIndex: 'remarks',
    title: '备注',
    align: 'center'
  }
]

export default defineComponent({
  components: {
    UserOutlined,
    TimeRangeSelection
  },
  setup() {
    const formRef = ref<Form>()
    const form = reactive({
      date: [],
      lang: null,
      platform: '',
      age: '',
      dataSource: [
        {
          productId: 'odde43-de',
          pictureurls: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1616494356149.png',
          productNumber: 0,
          firstJourneyExpenses: 0,
          remarks: '今天天气真好'
        },
        {
          productId: 'odde41-de',
          pictureurls: 'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1616494473689.jpg',
          productNumber: 0,
          firstJourneyExpenses: 0,
          remarks: '你真的好漂亮呀'
        }
      ]
    })

    const columns = reactive(columnsData)

    const langeListOptions = reactive(enumLangList)

    const urlList = computed(() => {
      return form.dataSource.map(v => v.pictureurls)
    })

    function onSubmit() {
      formRef.value
        ?.validateFields()
        .then(() => {
          alert(JSON.stringify(form, null, 2))
        })
        .catch(console.log)
    }

    function onImageClick(url: string) {
      const urls = unref(urlList)
      imagePreview({
        urlList: urls,
        initialIndex: urls.findIndex(v => v === url)
      })
    }

    return {
      formRef,
      form,
      columns,
      langeListOptions,
      onSubmit,
      onImageClick
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  ::v-deep .ant-form-item {
    display: flex;
    margin-bottom: 0;
  }
  ::v-deep .ant-form-item-control-wrapper {
    flex: 1;
  }
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
