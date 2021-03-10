import React, { memo } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import Tools from '@/utils'

const TimeSelect = memo(function TimeSelect({ onChange, placeholder, size, value, ...props }) {

  const tools = new Tools();

  const { RangePicker } = DatePicker;

  const monthTime = () => { // 上个月的处理
    let startTime = [],endTime=[];
    if(!moment().month()){ // 等于0，刚好1月的时候
      startTime=[moment().year()-1 ,11,1,'00','00','00'] ;
      endTime=[moment().year()-1 , 11,tools.getMonthDay(moment().year()-1,11),'23','59','59'] ;
    }else{
      startTime=[moment().year()-1 ,moment().month()-1,1,'00','00','00'] ;
      endTime=[ moment().year()-1 ,moment().month()-1,tools.getMonthDay(moment().year()-1,moment().month()-1),'23','59','59'] ;
    }
    return {startTime,endTime}
  }

  const handleCurrencyChange = (currency) => {
    onChange && onChange(currency);
  };

  return (
    <>
      <RangePicker {...props} onChange={handleCurrencyChange} ranges={{
          '今天': [moment().startOf('day'), moment().endOf('day')],
          '昨天': [moment([moment().year(),moment().month() ,moment().date()-1,'00','00','00']), moment([moment().year(),moment().month(),moment().date()-1,'23','59','59'])],
          '最近7天':[moment(new Date().getTime() - 3600 * 1000 * 24 * 6),moment(new Date())],
          '最近30天':[moment(new Date().getTime() - 3600 * 1000 * 24 * 29),moment(new Date())],
          '本月':[moment().startOf('month'), moment().endOf('month')],
          '上月':[moment(monthTime().startTime), moment(monthTime().endTime)]
      }}/>
    </>
  )
})
export default TimeSelect;
