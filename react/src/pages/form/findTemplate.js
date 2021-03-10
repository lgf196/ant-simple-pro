import React, { memo } from 'react'
import BasicSearchCompent from '@/components/searchCompent'
import AdvancedSearchCompent from '@/components/searchCompent'
import DefaultSearchCompent from '@/components/searchCompent'
import { useSetState } from '@/hooks'
import { Divider } from 'antd';
import { langeList } from '@/assets/js/staticData'
import moment from 'moment'

const FindTemplate = memo(function FindTemplate() {

  const defaultData = moment().format('YYYY-MM')

  const [ basic,setBasic] = useSetState({});

  const [ advanced,setAdvanced] = useSetState({});

  const [ defaultValueSearch,setDefaultValueSearch] = useSetState({
    names:'lgf',
    lange:2,
    date3:defaultData
  });

  const basicSearchConfig = [
    {
      title:'姓名',
      key:'names',
      type:'input'
    },
    {
      title:'语言',
      key:'lange',
      type:'select',
      selectListValue:langeList,
      selectLableName:'label',
      selectKeyValue:'value',
    }
  ];

  const advancedSearchConfig = [
    {
      title:'选择器日期',
      key:'date',
      type:'timeRangeSelection'
    },
    {
      title:'时间',
      key:'date2',
      type:'showTimeRangePicker'
    },
    {
      title:'月份',
      key:'date3',
      type:'monthDatePicker'
    },
    {
      title:'时间(不含秒)',
      key:'date4',
      type:'dayDatePicker'
    },
    {
      title:'姓名',
      key:'names',
      type:'input'
    },
    {
      title:'语言',
      key:'lange',
      type:'select',
      selectListValue:langeList,
      selectLableName:'label',
      selectKeyValue:'value',
    }
  ];

  const defaultSearchConfig = [
    {
      title:'姓名',
      key:'names',
      type:'input',
      defaultValue:'lgf'
    },
    {
      title:'语言',
      key:'lange',
      type:'select',
      selectListValue:langeList,
      selectLableName:'label',
      selectKeyValue:'value',
      defaultValue:2
    },
    {
      title:'月份',
      key:'date3',
      type:'monthDatePicker',
      defaultValue:defaultData
    },
  ];

  console.log('basic', basic)
  console.log('advanced', advanced)
  console.log('defaultValueSearch', defaultValueSearch)

  return (
    <div className='bgW padding-10px'>
      <Divider plain>基础查询</Divider>
      <BasicSearchCompent options={basicSearchConfig} callBack={setBasic} />
      <Divider plain>高级查询</Divider>
      <AdvancedSearchCompent options={advancedSearchConfig} callBack={setAdvanced} />
      <Divider plain>默认值查询</Divider>
      <DefaultSearchCompent options={defaultSearchConfig} callBack={setDefaultValueSearch} />
      <p style={{ color: '#F56C6C' }}>只需配置即可生成模板，还有一些配置项，具体的请看源码和案例。</p>
    </div>
  )
})

export default FindTemplate
