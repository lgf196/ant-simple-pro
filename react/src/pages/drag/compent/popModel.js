import React, { memo,useEffect } from 'react'
import PropTypes from 'prop-types'
import { Drawer,Form,InputNumber,Input  } from 'antd';
import { spacing } from '@/pages/drag/config'

const PopModel = memo(function PopModel({visible,dropTarget,onClose}) {

  const [form] = Form.useForm();

  useEffect(() => {
    if(visible){
      const { x,y,w,h,type } = dropTarget;
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

PopModel.propTypes = {

}

export default PopModel
