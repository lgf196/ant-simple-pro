/// <reference types="amap-js-api" />

interface ChartDataItem {
  name: string
  value: number
}

interface AnyFunction<P = any, T> {
  (...args: P[]): T
}


module 'material-colors' {
  const material: Record<string, Record<string, string>>
  export default material
}
