<template>
  <div class="layout-table">
    <div class="layout-table__header">
      <slot name="search"></slot>
    </div>
    <div class="layout-table__toolbar">
      <div class="toolbar-left">{{tableTitle}}</div>
      <div class="toolbar-right">
        <div class="toolbar-right__buttons"></div>
        <div class="toolbar-right__icons">
          <a-tooltip title="刷新" placement="bottom">
            <SyncOutlined />
          </a-tooltip>
          <a-tooltip title="过滤" placement="left">
            <FilterOutlined />
          </a-tooltip>
          <a-tooltip title="密度" placement="left">
            <ColumnHeightOutlined />
          </a-tooltip>
          <a-tooltip title="全屏" placement="bottom">
            <FullscreenOutlined />
          </a-tooltip>
        </div>
      </div>
    </div>
    <a-table :columns="columns" :data-source="data">
      <slot></slot>
    </a-table>
  </div>
</template>

<script>
import {
  // SmileOutlined,
  // DownOutlined,
  SyncOutlined,
  FilterOutlined,
  ColumnHeightOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
export default {
  name: 'LayoutTable',
  components: {
    // SmileOutlined,
    // DownOutlined,
    SyncOutlined,
    FilterOutlined,
    ColumnHeightOutlined,
    FullscreenOutlined
  },
  props: {
    tableTitle: {
      type: String
    }
  },
  data() {
    return {
      columns,
      data
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-table {
    background: #fff;
  }
  .layout-table__header {
    padding: 20px 20px 0;
  }
  .layout-table__toolbar {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  .toolbar-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 24px;
    font-size: 16px;
    opacity: .85;
    color: rgba(0, 0, 0, .85);
  }
  .toolbar-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .toolbar-right__icons {
    ::v-deep .anticon {
      margin-right: 10px;
      font-size: 16px;
    }
  }
</style>
