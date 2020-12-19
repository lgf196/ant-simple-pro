// import { h } from 'vue'
import { defineComponent, PropType } from 'vue'
import MenuIcon from './menu-icon'
import { AccessMenuItem } from '@/store/modules/user'

const generateMenus = (menus: AccessMenuItem[]) => {
  return menus.map(item => {
    if (Array.isArray(item.children) && item.children.length) {
      const title = (
        <span>
          <MenuIcon name={item.icon} />
          <span>{item.title}</span>
        </span>
      )
      return (
        <a-sub-menu key={item.url} title={title}>
          {generateMenus(item.children)}
        </a-sub-menu>
      )
    }
    return (
      <a-menu-item key={item.url}>
        <router-link to={item.url}>
          <MenuIcon name={item.icon} />
          <span>{item.title}</span>
        </router-link>
      </a-menu-item>
    )
  })
}

type RouteMenuDataType = {
  openKeys: string[]
  selectedKeys: string[]
  lastOpenKeys: string[]
}

export default defineComponent({
  name: 'RouteMenu',
  emitEvents: ['select'],
  props: {
    menus: {
      type: Array as PropType<AccessMenuItem[]>,
      default: []
    },
    collapsed: {
      type: Boolean
    }
  },
  data(): RouteMenuDataType {
    return {
      openKeys: ['/components'],
      selectedKeys: [],
      lastOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys(): string[] {
      return this.menus.map(_ => _.url)
    }
  },
  watch: {
    $route() {
      this.updateMenu()
    },
    collapsed(val) {
      if (val) { // 清空 openKeys
        this.lastOpenKeys = this.openKeys.slice()
        this.openKeys = []
      } else { // 恢复 openKeys
        this.openKeys = this.lastOpenKeys
      }
    }
  },
  mounted() {
    this.updateMenu()
    // watchEffect(() => {
    //   this.updateMenu()
    // })
  },
  methods: {
    updateMenu() {
      const routes = this.$route.matched.slice()
      const lastMatchRoute = routes.slice(-1)[0]
      this.selectedKeys = [lastMatchRoute.path]
      const openKeys: string[] = []
      routes.forEach(item => {
        item.path && openKeys.push(item.path)
      })
      if (this.collapsed) {
        this.lastOpenKeys = openKeys
      } else {
        this.openKeys = openKeys
      }
    }
  },
  render() {
    const { menus, collapsed } = this
    const handleOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (latestOpenKey && !this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const menuProps = {
      class: 'menu',
      mode: 'inline',
      theme: 'light',
      inlineCollapsed: collapsed,
      openKeys: this.openKeys,
      selectedKeys: this.selectedKeys,
      onSelect: (menu: {selectedKeys: string[]}) => {
        this.selectedKeys = menu.selectedKeys
        this.$emit('select', menu)
      },
      onOpenChange: handleOpenChange
    }
    return (
      <a-menu {...menuProps}>
        {generateMenus(menus)}
      </a-menu>
    )
  }
})
