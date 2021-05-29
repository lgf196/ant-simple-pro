<template>
  <div class="com-page p20">
    <a-row type="flex" class="menu-container" align="middle" @contextmenu="onContainerRightClick">
      <ComImage className="image" :src="logo" alt="logo" />
      <h2 class="title">{{ data.title }}</h2>
      <section class="font-size-16">{{ data.description }}</section>
    </a-row>
    <a-drawer title="编辑" :closable="false" v-model:visible="visible">
      <a-form class="form" :model="form" @finish="onFinish">
        <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请填写' }]">
          <a-input v-model:value="form.title" placeholder="请填写"></a-input>
        </a-form-item>
        <a-form-item label="描述" name="description">
          <a-textarea v-model:value="form.description" placeholder="请填写" :autoSize="{ minRows: 2 }"></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">修改</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { cloneDeep } from 'lodash'
import createContextMenu from '@/components/context-menu/create-context-menu'
import logoImage from '@/assets/images/Icon_512x512-15@1x@1x.png'
import { copy } from '@/utils'
const defaultForm = {
  title: 'ant-simple-pro',
  description: '简洁，美观，快速上手，支持3大框架；Concise, beautiful, quick to get started, support 3 big frameworks'
}

export default defineComponent({
  setup() {
    const logo = ref(logoImage)
    const visible = ref(false)
    const data = reactive(cloneDeep(defaultForm))
    const form = reactive(cloneDeep(defaultForm))

    function onContainerRightClick(e: MouseEvent) {
      createContextMenu({
        event: e,
        menus: [
          {
            label: '编辑',
            handler() {
              visible.value = true
            }
          },
          {
            label: '复制标题',
            handler(item, event: MouseEvent) {
              copy(form.title, event)
              message.destroy()
              message.success('复制成功，ctrl+v进行粘贴')
            }
          }
        ]
      })
    }

    function onFinish() {
      visible.value = false
      Object.assign(data, form)
    }

    return {
      logo,
      visible,
      data,
      form,
      onContainerRightClick,
      onFinish
    }
  }
})
</script>

<style lang="less" scoped>
.menu-container {
  padding: 20px;
  flex-direction: column;
  border: 1px solid #f0f0f0;
}
.image {
  width: 120px;
  height: 120px;
}
.title {
  padding: 20px;
  font-size: 20px;
  font-weight: 700;
}
</style>
