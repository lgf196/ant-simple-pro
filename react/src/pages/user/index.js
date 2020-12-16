import React, { memo, useEffect, useCallback, useState } from 'react'
import { useSetState } from '@/hooks'
import NoData from '@/components/noData'
import EditComponent from '@/container/userModule/userEdit'
import UserSearch from '@/container/userModule/userSearch'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GET_USER_LIST } from '@/redux/constants/sagaType'
import { useSelector, useDispatch } from 'react-redux';
import { requestCode } from '@/utils/varbile'
import { Input, Image, Tooltip } from 'antd';
import { xlsxFileDown } from '@/api/login'
import { ArrowDownOutlined } from '@ant-design/icons';
import { createSelector } from 'reselect'
import Tools from '@/utils'
import '@/assets/scss/common.scss'

const User = memo(function User() {
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
    },
    {
      align: 'center',
      title: '操作',
      render: (text, record) => (
        <>
          <a onClick={() => handle(record)}>编辑</a>
        </>
      ),
    }
  ];

  const tools = new Tools();

  const [editData, setEditData] = useSetState({ visible: false, detailData: {} });

  const { Search } = Input;

  const [username, setUsername] = useState(undefined);

  const selectNumOfDoneTodos = createSelector( // 只计算，给的数据，其他的数据不会重新计算
    [(state) => state.user, (state) => state.other],
    (user, other) => [user.getUserList, other.loading]
  );

  const dispatch = useDispatch(); // 这里取代connect里面的dispatch

  const [getUserList, loading] = useSelector(selectNumOfDoneTodos); // 获取redux里面的数据，这里取代了connect函数

  const initFetch = useCallback((username) => dispatch({ type: SAGA_GET_USER_LIST, payload: { username } }), [dispatch]);

  useEffect(() => {
    initFetch(username)
  }, [initFetch, username])

  const downFile = async () => {
    let res = await xlsxFileDown();
    if (res.code === requestCode.successCode) {
      let delBuffer = Buffer.from(res.data, "binary");
      const blob = new Blob([delBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let url = window.URL.createObjectURL(blob);
      tools.createALabel(url);
    }
  }

  const datas = {
    btnGrounp: [{
      component: <Search
        enterButton
        placeholder="请输入用户名"
        onSearch={(value) => setUsername(value ? value : undefined)}
        style={{ width: 200 }}
        allowClear
      />
    }],
    iconGrounp: [
      {
        component: (<Tooltip title='下载' placement="bottom">
          <ArrowDownOutlined className='svg-fontSize' onClick={downFile} />
        </Tooltip>)
      }
    ],
    tableProps: { columns, dataSource: getUserList },
    receive: () => initFetch(username),
    loading
  }

  const handle = (detailData) => {
    setEditData({
      visible: true, detailData: Object.assign({}, detailData, {
        iconUrl: detailData.iconUrl.length ? detailData.iconUrl.split(',').map((item) => ({ uid: Math.random() * 100, url: item, response: { code: requestCode.successCode, data: { url: item } } })) : []
      })
    });
  }

  return (
    <>
      <LayoutTableComponent {...datas}>
        <UserSearch setUsername={setUsername} />
      </LayoutTableComponent>
      <EditComponent {...editData} onCancel={() => setEditData({ visible: false })} sucessCallback={() => initFetch(username)} />
    </>
  )
})

export default User;
