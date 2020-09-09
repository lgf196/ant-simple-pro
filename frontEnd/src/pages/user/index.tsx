import React, { memo ,useEffect} from 'react'
import {useSetState,useDel} from '@/hooks'
import NoData from '@/components/noData'
import MenuOption from '@/container/stystem/option'
import {LayoutTableComponent} from '@/components/layout/layoutTable'
import {SAGA_GET_USER_LIST} from '@/redux/constants/sagaType'
import { ColumnProps} from 'antd/lib/table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {getUserType} from '@/interfaces'
import {sagaGetMenuListType} from '@/redux/saga/user'
import {confirm,toast} from '@/utils/function'
import {delteAccesstOption} from '@/api/login'
import { requestCode } from '@/utils/varbile';
import '@/assets/scss/common.scss'
import { LayoutTablePropsType } from '@/components/layout/layoutTable/main'

export interface UserProps extends loading{
    dispatch:Dispatch,
    getUserList:getUserType[]
}
const User:React.FC<UserProps> = memo(function User({dispatch,getUserList,loading}) {
    const columns:ColumnProps<{id:number}>[]=[
        {
            key: 'index',
            align:'center',
            title: '序号',
            render:(text,record,index)=>`${index+1}`,
        },
        {
            align:'center',
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            align:'center',
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            align:'center',
            title: '名称',
            dataIndex: 'username',
            key: 'username',
            render:(text)=><NoData data={text}/>
        },
        {
            align:'center',
            title: '介绍',
            dataIndex: 'introduct',
            key: 'introduct',
            render:(text)=><NoData data={text}/>
        },
        {
            align:'center',
            title: '头像',
            dataIndex: 'iconUrl',
            key: 'iconUrl',
            render:(text)=><NoData data={text}/>
        },
        {
            align:'center',
            title: '操作',
            render: (text, record) => (
                <>
                    <a onClick={()=>{}}>编辑</a>
                </>
            ),
        }
    ];
    const [pagaTion, setPagaTion] = useSetState();
    useEffect(() => {
        dispatch({type:SAGA_GET_USER_LIST});
    }, [pagaTion])
    const datas:LayoutTablePropsType={
        tableProps:{columns,dataSource:getUserList},
        pagaTionProps:{
            total: getUserList.length,
            onChanges:(page:number, size?:number)=>setPagaTion({page, size})
        },
        receive:()=>dispatch({type:SAGA_GET_USER_LIST}),
        loading
    }
    return (
        <>
             <LayoutTableComponent {...datas}/>
        </>
    )
})

export default connect(({user,other}:reduceStoreType)=>({
    getUserList:user.getUserList,
    loading:other.loading
}))(User);