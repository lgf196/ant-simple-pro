import React, { memo, useEffect, useCallback, useState } from 'react'
import { useSetState } from '@/hooks'
import NoData from '@/components/noData'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Image,Radio,Button } from 'antd';
import { export_json_to_excel } from '@/utils/downExcel'
import { requestCode } from '@/utils/varbile'
import { toast } from '@/utils/function'
import { tHeader,filterVal,fileDataformat } from '@/pages/excel/exportExcel'

const User = memo(function User({ dispatch, getUserList, loading }) {

  const columns = [
    {
      key: 'index',
      align: 'center',
      title: '序号',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      align: 'center',
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align: 'center',
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: '名称',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <NoData data={text} />
    },
    {
      align: 'center',
      title: '介绍',
      dataIndex: 'introduct',
      key: 'introduct',
      render: (text) => <NoData data={text} />
    },
    {
      align: 'center',
      title: '头像',
      dataIndex: 'iconUrl',
      key: 'iconUrl',
      render: (text) => (
        <>
          {text.length ? <Image src={text} alt="头像" style={{ cursor: 'pointer' }} width={50} height={50} /> : <NoData data={text} />}
        </>
      )
    }
  ];

  const [selectAllData, setSelectAllData] = useSetState({selectedRowKeys:[],selectedRows:[]});

  const typeList = ['xlsx','csv','txt'];

  const [ dowmLoading,setDowmLoading ] = useState(false);

  const [ type,setType ] = useState('xlsx');

  const initFetch = useCallback(() => dispatch({ type: SAGA_GET_USER_LIST}), [dispatch]);

  useEffect(() => {
    initFetch()
  }, [initFetch]);

  const typeChange = useCallback((e)=>setType(e.target.value));

  const rowSelection = {
    onChange: useCallback((selectedRowKeys, selectedRows) => {
      setSelectAllData({selectedRowKeys,selectedRows});
    }),
  };

  const datas = {
    btnGrounp: [{
      component: (<>
        <Radio.Group onChange={typeChange} defaultValue={type}>
          {typeList.map(item=>(
            <Radio value={item} key={item}>{item}</Radio>
          ))}
        </Radio.Group>
        <Button type="primary" onClick={()=>dowmZip()} loading={dowmLoading}>导出{type}</Button>
      </>)
    }],
    tableProps: {
      columns,
      dataSource: getUserList,
      rowSelection:{
        type:'checkbox',
        ...rowSelection,
        checkStrictly:true,
        selectedRowKeys:selectAllData.selectedRowKeys // 为了后面的清空操作
      },
    },
    receive: () => initFetch(),
    loading
  }

  const dowmZip = async ()=>{
    const { selectedRows } = selectAllData;
    if(!selectedRows.length){
      toast(requestCode.failedCode,'请先选择要导出的数据');
      return;
    }
    setDowmLoading(true);
    await export_json_to_excel({
      header: tHeader,
      data:fileDataformat(selectedRows,filterVal),
      filename: 'user',
      autoWidth: true,
      bookType: type
    });
    setDowmLoading(false);
    setSelectAllData({selectedRowKeys:[],selectedRows:[]});
  }

  return (
    <>
      <LayoutTableComponent {...datas} />
    </>
  )
})

export default connect(({ user, other }) => ({
  getUserList: user.getUserList,
  loading: other.loading
}))(User);
