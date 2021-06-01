import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:visible', 'ok'],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    function onCancel() {
      emit('update:visible', false)
    }

    function onOk() {
      emit('ok')
      emit('update:visible', false)
    }

    return () => {
      const { visible } = props
      return (
        <a-modal visible={visible} title="modal" onCancel={onCancel} onOk={onOk}>
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </a-modal>
      )
    }
  }
})
