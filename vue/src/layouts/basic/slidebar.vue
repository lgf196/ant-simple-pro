<template>
  <a-layout-sider
    class="slidebar"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    :width="200"
    :collapsedWidth="60"
    theme="light"
  >
    <!-- <router-link class="logo-container" to="/" title="Ant Simple Pro">
      <ComImage className="image" :src="require('@/assets/images/logo.png')" alt="logo" />
      <transition name="title-fade">
        <h1 v-show="!collapsed" class="title">Ant Simple Pro</h1>
      </transition>
    </router-link> -->
    <RouteMenu
      :menus="accessMenus"
      :collapsed="collapsed"
    >
    </RouteMenu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from 'vuex'
// import useMenus from './useMenus'
import RouteMenu from './route-menu'

export default {
  name: 'SlideBar',
  components: {
    RouteMenu
  },
  data() {
    return {}
  },
  watch: {
    openKeys(val, oldVal) {
      this.preOpenKeys = oldVal
    }
  },
  computed: {
    ...mapGetters(['collapsed', 'accessMenus'])
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
    display: block;
    width: 100%;
    height: @header-height;
    line-height: @header-height;
    text-align: center;
    margin-bottom: 16px;
    .image {
      width: 48px;
      height: 48px;
      display: inline-block;
      vertical-align: middle;
    }
    .title {
      .text-overflow;
      max-width: 116px;
      display: inline-block;
      vertical-align: middle;
      margin: 0;
      margin-left: 12px;
      color: @color-theme;
      font-weight: 600;
      font-size: 16px;
    }
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
