<template>
  <div class="com-page p20">
    <a-divider>基础查询</a-divider>
    <QueryTemplate
      name="basic"
      :options="basicConfig"
      @submit="onBasicSubmit"
      @reset="onBasicReset"
    ></QueryTemplate>
    <a-divider>高级查询</a-divider>
    <QueryTemplate
      name="advanced"
      :options="advancedConfig"
      @submit="onAdvancedSubmit"
      @reset="onAdvancedReset"
    ></QueryTemplate>
    <a-divider>默认值查询</a-divider>
    <QueryTemplate
      name="default"
      :options="defaultConfig"
      @submit="onDefaultSubmit"
      @reset="onDefaultReset"
    ></QueryTemplate>
    <p class="text-color-danger">
      只需配置即可生成模板，还有一些配置项，具体的请看源码和案例。
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import moment from 'moment'
import QueryTemplate, { OptionsType } from '@/components/search-template'
import { SelectListItemType } from '@/types/common'
import { enumLangList } from '@/utils/enum'

function useBasicSearch() {
  const basicConfig = reactive<OptionsType<SelectListItemType>[]>([
    {
      title: '姓名',
      fieldName: 'names',
      type: 'input'
    },
    {
      title: '语言',
      fieldName: 'lang',
      type: 'select',
      optionList: enumLangList,
      labelName: 'label',
      valueName: 'value'
    }
  ])

  function onBasicSubmit(values: any) {
    console.log('onBasicSubmit', values)
  }

  function onBasicReset(values: any) {
    console.log('onBasicReset', values)
  }
  return {
    basicConfig,
    onBasicSubmit,
    onBasicReset
  }
}

function useAdvancedSearch() {
  const advancedConfig = reactive<OptionsType<SelectListItemType>[]>([
    {
      title: '选择器日期',
      fieldName: 'date',
      type: 'timeRangeSelection',
      defaultValue: []
    },
    {
      title: '时间',
      fieldName: 'date2',
      type: 'showTimeRangePicker',
      defaultValue: []
    },
    {
      title: '月份',
      fieldName: 'date3',
      type: 'monthDatePicker'
    },
    {
      title: '时间(不含秒)',
      fieldName: 'date4',
      type: 'dayDatePicker'
    },
    {
      title: '姓名',
      fieldName: 'names',
      type: 'input'
    },
    {
      title: '语言',
      fieldName: 'lange',
      type: 'select',
      optionList: enumLangList,
      labelName: 'label',
      valueName: 'value'
    }
  ])

  function onAdvancedSubmit(values: any) {
    console.log('onAdvancedSubmit', values)
  }

  function onAdvancedReset(values: any) {
    console.log('onAdvancedReset', values)
  }
  return {
    advancedConfig,
    onAdvancedSubmit,
    onAdvancedReset
  }
}

function useDefaultSearch() {
  const defaultConfig = reactive<OptionsType<SelectListItemType>[]>([
    {
      title: '姓名',
      fieldName: 'names',
      type: 'input',
      defaultValue: 'lgf'
    },
    {
      title: '语言',
      fieldName: 'lange',
      type: 'select',
      optionList: enumLangList,
      labelName: 'label',
      valueName: 'value',
      defaultValue: 2
    },
    {
      title: '月份',
      fieldName: 'date3',
      type: 'monthDatePicker',
      defaultValue: moment().format('YYYY-MM')
    }
  ])

  function onDefaultSubmit(values: any) {
    console.log('onDefaultSubmit', values)
  }

  function onDefaultReset(values: any) {
    console.log('onDefaultReset', values)
  }
  return {
    defaultConfig,
    onDefaultSubmit,
    onDefaultReset
  }
}

export default defineComponent({
  components: {
    QueryTemplate
  },
  setup() {
    const basic = useBasicSearch()
    const advanced = useAdvancedSearch()
    const defaultData = useDefaultSearch()

    return {
      basicConfig: basic.basicConfig,
      onBasicSubmit: basic.onBasicSubmit,
      onBasicReset: basic.onBasicReset,
      advancedConfig: advanced.advancedConfig,
      onAdvancedSubmit: advanced.onAdvancedSubmit,
      onAdvancedReset: advanced.onAdvancedReset,
      defaultConfig: defaultData.defaultConfig,
      onDefaultSubmit: defaultData.onDefaultSubmit,
      onDefaultReset: defaultData.onDefaultReset
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
