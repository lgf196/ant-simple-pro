<template>
  <header class="header">
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
  </header>
</template>

<script>
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { mapGetters } from 'vuex'
import Notification from './notification'
import Fullscreen from '@/components/fullscreen'
export default {
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
  computed: {
    ...mapGetters(['collapsed', 'user'])
  },
  methods: {
    onToggle() {
      this.$store.commit('app/TOGGLE_SLIDE_BAR')
    },
    onLogout() {
      this.$confirm({
        title: '温馨提示',
        content: '确定要退出登录吗',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => {
          this.$store.dispatch('user/Logout').then(() => {
            // this.$router.replace('/login')
            location.reload(true)
          })
        }
      })
    },
    onToPersonCenter() {
      console.log('onToPersonCenter')
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    height: @header-height;
    padding-right: 24px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  }
  .header-trigger {
    width: @header-height;
    height: @header-height;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .2s;
    cursor: pointer;
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
