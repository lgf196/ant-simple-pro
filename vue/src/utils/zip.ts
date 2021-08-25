import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export function exportTxtToZip(th: string[], jsonData: any[][], txtName: string, zipName: string) {
  return new Promise((resolve, reject) => {
    const zip = new JSZip()
    const fileTxtName = txtName || 'file'
    const fileZipName = zipName || 'file'
    const data = jsonData
    let txtData = `${th}\r\n`
    data.forEach(row => {
      let tempStr = ''
      tempStr = row.toString()
      txtData += `${tempStr}\r\n`
    })
    zip.file(`${fileTxtName}.txt`, txtData)
    zip
      .generateAsync({
        type: 'blob'
      })
      .then(
        blob => {
          saveAs(blob, `${fileZipName}.zip`)
          resolve(true)
        },
        err => {
          alert('导出失败')
          reject(err)
        }
      )
  })
}
