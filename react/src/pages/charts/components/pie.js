import React, { memo } from 'react'
import { Pie } from '@ant-design/charts';

const PieCompent = memo(function Pies(props) {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: function formatter(v) {
          return ''.concat(v, ' \xA5');
        },
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}',
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ]
  };

  /*
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: '环图',
    },
    description: {
      visible: true,
      text: '环图的外半径决定环图的大小\uFF0C而内半径决定环图的厚度\u3002',
    },
    radius: 0.8,
    padding: 'auto',
    data,
    angleField: 'value',
    colorField: 'type',
    legend:{
        text:{
            formatter:(text:any,cfg:any):string=>{
                const value=data.filter((item)=>item.type===text)[0].value;
               return text +'  |  ' +value+'%'
            }
        }
    },
  };
*/
  return (
    <div className='bgW padding-10px'>
      <Pie {...config} />
    </div>
  )
})



export default PieCompent;
