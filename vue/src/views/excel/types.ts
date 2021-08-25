import { UserListItem } from '@/views/user/types'

export const excelHeader = ['Id', 'Email', '名称', '介绍', '头像']

export const excelKeyList: (keyof UserListItem)[] = ['id', 'email', 'username', 'introduct', 'iconUrl']

export function normalizeExcelData<T, K extends keyof T>(list: T[], keys: K[]) {
  return list.map(item => keys.map(v => item[v]))
}
