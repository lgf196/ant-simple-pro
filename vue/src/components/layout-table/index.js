import { h } from 'vue'
import {
  SyncOutlined
} from '@ant-design/icons-vue'
import { Table } from 'ant-design-vue'
import FilterColumns from './filter-columns'
import TableSize from './table-size'
import Fullscreen from '@/components/fullscreen'
import './index.less'

export default {
  name: 'LayoutTable',
  emits: ['change'],
  props: {
    tableTitle: {
      type: String
    },
    tableProps: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: [Object, Boolean]
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
      size: this.size
    }
    const columns = this.tableProps.columns || []
    const onFilterChange = (keys) => {
      this.columns = columns.filter(column => keys.indexOf(column.key) >= 0)
    }
    const onTableSizeChange = (e) => {
      this.size = e.key
    }
    return (
      <a-config-provider getPopupContainer={() => this.$refs.wrapper}>
        <div ref="wrapper" class="wrapper">
          <a-spin spinning={this.loading}>
            <div class="layout-table">
              <div class="layout-table__header">
                {search()}
              </div>
              <div class="layout-table__toolbar">
                <div class="toolbar-left">{this.tableTitle}</div>
                <div class="toolbar-right">
                  <div class="toolbar-right__buttons">
                    {buttons()}
                  </div>
                  {this.$slots.buttons ? <a-divider type="vertical" /> : null}
                  <div class="toolbar-right__icons">
                    <a-tooltip title="刷新" placement="bottom">
                      <SyncOutlined onClick={this.onRefresh} />
                    </a-tooltip>
                    <FilterColumns columns={columns} onChange={onFilterChange} />
                    <TableSize onChange={onTableSizeChange} />
                    <Fullscreen el={this.$refs.wrapper} />
                    {extraIcons()}
                  </div>
                </div>
              </div>
              {
                h(
                  Table,
                  tableProps,
                  restSlots
                )
              }
            </div>
          </a-spin>
        </div>
      </a-config-provider>
    )
  }
}
