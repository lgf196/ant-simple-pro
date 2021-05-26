<template>
  <div class="com-page p20">
    <a-form class="form" :model="form" :rules="rules" @finish="onFinish">
      <a-form-item label="文章标题" name="title">
        <a-input
          style="width: 300px"
          v-model:value="form.title"
          placeholder="请输入"
          :maxlength="20"
          autoComplete="off"
        />
      </a-form-item>
      <a-form-item label="文章正文" name="content">
        <TinymceEditor
          v-model:value="form.content"
          placeholder="请输入"
        ></TinymceEditor>
      </a-form-item>
      <a-form-item class="form-item--submit">
        <a-button class="submit-btn" type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
      <pre><div v-html="preview"></div></pre>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, reactive } from 'vue'
import TinymceEditor from '@/components/tinymce/index.vue'

type FormDataType = {
  title: string
  content: string
}

// 计算总字符数
function calcLetterLen(html: string) {
  const re1 = new RegExp('<.+?>', 'g')
  let txt = html.replace(re1, '')
  txt = txt.replace(/\n/g, '')
  txt = txt.replace(/&nbsp;/g, ' ')
  return txt.length
}

function genTinymceValidator(
  rule: Record<string, unknown>,
  value: string
): Promise<Error | void> {
  if (!value) {
    return Promise.reject(new Error('请输入内容'))
  }
  if (value === '<p><br></p>' || value === '<p><br data-mce-bogus="1"></p>') {
    return Promise.reject(new Error('请输入内容'))
  }
  if (calcLetterLen(value) > 1000) {
    return Promise.reject(new Error('最多1000个字'))
  }
  return Promise.resolve()
}

export default defineComponent({
  components: {
    TinymceEditor
  },
  setup() {
    const timer = ref(0)
    const form = reactive({
      title: '',
      content: ''
    })
    const rules = reactive({
      title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
        { validator: genTinymceValidator, trigger: 'blur' }
      ]
    })

    const preview = ref('')

    onMounted(() => {
      // timer.value = window.setTimeout(() => {
      //   form.content = ``
      // }, 1000)
    })

    onBeforeUnmount(() => {
      clearTimeout(timer.value)
    })

    function onFinish(values: FormDataType) {
      console.log(values)
      preview.value = values.content
    }

    return {
      form,
      rules,
      onFinish,
      preview
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  ::v-deep .ant-form-item {
    display: flex;
  }
  ::v-deep .ant-form-item-control-wrapper {
    flex: 1;
  }
}
</style>
