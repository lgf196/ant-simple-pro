import React, { useState, useEffect, useMemo } from 'react';
import { Pie } from '@ant-design/charts';

const DemoPie = ({data}) => {

  // var data = [
  //   {
  //     type: '分类一',
  //     value: 27,
  //   },
  //   {
  //     type: '分类二',
  //     value: 25,
  //   },
  //   {
  //     type: '分类三',
  //     value: 18,
  //   },
  //   {
  //     type: '分类四',
  //     value: 15,
  //   },
  //   {
  //     type: '分类五',
  //     value: 10,
  //   },
  //   {
  //     type: '其他',
  //     value: 5,
  //   },
  // ];

  const ref = React.useRef();

  const [legendData, setLegendData] = useState([]);

  useEffect(() => {
    if (ref.current) {
      // 设置图例数据
      const pieChart = ref.current.chart;
      const legendData1 = pieChart.geometries[0].dataArray.map((item) => {
        const origin = item[0]._origin;
        origin.color = item[0].color;
        origin.checked = true;
        return origin;
      });
      setLegendData(legendData1);
    }
  }, []);

  var config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    seriesField: 'category',
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
      console.log('type', type)
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
        // formatter: function formatter() {
        //   return 'AntV\nG2Plot';
        // },
        customHtml:()=>(
          <>
            <p style={{color: 'rgba(0,0,0,.45)',fontWeight: 400,fontSize: '14px'}}>销售额</p>
            <div>¥ 15,781</div>
          </>
        )
      },
    },
  };

  // 点击图例
  const handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    const currentLegend = [...legendData];
    currentLegend[i] = newItem;

    const filteredLegendData = currentLegend
      .filter((l) => l.checked)
      .map((l) => l.category);

    const pieChart = ref.current.chart;
    if (pieChart) {
      pieChart.filter("category", (val) => {
        return filteredLegendData.indexOf(val) > -1;
      });
      pieChart.render();
    }
    setLegendData(currentLegend);
  };

  // 防止组件数据不更新
  const pieDom = useMemo(() => {
    return <Pie {...config} chartRef={ref} />;
  }, [data]);

  return (
    <>
      {pieDom}
    </>
  );
};

export default DemoPie;
