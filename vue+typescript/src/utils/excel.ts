import XLSX, { BookType } from 'xlsx'
import { saveAs } from 'file-saver'

function datenum(v: any, date1904?: boolean) {
  if (date1904) v += 1462
  const epoch = Date.parse(v)
  return (
    (epoch - ((new Date(Date.UTC(1899, 11, 30)) as unknown) as number)) /
    (24 * 60 * 60 * 1000)
  )
}

function sheetFromArrayOfArrays(data: any) {
  const ws: any = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R
      if (range.s.c > C) range.s.c = C
      if (range.e.r < R) range.e.r = R
      if (range.e.c < C) range.e.c = C
      const cell: Record<string, any> = {
        v: data[R][C]
      }
      if (cell.v == null) continue
      const cellRef = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === 'number') cell.t = 'n'
      else if (typeof cell.v === 'boolean') cell.t = 'b'
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = (XLSX.SSF as any)._table[14]
        cell.v = datenum(cell.v)
      } else cell.t = 's'

      ws[cellRef] = cell
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
  return ws
}

class Workbook {
  SheetNames: any[]
  Sheets: any
  constructor() {
    this.SheetNames = []
    this.Sheets = {}
    if (!(this instanceof Workbook)) {
      return new Workbook()
    }
  }
}

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff
  }
  return buf
}

export type ExportJsonToExcelType = {
  multiHeader?: any[]
  header: string[]
  data: any[][]
  filename: string
  merges?: any[]
  autoWidth: boolean
  bookType: BookType
}

export function exportJsonToExcel(options: ExportJsonToExcelType) {
  const {
    multiHeader = [],
    header,
    data,
    filename,
    merges = [],
    autoWidth = true,
    bookType = 'xlsx'
  } = options || {}
  const downloadFilename = filename || 'excel-list'
  const cloneData = data.slice()
  cloneData.unshift(header)

  for (let i = multiHeader.length - 1; i > -1; i--) {
    cloneData.unshift(multiHeader[i])
  }

  const wsName = 'SheetJS'
  const wb = new Workbook()
  const ws = sheetFromArrayOfArrays(cloneData)

  if (merges.length > 0) {
    if (!ws['!merges']) ws['!merges'] = []
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }

  if (autoWidth) {
    /* 设置worksheet每列的最大宽度*/
    const colWidth = cloneData.map(row =>
      row.map(val => {
        /* 先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10
          }
        } else if (val.toString().charCodeAt(0) > 255) {
          /* 再判断是否为中文*/
          return {
            wch: val.toString().length * 2
          }
        }
        return {
          wch: val.toString().length
        }
      })
    )
    /* 以第一行为初始值*/
    const result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j].wch < colWidth[i][j].wch) {
          result[j].wch = colWidth[i][j].wch
        }
      }
    }
    ws['!cols'] = result
  }

  /* add worksheet to workbook */
  wb.SheetNames.push(wsName)
  wb.Sheets[wsName] = ws

  const wbout = XLSX.write(wb, {
    bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(
    new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    }),
    `${downloadFilename}.${bookType}`
  )
}
