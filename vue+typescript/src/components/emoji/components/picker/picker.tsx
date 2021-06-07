import { defineComponent } from 'vue'
import data from '../../data/all.json'
import { Data } from '../../utils/data'
import NimblePicker from './nimble-picker'
import { pickerPropTypes } from '../../utils/shared-props'

const Picker = defineComponent({
  props: {
    ...pickerPropTypes,
    data: {
      default: () => (data as any) as Data
    }
  },
  setup(props) {
    return () => {
      return <NimblePicker {...props} data={props.data}></NimblePicker>
    }
  }
})

export default Picker
