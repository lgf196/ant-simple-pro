import React from 'react'
import { Upload,Modal} from 'antd'
import { PlusOutlined} from '@ant-design/icons';
import {UploadProps,UploadChangeParam} from 'antd/lib/upload'
import {requestCode} from '@/utils/varbile'
import {toast} from '@/utils/function'
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';

export interface ImgUploadProps extends UploadProps{
    limit:number
}
export interface ImgUploadState{
    previewVisible:boolean;
    previewImage:string;
}
export type ImgUploadFile=UploadFile;  //导出文件类型

class ImgUpload extends React.Component<ImgUploadProps,ImgUploadState> {
    static defaultProps={  
        action:'api/fileUpload',
        fileList:[],
        limit:10
    };
    constructor(props: ImgUploadProps) {
        super(props);
        this.state ={
            previewVisible:false,
            previewImage:''
        }
    }
    handlePreview=(file:UploadFile)=>{
        this.setState({
            previewImage: file.url!,
            previewVisible: true
        });
    }
    handleCurrencyChange = (currency:UploadChangeParam) => {
        let fileList:Partial<UploadFile>[]=[...currency.fileList] || [];
        const { onChange} = this.props;
        if(currency.file.status=='done'){
            fileList=fileList.map(item=>{
                let filterData=null;
                    if(item.response) {
                        const response=item.response;
                        if(response.code===requestCode.successCode){
                            filterData={uid:item.uid,response,url:response.data.url,status:'success' as UploadFileStatus}; //必须含有uid
                        }
                    }
                return filterData || {uid:item.uid,status:'error',response:{},thumbUrl:item.thumbUrl};
            });
        }else if(currency.file.status=='error'){
            toast(requestCode.failedCode,'上传失败');
            fileList=fileList.map((item,index)=>index===fileList.length-1?{uid:currency.file.uid,status:'error',response:'服务异常',thumbUrl:item.thumbUrl}:item);
        }
        onChange &&  onChange(fileList as unknown as  UploadChangeParam<UploadFile>);
    }
    render() { 
        const {fileList,action,limit} =this.props
        const {previewVisible,previewImage}=this.state;
        return ( 
            <>
                <Upload name="file"  
                {...this.props}
                    onChange={this.handleCurrencyChange} 
                    fileList={fileList} action={action} 
                    onPreview={this.handlePreview}
                    listType="picture-card">
                    {fileList!.length>=limit?null:<PlusOutlined/>} 
                </Upload>
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={()=> this.setState({previewVisible:false})}
                >
                    <img alt="example" style={{ width: '100%'}} src={previewImage} />
                </Modal>
            </>
         );
    }
}
export default ImgUpload;
