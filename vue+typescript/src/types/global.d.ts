/// <reference types="amap-js-api" />

interface ChartDataItem {
  name: string
  value: number
}

interface AnyFunction<P = any, T> {
  (...args: P[]): T
}
