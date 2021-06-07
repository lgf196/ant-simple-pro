import TempBanner from './banner.vue'
import TempList from './list.vue'
import TempNews from './news.vue'
export interface TempalteType {
  type: string
  w: number
  h: number
  title: string
  category?: string
}

const templateList = [
  {
    type: 'TempList',
    w: 450,
    h: 250,
    title: '列表组件',
    icon: 'list'
  },
  {
    type: 'TempNews',
    w: 300,
    h: 50,
    title: '消息组件',
    icon: 'news'
  },
  {
    type: 'TempBanner',
    w: 600,
    h: 400,
    title: '轮播组件',
    a: 145,
    icon: 'banner'
  }
]

export default templateList

export { TempBanner, TempList, TempNews }
