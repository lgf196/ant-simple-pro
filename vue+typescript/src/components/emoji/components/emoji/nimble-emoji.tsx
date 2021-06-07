import { defineComponent, PropType } from 'vue'
import { getData, getSanitizedData, unifiedToNative } from '../../utils'
import { uncompress, Data } from '../../utils/data'
import { emojiPropTypes } from '../../utils/shared-props'
/* eslint-disable @typescript-eslint/camelcase */
const _getData = (props: Record<string, any>) => {
  const { emoji, skin, set, data } = props
  return getData(emoji, skin, set, data)
}

const _getPosition = (props: Record<string, any>) => {
  const { sheet_x, sheet_y } = _getData(props) as Record<string, number>
  const multiplyX = 100 / (props.sheetColumns - 1)
  const multiplyY = 100 / (props.sheetRows - 1)
  return `${multiplyX * sheet_x}% ${multiplyY * sheet_y}%`
}

const _getSanitizedData = (props: Record<string, any>) => {
  const { emoji, skin, set, data } = props
  return getSanitizedData(emoji, skin, set, data)
}

const _handleClick = (e: MouseEvent, props: Record<string, any>) => {
  if (!props.onClick) {
    return
  }
  const { onClick } = props
  const emoji = _getSanitizedData(props)
  onClick(emoji, e)
}

const _handleOver = (e: MouseEvent, props: Record<string, any>) => {
  if (!props.onOver) {
    return
  }
  const { onOver } = props
  const emoji = _getSanitizedData(props)
  onOver(emoji, e)
}

const _handleLeave = (e: MouseEvent, props: Record<string, any>) => {
  if (!props.onLeave) {
    return
  }
  const { onLeave } = props
  const emoji = _getSanitizedData(props)
  onLeave(emoji, e)
}

const _isNumeric = (value: any) => {
  return !isNaN(value - parseFloat(value))
}

const _convertStyleToCSS = (style: Record<string, string | number>) => {
  const div = document.createElement('div')

  for (const key in style) {
    let value = style[key]

    if (_isNumeric(value)) {
      value += 'px'
    }

    ;(div.style as any)[key] = value
  }

  return div.getAttribute('style')
}

const NimbleEmoji = defineComponent({
  name: 'NimbleEmoji',
  props: {
    ...emojiPropTypes,
    data: {
      type: Object as PropType<Data>,
      required: true
    }
  },
  setup(props, { slots }) {
    if (props.data && props.data.compressed) {
      uncompress(props.data)
    }

    return () => {
      const { emoji, skin, set, data } = props
      const currentData = getData(emoji, skin, set, data)
      // console.log('getData(emoji, skin, set, data)', getData(emoji, skin, set, data))
      if (!currentData) {
        if (props.fallback && emoji) {
          return props.fallback(null, emoji)
        }
        return null
      }

      let style: Record<string, any> = {}
      // combine the emoji itself and all shortcodes into an accessible label
      let label = ''
      let nativeEmoji = ''
      let title = ''
      let className = 'emoji-mart-emoji'
      let children = ''
      const { unified, custom, short_names, imageUrl, spriteUrl } = currentData as Record<string, any>
      label = [nativeEmoji].concat(short_names).filter(Boolean).join(', ')
      nativeEmoji = unified && unifiedToNative(unified)
      // console.log('unified', unified)
      // console.log('custom', custom)
      if (!unified && !custom) {
        if (props.fallback && emoji) {
          return props.fallback(currentData as Data, emoji)
        }
        return null
      }
      if (props.tooltip) {
        title = short_names[0]
      }
      // console.log('props.native', props.native)
      // console.log('unified', unified)
      if (props.native && unified) {
        className += ' emoji-mart-emoji-native'
        style = { fontSize: props.size + 'px' }
        children = nativeEmoji

        if (props.forceSize) {
          style.display = 'inline-block'
          style.width = props.size + 'px'
          style.height = props.size + 'px'
          style.wordBreak = 'keep-all'
        }
      } else if (custom) {
        className += ' emoji-mart-emoji-custom'
        style = {
          width: props.size + 'px',
          height: props.size + 'px',
          display: 'inline-block'
        }
        if (spriteUrl) {
          style = {
            ...style,
            backgroundImage: `url(${spriteUrl})`,
            backgroundSize: `${100 * props.sheetColumns}% ${100 * props.sheetRows}%`,
            backgroundPosition: _getPosition(props)
          }
        } else {
          style = {
            ...style,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }
        }
      } else {
        const setHasEmoji =
          (currentData as any)[`has_img_${props.set}`] === undefined || (currentData as any)[`has_img_${props.set}`]
        if (!setHasEmoji) {
          if (props.fallback && emoji) {
            return props.fallback(currentData as Data, emoji)
          }
          return null
        }
        style = {
          width: props.size + 'px',
          height: props.size + 'px',
          display: 'inline-block',
          backgroundImage: `url(${props.backgroundImageFn(props.set, props.sheetSize)})`,
          backgroundSize: `${100 * props.sheetColumns}% ${100 * props.sheetRows}%`,
          backgroundPosition: _getPosition(props)
        }
      }

      const Tag = {
        name: 'span',
        props: {}
      }

      if (props.onClick && props.useButton) {
        Tag.name = 'button'
        Tag.props = {
          type: 'button'
        }
      }

      if ((props as any).html) {
        return `<${Tag.name} style='${_convertStyleToCSS(style)}' aria-label='${label}' ${
          title ? `title='${title}'` : ''
        } class='${className}'>${slots.default ? slots.default() : children}</${Tag.name}>`
      }
      // console.log(style)
      return (
        <button
          onClick={(e: MouseEvent) => _handleClick(e, props)}
          onMouseenter={(e: MouseEvent) => _handleOver(e, props)}
          onMouseleave={(e: MouseEvent) => _handleLeave(e, props)}
          aria-label={label}
          title={title}
          class={className}
          {...Tag.props}
        >
          <span style={style}>{slots.default ? slots.default() : children}</span>
        </button>
      )
    }
  }
})

export default NimbleEmoji
