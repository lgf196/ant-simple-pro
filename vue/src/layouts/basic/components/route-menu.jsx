// import { h } from 'vue'
import { defineComponent } from 'vue'
import MenuIcon from './menu-icon'

const generateMenus = menus => {
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

export default defineComponent({
  name: 'RouteMenu',
  emits: ['select'],
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data() {
    return {
      openKeys: ['/components'],
      selectedKeys: [],
      lastOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys() {
      return this.menus.map(_ => _.url)
    }
  },
  watch: {
    $route() {
      this.updateMenu()
    },
    collapsed(val) {
      if (val) {
        // 清空 openKeys
        this.lastOpenKeys = this.openKeys.slice()
        this.openKeys = []
      } else {
        // 恢复 openKeys
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
      const openKeys = []
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
    const { menus, collapsed, theme } = this
    const handleOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (latestOpenKey && !this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    const menuProps = {
      mode: 'inline',
      theme,
      collapsed,
      openKeys: this.openKeys,
      selectedKeys: this.selectedKeys,
      onSelect: menu => {
        this.selectedKeys = menu.selectedKeys
        this.$emit('select', menu)
      },
      onOpenChange: handleOpenChange
    }
    return <a-menu {...menuProps}>{generateMenus(menus)}</a-menu>
  }
})
