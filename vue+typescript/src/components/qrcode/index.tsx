import { defineComponent, PropType, ref, onMounted, toRefs, unref, watch, onBeforeUpdate } from 'vue'
import QRCode from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
import { omit } from 'lodash'

type Modules = Array<Array<boolean>>
type Excavation = {
  x: number
  y: number
  w: number
  h: number
}

function convertStr(str: string) {
  let out = ''
  for (let i = 0; i < str.length; i++) {
    let charcode = str.charCodeAt(i)
    if (charcode < 0x0080) {
      out += String.fromCharCode(charcode)
    } else if (charcode < 0x0800) {
      out += String.fromCharCode(0xc0 | (charcode >> 6))
      out += String.fromCharCode(0x80 | (charcode & 0x3f))
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      out += String.fromCharCode(0xe0 | (charcode >> 12))
      out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f))
      out += String.fromCharCode(0x80 | (charcode & 0x3f))
    } else {
      i++
      charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      out += String.fromCharCode(0xf0 | (charcode >> 18))
      out += String.fromCharCode(0x80 | ((charcode >> 12) & 0x3f))
      out += String.fromCharCode(0x80 | ((charcode >> 6) & 0x3f))
      out += String.fromCharCode(0x80 | (charcode & 0x3f))
    }
  }
  return out
}

type QRProps = {
  canvasClass: string
  value: string
  size: number
  level: 'L' | 'M' | 'Q' | 'H'
  bgColor: string
  fgColor: string
  style?: Record<string, any>
  includeMargin: boolean
  imageSettings?: {
    src: string
    height: number
    width: number
    excavate: boolean
    x?: number
    y?: number
  }
}

// const DEFAULT_PROPS = {
//   size: 128,
//   level: 'L',
//   bgColor: '#FFFFFF',
//   fgColor: '#000000',
//   includeMargin: false
// }

const MARGIN_SIZE = 4
const DEFAULT_IMG_SCALE = 0.1

function generatePath(modules: Modules, margin = 0) {
  const ops: string[] = []
  modules.forEach((row, y) => {
    let start: number | null = null
    row.forEach((cell, x) => {
      if (!cell && start !== null) {
        ops.push(`M${start + margin} ${y + margin}h${x - start}v1H${start + margin}z`)
        start = null
        return
      }

      if (x === row.length - 1) {
        if (!cell) {
          return
        }
        if (start === null) {
          ops.push(`M${x + margin},${y + margin} h1v1H${x + margin}z`)
        } else {
          ops.push(`M${start + margin},${y + margin} h${x + 1 - start}v1H${start + margin}z`)
        }
        return
      }

      if (cell && start === null) {
        start = x
      }
    })
  })
  return ops.join('')
}

function excavateModules(modules: Modules, excavation: Excavation) {
  return modules.slice().map((row, y) => {
    if (y < excavation.y || y >= excavation.y + excavation.h) {
      return row
    }
    return row.map((cell, x) => {
      if (x < excavation.x || x >= excavation.x + excavation.w) {
        return cell
      }
      return false
    })
  })
}

function getImageSettings(
  props: QRProps,
  cells: Modules
): null | {
  x: number
  y: number
  h: number
  w: number
  excavation: Excavation | null
} {
  const { imageSettings, size, includeMargin } = props
  if (imageSettings == null) {
    return null
  }
  const margin = includeMargin ? MARGIN_SIZE : 0
  const numCells = cells.length + margin * 2
  const defaultSize = Math.floor(size * DEFAULT_IMG_SCALE)
  const scale = numCells / size
  const w = (imageSettings.width || defaultSize) * scale
  const h = (imageSettings.height || defaultSize) * scale
  const x = imageSettings.x == null ? cells.length / 2 - w / 2 : imageSettings.x * scale
  const y = imageSettings.y == null ? cells.length / 2 - h / 2 : imageSettings.y * scale

  let excavation = null
  if (imageSettings.excavate) {
    const floorX = Math.floor(x)
    const floorY = Math.floor(y)
    const ceilW = Math.ceil(w + x - floorX)
    const ceilH = Math.ceil(h + y - floorY)
    excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH }
  }

  return { x, y, h, w, excavation }
}

const SUPPORTS_PATH2D = (function () {
  try {
    new Path2D().addPath(new Path2D())
  } catch (e) {
    return false
  }
  return true
})()

