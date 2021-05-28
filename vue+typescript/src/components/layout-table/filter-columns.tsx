import { defineComponent, PropType } from 'vue'
import { FilterOutlined } from '@ant-design/icons-vue'

import { ColumnItemType } from './index'

export default defineComponent({
  name: 'FilterColumns',
  props: {
    columns: {
      type: Array as PropType<ColumnItemType[]>,
      default: () => []
    },
    onChange: {
      type: Function,
      default: () => {} // eslint-disable-line
    }
  },
  render() {
    const columns = this.columns || []
    const popoverContent = (
      <a-checkbox-group onChange={this.onChange} defaultValue={columns.map(v => v.key)}>
        {columns.map((item, index) => (
          <div key={index}>
            <a-checkbox value={item.key}>
              <span>{item.title}</span>
            </a-checkbox>
          </div>
        ))}
      </a-checkbox-group>
    )
    return (
      <a-popover placement="bottom" content={popoverContent}>
        <a-tooltip title="过滤" placement="left">
          <FilterOutlined />
        </a-tooltip>
      </a-popover>
    )
  }
})
