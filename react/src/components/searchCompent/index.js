import React, { memo, useEffect } from 'react'
import { Form, Row, Col, DatePicker, Cascader } from 'antd';
import Buttons from '@/components/button';
import Inputs from '@/components/input';
import Select from '@/components/select'
import Tools from '@/utils'
import TimeRangeSelection from '@/components/timeRangeSelection'
import PropTypes from 'prop-types';
import moment from 'moment'

/**
 * @author lgf
 * @description 动态组件模板
 */

const SearchCompent = memo(function SearchCompent({ options, callBack }) {

  const tools = new Tools();

  const { RangePicker } = DatePicker;

  const [form] = Form.useForm();

  useEffect(() => { // 对默认值的操作
    let isHavaDefaultValue = options.filter(item => item.defaultValue) || [];
    if (isHavaDefaultValue.length) {
      isHavaDefaultValue.forEach(item => {
        if (item.type === 'monthDatePicker') {
          form.setFieldsValue(Object.assign({}, { [item.key]: moment(item.defaultValue, 'YYYY-MM') }))
        } else {
          form.setFieldsValue(Object.assign({}, { [item.key]: item.defaultValue }))
        }
      });
    }
  }, [])

  const handleSubmit = (values) => {
    let formData = values;
    options.forEach(item => { // 对时间格式的进行处理
      if (item.type === 'showTimeRangePicker') {
        const rangeValue = values[item.key];
        formData[item.key] = [rangeValue ? tools.getTime(rangeValue[0].format('YYYY-MM-DD HH:mm:ss')) : undefined,
        rangeValue ? tools.getTime(rangeValue[1].format('YYYY-MM-DD HH:mm:ss')) : undefined]
      } else if (item.type === 'timeRangeSelection') {
        const rangeValue = values[item.key];
        formData[item.key] = rangeValue ? [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')] : undefined
      } else if (item.type === 'monthDatePicker') {
        const rangeValue = values[item.key];
        formData[item.key] = rangeValue ? tools.formatDate(rangeValue, 'YYYY-MM') : undefined
      } else if (item.type === 'dayDatePicker') {
        const rangeValue = values[item.key];

        formData[item.key] = rangeValue ? tools.getTime(rangeValue.format('YYYY-MM-DD')) : undefined
      }
    });
    callBack && callBack(formData);
  };

  const disabledDate=(current)=> {
    return current && current > moment().endOf('day');
  }

  const backDifferentTypeRender = (type, items) => { // 更具不同类型返回不同的模板
    let reder = null;
    switch (type) {
      case 'input':
        reder = (<Inputs size='middle' onChange={items.onChange && items.onChange} placeholder={items.placeholder ? items.placeholder : '请填写'} />)
        break;
      case 'select':
        reder = (<Select data={items.selectListValue}
          valKey={items.selectKeyValue}
          valName={items.selectLableName}
          onChange={items.onChange && items.onChange}
          placeholder={items.placeholder ? items.placeholder : '请选择'}
        />)
        break;
      case 'cascader':
        reder = (<Cascader placeholder={items.placeholder ? items.placeholder : '请选择'} options={items.selectListValue}
          fieldNames={{ label: 'items.selectLableName', value: 'items.selectKeyValue', children: 'items.selectListchildren' }}
          changeOnSelect />)
        break;
      case 'timeRangeSelection': // 时间范围选择器
        reder = (<TimeRangeSelection onChange={items.onChange && items.onChange} placeholder={items.placeholder ? items.placeholder : '请选择'} />)
        break;
      case 'showTimeRangePicker': // 不含近30天这样的，[2020-12-1 12:22:22,2020-12-1 12:22:22]
        reder = (<RangePicker showTime onChange={items.onChange && items.onChange} placeholder={items.placeholder ? items.placeholder : '请选择'} />)
        break;
      case 'monthDatePicker':
        reder = (<DatePicker picker="month" size='middle' onChange={items.onChange && items.onChange} disabledDate={disabledDate} placeholder={items.placeholder ? items.placeholder : '请选择'} />)
        break;
      case 'dayDatePicker':
        reder = (<DatePicker size='middle' onChange={items.onChange && items.onChange} disabledDate={disabledDate} placeholder={items.placeholder ? items.placeholder : '请选择'} />)
        break;
      default:
        reder = (<Inputs size='middle' onChange={items.onChange && items.onChange} placeholder={items.placeholder ? items.placeholder : '请填写'} />)
        break;
    }
    return reder;
  }

  return (
    <>
      <Form layout="inline" form={form} name="form" onFinish={handleSubmit}>
        <Row gutter={[15, 15]} style={{ width: '100%' }}>
          {
            options.map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={options.length > 3 ? 6 : 8} key={index}>
                <Form.Item label={item.title} name={item.key}>
                  {backDifferentTypeRender(item.type, item)}
                </Form.Item>
              </Col>
            ))
          }
          <Col xs={24} sm={12} md={12} lg={8} xl={options.length > 3 ? 6 : 8}>
            <Form.Item>
              <Buttons title='查询' htmlType="submit" />
              <Buttons title='重置' onClick={() => [form.resetFields(), callBack(form.getFieldsValue())]} type='default' className='left-10px' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
});

SearchCompent.defaultProps = {
  options: [
    {
      title: '日期',
      key: 'date',
      type: 'timeRangeSelection',
      selectListValue: [],
      selectLableName: '',
      selectKeyValue: '',
      selectListchildren: [],
    }
  ]
}

SearchCompent.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    key: PropTypes.string,
    type: PropTypes.string,
    selectListValue: PropTypes.array,
    selectLableName: PropTypes.string,
    selectKeyValue: PropTypes.string,
    selectListchildren: PropTypes.array,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  })),
  callBack: PropTypes.func.isRequired
}

export default SearchCompent;
