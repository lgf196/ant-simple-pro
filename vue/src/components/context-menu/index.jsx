import { defineComponent, Transition } from 'vue'
import { Menu } from 'ant-design-vue'
import './index.less'

import SvgIcon from '../svg-icon/index.vue'

const Item = props => {
  const { item, handler } = props
  return (
    <div onClick={e => handler(item, e)}>
      {!!item.icon && <SvgIcon class="mr8" name={item.icon} />}
      <span>{item.label}</span>
    </div>
  )
}

export default defineComponent({
  name: 'ContextMenu',
  inheritAttrs: false,
  emits: ['update:visible'],
  props: {
    width: {
      type: Number,
      default: 160
    },
    menuClass: {
      type: String,
      default: ''
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    },
    menus: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    document.body.addEventListener('click', this.hide)
  },
  unmounted() {
    document.body.removeEventListener('click', this.hide)
  },
  methods: {
    hide() {
      this.$emit('update:visible', false)
    },
    handleAction(item, e) {
      const { handler, disabled } = item
      if (disabled) {
        return
      }
      e.stopPropagation()
      e.preventDefault()
      handler && handler(item, e)
      this.hide()
    }
  },
  render() {
    const self = this // eslint-disable-line
    const { visible } = this

    function renderMenuItem(menus) {
      return menus.map(item => {
        const { disabled, label, children } = item

        if (!children || !children.length) {
          return (
            <Menu.Item disabled={disabled} class="context-menu-item" key={label}>
              <Item item={item} handler={self.handleAction} />
            </Menu.Item>
          )
        }
        return (
          <Menu.SubMenu key={label} disabled={disabled} popupClassName="context-menu-popup">
            {{
              // slots
              title: () => <Item item={item} handler={self.handleAction} />,
              default: () => renderMenuItem(children)
            }}
          </Menu.SubMenu>
        )
      })
    }
    return (
      <Transition name="com-fade-in" appear>
        {visible && (
          <div>
            <Menu
              class={`context-menu ${this.menuClass}`}
              mode="vertical"
              style={{
                width: this.width + 'px',
                top: this.position.y + 'px',
                left: this.position.x + 'px'
              }}
            >
              {renderMenuItem(this.menus)}
            </Menu>
          </div>
        )}
      </Transition>
    )
  }
})
