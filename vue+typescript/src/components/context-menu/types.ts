export type Position = {
  x: number
  y: number
}

export type ContextMenuItem = {
  label: string
  icon?: string
  disabled?: boolean
  handler?: (...rest: any[]) => void
  children?: ContextMenuItem[]
}

export type ContextMenuProps = {
  menuClass?: string
  menus: ContextMenuItem[]
  position?: Position
  width?: number
}

export type ItemContentProps = {
  item: ContextMenuItem
  handler: (...rest: any[]) => void
}

export type CreateContextOptions = ContextMenuProps & {
  event: MouseEvent
}
