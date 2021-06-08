import { defineComponent } from 'vue'
import ComSvgIcon from '@/components/svg-icon/index.vue'

export default defineComponent({
  props: ['name'],
  render() {
    const { name } = this
    if (!name) {
      return null
    }
    return (
      <span class="anticon">
        <ComSvgIcon name={name} />
      </span>
    )
  }
})
