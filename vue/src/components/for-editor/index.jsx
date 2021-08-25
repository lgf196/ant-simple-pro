import { defineComponent, ref, onMounted, watch, onUpdated } from 'vue'
import classNames from 'classnames'
import marked from './lib/helpers/marked'
import keydownListen from './lib/helpers/keydownListen'
import ToolbarLeft from './components/toolbar-left'
import ToolbarRight from './components/toolbar-right'
import { insertText } from './lib/helpers/function'
import 'highlight.js/styles/tomorrow-night-blue.css'
import 'highlight.js/styles/tomorrow-night-bright.css'
import './lib/fonts/iconfont.css'
import './lib/css/index.less'
import { CONFIG } from './lib'

export default defineComponent({
  emits: ['update:value'],
  props: {
    value: {
      type: String,
      default: ''
    },
    lineNum: {
      type: Boolean,
      default: true
    },
    onChange: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    onSave: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    placeholder: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    style: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true
    },
    expand: {
      type: Boolean,
      default: false
    },
    subfield: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: Object,
      default: CONFIG.toolbar
    },
    language: {
      type: String,
      default: 'zh-CN'
    },
    addImg: {
      type: Function,
      default: () => {} // eslint-disable-line
    }
  },
  setup(props, { emit }) {
    const preview = ref(props.preview)
    const expand = ref(props.expand)
    const subfield = ref(props.subfield)
    const history = ref([])
    const historyIndex = ref(0)
    const lineIndex = ref(0)
    // const value = ref(props.value)
    const words = ref({})

    const $vm = ref()
    const $scrollEdit = ref()
    const $scrollPreview = ref()
    const $blockEdit = ref()
    const $blockPreview = ref()
    const currentTimeout = ref(0)

    onMounted(() => {
      if ($vm.value) {
        keydownListen($vm.value, type => {
          toolBarLeftClick(type) // eslint-disable-line
        })
      }
      if (props.value) {
        reLineNum(props.value) // eslint-disable-line
      }
      initLanguage() // eslint-disable-line
    })

    onUpdated(() => {
      if (props.value !== history.value[historyIndex.value]) {
        clearTimeout(currentTimeout.value)
        currentTimeout.value = window.setTimeout(() => {
          props.value && saveHistory(props.value) // eslint-disable-line
        }, 500)
      }
    })

    watch(
      () => props.value,
      val => {
        if (val) {
          reLineNum(val) // eslint-disable-line
        }
      }
    )

    watch(
      () => props.subfield,
      val => {
        if (val !== subfield.value) {
          subfield.value = props.subfield
        }
      }
    )

    watch(
      () => props.preview,
      val => {
        if (val !== preview.value) {
          preview.value = props.preview
        }
      }
    )

    watch(
      () => props.expand,
      val => {
        if (val !== expand.value) {
          expand.value = props.expand
        }
      }
    )

    function initLanguage() {
      const lang = CONFIG.langList.indexOf(props.language) >= 0 ? props.language : 'zh-CN'
      words.value = CONFIG.language[lang]
    }

    function handleChange(e) {
      const target = e.target
      // props.onChange(target.value)
      emit('update:value', target.value)
    }

    // 保存记录
    function saveHistory(value) {
      // 撤销后修改，删除当前以后记录
      history.value.splice(historyIndex.value + 1, history.value.length)
      if (history.value.length >= 20) {
        history.value.shift()
      }
      // 记录当前位置
      historyIndex.value = history.value.length
      history.value.push(value)
    }

    // 重新计算行号
    function reLineNum(value) {
      lineIndex.value = value ? value.split('\n').length : 1
    }

    function save() {
      props.onSave($vm.value && $vm.value.value) // eslint-disable-line
    }

    function undo() {
      if (historyIndex.value < 0) {
        return
      }
      // props.onChange(history.value[historyIndex.value])
      emit('update:value', history.value[historyIndex.value])
      historyIndex.value = historyIndex.value - 1
    }

    function redo() {
      if (historyIndex.value >= history.value.length) {
        return
      }
      // props.onChange(history.value[historyIndex.value])
      emit('update:value', history.value[historyIndex.value])
      historyIndex.value = historyIndex.value + 1
    }

    function toolBarLeftClick(type) {
      const insertTextObj = {
        h1: {
          prefix: '# ',
          subfix: '',
          str: words.value.h1
        },
        h2: {
          prefix: '## ',
          subfix: '',
          str: words.value.h2
        },
        h3: {
          prefix: '### ',
          subfix: '',
          str: words.value.h3
        },
        h4: {
          prefix: '#### ',
          subfix: '',
          str: words.value.h4
        },
        img: {
          prefix: '![alt](',
          subfix: ')',
          str: 'url'
        },
        link: {
          prefix: '[title](',
          subfix: ')',
          str: 'url'
        },
        code: {
          prefix: '```',
          subfix: '\n\n```',
          str: 'language'
        },
        tab: {
          prefix: '  ',
          subfix: '',
          str: ''
        }
      }

      if (Object.prototype.hasOwnProperty.call(insertTextObj, type)) {
        if ($vm.value) {
          const value = insertText($vm.value, insertTextObj[type])
          // props.onChange(value)
          emit('update:value', value)
        }
      }

      const otherLeftClick = {
        undo,
        redo,
        save
      }
      if (Object.prototype.hasOwnProperty.call(otherLeftClick, type)) {
        otherLeftClick[type]()
      }
    }

    function addImg(file, index) {
      props.addImg(file, index)
    }

    // function $img2Url(name: string, url: string) {
    //   if ($vm.value) {
    //     const value = insertText($vm.value, {
    //       prefix: `![${name}](${url})`,
    //       subfix: '',
    //       str: ''
    //     })
    //     // props.onChange(value)
    //     emit('update:value', value)
    //   }
    // }

    function toolBarRightClick(type) {
      const toolbarRightPreviewClick = () => {
        preview.value = !preview.value
      }
      const toolbarRightExpandClick = () => {
        expand.value = !expand.value
      }

      const toolbarRightSubfieldClick = () => {
        if (preview.value) {
          if (subfield.value) {
            subfield.value = false
            preview.value = false
          } else {
            subfield.value = true
          }
        } else {
          if (subfield.value) {
            subfield.value = false
          } else {
            subfield.value = true
            preview.value = true
          }
        }
      }

      const rightClick = {
        preview: toolbarRightPreviewClick,
        expand: toolbarRightExpandClick,
        subfield: toolbarRightSubfieldClick
      }
      if (Object.prototype.hasOwnProperty.call(rightClick, type)) {
        rightClick[type]()
      }
    }

    function focusText() {
      $vm.value && $vm.value.focus() // eslint-disable-line
    }

    function handleScoll(e) {
      const currentTarget = e.currentTarget
      const radio = $blockEdit.value.scrollTop / ($scrollEdit.value.scrollHeight - currentTarget.offsetHeight)
      $blockPreview.value.scrollTop = ($scrollPreview.value.scrollHeight - $blockPreview.value.offsetHeight) * radio
    }

    return () => {
      const { placeholder, fontSize, disabled, height, style, toolbar } = props
      const editorClass = classNames({
        'for-editor-edit': true,
        'for-panel': true,
        'for-active': preview.value && subfield.value,
        'for-edit-preview': preview.value && !subfield.value
      })
      const previewClass = classNames({
        'for-panel': true,
        'for-editor-preview': true,
        'for-active': preview.value && subfield.value
      })
      const fullscreen = classNames({
        'for-container': true,
        'for-fullscreen': expand.value
      })
      const lineNumClass = classNames({
        'for-line-num': true,
        hidden: !props.lineNum
      })

      // 行号
      function lineNum() {
        const list = []
        for (let i = 0; i < lineIndex.value; i++) {
          list.push(<li key={i + 1}>{i + 1}</li>)
        }
        return <ul class={lineNumClass}>{list}</ul>
      }
      return (
        <div class={fullscreen} style={{ height, ...style }}>
          {/* 菜单栏 */}
          {!!Object.keys(toolbar).length && (
            <div class="for-toolbar">
              <ToolbarLeft
                {...props}
                toolbar={toolbar}
                words={words.value}
                onClick={toolBarLeftClick}
                addImg={addImg}
              />
              <ToolbarRight
                toolbar={toolbar}
                words={words.value}
                preview={preview.value}
                expand={expand.value}
                subfield={subfield.value}
                onClick={toolBarRightClick}
              />
            </div>
          )}
          {/* 内容区 */}
          <div class="for-editor" style={{ fontSize }}>
            {/* 编辑区 */}
            <div class={editorClass} ref={$blockEdit} onScroll={handleScoll} onClick={focusText}>
              <div class="for-editor-block" ref={$scrollEdit}>
                {lineNum()}
                <div class="for-editor-content">
                  <pre>{props.value} </pre>
                  <textarea
                    ref={$vm}
                    value={props.value}
                    disabled={disabled}
                    onInput={handleChange}
                    placeholder={placeholder || words.value.placeholder}
                  />
                </div>
              </div>
            </div>
            {/* 预览区 */}
            <div class={previewClass} ref={$blockPreview}>
              <div ref={$scrollPreview} class="for-preview for-markdown-preview" innerHTML={marked(props.value)}></div>
            </div>
          </div>
        </div>
      )
    }
  }
})
