<template>
  <div class="vue-codemirror">
    <textarea ref="textarea" :name="name" :placeholder="placeholder"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, markRaw } from 'vue'
import Codemirror from 'codemirror'
export default defineComponent({
  name: 'VCodemirror',
  emits: ['update:value'],
  props: {
    code: String,
    value: String,
    marker: Function,
    unseenLines: Array,
    name: {
      type: String,
      default: 'codemirror'
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: [Number, String],
      default: '100%'
    },
    height: {
      type: [Number, String],
      default: '600px'
    }
  },
  setup(props, { emit }) {
    const content = ref('')
    const ins = ref<Codemirror.Editor>()
    const textarea = ref<HTMLTextAreaElement>()

    onMounted(() => {
      init() // eslint-disable-line
    })

    watch(
      () => props.options,
      newOptions => {
        for (const key in newOptions) {
          ins.value?.setOption(key as keyof Codemirror.EditorConfiguration, newOptions[key])
        }
      }
    )

    watch(
      () => props.value,
      newVal => {
        handerCodeChange(newVal as string) // eslint-disable-line
      }
    )

    function init() {
      const opts = Object.assign({}, props.options)
      if (textarea.value) {
        // 使用 markRaw 返回原始对象，避免被包装成响应式对象后报错
        ins.value = markRaw(Codemirror.fromTextArea(textarea.value, opts))
        ins.value.setValue(props.value || content.value)
        ins.value.setSize(props.width, props.height)
      }
      ins.value?.on('change', cm => {
        content.value = cm.getValue()
        emit('update:value', content.value)
      })
      unseenLineMarkers() // eslint-disable-line
      refresh() // eslint-disable-line
    }

    function refresh() {
      setTimeout(() => {
        ins.value?.refresh()
      }, 20)
    }

    function unseenLineMarkers() {
      if (props.unseenLines) {
        props.unseenLines.forEach(line => {
          if (ins.value && props.marker) {
            const info = ins.value.lineInfo(line)
            ins.value?.setGutterMarker(line, 'breakpoints', info.gutterMarkers ? null : props.marker())
          }
        })
      }
    }

    function handerCodeChange(newVal: string) {
      if (!ins.value) {
        return
      }
      if (newVal !== ins.value.getValue()) {
        const scrollInfo = ins.value.getScrollInfo()
        ins.value.setValue(newVal)
        content.value = newVal
        ins.value.scrollTo(scrollInfo.left, scrollInfo.top)
      }
      unseenLineMarkers()
    }

    return {
      content,
      textarea
    }
  }
})
</script>

<style lang="less" scoped>
// ...
</style>
