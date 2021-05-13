import React, { useState, useEffect, useMemo,FC,memo } from 'react';
import { Pie } from '@ant-design/charts';
import { ChartRefOptions } from '@ant-design/charts/es/interface'
import { PieConfig } from '@ant-design/charts/es/pie'
import Describle from './describle'
import { Col, Row } from 'antd';

export interface demoPieType<T=any> {
  data:T[]
}

export interface legendItemType {
  checked:boolean;
  [parps:string]:any
}

export type chartRefType = ChartRefOptions & {chart:any};

export default function DemoPie<T = any>({data}:demoPieType<T>){

  const ref = React.useRef<chartRefType>(null);

  const [legendData, setLegendData] = useState<legendItemType[]>([]);

  useEffect(() => {
    if (ref.current) {
      // 设置图例数据
      const pieChart = (ref.current as any).chart;
      const legendData1 = pieChart.geometries[0].dataArray.map((item:any) => {
        const origin = item[0]._origin;
        origin.color = item[0].color;
        origin.checked = true;
        return origin;
      });
      setLegendData(legendData1);
    }
  }, []);

  var config:PieConfig & {seriesField:string} = {
    appendPadding: 10,
    data,
    angleField: 'value',
    seriesField: 'category',
    legend: false,
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    colorField: 'type',
    color: ({type}) => {
      if(type === '销售量'){
        return '#3aa1ff';
      }else if(type === '订单量'){
        return '#36cbcb';
      }else if(type === '出厂量'){
        return '#4ecb73';
      }else{
        return '#fbd437'
      }
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        customHtml:():any=>(
          <>
            <p style={{color: 'rgba(0,0,0,.45)',fontWeight: 400,fontSize: '14px'}}>销售额</p>
            <div>¥ 15,781</div>
          </>
        )
      },
    },
  };

  // 点击图例
  const handleLegendClick = (item:legendItemType, i:number) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    const currentLegend = [...legendData];
    currentLegend[i] = newItem;
    const filteredLegendData = currentLegend
      .filter((l) => l.checked)
      .map((l) => l.type);
    const pieChart = ref.current!.chart;
    if (pieChart) {
      pieChart.filter("type", (val: any) => {
        return filteredLegendData.indexOf(val) > -1;
      });
      pieChart.render();
    }
    setLegendData(currentLegend);
  };

  // 防止组件数据不更新
  const pieDom = useMemo(() => {
    return <Pie {...config} chartRef={ref as unknown as chartRefType} />;
  }, [data]);

  return (
    <>
      <Row gutter={[15, 15]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          {pieDom}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <div style={{
            height:'100%',
            display:'flex',
            flexWrap:'wrap',
            justifyContent:'center',
            alignItems:'center'
          }}>
          {
            legendData.map((item,index)=>(
                <Describle title={item.type} key={index} color={item.checked ? item.color : "#aaa" }
                value={item.value} onClick={()=>handleLegendClick(item, index)}/>
            ))
          }
          </div>
        </Col>
      </Row>
    </>
  );
};


