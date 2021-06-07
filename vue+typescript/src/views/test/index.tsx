import { defineComponent, ref, computed, watch } from 'vue'

type CounterExposeData = {
  count: number
}

const Counter = defineComponent({
  setup(props, { expose }) {
    const count = ref(0)
    expose({ count })

    function onClick() {
      count.value += 1
    }

    return () => {
      return (
        <div>
          <p>some contents...</p>
          <p>{count.value}</p>
          <a-button type="primary" onClick={onClick}>
            增加
          </a-button>
        </div>
      )
    }
  }
})

export default defineComponent({
  setup() {
    const counterComp = ref<CounterExposeData>()

    const num = computed(() => {
      return counterComp.value?.count
    })

    watch(
      () => counterComp.value?.count,
      newVal => {
        console.log(newVal)
      }
    )

    return () => {
      return (
        <div>
          <p>some contents...</p>
          <p>{num.value}</p>
          <Counter ref={counterComp}></Counter>
        </div>
      )
    }
  }
})
