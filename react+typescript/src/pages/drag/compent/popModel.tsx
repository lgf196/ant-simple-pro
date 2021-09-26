import React, { memo,useEffect,FC } from 'react'
import { Drawer,Form,InputNumber,Input  } from 'antd';
import { spacing } from '@/pages/drag/config'
import { spaceType,popModelType,partialSpaceType } from '@/pages/drag/compent/dropTarget'

const PopModel:FC<popModelType<partialSpaceType> & {onClose:Function}> = memo(function PopModel({visible,dropTarget,onClose}) {

  const [form] = Form.useForm();

  useEffect(() => {
    if(visible){
      const { x,y,w,h,type } = dropTarget as spaceType;
      form.setFieldsValue({x:spacing*x,y:spacing*y,w:spacing*w,h:spacing*h,type});
    }
  }, [visible,dropTarget])

  const handleClose = ()=>{
    onClose({visible:false});
  }

  return (
    <>
      <Drawer
        title="组件元素"
        placement="right"
        mask={false}
        onClose={handleClose}
        visible={visible}
      >
          <Form form={form} labelAlign='left'>
           <Form.Item label="组件类型" name="type">
             <Input size='middle' />
            </Form.Item>
            <Form.Item label="x" name="x">
              <InputNumber size='middle' />
            </Form.Item>
            <Form.Item label="y" name="y">
              <InputNumber size='middle' />
            </Form.Item>
            <Form.Item label="w" name="w">
              <InputNumber size='middle' />
            </Form.Item>
            <Form.Item label="h" name="h">
              <InputNumber size='middle' />
            </Form.Item>
          </Form>
      </Drawer>
    </>
  )
})

export default PopModel
