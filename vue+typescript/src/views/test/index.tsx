import { defineComponent, ref, computed, watch } from 'vue'
import { imagePreview } from '@/components/image/image-preview'
import { createContextMenu } from '@/components/context-menu/create-context-menu'

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

    function onClick() {
      imagePreview({
        urlList: ['https://qiniu.qyhever.com/16112900187552ffa9698851611588493080453.jpg']
      })
    }

    function onContextmenu(e: MouseEvent) {
      console.log('右键')
      createContextMenu({
        event: e,
        menus: [
          {
            label: '菜单一',
            handler() {
              console.log('click 1')
            }
          },
          {
            label: '菜单二',
            handler() {
              console.log('click 2')
            }
          },
          {
            label: '菜单三',
            handler() {
              console.log('click 3')
            }
          }
        ]
      })
    }

    return () => {
      return (
        <div>
          <a-button type="primary" onClick={onClick}>
            预览
          </a-button>
          <div style="height: 300px; border: 1px solid pink" onContextmenu={onContextmenu}>
            右键
          </div>
          <p>some contents...</p>
          <p>{num.value}</p>
          <Counter ref={counterComp}></Counter>
        </div>
      )
    }
  }
})
