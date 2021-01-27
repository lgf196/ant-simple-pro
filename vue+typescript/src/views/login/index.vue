<template>
  <div class="login">
    <a-row class="login-main" type="flex" align="middle" justify="space-around">
      <aside class="aside"></aside>
      <div class="form-container">
        <a-row class="logo" type="flex" align="middle" justify="center">
          <img class="image" src="@/assets/images/logo.png" />
          <h1 class="title">Ant Simple Pro</h1>
        </a-row>
        <a-form
          class="form"
          :model="form"
          :rules="rules"
          @finish="handleFinish"
        >
          <a-form-item has-feedback name="email">
            <a-input
              v-model:value="form.email"
              placeholder="请填写邮箱"
              size="large"
            >
              <template #prefix>
                <UserOutlined class="form-item-prefix" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback name="password">
            <a-input
              type="password"
              v-model:value="form.password"
              placeholder="请填写密码"
              size="large"
            >
              <template #prefix>
                <LockOutlined class="form-item-prefix" />
              </template>
            </a-input>
          </a-form-item>
          <!-- <a-form-item name="remember">
            <a-checkbox v-model:checked="form.remember">
              记住密码
            </a-checkbox>
          </a-form-item> -->
          <a-form-item class="form-item--submit">
            <a-button
              class="submit-btn"
              type="primary"
              html-type="submit"
              size="large"
              :loading="loading"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
    <FooterBar class="login-footer"></FooterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import appStore from '@/store/modules/app'
import userStore from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { login } from './service'
import {
  getRememberUser,
  setRememberUser,
  removeRememberUser,
  setToken
} from '@/utils/local'
import FooterBar from '@/components/footerbar/index.vue'
type LoginFormType = {
  email: string
  password: string
  remember: boolean
}
export default defineComponent({
  components: {
    FooterBar,
    UserOutlined,
    LockOutlined
  },
  setup() {
    const loading = computed(() => appStore.loading)
    const state = reactive({
      form: {
        email: '',
        password: '',
        remember: false
      },
      rules: {
        email: [
          { required: true, message: '请填写邮箱!', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确!', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请填写密码!', trigger: 'blur' }]
      }
    })
    onMounted(() => {
      const rememberUser = getRememberUser()
      if (rememberUser) {
        state.form = rememberUser
      }
    })
    const router = useRouter()
    const handleFinish = async (values: LoginFormType) => {
      if (values.remember) {
        setRememberUser(values)
      } else {
        removeRememberUser()
      }
      const params = {
        email: values.email,
        // password: md5(md5(values.password))
        password: values.password
      }
      try {
        const token = await login(params)
        setToken(token) // save local
        await userStore.getUserData()
        router.push('/')
        message.destroy()
        message.success('登录成功')
      } catch (err) {
        console.log(err)
      }
    }
    return {
      ...toRefs(state),
      handleFinish,
      loading
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
}
.login-main {
  flex: auto;
  &:before,
  &:after {
    content: '';
  }
}
.aside {
  width: 46.5vw;
  height: 86vh;
  background: url('~@/assets/images/login.png') center no-repeat;
  background-size: contain;
}
.form-container {
  width: 360px;
  padding: 50px;
  border-radius: 2px;
  box-shadow: 0 0 40px 0 rgba(24, 144, 255, 0.1),
    0 55px 85px -60px rgba(24, 144, 255, 0.31);
  background-color: #fff;
  .logo {
    .image {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    .title {
      color: @color-theme;
      font-size: 16px;
    }
  }
  .form {
    padding-top: 30px;
    .submit-btn {
      width: 100%;
      border: 0;
    }
  }
  .form-item-prefix {
    color: rgba(0, 0, 0, 0.25);
  }
  .form-item--submit {
    margin-bottom: 0;
    padding-top: 26px;
  }
}
@media screen and (max-width: 1080px) {
  .aside {
    display: none;
  }
}
</style>
