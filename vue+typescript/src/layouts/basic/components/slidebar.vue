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
    <RouteMenu
      :menus="accessMenus"
      :collapsed="collapsed"
    >
    </RouteMenu>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import RouteMenu from './route-menu'

export default defineComponent({
  name: 'SlideBar',
  components: {
    RouteMenu
  },
  computed: {
    ...mapGetters(['collapsed', 'accessMenus'])
  }
})
</script>

<style lang="less" scoped>
  .slidebar {
    padding-top: 5px;
  }
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
