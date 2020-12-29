<template>
  <header class="header">
    <router-link class="logo-container" to="/" title="Ant Simple Pro">
      <ComSvgIcon name="logo"></ComSvgIcon>
      <h1 class="title">Ant Simple Pro</h1>
    </router-link>
    <div class="header-inner">
      <div class="header-trigger" @click="onToggle">
        <ComSvgIcon :name="collapsed ? 'menu-unfold' : 'menu-fold'"></ComSvgIcon>
      </div>
      <a-row class="header-right" type="flex" align="middle">
        <a-row class="notification" type="flex" align="middle">
          <Notification />
        </a-row>
        <a-row class="fullscreen" type="flex" align="middle">
          <Fullscreen />
        </a-row>
        <a-dropdown placement="bottomRight">
          <a-row type="flex" align="middle" class="user-container">
            <a-avatar :size="26" :src="user.iconUrl">
              <template v-slot:icon><UserOutlined /></template>
            </a-avatar>
            <span class="username">{{user.username}}</span>
          </a-row>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="onToPersonCenter">
                <UserOutlined />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-divider></a-menu-divider>
              <a-menu-item @click="onLogout">
                <LogoutOutlined />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-row>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, createVNode, computed } from 'vue'
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import appStore from '@/store/modules/app'
import userStore from '@/store/modules/user'
import Notification from './notification.vue'
import Fullscreen from '@/components/fullscreen/index.vue'
export default defineComponent({
  name: 'HeaderBar',
  components: {
    UserOutlined,
    LogoutOutlined,
    Notification,
    Fullscreen
  },
  data() {
    return {}
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)
    const user = computed(() => userStore.currentUser)
    return {
      collapsed,
      user
    }
  },
  methods: {
    onToggle() {
      appStore.TOGGLE_SLIDE_BAR()
    },
    onLogout() {
      this.$confirm({
        title: '温馨提示',
        content: '确定要退出登录吗',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => {
          userStore.logout().then(() => {
            // this.$router.replace('/login')
            location.reload(true)
          })
        }
      })
    },
    onToPersonCenter() {
      this.$router.push('/userInfo')
    }
  }
})
</script>

<style lang="less" scoped>
  .header {
    z-index: 199;
    position: relative;
    display: flex;
    width: 100%;
    height: @header-height;
    padding-right: 24px;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
  }
  .logo-container {
    display: block;
    width: @slide-width;
    height: @header-height;
    line-height: @header-height;
    padding-left: 20px;
    ::v-deep .svg-icon {
      display: inline-block;
      vertical-align: middle;
      font-size: 30px;
    }
    .title {
      display: inline-block;
      vertical-align: middle;
      margin: 0;
      margin-left: 12px;
      color: @color-theme;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .header-inner {
    flex: auto;
    display: flex;
    justify-content: space-between;
  }
  .header-trigger {
    width: @header-height;
    height: @header-height;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .2s;
    cursor: pointer;
    color: @color-text-regular;
    font-size: @font-size-extra-large;
    &:hover {
      // color: @color-primary;
      background-color: #f9f9fc;
    }
  }
  ::v-deep .icon-bell, .fullscreen {
    font-size: 18px;
    color: rgba(105, 123, 140, .7);
  }
  .fullscreen {
    height: 100%;
    margin-left: 10px;
    padding: 0 12px;
    cursor: pointer;
  }
  .user-container {
    height: 100%;
    padding: 0 12px;
    transition: background-color .2s;
    cursor: pointer;
    &:hover {
      // color: @color-primary;
      background-color: #f9f9fc;
    }
    .username {
      margin-left: 8px;
      color: rgba(105, 123, 140, .7);
    }
  }
  .notification {
    height: 100%;
    cursor: pointer;
    ::v-deep .ant-badge-count {
      min-width: 14px;
      height: 14px;
      padding: 0;
      font-size: 12px;
      line-height: 14px;
      border-radius: 7px;
      background: #ff4d4f;
    }
  }
</style>
