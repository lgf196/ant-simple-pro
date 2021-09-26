import React, { memo, useEffect } from 'react'
import Inputs from '@/components/input'
import { Button, Modal, Form } from 'antd';
import { useFormLayout } from '@/hooks'
import { requestCode } from '@/utils/varbile'
import { toast } from '@/utils/function'
import { useDispatch, useSelector } from 'react-redux';
import { getUserType } from '@/interfaces'
import { userOption } from '@/api/login'
import ImgUpload, { ImgUploadFile } from '@/components/upload/imgUpload'
import { SAGA_GET_USER_INFO } from '@/redux/constants/sagaType';
export interface UserEditProps extends editDetailType<Partial<getUserType>> {

}

const UserEdit: React.FC<UserEditProps> = memo(function UserEdit({ visible, detailData,
  onCancel, sucessCallback }) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [formItemLayout] = useFormLayout();

  const loading = useSelector(({ other }: reduceStoreType) => other.loading);

  useEffect(() => {
    if (visible) {
      let { username, introduct, iconUrl } = detailData;
      form.setFieldsValue({ username, introduct, iconUrl });
    }
  }, [visible]);

  const handleSubmit = () => { // 提交
    form.validateFields().then(async (values: Partial<getUserType<ImgUploadFile[]>>) => {
      let res = null, formData = null;
      formData = Object.assign(values, {
        iconUrl: values.iconUrl!.length ? values.iconUrl!.map((item) => item.url).join(',') : '',
      })
      res = await userOption({ ...formData, id: detailData.id });
      if (res.code === requestCode.successCode) {
        toast(); sucessCallback(); onCancel(); dispatch({ type: SAGA_GET_USER_INFO });
      }
    })
  };

  return (
    <>
      <Modal
        forceRender
        visible={visible}
        title='编辑'
        maskClosable={false}
        onCancel={() => onCancel()}
        bodyStyle={{ paddingLeft: '10px' }}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>编辑</Button>,
          <Button key="back" onClick={() => form.resetFields()}>重置</Button>
        ]}
      >
        <Form {...formItemLayout} form={form} name="form_in_modal">
          <Form.Item label="名称" name='username' rules={[{ required: true, message: '名称必填' }]}>
            <Inputs />
          </Form.Item>
          <Form.Item label="介绍" name='introduct'>
            <Inputs />
          </Form.Item>
          <Form.Item label="头像" name='iconUrl' valuePropName='fileList'>
            <ImgUpload limit={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default UserEdit;
