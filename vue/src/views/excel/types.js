export const excelHeader = ['Id', 'Email', '名称', '介绍', '头像']

export const excelKeyList = ['id', 'email', 'username', 'introduct', 'iconUrl']

export function normalizeExcelData(list, keys) {
  return list.map(item => keys.map(v => item[v]))
}
