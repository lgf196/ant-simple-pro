import { defineComponent, PropType } from 'vue'
import { Data } from '../utils/data'
import NimbleEmoji from './emoji/nimble-emoji'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    i18n: {
      type: Object,
      default: () => ({})
    },
    notFound: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    notFoundEmoji: {
      type: String
    }
  },
  setup(props) {
    return () => {
      const { data, emojiProps, i18n, notFound, notFoundEmoji } = props
      const component = (notFound && notFound()) || (
        <div class="emoji-mart-no-results">
          <NimbleEmoji data={data} emoji={notFoundEmoji} {...emojiProps} size={38}></NimbleEmoji>
          <div class="emoji-mart-no-results-label">{i18n.notfound}</div>
        </div>
      )
      return component
    }
  }
})
