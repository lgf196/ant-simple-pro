import React, { memo, useEffect, useCallback, useState } from 'react'
import NoData from '@/components/noData'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Image } from 'antd';
import { export_txt_to_zip } from '@/utils/downZip'

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

  const [ dowmLoading,setDowmLoading ] = useState(false);

  const initFetch = useCallback(() => dispatch({ type: SAGA_GET_USER_LIST}), [dispatch]);

  useEffect(() => {
    initFetch()
  }, [initFetch]);

  const datas = {
    btnGrounp: [{
      title:  '下载zip',
      onClick: (e) => dowmZip(),
      iconClass: 'zip',
      loading:dowmLoading
    }],
    tableProps: { columns, dataSource: getUserList },
    receive: () => initFetch(),
    loading
  }

  const dowmZip = async ()=>{
    setDowmLoading(true);
    const tHeader = ['Id', 'Email', '名称', '介绍', '头像'];
    const filterVal = ['id', 'email', 'username', 'introduct', 'iconUrl'];
    const data = getUserList.map(item=>filterVal.map(k=>item[k]));
    await export_txt_to_zip(tHeader, data, 'user','user');
    setDowmLoading(false);
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
