import { Ref, ref } from 'vue'

export function useSkins(skinRef: Ref<number>, onChange?: (val: number) => void) {
  const opened = ref(false)

  function handleClick(e: MouseEvent) {
    const skin = parseInt((e.currentTarget as HTMLElement).getAttribute('data-skin') || '', 10)
    if (!opened.value) {
      opened.value = true
    } else {
      opened.value = false
      if (skin !== skinRef.value) {
        onChange && onChange(skin)
      }
    }
  }
  return {
    opened,
    handleClick
  }
}
