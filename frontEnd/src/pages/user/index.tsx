import React, { memo ,useEffect,useCallback} from 'react'
import {useSetState} from '@/hooks'
import NoData from '@/components/noData'
import {LayoutTableComponent} from '@/components/layout/layoutTable'
import {SAGA_GET_USER_LIST} from '@/redux/constants/sagaType'
import { ColumnProps} from 'antd/lib/table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {getUserType} from '@/interfaces'
import { LayoutTablePropsType } from '@/components/layout/layoutTable/main'
import EditComponent from '@/container/user-module/userEdit'
import { requestCode } from '@/utils/varbile'
import '@/assets/scss/common.scss'
export interface UserProps extends loading{
    dispatch:Dispatch,
    getUserList:getUserType[]
}
const User:React.FC<UserProps> = memo(function User({dispatch,getUserList,loading}) {
    const columns:ColumnProps<getUserType>[]=[
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
            render:(text)=>(
                <>
                  {text.length?<img src={text} alt="头像" className='headerIMage'/>:<NoData data={text}/>}
                </>
            )
        },
        {
            align:'center',
            title: '操作',
            render: (text, record) => (
                <>
                    <a  onClick={()=>handle(record)}>编辑</a>
                </>
            ),
        }
    ];
    const [editData, setEditData] =useSetState({visible:false,detailData:{}});
    const initFetch=useCallback(()=> dispatch({type:SAGA_GET_USER_LIST}),[dispatch]);
    /*useEffect(() => {
        dispatch({type:SAGA_GET_USER_LIST});
    }, [pagaTion,dispatch])*/
    useEffect(() => {
        initFetch()
    }, [initFetch])
    const datas:LayoutTablePropsType={
        tableProps:{columns,dataSource:getUserList},
        // receive:()=>dispatch({type:SAGA_GET_USER_LIST}),
        receive:()=> initFetch(),
        loading
    }
    const handle=(detailData:editDataProps<getUserType>['detailData'])=>{
        setEditData({visible:true,detailData:Object.assign({},detailData,{
            iconUrl:detailData.iconUrl.length?detailData.iconUrl.split(',').map((item) => ({uid:Math.random()*100,url:item,response:{code:requestCode.successCode,data:{url:item}}})):[]
        })});
    }
    return (
        <>
             <LayoutTableComponent {...datas}/>
             {/* <EditComponent {...editData} onCancel={()=>setEditData({visible:false})} sucessCallback={()=>dispatch({type:SAGA_GET_USER_LIST})}/> */}
             <EditComponent {...editData} onCancel={()=>setEditData({visible:false})} sucessCallback={()=>initFetch()}/>
        </>
    )
})

export default connect(({user,other}:reduceStoreType)=>({
    getUserList:user.getUserList,
    loading:other.loading
}))(User);