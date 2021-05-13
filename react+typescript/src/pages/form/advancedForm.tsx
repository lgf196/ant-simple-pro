import React, { memo,useState,useEffect } from 'react'
import PageLayout from '@/layouts/pageLayout'
import { Button, Form,Radio ,Divider,InputNumber,DatePicker,Row,Col,Space } from 'antd';
import Inputs from '@/components/input';
import Select from '@/components/select'
import { langeList } from '@/assets/js/staticData'
import { DeleteOutlined } from '@ant-design/icons';
import TimeRangeSelection from '@/components/timeRangeSelection'
import { ButtonType } from 'antd/lib/button/button'
import moment from 'moment';

export type monthTime<T> = T extends string ? string : moment.Moment | undefined;

export interface userInfoListType<T = string,K = number,m = monthTime<moment.Moment>> {
  names:T;
  sex:K;
  address:T;
  school:T;
  age:K;
  birth:m;
}

const AdvancedForm = memo(function AdvancedForm(props) {

  const initValue = [{names:'',sex:1,address:'',school:'',age:24,birth:undefined}];

  const [stepList,setStepList] = useState<userInfoListType[]>(initValue);

  const [addNumber,setAddNumber]=useState(0);

  const [form] = Form.useForm();

  useEffect(() => { // 默认值
    const userInfoList = [
      {names:'帅峰峰',sex:1,address:'北京海定区',school:'北京技术技术大学',age:24,birth:moment('2015-01-01')}
    ]
    setStepList(userInfoList);
    form.setFieldsValue({userInfoList,lang:2});
  }, [])

  const  mapRender=(data:userInfoListType[])=>{
    return (
        data.map((item,index)=>(
          <div key={index}>
               <Divider>信息{index+1}</Divider>
                <div>
                    {
                      index>0 &&  <Button type={'danger' as (ButtonType & 'danger')} onClick={()=>removeStemp(index)} shape="circle" icon={<DeleteOutlined style={{color:'#fff'}}/>} className='fr' style={{marginLeft:'20px'}}/>
                    }
                </div>
                <Form.Item label='名字' labelAlign='left'  name={["userInfoList", index, "names"]}  rules={[{required: true, message: '请填写描述!' }]}>
                  <Inputs/>
                </Form.Item>
                <Form.Item label='性别' labelAlign='left'  name={["userInfoList", index, "sex"]}  rules={[{required: true, message: '请填写描述!' }]}>
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label='地址' labelAlign='left'  name={["userInfoList", index, "address"]}  rules={[{required: true, message: '请填写描述!' }]}>
                  <Inputs/>
                </Form.Item>
                <Form.Item label='学校' labelAlign='left'  name={["userInfoList", index, "school"]}  rules={[{required: true, message: '请填写描述!' }]}>
                  <Inputs/>
                </Form.Item>
                <Form.Item label='年龄' labelAlign='left'  name={["userInfoList", index, "age"]}  rules={[{required: true, message: '请填写描述!' }]}>
                  <InputNumber />
                </Form.Item>
                <Form.Item label='出生日期' labelAlign='left'  name={["userInfoList", index, "birth"]}  rules={[{required: true, message: '请填写描述!' }]}>
                   <DatePicker />
                </Form.Item>
           </div>
        ))
    )
  }

  const addStemp =()=> {
    setAddNumber(addNumber+1);
    setStepList([...stepList,...initValue]);
  };

  const removeStemp = (k:number) => {  // 删除
    setStepList(stepList.filter((item,index) =>index !== k));
    const userInfoList:userInfoListType[] =form.getFieldValue('userInfoList');
    form.setFieldsValue({ // 对删除的值进行匹配
      userInfoList: userInfoList.filter((item,index) => index !== k),
    });
  }

  const  handleSubmit = () => {
    form.validateFields().then((values) => {
      const data = values;
      (data.userInfoList as userInfoListType[]).forEach(item=>{
        (item.birth as unknown as monthTime<string>) = item.birth!.format('YYYY-MM-DD');
      })
      alert(JSON.stringify(data))
    })
  }

  return (
    <PageLayout>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={8}>
          <Form form={form}>
            <Form.Item label="平台" name='platform'>
              <Inputs/>
            </Form.Item>
            <Form.Item label="语言" name='lang'>
              <Select data={langeList} valName='label' valKey='value' />
            </Form.Item>
            <Form.Item label="时间" name="times">
              <TimeRangeSelection />
            </Form.Item>
            <Form.Item>
              {mapRender(stepList)}
            </Form.Item>
          </Form>
       </Col>
       <Col xs={24} sm={24} md={12} lg={16} xl={16}>
         <div style={{height:'100%',borderLeft:'1px solid #f0f0f0',paddingLeft:'20px',marginLeft:'20px',display:'flex',alignItems:'center'}}>
            <Space>
              <Button type="primary" danger onClick={addStemp}>新增信息</Button>
              <Button type="primary" onClick={handleSubmit}>提交信息</Button>
            </Space>
         </div>
       </Col>
      </Row>
    </PageLayout>
  )
})

export default AdvancedForm
