import React, { memo } from 'react';
import PieCompent from './components/pieCustomize'

export interface pieDataType {
  type:string;
  value:number
}

const DemoPie = memo(() => {

  var data = [
    {
      type: '销售量',
      value: 50,
    },
    {
      type: '订单量',
      value: 25,
    },
    {
      type: '出厂量',
      value: 20,
    },
    {
      type: '销户量',
      value: 1,
    }
  ];

  return (
    <div className='bgW padding-10px'>
      <PieCompent<pieDataType> data={data} />
    </div>
  );
});

export default DemoPie;
