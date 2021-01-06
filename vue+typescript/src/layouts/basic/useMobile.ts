import { ref, onMounted, onBeforeUnmount } from 'vue'
import appStore from '@/store/modules/app'
import { isMobile } from '@/utils/system'
export default function() {
  const mobile = ref(false)
  const onResize = () => {
    const val = isMobile()
    mobile.value = val
    appStore.TOGGLE_SLIDE_BAR(val)
  }
  onResize()
  onMounted(() => {
    window.addEventListener('resize', onResize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
  })
  return mobile
}
