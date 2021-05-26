<template>
  <a-spin :spinning="spinning">
    <textarea :id="id" class="tinymce-textarea"></textarea>
  </a-spin>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  nextTick
} from 'vue'
import { message } from 'ant-design-vue'
import type { Editor } from 'tinymce'
import { getRandomStr } from '@/utils'
import asyncLoadScript from '@/utils/async-script'

import plugins from './plugins'
import toolbar from './toolbar'
import font from './font'
// customer plugins
import { initCustomerImagePlugin } from './customer-image'

const suffix = process.env.NODE_ENV === 'development' ? '' : '.min'
const scriptSrc = process.env.BASE_URL + 'tinymce5.8.0/tinymce' + suffix + '.js'

export default defineComponent({
  emits: ['update:value', 'blur'],
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 360
    },
    placeholder: {
      type: String
    }
    // 更多 props...
  },
  setup(props, { emit }) {
    const spinning = ref(true)
    const id = ref('editor' + getRandomStr())
    const hasChange = ref(false)
    const hasInit = ref(false)
    const editorInstance = ref<Editor>()

    watch(
      () => props.value,
      val => {
        if (hasInit.value && !hasChange.value) {
          nextTick(() => {
            if (editorInstance.value) {
              editorInstance.value.setContent(val || '')
            }
          })
        }
      }
    )

    onMounted(() => {
      asyncLoadScript(scriptSrc, window.tinymce, err => {
        spinning.value = false
        if (err) {
          message.destroy()
          message.warning('加载富文本编辑器失败')
          return
        }
        initTinymce() // eslint-disable-line
      })
    })

    onBeforeUnmount(() => {
      editorInstance.value && editorInstance.value.remove()
    })

    function initTinymce() {
      // init plugins
      initCustomerImagePlugin()
      // init editor
      /* eslint-disable @typescript-eslint/camelcase */
      window.tinymce.init({
        selector: '#' + id.value,
        language: 'zh_CN',
        content_style: 'img {max-width:100%;}',
        placeholder: props.placeholder || '请输入内容',
        min_height: props.height,
        height: props.height,
        object_resizing: false,
        plugins,
        toolbar,
        menubar: 'file edit insert view format table tools',
        fontsize_formats: '12px 14px 16px 18px 20px 24px 36px',
        font_formats: font,
        autosave_ask_before_unload: false,
        branding: false, // 隐藏编辑器界面右下角的“Powered by Tiny”（官方汉化为：由Tiny驱动）字样
        contextmenu: 'bold copy',
        elementpath: false, // 隐藏底栏的元素路径
        statusbar: false,
        toolbar_mode: 'wrap', // 工具栏布局模式
        quickbars_insert_toolbar: '', // [插入]快捷工具栏
        quickbars_selection_toolbar: '', // [选择]快捷工具栏
        fullpage_default_font_size: '14px',
        init_instance_callback: editor => {
          editorInstance.value = editor
          if (props.value) {
            editor.setContent(props.value)
          }
          hasInit.value = true
          editor.on('keyup input', () => {
            hasChange.value = true
          })
          editor.on('NodeChange Change keyup', () => {
            const val = editor.getContent()
            // const val = editor.getBody().innerHTML
            emit('update:value', val)
            // self.dispatch('ElFormItem', 'el.form.change', [val])
          })
          editor.on('blur', () => {
            emit('blur')
            // self.dispatch('ElFormItem', 'el.form.blur', [props.value])
          })
        },
        imageSelectorCallback(file, success) {
          // async upload file
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = e => {
            if (e.target && e.target.result) {
              success(e.target.result as string)
            }
          }
        }
      })
    }

    // function setContent(value: string) {
    //   window.tinymce.get(id.value).setContent(value)
    // }
    // function getContent() {
    //   window.tinymce.get(id.value).getContent()
    // }

    return {
      spinning,
      id
    }
  }
})
</script>

<style lang="less" scoped>
.tinymce-textarea {
  visibility: hidden;
}
</style>
