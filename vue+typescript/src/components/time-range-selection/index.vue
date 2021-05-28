<template>
  <a-range-picker
    dropdownClassName="time-range-selection"
    :value="value"
    @change="onChange"
    :ranges="ranges"
    :style="style"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import moment from 'moment'
import { getPrevMonthDays } from '@/utils/date'

export default defineComponent({
  emits: ['update:value'],
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => []
    },
    style: {
      type: [Object, String],
      default: ''
    },
    placeholder: {
      type: Object as PropType<[string, string]>,
      default: () => ['开始日期', '结束日期']
    }
  },
  setup(props, { emit }) {
    const ranges = reactive({
      今天: [moment().startOf('day'), moment().endOf('day')],
      昨天: [
        moment(new Date().setDate(new Date().getDate() - 1)),
        moment(new Date().setDate(new Date().getDate() - 1))
      ],
      最近7天: [moment(new Date().getTime() - 3600 * 1000 * 24 * 6), moment(new Date())],
      最近30天: [moment(new Date().getTime() - 3600 * 1000 * 24 * 29), moment(new Date())],
      本月: [moment().startOf('month'), moment().endOf('month')],
      上月: [moment(getPrevMonthDays().start), moment(getPrevMonthDays().end)]
    })

    function onChange(value: any) {
      const val = value.map((v: any) => {
        if (typeof v === 'string') {
          return v
        }
        return v.format('YYYY-MM-DD')
      })
      emit('update:value', val)
    }
    return {
      ranges,
      onChange
    }
  }
})
</script>

<style lang="less">
.time-range-selection .ant-calendar-footer-extra .ant-tag {
  cursor: pointer;
}
</style>
