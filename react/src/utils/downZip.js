import { saveAs } from 'file-saver';
import JSZip from 'jszip';

/**
 * @description txt压缩文件
 * @param { Array<string> } th 头部
 * @param { Array<any[]> } jsonData 导出的数据
 * @param { string } txtName 导出txt的名字
 * @param { string } zipName 导出压缩包的名字
 * @returns {Promise<Blob>} 文件流
 */
export function export_txt_to_zip(th, jsonData, txtName, zipName) {
  return new Promise((resolve, reject)=>{
    const zip = new JSZip()
    const txt_name = txtName || 'file'
    const zip_name = zipName || 'file'
    const data = jsonData
    let txtData = `${th}\r\n`
    data.forEach((row) => {
      let tempStr = ''
      tempStr = row.toString()
      txtData += `${tempStr}\r\n`
    })
    zip.file(`${txt_name}.txt`, txtData);
    zip.generateAsync({
      type: "blob"
    }).then((blob) => {
      resolve(saveAs(blob, `${zip_name}.zip`))
    }, (err) => {
      reject(err);
      alert('导出失败')
    })
  });
}
