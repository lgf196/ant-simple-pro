import { ref } from 'vue'
import store from '@/store'
import { isMobile } from '@/utils/system'
export default function () {
  const mobile = ref(false)
  const onResize = () => {
    const val = isMobile()
    mobile.value = val
    store.commit('app/TOGGLE_SLIDE_BAR', val)
  }
  onResize()
  // onMounted(() => {
  //   window.addEventListener('resize', onResize)
  // })
  // onBeforeUnmount(() => {
  //   window.removeEventListener('resize', onResize)
  // })
  return mobile
}
