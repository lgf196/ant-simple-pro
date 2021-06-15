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

<script>
import { defineComponent, ref } from 'vue'
import Codemirror from '@/components/vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
require('codemirror/mode/xml/xml')
require('codemirror/mode/javascript/javascript')

const code = `
  // pages/home
  import { defineComponent, ref, onMounted } from 'vue'
  import { userList } from '@/api/login'
  const App = defineComponent({
    setup() {
      const result = ref([])
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
// ...
</style>
