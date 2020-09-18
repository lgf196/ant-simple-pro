import React, { memo, useEffect } from 'react'
import { Button, Form, Input} from 'antd';
import {useFormLayout} from '@/hooks'
import { connect } from 'react-redux';
import {getUserType} from '@/interfaces'
import { requestCode } from '@/utils/varbile'
import {userOption} from '@/api/login'
import ImgUpload,{ImgUploadFile} from '@/components/upload/imgUpload'
import { SAGA_GET_USER_INFO } from '@/redux/constants/sagaType';
import {toast} from '@/utils/function'
import { Dispatch } from 'redux';
import './userInfo.scss'
export interface UserInfoProps extends loading{
    getUserInfo:getUserType;
    dispatch:Dispatch
}
const UserInfo:React.FC<UserInfoProps> = memo(function UserInfo({getUserInfo,dispatch,loading}) {
    const [formItemLayout]=useFormLayout();
    const [form] = Form.useForm();
    const { TextArea } = Input;
    useEffect(() => {
          let { username,introduct,iconUrl='',email}=getUserInfo;
          form.setFieldsValue({
                username,introduct,
                email,
                iconUrl:iconUrl.length?iconUrl.split(',').map((item) =>({uid:Math.random()*100,url:item,response:{code:requestCode.successCode,data:{url:item}}})):[]
            });
    }, [getUserInfo]);
    const  handleSubmit = () => {  //提交
        form.validateFields().then(async (values:Partial<getUserType<ImgUploadFile[]>>) => {
            let res=null,formData=null;
            formData=Object.assign(values,{
                iconUrl:values.iconUrl!.length?values.iconUrl!.map((item)=>item.url).join(','):'',
            })
            res=await userOption({...formData,id:getUserInfo.id});
            if(res.code===requestCode.successCode){
                toast(); dispatch({type:SAGA_GET_USER_INFO});
            }
        })
    };
    return (
        <div className='bgW userInfo'>
             <Form name="basic"   layout='vertical' {...formItemLayout} className='userForm'  form={form}>
                <Form.Item label="头像" name="iconUrl" valuePropName='fileList'>
                    <ImgUpload limit={1}/>
                </Form.Item>
                <Form.Item label="email" name="email">
                  <Input disabled/>
                </Form.Item>
                <Form.Item label="名称" name="username">
                  <Input />
                </Form.Item>
                <Form.Item label="介绍" name="introduct">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSubmit} loading={loading}>更改基本信息</Button>
                </Form.Item>
            </Form>
        </div>
    )
})
export default connect(({other,user}:reduceStoreType)=>({
    loading:other.loading,
    getUserInfo:user.getUserInfo
}))(UserInfo);
