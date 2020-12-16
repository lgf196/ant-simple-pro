import React, { memo, useEffect, useCallback } from 'react'
import Line from '@/components/line'
import NoData from '@/components/noData'
import MenuOption from '@/container/stystem/option'
import { useSetState, useDel } from '@/hooks'
import { LayoutTableComponent } from '@/components/layoutTable'
import { SAGA_GETMENULIST, SAGA_GETMENUTREE } from '@/redux/constants/sagaType'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from '@/utils/function'
import { delteAccesstOption } from '@/api/login'
import { requestCode } from '@/utils/varbile';
import { createSelector } from 'reselect'

const Menu = memo(function Menu() {
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
      title: 'pid',
      dataIndex: 'pid',
      key: 'pid',
    },
    {
      align: 'center',
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <NoData data={text} />
    },
    {
      align: 'center',
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      align: 'center',
      title: 'icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (text) => <NoData data={text} />
    },
    {
      align: 'center',
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      align: 'center',
      title: '操作',
      render: (text, record) => (
        <>
          <a onClick={() => handle(2, record)}>编辑</a>
          <Line />
          <a onClick={() => setReceiptDelte({ ...record, listen: Math.random() * 1000 })} style={{ color: '#ff4d4f' }}>删除</a>
        </>
      ),
    }
  ];

  const dispatch = useDispatch();

  const [editData, setEditData] = useSetState({ visible: false, detailData: {} });

  const [pagaTion, setPagaTion] = useSetState();

  const initFetch = useCallback(() => dispatch({ type: SAGA_GETMENULIST, payload: pagaTion }), [pagaTion, dispatch]);

  const [setReceiptDelte] = useDel(delteAccesstOption, () => {
    initFetch();
    toast(requestCode.successCode, '删除成功');
    dispatch({ type: SAGA_GETMENUTREE });
  });

  const selectNumOfDoneTodos = createSelector(
    [(state) => state.user, (state) => state.other],
    (user, other) => [user.getMenuList, other.loading]
  );

  const [listData, loading] = useSelector(selectNumOfDoneTodos);

  useEffect(() => {
    initFetch()
  }, [initFetch]);

  const datas = {
    btnGrounp: [
      {
        title: '新增',
        onClick: (e) => handle(1),
        iconClass: 'add'
      }
    ],
    tableProps: { columns, dataSource: listData.list },
    pagaTionProps: {
      total: listData.total,
      onChanges: (page, size) => setPagaTion({ page, size })
    },
    receive: () => initFetch(),
    loading
  }

  const handle = (state, detailData = {}) => {
    if (state === 1 || state === 2) {
      setEditData({ visible: true, detailData });
    }
  }

  return (
    <>
      <LayoutTableComponent {...datas} />
      <MenuOption {...editData} onCancel={() => setEditData({ visible: false })} sucessCallback={() => initFetch()} />
    </>
  )
})

export default Menu;
