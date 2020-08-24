import React, { memo,useEffect } from 'react'
import {SAGA_GETMENULIST} from '@/redux/constants/sagaType'
import { ColumnProps } from 'antd/lib/table';
import useSetState from '@/hooks/useSetState'
import { connect } from 'react-redux';
import {Tooltip } from 'antd'
import { Dispatch } from 'redux';
import Table from '@/components/table'
import NoData from '@/components/noData'
import {menuAccessType,LayoutTableProps,pagaTionBackData} from '@/interfaces'
import Buttons from '@/components/button'
import Pagination from '@/components/pagination'
import {SyncOutlined} from '@ant-design/icons';
import '@/assets/scss/common.scss'
import Line from '@/components/line'
import LayoutTableComponent from '@/components/layout/layoutTable'
import MenuOption from '@/container/stystem/option'
import {sagaGetMenuListType} from '@/redux/saga/user'
export interface menuListType extends loading{
    dispatch:Dispatch<sagaGetMenuListType>,
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
                    <a>编辑</a>
                    <Line/>
                    <a style={{color:'#ff4d4f'}}>删除</a>
                </>
            ),
        }
    ];
    const [editData, setEditData] =useSetState({visible:false,detailData:{}});
    const [pagaTion, setPagaTion] = useSetState();
    useEffect(() => {
        dispatch({type:SAGA_GETMENULIST,payload:pagaTion});
    }, [pagaTion])
    const aaa=(par:string,event:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.persist()
        console.log('11', par,event)
    }
    const datas:LayoutTableProps={
        btnGrounp:[
           {
               title:'新增',
               iconClass:'add', 
               func:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>handle(1),
           }
        ],
        iconGrounp:[
            {
                title:'刷新',
                func:(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>aaa('rr',e),
                icon:<SyncOutlined/>
            }
        ],
    }
    const handle=(state:number,detailData:any={})=>{
        if(state==1){ 
            setEditData({visible:true,detailData});
       }else if(state==2){
           
       }
    }
    return (
        <>
            <LayoutTableComponent {...datas}>
                <Table columns={columns} dataSource={listData.list} loading={loading}/>
                <Pagination total={listData.total}   onChanges={(page:number, size:number)=>setPagaTion({page, size})} className='view-pagitaion'/>
            </LayoutTableComponent>
            <MenuOption {...editData} onCancel={()=>setEditData({visible:false})} sucessCallback={()=>dispatch({type:SAGA_GETMENULIST,payload:pagaTion})}/>
            {/* <div className='layout-table'>
                <div className='header-option'>
                    <div className='header-option-title'>查询表格</div>
                    <div className='header-option-func'>
                        <div className='option-btn'>
                            <Buttons title='新增'  iconClass='add'/>
                        </div>
                        <div className='option-icon'>
                             <Line/>
                            <div className='icon-grounp'>
                                <div className='update-data'>
                                    <Tooltip title='刷新'  placement="bottom" >
                                        <SyncOutlined />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                <Table columns={columns} dataSource={getMenuList} loading={false}/>
            </div> */}
        </>
    )
})

export default connect(({user,other}:reduceStoreType)=>({
    listData:user.getMenuList,
    loading:other.loading
}))(Menu);
