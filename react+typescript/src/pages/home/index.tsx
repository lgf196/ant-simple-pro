import React, { memo } from 'react'
import {xlsxFileDown} from '@/api/login'
import {requestCode} from '@/utils/varbile'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import tools from '@/utils'
const index = memo(function index(props) {
    const downFile=async ()=>{
         let res=await xlsxFileDown();
         if(res.code===requestCode.successCode){
            let delBuffer = Buffer.from(res.data, "binary");
            const blob = new Blob([delBuffer], { type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            let url = window.URL.createObjectURL(blob);
            tools.createALabel(url);
        }
    }
    const parps = {
        name:'file',
        action:'api/fileUpload',
        onChange(info:any) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        data:{
            a:33
        }
      };
    return (
        <>
            <Button type="primary" onClick={downFile}>xlsx文件下载</Button>
            <Upload {...parps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>,
        </>
    )
})
export default index
