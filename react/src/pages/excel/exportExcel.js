import React, { memo, useEffect, useCallback, useState } from 'react'
import NoData from '@/components/noData'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { connect } from 'react-redux';
import { Image,Radio,Button } from 'antd';
import { export_json_to_excel } from '@/utils/downExcel'

export const tHeader = ['Id', 'Email', '名称', '介绍', '头像'];

export const filterVal = ['id', 'email', 'username', 'introduct', 'iconUrl'];

/**
 * @param {Array<any>} list 要处理的数据
 * @param {Array<any>} filterVal 过滤数据的key
 * @returns {Array<any[]>} 新的二维数组
 */
export const fileDataformat = (list,filterVal )=>{
  return  list.map(item=>filterVal.map(k=>item[k]));
}

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

  const typeList = ['xlsx','csv','txt'];

  const [ dowmLoading,setDowmLoading ] = useState(false);

  const [ type,setType ] = useState('xlsx');

  const initFetch = useCallback(() => dispatch({ type: SAGA_GET_USER_LIST}), [dispatch]);

  useEffect(() => {
    initFetch()
  }, [initFetch]);

  const typeChange = useCallback((e)=>setType(e.target.value));

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
      <LayoutTableComponent {...datas} />
    </>
  )
})

export default connect(({ user, other }) => ({
  getUserList: user.getUserList,
  loading: other.loading
}))(User);
