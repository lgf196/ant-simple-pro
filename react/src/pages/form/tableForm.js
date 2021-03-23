import React, { memo } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { Form , Row, Col, InputNumber,Button,Image } from 'antd';
import TimeRangeSelection from '@/components/timeRangeSelection'
import { langeList } from '@/assets/js/staticData'
import Inputs from '@/components/input';
import Select from '@/components/select'
import Table from '@/components/table'

const TableForm = memo(function TableForm(props) {

  const [form] = Form.useForm();

  const staticData = [
    {
      productId:'odde43-de',
      pictureurls:'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1616494356149.png',
      productNumber:0,
      firstJourneyExpenses:0,
      remarks:'今天天气真好'
    },
    {
      productId:'odde41-de',
      pictureurls:'https://antd-simple-pro.oss-cn-beijing.aliyuncs.com/image/1616494473689.jpg',
      productNumber:0,
      firstJourneyExpenses:0,
      remarks:'你真的好漂亮呀'
    },
  ];

  const columns = [
    {
      key: 'index',
      align: 'center',
      title: '序号',
      width:200,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      align: 'center',
      title: '图片',
      dataIndex: 'pictureurls',
      render: (text) => (
        <>
          {text.length ? <Image src={text} alt="头像" style={{ cursor: 'pointer' }} width={50} height={50} /> : null}
        </>
      ),
      key:'pictureurls',
    },
    {
      align: 'center',
      title: '数量',
      dataIndex: 'productNumber',
      key: 'productNumber',
      editable: true,
    },
    {
      align: 'center',
      title: '购买量',
      dataIndex: 'firstJourneyExpenses',
      key: 'firstJourneyExpenses',
      editable: true,
    },
    {
      align: 'center',
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
    }
  ];

    // 动态编辑table
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={['all',record.productId,dataIndex]}
              rules={[
                {
                  required: true,
                  message: `请填写!`,
                },
              ]}
            >
              <InputNumber min={0}/>
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

    const mergedColumns =columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType:'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: true,
        }),
      };
    });

  const datas = {
    tableProps: {
      id:'productId',
      columns:mergedColumns,
      dataSource:staticData,
      rowClassName:"editable-row",
      components:{
        body: {
          cell: EditableCell,
        },
      },
      expandable:{
        defaultExpandAllRows:true,
      }
    }
  }

  const submit = ()=>{

    form.validateFields().then((values) => {
      const {date,lang,platform,age,all} = values;
      const objectList = all;
      const productInfo = [];
      for (const key in objectList) {
        if (Object.hasOwnProperty.call(objectList, key)) {
          const item = objectList[key];
          productInfo.push(Object.assign({},{productId:key},item));
        }
      }
      const formData = {date,lang,platform,age,productInfo};
      alert(JSON.stringify(formData))
    });
  }

  return (
    <PageLayout>
       <Form layout="inline" form={form} name="form">
        <Row gutter={[15, 15]} style={{width:'100%'}}>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item label="日期" name='date'>
              <TimeRangeSelection />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item label="语言" name='lang'>
               <Select data={langeList} valName='label' valKey='value' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item label="介绍" name='platform'>
              <Inputs/>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="年龄" name='age'>
              <InputNumber/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8} xl={8}>
            <Form.Item>
              <Button type="primary" onClick={submit}>提交</Button>
            </Form.Item>
          </Col>
        </Row>
        <Table {...datas.tableProps} loading={false} style={{width:'100%'}}/>
       </Form>
    </PageLayout>
  )
})

export default TableForm
