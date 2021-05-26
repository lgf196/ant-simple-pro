import { defineComponent, PropType, ref, onMounted, watch } from 'vue'
import codemirror from 'codemirror'
// https://github.com/ant-design/ant-design/issues/11247#event-1739040904

export default defineComponent({
  emits: ['update:value'],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object as PropType<codemirror.EditorConfiguration>,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const container = ref<HTMLTextAreaElement>()
    const editorInstance = ref<codemirror.Editor>()
    const hasInit = ref(false)
    const hasChange = ref(false)

    watch(
      () => props.value,
      newVal => {
        if (hasInit.value && !hasChange.value && editorInstance.value) {
          editorInstance.value.setValue(newVal)
        }
      }
    )

    onMounted(() => {
      if (container.value) {
        const editor = (editorInstance.value = codemirror.fromTextArea(
          container.value,
          props.options
        ))
        hasInit.value = true

        editor.on('change', () => {
          hasChange.value = true
          const val = editor.getValue()
          emit('update:value', val)
        })
      }
    })
    return () => {
      return <textarea ref={container}>{props.value}</textarea>
    }
  }
})
