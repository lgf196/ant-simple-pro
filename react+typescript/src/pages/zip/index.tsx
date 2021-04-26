import React, { memo, useEffect, useCallback, useState } from 'react'
import NoData from '@/components/noData'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { ColumnProps } from 'antd/lib/table';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { getUserType } from '@/interfaces'
import { LayoutTablePropsType } from '@/components/layoutTable/main'
import { Image } from 'antd';
import { sagaGetUserDataType } from '@/redux/saga/user'
import { createSelector } from 'reselect'
import { tHeader,filterVal,fileDataformat } from '@/pages/excel/exportExcel'
import { export_txt_to_zip } from '@/utils/downZip'

const User: React.FC = memo(function User() {

  const columns: ColumnProps<getUserType>[] = [
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

  const [ dowmLoading,setDowmLoading ] = useState<boolean>(false);

  const selectNumOfDoneTodos = createSelector(
    [(state: reduceStoreType) => state.user, (state: reduceStoreType) => state.other],
    (user, other) => [user.getUserList, other.loading] as const
  );

  const dispatch = useDispatch<Dispatch<sagaGetUserDataType>>();

  const [getUserList, loading] = useSelector(selectNumOfDoneTodos);

  const initFetch = useCallback(() => dispatch({ type: SAGA_GET_USER_LIST, payload: { } }), [dispatch]);

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const datas: LayoutTablePropsType = {
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
    await export_txt_to_zip(tHeader, fileDataformat(getUserList,filterVal), 'user','user');
    setDowmLoading(false);
  }

  return (
    <>
      <LayoutTableComponent {...datas}>
      </LayoutTableComponent>
    </>
  )
})

export default User;
