import {useEffect} from 'react'
import {requestCode} from '@/utils/varbile'
import {toast,confirm} from '@/utils/function'
import useSetState from '@/hooks/useSetState'

export type dataType ={
    id:number;
    listen:number;
    [parms:string]:any
}

const useDel = (interfaces:Function,successCallBack:Function,data:any={}):[(data:dataType)=>void] =>{
    const [receipt, setReceipt] = useSetState(data);
    useEffect(() => {
        if(receipt.id){
            confirm(async ()=>{
                    let res=await interfaces({id:receipt.id});
                    if(res.code===requestCode.successCode){toast(requestCode.successCode,'删除成功'); successCallBack && successCallBack();}
            });  
        }
        return ()=>{setReceipt({})}
    }, [receipt.id,receipt.listen]); //receipt.listen,防止重复点击没效果
    return [setReceipt];
}
export default useDel;