import { h, defineComponent } from 'vue'
import { SyncOutlined } from '@ant-design/icons-vue'
import { Table, Pagination } from 'ant-design-vue'
import FilterColumns from './filter-columns'
import TableSize from './table-size'
import Fullscreen from '@/components/fullscreen/index.vue'
import './index.less'

export default defineComponent({
  name: 'LayoutTable',
  emits: ['change'],
  props: {
    tableTitle: {
      type: String,
      default: ''
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function,
      default: () => {} // eslint-disable-line
    }
  },
  data() {
    const columns = this.tableProps.columns || []
    return {
      columns,
      size: 'middle'
    }
  },
  render() {
    const {
      search = () => {}, // eslint-disable-line
      buttons = () => {}, // eslint-disable-line
      extraIcons = () => {}, // eslint-disable-line
      ...restSlots
    } = this.$slots
    const tableProps = {
      ...this.tableProps,
      columns: this.columns,
      size: this.size,
      pagination: false
    }
    const columns = this.tableProps.columns || []
    const onFilterChange = keys => {
      this.columns = columns.filter(column => keys.indexOf(column.key) >= 0)
    }
    const onTableSizeChange = e => {
      this.size = e.key
    }
    const p = this.pagination || {}
    const { current, pageSize, onChange, ...restP } = p
    const paginationProps = Object.assign(
      {},
      {
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        hideOnSinglePage: false,
        defaultPageSize: p.pageSize || 10,
        current,
        pageSize,
        onChange,
        onShowSizeChange: onChange
      },
      restP
    )
    return (
      <a-config-provider getPopupContainer={() => this.$refs.wrapper}>
        <div ref="wrapper" class="wrapper">
          <a-spin spinning={this.loading}>
            <div class="layout-table">
              {this.$slots.search && <div class="layout-table__header">{search()}</div>}
              <div class="layout-table__toolbar">
                <div class="toolbar-left">{this.tableTitle}</div>
                <div class="toolbar-right">
                  <div class="toolbar-right__buttons">{buttons()}</div>
                  {this.$slots.buttons ? <a-divider type="vertical" /> : null}
                  <div class="toolbar-right__icons">
                    <a-tooltip title="刷新" placement="bottom">
                      <SyncOutlined onClick={this.onRefresh} />
                    </a-tooltip>
                    <FilterColumns columns={columns} onChange={onFilterChange} />
                    <TableSize onChange={onTableSizeChange} />
                    <Fullscreen el={() => this.$refs.wrapper} />
                    {extraIcons()}
                  </div>
                </div>
              </div>
              {h(
                // eslint-disable-next-line
                Table,
                tableProps,
                restSlots
              )}
              <div class="layout-table__pagination">{h(Pagination, paginationProps)}</div>
            </div>
          </a-spin>
        </div>
      </a-config-provider>
    )
  }
})
