import {useEffect} from 'react'
import {requestCode} from '@/utils/varbile'
import {toast,confirm} from '@/utils/function'
import {dataType} from './useDelte'
import useSetState from '@/hooks/useSetState'

type paramsType={
    id:string;
    status:string
}

type useChangeStatusType=(interfaces:Function,successCallBack:Function,params?:paramsType,data?:any)=>[(data:dataType)=>void]

const useChangeStatus:useChangeStatusType = (interfaces,successCallBack,params={id:'id',status:'status'},data={}) =>{
    const [receipt, setReceipt] = useSetState(data);
    useEffect(() => {
        if(receipt.id){
            confirm(async ()=>{
                    const {id,status}=params;
                    const val=receipt[status]==0?1:0;
                    let res=await interfaces({[id]:receipt.id,[status]:val});
                    if(res.code===requestCode.successCode){toast(); successCallBack && successCallBack();}
            },'确定要更改吗？');   
        }
        return ()=>{setReceipt({})}
    }, [receipt.id,receipt.listen]);
    return [setReceipt];
}
export default useChangeStatus