import React, { memo,useEffect,useMemo } from 'react'
import { Button, Modal, Form} from 'antd';
import Inputs from '@/components/input'
import {useFormLayout} from '@/hooks'
import {requestCode} from '@/utils/varbile'
import {toast} from '@/utils/function'
import {getAccesstOption} from '@/api/login'
const Option:React.FC<any> = memo(function Option({visible,detailData,onCancel,sucessCallback}) {
    const [form] = Form.useForm();
    const [formItemLayout]=useFormLayout();
    const isDetailData=useMemo(()=> detailData.id,[visible]);
    const text=isDetailData?'编辑':'创建';
    useEffect(() => {
        if (visible) {
           
        }
    }, [visible]);
    const  handleSubmit = () => {  //提交
        form.validateFields().then(async (values) => {
           let res=null;
            res=await getAccesstOption(values);
            if(res.code===requestCode.successCode){
              toast();sucessCallback();handCancel()
            }
             console.log('values', values)
        })
        .catch(info => {});
    };
    const handCancel=()=>{
        onCancel()
    }
    return (
        <Modal
        forceRender
        visible={visible}
        title={text}
        maskClosable={false}
        onCancel={handCancel}
        bodyStyle={{paddingLeft:'10px'}}
        footer={[
        <Button key="submit" type="primary"  onClick={handleSubmit} >{text}</Button>,
            <Button key="back">重置</Button>  
        ]}
      >
        <Form   {...formItemLayout} form={form} name="form_in_modal">
            <Form.Item label="菜单名字" name='title'  rules={[{required: true,message: '菜单名字必填'}]}>
              <Inputs/>
            </Form.Item>
            <Form.Item label="菜单url" name='url'  rules={[{required: true,message: '菜单url必填'}]}>
              <Inputs/>
            </Form.Item>
            <Form.Item label="菜单icon" name='icon'>
              <Inputs/>
            </Form.Item>
        </Form>
      </Modal>
    )
})
export default  Option;