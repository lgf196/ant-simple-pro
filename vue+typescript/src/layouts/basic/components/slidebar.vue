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

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import {
  BulbOutlined
} from '@ant-design/icons-vue'
import appStore from '@/store/modules/app'
import userStore from '@/store/modules/user'
import RouteMenu from './route-menu'
import { getSideBarTheme } from '@/utils/local'
type ThemeValue = 'dark' | 'light'
export default defineComponent({
  name: 'SlideBar',
  components: {
    BulbOutlined,
    RouteMenu
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)
    const accessMenus = computed(() => userStore.accessMenus)
    const sliderTheme = computed(() => appStore.sliderTheme)
    const theme = ref(getSideBarTheme() === 'dark')
    watch(theme, () => {
      const val = theme.value ? 'dark' : 'light'
      appStore.SET_SLIDER_THEME(val)
    })
    return {
      collapsed,
      accessMenus,
      theme,
      sliderTheme
    }
  }
})
</script>

<style lang="less" scoped>
  .slidebar {
    ::v-deep(.ant-layout-sider-children) {
      .ant-menu-inline .ant-menu-item::after {
        right: 1px;
      }
      .ant-menu-item, .ant-menu-submenu {
        .svg-icon {
          font-size: 18px;
        }
        .anticon, .anticon + span {
          vertical-align: middle;
        }
      }
      // dark theme hidden logo-container shadow
      .ant-menu.ant-menu-dark {
        position: relative;
        z-index: 201;
      }
    }
  }
  .menu {
    padding-top: 10px;
    border-right: 0;
  }
  .logo-container {
    z-index: 200;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: @header-height;
    line-height: @header-height;
    box-shadow: 0 2px 8px #f0f1f2;
    .logo-icon {
      font-size: 30px;
    }
    .title {
      white-space: nowrap;
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
