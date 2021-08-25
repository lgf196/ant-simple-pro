export interface HSLColor {
  a?: number
  h: number
  l: number
  s: number
}

export interface RGBColor {
  a?: number
  b: number
  g: number
  r: number
}

export interface HSVColor {
  a?: number
  h: number
  s: number
  v: number
}

export interface ColorResult {
  a: number
  hex: string
  hex8: string
  hsl: HSLColor
  rgba: RGBColor
  hsv: HSVColor
  oldHue: number
  source?: string
}

export type CalculateChangeProps = {
  direction?: string
  hsl: {
    h: number
    l: number
    s: number
    a?: number
  }
  a?: number
}

export interface CalculateChangeFn {
  (e: MouseEvent | TouchEvent, props: CalculateChangeProps, container: HTMLElement): {
    h: number
    s: number
    l: number
    a: number
    source: string
  } | null
}

export type AlphaChangeData = {
  h: number
  l: number
  s: number
  a: number
  source: 'rgba'
}

export type HueChangeData = {
  h: number
  l: number
  s: number
  a?: number
  source: 'hsl'
}

export type SaturationChangeData = {
  a?: number
  h: number
  s: number
  v: number
  source: 'hsva'
}

export type HEXChangeData = {
  hex: string
  source: 'hex'
}

export type RGBAChangeData = {
  r: number
  g: number
  b: number
  a: number
  source: 'rgba'
}

export type HSLChangeData = {
  h: number
  l: number
  s: number
  source: 'hsl'
}

export type HSVChangeData = {
  h: number
  s: number
  v: number
  source: 'hsv'
}

export type ColorChangeValue =
  | SaturationChangeData
  | HueChangeData
  | AlphaChangeData
  | HEXChangeData
  | RGBAChangeData
  | HSLChangeData
  | HSVChangeData
