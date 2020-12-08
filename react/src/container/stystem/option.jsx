import React, { memo, useEffect, useMemo, useState } from 'react';
import Inputs from '@/components/input';
import Tools from '@/utils';
import { Button, Modal, Form, Cascader } from 'antd';
import { useFormLayout } from '@/hooks';
import { requestCode } from '@/utils/varbile';
import { toast } from '@/utils/function';
import { getAccesstOption } from '@/api/login';
import { useDispatch, useSelector } from 'react-redux';
import { SAGA_GETMENUTREE } from '@/redux/constants/sagaType';
import { createSelector } from 'reselect';

const Option = memo(function Option({ visible, detailData,onCancel, sucessCallback }) {
  const tools = new Tools();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [formItemLayout] = useFormLayout();

  const [requireIcon, setRequireIcon] = useState(true);

  const isDetailData = useMemo(() => detailData.id, [visible]);

  const text = isDetailData ? '编辑' : '创建';

  const selectNumOfDoneTodos = createSelector(
    [(state) => state.user, (state) => state.other],
    (user, other) => [user.getMenuTree, other.loading]
  );

  const [getMenuTree, loading] = useSelector(selectNumOfDoneTodos);

  useEffect(() => {
    if (visible) {
      let { title, url, icon, pid } = detailData;
      pid = tools.findAncestry(getMenuTree, pid);
      form.setFieldsValue({ title, url, icon, pid });
      setRequireIcon(isDetailData ? false : true);
    }
  }, [visible]);

  const handleSubmit = () => { // 提交
    form.validateFields().then(async (values) => {
      let res = null, formData = null;
      formData = Object.assign(values, {
        pid: values.pid != undefined && values.pid.length ? values.pid[values.pid.length - 1] : 0
      })
      res = isDetailData ? await getAccesstOption({ id: detailData.id, ...formData }) : await getAccesstOption(formData);
      if (res.code === requestCode.successCode) {
        dispatch({ type: SAGA_GETMENUTREE });
        toast(); sucessCallback(); handCancel();
      }
    })
  };

  const handCancel = () => {
    onCancel(); form.resetFields();
  };

  const CascaderChange = (value) => {
    if (isDetailData) {
      if (detailData.id === value[value.length - 1]) {
        toast(requestCode.failedCode, '不能选择相同的菜单，作为上级菜单');
        form.setFieldsValue({ pid: undefined });
      }
    }
    setRequireIcon(value.length ? false : true);
  };

  return (
    <Modal
      forceRender
      visible={visible}
      title={text}
      maskClosable={false}
      onCancel={handCancel}
      bodyStyle={{ paddingLeft: '10px' }}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>{text}</Button>,
        <Button key="back" onClick={() => form.resetFields()}>重置</Button>
      ]}
    >
      <Form {...formItemLayout} form={form} name="form_in_modal">
        <Form.Item label="菜单名字" name='title' rules={[{ required: true, message: '菜单名字必填' }]}>
          <Inputs />
        </Form.Item>
        <Form.Item label="菜单url" name='url' rules={[{ required: true, message: '菜单url必填' }]}>
          <Inputs />
        </Form.Item>
        <Form.Item label="菜单icon" name='icon' rules={[{ required: requireIcon, message: '父级菜单icon必填' }]}>
          <Inputs />
        </Form.Item>
        <Form.Item label="上级菜单" name='pid'>
          <Cascader
            fieldNames={{ label: 'title', value: 'id', children: 'children' }}
            options={getMenuTree}
            placeholder="请选择上级菜单"
            changeOnSelect
            expandTrigger="hover"
            size='large'
            onChange={CascaderChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Option;
