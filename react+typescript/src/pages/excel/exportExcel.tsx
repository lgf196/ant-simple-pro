import React, { memo, useEffect, useCallback, useState } from 'react'
import NoData from '@/components/noData'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { ColumnProps } from 'antd/lib/table';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { getUserType } from '@/interfaces'
import { LayoutTablePropsType } from '@/components/layoutTable/main'
import { Image, Radio,Button } from 'antd';
import { sagaGetUserDataType } from '@/redux/saga/user'
import { createSelector } from 'reselect'
import { export_json_to_excel,BookTypes } from '@/utils/downExcel'

export const tHeader = ['Id', 'Email', '名称', '介绍', '头像'];

export const filterVal:(keyof getUserType)[]  = ['id', 'email', 'username', 'introduct', 'iconUrl'];

export const fileDataformat = <T,Key extends keyof T>(list:T[],filterVal:Key[])=>{
  return  list.map(item=>filterVal.map(k=>item[k]));
}

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

  const typeList = ['xlsx','csv','txt'];

  const [ dowmLoading,setDowmLoading ] = useState<boolean>(false);

  const [ type,setType ] = useState<BookTypes>('xlsx');

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

  const typeChange = useCallback((e)=>setType(e.target.value),[]);

  const datas: LayoutTablePropsType = {
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
    tableProps: { columns, dataSource: getUserList },
    receive: () => initFetch(),
    loading
  }

  const dowmZip = async ()=>{
    setDowmLoading(true);
    await export_json_to_excel({
      header: tHeader,
      data:fileDataformat(getUserList,filterVal),
      filename: 'user',
      autoWidth: true,
      bookType: type
    });
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
