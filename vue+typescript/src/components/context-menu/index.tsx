import { defineComponent, FunctionalComponent, PropType, Transition } from 'vue'
import { Menu } from 'ant-design-vue'
import { ItemContentProps, Position, ContextMenuItem } from './types'
import './index.less'

import SvgIcon from '../svg-icon/index.vue'

const Item: FunctionalComponent<ItemContentProps> = props => {
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
      type: Object as PropType<Position>,
      default: () => ({ x: 0, y: 0 })
    },
    menus: {
      type: Array as PropType<ContextMenuItem[]>,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sVisible: this.visible
    }
  },
  watch: {
    visible(newVal) {
      this.sVisible = newVal
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
      this.sVisible = false
    },
    handleAction(item: ContextMenuItem, e: MouseEvent) {
      const { handler, disabled } = item
      if (disabled) {
        return
      }
      // showRef.value = false
      e.stopPropagation()
      e.preventDefault()
      handler && handler(item, e)
      this.hide()
    }
  },
  render() {
    const self = this // eslint-disable-line
    const { sVisible } = this

    function renderMenuItem(menus: ContextMenuItem[]) {
      return menus.map(item => {
        const { disabled, label, children } = item

        if (!children || !children.length) {
          return (
            <Menu.Item disabled={disabled} class="context-menu-item" key={label}>
              <Item item={item} handler={self.handleAction} />
            </Menu.Item>
          )
        }
        // if (!unref(showRef)) return null
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
        {sVisible && (
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
  // setup(props) {
  //   const menuRef = ref<HTMLElement>()
  //   const visible = ref(false)

  //   function handleAction(item: ContextMenuItem, e: MouseEvent) {
  //     const { handler, disabled } = item
  //     if (disabled) {
  //       return
  //     }
  //     // showRef.value = false
  //     e.stopPropagation()
  //     e.preventDefault()
  //     handler && handler()
  //   }

  //   function renderMenuItem(menus: ContextMenuItem[]) {
  //     return menus.map(item => {
  //       const { disabled, label, children } = item

  //       if (!children || !children.length) {
  //         return (
  //           <Menu.Item disabled={disabled} class="context-menu-item" key={label}>
  //             <Item item={item} handler={handleAction} />
  //           </Menu.Item>
  //         )
  //       }
  //       // if (!unref(showRef)) return null
  //       return (
  //         <Menu.SubMenu key={label} disabled={disabled} popupClassName="context-menu-popup">
  //           {{
  //             // slots
  //             title: () => <Item item={item} handler={handleAction} />,
  //             default: () => renderMenuItem(children)
  //           }}
  //         </Menu.SubMenu>
  //       )
  //     })
  //   }

  //   return () => {
  //     return (
  //       <Transition name="com-zoom-in-top" appear>
  //         {visible.value && (
  //           <Menu
  //             class={`context-menu ${props.menuClass}`}
  //             mode="vertical"
  //             ref={menuRef}
  //             style={{
  //               width: props.width + 'px',
  //               top: props.position.x + 'px',
  //               left: props.position.y + 'px'
  //             }}
  //           >
  //             {renderMenuItem(props.menus)}
  //           </Menu>
  //         )}
  //       </Transition>
  //     )
  //   }
  // }
})
