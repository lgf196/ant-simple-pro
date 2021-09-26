import { saveAs } from 'file-saver';
import JSZip from 'jszip';

/**
 * @description txt压缩文件
 * @param  th 头部
 * @param jsonData 导出的数据
 * @param  txtName 导出txt的名字
 * @param  zipName 导出压缩包的名字
 * @returns 文件流
 */

export function export_txt_to_zip(th:string[], jsonData:any[][], txtName:string, zipName:string):Promise<void> {
  return new Promise((resolve, reject)=>{
    const zip = new JSZip()
    const txt_name = txtName || 'file'
    const zip_name = zipName || 'file'
    const data = jsonData
    let txtData = `${th}\r\n`
    data.forEach((row:string[]) => {
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
