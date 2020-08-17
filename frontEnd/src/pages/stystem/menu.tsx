import React, { memo,useEffect } from 'react'
import {SAGA_GETMENULIST} from '@/redux/constants/sagaType'
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Table from '@/components/table'
import NoData from '@/components/noData'
import {menuAccessType} from '@/interfaces'
export interface menuListType{
    dispatch:Dispatch,
    getMenuList:menuAccessType[]
}
const Menu:React.FC<menuListType> = memo(function Menu({dispatch,getMenuList}) {
    const columns:ColumnProps<{id:number}>[]=[
        {
            key: 'index',
            align:'center',
            title: '序号',
            render:(text,record,index)=>`${index+1}`,
        },
        {
            align:'center',
            title: '名称',
            dataIndex: 'title',
            key: 'title',
            render:(text)=><NoData data={text}/>
        },
        {
            align:'center',
            title: 'url',
            dataIndex: 'url',
            key: 'url',
        },
        {
            align:'center',
            title: 'icon',
            dataIndex: 'icon',
            key: 'icon',
            render:(text)=><NoData data={text}/>
        },
        {
            align:'center',
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
    ];
    useEffect(() => {
        dispatch({type:SAGA_GETMENULIST});
    }, [])
    return (
        <>
            <Table columns={columns} dataSource={getMenuList} loading={false}/>
        </>
    )
})

export default connect(({user}:reduceStoreType)=>({
    getMenuList:user.getMenuList
}))(Menu);
