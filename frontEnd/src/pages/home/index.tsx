import React, { memo } from 'react'
import {xlsxFileDown} from '@/api/login'
import { Button } from 'antd';
import {requestCode} from '@/utils/varbile'
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
    return (
        <>
            <Button type="primary" onClick={downFile}>xlsx文件下载</Button>
        </>
    )
})
export default index