export default defineComponent({
  name: 'Qrcode',
  props: {
    canvasClass: {
      type: String,
      default: ''
    },
    value: {
      required: true,
      type: String
    },
    size: {
      type: Number,
      default: 128
    },
    level: {
      type: String as PropType<'L' | 'M' | 'Q' | 'H'>,
      validator: (value: string) => {
        return ['L', 'M', 'Q', 'H'].indexOf(value) >= 0
      },
      default: 'L'
    },
    bgColor: {
      type: String,
      default: '#FFFFFF'
    },
    fgColor: {
      type: String,
      default: '#000000'
    },
    style: {
      type: Object as PropType<Record<string, any>>
    },
    includeMargin: {
      type: Boolean,
      default: false
    },
    imageSettings: {
      type: Object as PropType<{
        src: string
        height: number
        width: number
        excavate: boolean
        x?: number
        y?: number
      }>
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    const imageRef = ref<HTMLImageElement | null>(null)
    const initial = ref(false)
    const imgLoaded = ref(false)

    onMounted(() => {
      const imageValue = imageRef.value
      if (imageValue && imageValue.complete) {
        handleImageLoad() // eslint-disable-line
      }
      update() // eslint-disable-line
    })

    onBeforeUpdate(() => {
      if (initial.value) {
        setTimeout(() => {
          update() // eslint-disable-line
        }, 20)
      }
      initial.value = true
    })

    function handleImageLoad() {
      imgLoaded.value = true
      update() // eslint-disable-line
    }

    function update() {
      const { value, size, level, bgColor, fgColor, includeMargin, imageSettings } = toRefs(props)
      const qrcode = new QRCode(-1, ErrorCorrectLevel[level.value])
      qrcode.addData(convertStr(unref(value)))
      qrcode.make()

      const canvas = canvasRef.value

      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          return
        }
        let cells = qrcode.modules
        if (!cells) {
          return
        }
        const margin = includeMargin.value ? MARGIN_SIZE : 0
        const numCells = cells.length + margin * 2
        const calculatedImageSettings = getImageSettings(props, cells)
        if (imageSettings !== null && calculatedImageSettings !== null) {
          if (calculatedImageSettings.excavation !== null) {
            cells = excavateModules(cells, calculatedImageSettings.excavation)
          }
        }
        const pixelRatio = window.devicePixelRatio || 1
        canvas.height = canvas.width = size.value * pixelRatio
        const scale = (size.value / numCells) * pixelRatio
        ctx.scale(scale, scale)

        ctx.fillStyle = bgColor.value
        ctx.fillRect(0, 0, numCells, numCells)

        ctx.fillStyle = fgColor.value

        if (SUPPORTS_PATH2D) {
          // $FlowFixMe: Path2D c'tor doesn't support args yet.
          ctx.fill(new Path2D(generatePath(cells, margin)))
        } else {
          cells.forEach((row, rdx) => {
            row.forEach((cell, cdx) => {
              if (cell) {
                ctx.fillRect(cdx + margin, rdx + margin, 1, 1)
              }
            })
          })
        }
        if (imgLoaded.value && imageRef.value && calculatedImageSettings !== null) {
          ctx.drawImage(
            imageRef.value,
            calculatedImageSettings.x + margin,
            calculatedImageSettings.y + margin,
            calculatedImageSettings.w,
            calculatedImageSettings.h
          )
        }
      }
    }

    watch(
      () => props.imageSettings,
      (value, oldValue) => {
        if (value?.src !== oldValue?.src) {
          imgLoaded.value = false
        }
      }
    )

    return () => {
      const { size, style, imageSettings, canvasClass, ...otherProps } = omit(props, [
        'value',
        'level',
        'bgColor',
        'fgColor',
        'includeMargin'
      ])
      const canvasStyle = { height: size, width: size, ...style }
      let img = null
      const imgSrc = imageSettings && imageSettings.src
      if (imageSettings != null && imgSrc != null) {
        img = <img src={imgSrc} style={{ display: 'none' }} onLoad={handleImageLoad} ref={imageRef} />
      }
      return (
        <>
          <canvas class={canvasClass} style={canvasStyle} height={size} width={size} ref={canvasRef} {...otherProps} />
          {img}
        </>
      )
    }
  }
})
