<template>
  <a-layout-sider
    class="slidebar"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :width="200"
    :collapsedWidth="80"
    :theme="sliderTheme"
  >
    <router-link class="logo-container" to="/" title="Ant Simple Pro">
      <!-- <ComImage className="image" :src="require('@/assets/images/logo.png')" alt="logo" /> -->
      <ComSvgIcon name="logo" class="logo-icon"></ComSvgIcon>
      <transition name="title-fade">
        <h1 v-show="!collapsed" class="title">Ant Simple Pro</h1>
      </transition>
    </router-link>
    <RouteMenu
      :menus="accessMenus"
      :collapsed="collapsed"
      :theme="sliderTheme"
    >
    </RouteMenu>
    <a-row class="toggle-theme" type="flex" justify="space-between" align="middle">
      <a-tooltip title="主题" v-if="!collapsed" placement="right">
        <BulbOutlined />
      </a-tooltip>
      <a-switch checked-children="dark" v-model:checked="theme" />
    </a-row>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  BulbOutlined
} from '@ant-design/icons-vue'
// import useMenus from './useMenus'
import RouteMenu from './route-menu'
import { getSideBarTheme } from '@/utils/local'

export default {
  name: 'SlideBar',
  components: {
    BulbOutlined,
    RouteMenu
  },
  data() {
    return {
      theme: getSideBarTheme() === 'dark'
    }
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal
    },
    theme(newVal) {
      const val = newVal ? 'dark' : 'light'
      this.$store.commit('app/SET_SLIDER_THEME', val)
    }
  },
  computed: {
    ...mapGetters(['collapsed', 'accessMenus', 'sliderTheme'])
  }
  // setup() {
  //   const { menus } = useMenus()
  //   return {
  //     menus
  //   }
  // }
}
</script>

<style lang="less" scoped>
  ::v-deep {
    .ant-menu-inline .ant-menu-item::after {
      right: 1px;
    }
  }
  .menu {
    border-right: 0;
  }
  .logo-container {
    z-index: 200;
    position: relative;
    display: block;
    width: 100%;
    height: @header-height;
    line-height: @header-height;
    padding-left: 16px;
    box-shadow: 0 2px 8px #f0f1f2;
    .logo-icon {
      display: inline-block;
      vertical-align: middle;
      font-size: 30px;
    }
    .title {
      white-space: nowrap;
      max-width: 116px;
      display: inline-block;
      vertical-align: middle;
      margin: 0;
      margin-left: 8px;
      color: @color-theme;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .toggle-theme {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    transition: all .3s;
    font-size: 14px;
    color: #666;
    font-weight: 400;
    overflow: hidden;
  }
  .title-fade {
    &-enter-active {
      animation: 1s title-fade-in;
    }

    &-leave-active {
      animation: 0 title-fade-out;
    }
  }
  @keyframes title-fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes title-fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
</style>
