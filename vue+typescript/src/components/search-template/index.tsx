import { defineComponent, PropType, onMounted, reactive, ref, toRaw } from 'vue'
import type { Form } from 'ant-design-vue/types/form/form'
import moment from 'moment'
import TimeRangeSelection from '../time-range-selection/index.vue'
import './index.less'

export interface OptionsType<T = any> {
  title: string
  fieldName: string
  type: string
  optionList?: T[]
  labelName?: string
  valueName?: string
  childrenName?: string
  defaultValue?: any
  onChange?: any
  placeholder?: string | [string, string]
}

export interface SearchCompentType<T> {
  options: OptionsType<T>[]
}

const QueryTemplate = defineComponent({
  emits: ['submit', 'reset'],
  props: {
    options: {
      type: Array as PropType<OptionsType[]>,
      default: () => [
        {
          title: '日期',
          fieldName: 'date',
          type: 'timeRangeSelection',
          optionList: [],
          labelName: '',
          valueName: '',
          childrenName: ''
        }
      ]
    },
    name: {
      type: String
    }
  },
  setup(props, { emit }) {
    const formRef = ref<Form>()
    // default form fields
    const defaultForm: Record<string, any> = {}
    const form = reactive<Record<string, any>>(defaultForm)

    onMounted(() => {
      for (let i = 0; i < props.options.length; i++) {
        const item = props.options[i] // eslint-disable-line
        defaultForm[item.fieldName] = typeof item.defaultValue !== 'undefined' ? item.defaultValue : ''
      }

      const filteredOptions = props.options.filter(item => item.defaultValue) || []
      if (filteredOptions.length) {
        filteredOptions.forEach(item => {
          if (item.type === 'monthDatePicker') {
            Object.assign(form, {
              [item.fieldName]: moment(item.defaultValue, 'YYYY-MM')
            })
          }
          // else {
          //   Object.assign(form, {
          //     [item.fieldName]: moment(item.defaultValue)
          //   })
          // }
        })
      }
    })

    function onFinish(value: any) {
      const formData = Object.assign({}, value)
      try {
        props.options.forEach(item => {
          const rangeValue = value[item.fieldName]
          switch (item.type) {
            case 'showTimeRangePicker': {
              formData[item.fieldName] =
                rangeValue && rangeValue.length
                  ? rangeValue.map((item: moment.Moment | string) => {
                      if (typeof item === 'string') {
                        return item
                      }
                      return item.format('YYYY-MM-DD HH:mm:ss')
                    })
                  : []
              break
            }

            case 'timeRangeSelection': {
              formData[item.fieldName] =
                rangeValue &&
                rangeValue.length &&
                rangeValue.map((item: moment.Moment | string) => {
                  if (typeof item === 'string') {
                    return item
                  }
                  return item.format('YYYY-MM-DD')
                })
              break
            }

            case 'monthDatePicker': {
              formData[item.fieldName] = rangeValue && moment(rangeValue).format('YYYY-MM')
              break
            }

            case 'dayDatePicker': {
              formData[item.fieldName] = rangeValue && rangeValue.format && rangeValue.format('YYYY-MM-DD')
              break
            }

            default: {
              // ...
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
      emit('submit', formData)
    }

    function onReset() {
      formRef.value?.resetFields()
      emit('reset', toRaw(form))
    }

    function disabledDate(current: any): boolean {
      return current && current > moment().endOf('day')
    }

    function getTemplateByType(type: string, opts: Required<OptionsType>) {
      const templateObj = {
        input: <a-input v-model={[form[opts.fieldName], 'value']} placeholder={opts.placeholder || '请填写'}></a-input>,
        select: (
          <a-select
            v-model={[form[opts.fieldName], 'value']}
            placeholder={opts.placeholder || '请填写'}
            onChange={opts.onChange}
          >
            {opts.optionList?.map((item, index) => (
              <a-select-option key={index} value={item[opts.valueName]}>
                {item[opts.labelName]}
              </a-select-option>
            ))}
          </a-select>
        ),
        cascader: (
          <a-cascader
            v-model={[form[opts.fieldName], 'value']}
            options={opts.optionList}
            placeholder={opts.placeholder || '请填写'}
            fieldNames={{
              label: opts.labelName,
              value: opts.valueName,
              children: opts.childrenName
            }}
            changeOnSelect
          ></a-cascader>
        ),
        timeRangeSelection: (
          <TimeRangeSelection
            v-model={[form[opts.fieldName], 'value']}
            placeholder={opts.placeholder as [string, string]}
          ></TimeRangeSelection>
        ),
        showTimeRangePicker: (
          <a-range-picker
            v-model={[form[opts.fieldName], 'value']}
            onChange={opts.onChange}
            placeholder={opts.placeholder}
            showTime
          ></a-range-picker>
        ),
        monthDatePicker: (
          <a-month-picker
            v-model={[form[opts.fieldName], 'value']}
            onChange={opts.onChange}
            placeholder={opts.placeholder || '请填写'}
            disabledDate={disabledDate}
          ></a-month-picker>
        ),
        dayDatePicker: (
          <a-date-picker
            v-model={[form[opts.fieldName], 'value']}
            mode="date"
            onChange={opts.onChange}
            placeholder={opts.placeholder || '请填写'}
            disabledDate={disabledDate}
          ></a-date-picker>
        )
      }
      type Key = keyof typeof templateObj
      const template = templateObj[type as Key]
      if (template) {
        return template
      }
      return (
        <a-input
          v-model={[form[opts.fieldName], 'value']}
          onChange={opts.onChange}
          placeholder={opts.placeholder || '请填写'}
        ></a-input>
      )
    }

    return () => {
      return (
        <a-form ref={formRef} model={form} onFinish={onFinish} class="search-template" name={props.name}>
          <a-row gutter={[15, 15]}>
            {props.options.map((item, index) => (
              <a-col xs={24} sm={12} md={12} lg={8} xl={props.options.length > 3 ? 6 : 8} key={index}>
                <a-form-item
                  label={item.title}
                  name={item.fieldName}
                  data-label={item.title}
                  data-name={item.fieldName}
                >
                  {getTemplateByType(item.type, item as Required<OptionsType>)}
                </a-form-item>
              </a-col>
            ))}
            <a-col xs={24} sm={12} md={12} lg={8} xl={props.options.length > 3 ? 6 : 8}>
              <a-form-item>
                <a-button type="primary" htmlType="submit">
                  查询
                </a-button>
                <a-button class="ml10" onClick={onReset}>
                  重置
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      )
    }
  }
})

export default QueryTemplate
