import { Ref } from 'vue'
export type TopAdPropsType = {
  imageUrl: string
  linkUrl: string
  bg: string
}

export type PopupPropsType = {
  visible: Ref<boolean>
  onClose: () => void
  imageUrl: string
  linkUrl: string
}
