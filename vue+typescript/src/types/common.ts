export interface SelectListItemType<T = number> {
  label: string
  value: T
}

export interface ChartDataItem {
  name: string
  value: number
}

export type AnyFunction<P = any, T = any> = (...args: P[]) => T
