import React, { memo,useEffect} from 'react'
import Line from '@/components/line'
import {useSetState,useDel} from '@/hooks'
import NoData from '@/components/noData'
import MenuOption from '@/container/stystem/option'
import {LayoutTableComponent} from '@/components/layout/layoutTable'
import {SAGA_GETMENULIST,SAGA_GETMENUTREE} from '@/redux/constants/sagaType'
import { ColumnProps} from 'antd/lib/table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {pagaTionBackData,menuAccessType} from '@/interfaces'
import {sagaGetMenuListType} from '@/redux/saga/user'
import {toast} from '@/utils/function'
import {delteAccesstOption} from '@/api/login'
import { requestCode } from '@/utils/varbile';
import { LayoutTablePropsType } from '@/components/layout/layoutTable/main'
type dispatchProps=sagaGetMenuListType | {type:SAGA_GETMENUTREE};
export interface menuListType extends loading{
    dispatch:Dispatch<dispatchProps>,
    listData:pagaTionBackData,
}
const Menu:React.FC<menuListType> = memo(function Menu({dispatch,listData,loading}) {
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
            title: 'pid',
            dataIndex: 'pid',
            key: 'pid',
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
        {
            align:'center',
            title: '操作',
            render: (text, record) => (
                <>
                    <a onClick={()=>handle(2,record)}>编辑</a>
                    <Line/>
                    <a onClick={()=>setReceiptDelte({...record,listen:Math.random()*1000})} style={{color:'#ff4d4f'}}>删除</a>
                </>
            ),
        }
    ];
    const [editData, setEditData] =useSetState({visible:false,detailData:{}});
    const [pagaTion, setPagaTion] = useSetState();
    const [setReceiptDelte] =useDel(delteAccesstOption,()=>{
        dispatch({type:SAGA_GETMENULIST,payload:pagaTion});
        toast(requestCode.successCode,'删除成功');
        dispatch({type:SAGA_GETMENUTREE});
    });
    useEffect(() => {
        dispatch({type:SAGA_GETMENULIST,payload:pagaTion});
    }, [pagaTion])
    // const funcs=(par:string,event:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    //     event.persist()
    //     console.log('11', par,event)
    // }
    const datas:LayoutTablePropsType={
        btnGrounp:[
            {
               title:'新增',
               onClick:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>handle(1),
               iconClass:'add' 
            }
        ],
        tableProps:{columns,dataSource:listData.list},
        pagaTionProps:{
            total: listData.total,
            onChanges:(page:number, size?:number)=>setPagaTion({page, size})
        },
        receive:()=>dispatch({type:SAGA_GETMENULIST,payload:pagaTion}),
        loading
    }
    const handle=(state:number,detailData:editDetailType<Partial<menuAccessType>>['detailData']={})=>{
        if(state===1 || state===2){ 
            setEditData({visible:true,detailData});
       }
    }
    return (
        <>
            <LayoutTableComponent {...datas}/>
             <MenuOption {...editData} onCancel={()=>setEditData({visible:false})} sucessCallback={()=>dispatch({type:SAGA_GETMENULIST,payload:pagaTion})}/>
        </>
    )
})
export default connect(({user,other}:reduceStoreType)=>({
    listData:user.getMenuList,
    loading:other.loading
}))(Menu);
