import { defineComponent } from 'vue'
import data from '../../data/all.json'
import { Data } from '../../utils/data'
import NimbleEmoji from './nimble-emoji'
import { emojiPropTypes } from '../../utils/shared-props'

const Emoji = defineComponent({
  props: {
    ...emojiPropTypes,
    data: {
      default: () => (data as any) as Data
    }
  },
  setup(props) {
    return () => {
      return <NimbleEmoji {...props}></NimbleEmoji>
    }
  }
})

export default Emoji
