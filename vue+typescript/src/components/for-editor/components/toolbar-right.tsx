import { defineComponent, PropType } from 'vue'
import { IToolbar, IWords } from '../index'

export default defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(type: string) => void>,
      default: () => {} // eslint-disable-line
    },
    toolbar: {
      type: Object as PropType<IToolbar>,
      default: () => ({})
    },
    words: {
      type: Object as PropType<IWords>,
      default: () => ({})
    },
    preview: {
      type: Boolean
    },
    expand: {
      type: Boolean
    },
    subfield: {
      type: Boolean
    }
  },
  setup(props) {
    return () => {
      const { preview, expand, subfield, toolbar, words, onClick } = props

      const previewActive = preview ? 'for-active' : ''

      const expandActive = expand ? 'for-active' : ''

      const subfieldActive = subfield ? 'for-active' : ''

      return (
        <ul>
          {toolbar.expand && (
            <li
              class={expandActive}
              onClick={() => onClick('expand')}
              title={expandActive ? words.fullscreenOff : words.fullscreenOn}
            >
              {expandActive ? <i class="foricon for-contract" /> : <i class="foricon for-expand" />}
            </li>
          )}
          {toolbar.preview && (
            <li class={previewActive} onClick={() => onClick('preview')} title={words.preview}>
              {previewActive ? <i class="foricon for-eye-off" /> : <i class="foricon for-eye" />}
            </li>
          )}
          {toolbar.subfield && (
            <li
              class={subfieldActive}
              onClick={() => onClick('subfield')}
              title={subfieldActive ? words.singleColumn : words.doubleColumn}
            >
              <i class="foricon for-subfield" />
            </li>
          )}
        </ul>
      )
    }
  }
})
