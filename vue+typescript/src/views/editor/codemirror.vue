<template>
  <div class="com-page p20">
    <Codemirror
      v-model:value="content"
      :options="{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }"
      :autoScroll="false"
    ></Codemirror>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Codemirror from '@/components/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/xml/xml')
require('codemirror/mode/javascript/javascript')

const code = `
  // pages/home
  import { defineComponent, ref, onMounted } from 'vue'
  import { userList } from '@/api/login'
  export type UserListType={
    name: string
    aga: number
    sex: string
  }
  const App = defineComponent({
    setup() {
      const result = ref<UserListType[]>([])
      onMounted(() => {
        ;(async () => {
          const res = await userList({ username: 'li' })
          result.value = res.data
        })()
      })
      return () => {
        return (
          <>
            {
              !!result.value.length
              && (
                result.value.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))
              )
            }
          </>
        )
      }
    }
  })
  `

export default defineComponent({
  components: {
    Codemirror
  },
  setup() {
    const content = ref(code)
    return {
      content
    }
  }
})
</script>

<style lang="less" scoped>
.com-page {
  ::v-deep .CodeMirror {
    height: 600px;
  }
}
</style>
