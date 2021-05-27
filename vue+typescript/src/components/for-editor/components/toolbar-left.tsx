import { defineComponent, ref, PropType } from 'vue'
import { IToolbar, IWords } from '../index'

export default defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(type: string) => void>,
      default: () => {} // eslint-disable-line
    },
    addImg: {
      type: Function as PropType<(file: File, index: number) => void>
    },
    toolbar: {
      type: Object as PropType<IToolbar>,
      default: () => ({})
    },
    words: {
      type: Object as PropType<IWords>,
      default: () => ({})
    }
  },
  setup(props) {
    // const { words } = toRefs(props)
    const timer = ref(0)
    const imgHidden = ref(true)
    const imgList = ref<File[]>([])

    function imgMouseOver() {
      clearTimeout(timer.value)
      imgHidden.value = false
    }

    function imgMouseOut() {
      timer.value = window.setTimeout(() => {
        imgHidden.value = true
      }, 150)
    }

    function addImgUrl() {
      props.onClick('img')
    }

    function addImgFile(e: any) {
      const imageList = imgList.value
      const len = imageList.length
      const files = e.target.files as FileList
      imgList.value = imgList.value.concat(files[0])
      if (props.addImg) {
        props.addImg(files[0], len)
      }
      e.target.value = ''
    }

    return () => {
      const { toolbar, words, onClick } = props
      return (
        <ul>
          {toolbar.undo && (
            <li onClick={() => onClick('undo')} title={`${words.undo} (ctrl+z)`}>
              <i class="foricon for-undo" />
            </li>
          )}
          {toolbar.redo && (
            <li onClick={() => onClick('redo')} title={`${words.redo} (ctrl+y)`}>
              <i class="foricon for-redo" />
            </li>
          )}
          {toolbar.h1 && (
            <li onClick={() => onClick('h1')} title={words.h1}>
              H1
            </li>
          )}
          {toolbar.h2 && (
            <li onClick={() => onClick('h2')} title={words.h2}>
              H2
            </li>
          )}
          {toolbar.h3 && (
            <li onClick={() => onClick('h3')} title={words.h3}>
              H3
            </li>
          )}
          {toolbar.h4 && (
            <li onClick={() => onClick('h4')} title={words.h4}>
              H4
            </li>
          )}
          {toolbar.img && (
            <li class="for-toolbar-img" onMouseover={() => imgMouseOver()} onMouseout={() => imgMouseOut()}>
              <i class="foricon for-image" />
              <ul style={imgHidden.value ? { display: 'none' } : {}}>
                <li onClick={() => addImgUrl()}>{words.addImgLink}</li>
                <li>
                  {words.addImg}
                  <input
                    type="file"
                    accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                    onChange={e => addImgFile(e)}
                  />
                </li>
              </ul>
            </li>
          )}
          {toolbar.link && (
            <li onClick={() => onClick('link')} title={words.link}>
              <i class="foricon for-link" />
            </li>
          )}
          {toolbar.code && (
            <li onClick={() => onClick('code')} title={words.code}>
              <i class="foricon for-code" />
            </li>
          )}
          {toolbar.save && (
            <li onClick={() => onClick('save')} title={`${words.save} (ctrl+s)`}>
              <i class="foricon for-save" />
            </li>
          )}
        </ul>
      )
    }
  }
})
