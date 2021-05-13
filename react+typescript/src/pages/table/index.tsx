import React, { memo, useEffect, useCallback, useState } from 'react'
import { useSetState } from '@/hooks'
import NoData from '@/components/noData'
import EditComponent from '@/container/userModule/userEdit'
import UserSearch from '@/container/userModule/userSearch'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getUserType } from '@/interfaces'
import { LayoutTablePropsType } from '@/components/layoutTable/main'
import { requestCode } from '@/utils/varbile'
import { Input, Image } from 'antd';
import { sagaGetUserDataType } from '@/redux/saga/user'
import { userListType } from '@/api/login'
import '@/assets/scss/common.scss'
export interface UserProps extends loading {
  dispatch: Dispatch<sagaGetUserDataType>,
  getUserList: getUserType[]
}
const User: React.FC<UserProps> = memo(function User({ dispatch, getUserList, loading }) {
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
    },
    {
      align: 'center',
      title: '操作',
      render: (text, record) => (
        <>
          <a onClick={() => handle(record)} href=''>编辑</a>
        </>
      ),
    }
  ];
  const [editData, setEditData] = useSetState({ visible: false, detailData: {} });

  const { Search } = Input;

  const [username, setUsername] = useState<userListType['username']>(undefined);

  const initFetch = useCallback((username) => dispatch({ type: SAGA_GET_USER_LIST, payload: { username } }), [dispatch]);

  useEffect(() => {
    initFetch(username)
  }, [initFetch, username]);

  const datas: LayoutTablePropsType = {
    btnGrounp: [{
      component: <Search
        enterButton
        placeholder="请输入用户名"
        onSearch={(value) => setUsername(value ? value : undefined)}
        style={{ width: 200 }}
        allowClear
      />
    }],
    tableProps: { columns, dataSource: getUserList },
    pagaTionProps: {
      total: getUserList.length,
      onChanges: (page: number, size?: number) => { console.log('page,size', page, size) }
    },
    receive: () => initFetch(username),
    loading
  }

  const handle = (detailData: editDataProps<getUserType>['detailData']) => {
    setEditData({
      visible: true, detailData: Object.assign({}, detailData, {
        iconUrl: detailData.iconUrl.length ? detailData.iconUrl.split(',').map((item) => ({ uid: Math.random() * 100, url: item, response: { code: requestCode.successCode, data: { url: item } } })) : []
      })
    });
  }

  return (
    <>
      <LayoutTableComponent {...datas}>
        <>
          <p style={{ color: '#F56C6C' }}>还有一些配置项，具体的请看源码和案例。</p>
          <UserSearch setUsername={setUsername} />
        </>
      </LayoutTableComponent>
      <EditComponent {...editData} onCancel={() => setEditData({ visible: false })} sucessCallback={() => initFetch(username)} />
    </>
  )
})

export default connect(({ user, other }: reduceStoreType) => ({
  getUserList: user.getUserList,
  loading: other.loading
}))(User);
