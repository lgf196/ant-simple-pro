import { useEffect } from 'react'
import { requestCode } from '@/utils/varbile'
import { confirm } from '@/utils/function'
import useSetState from '@/hooks/useSetState'

const useDel = (interfaces, successCallBack, data = {}) => {
  const [receipt, setReceipt] = useSetState(data);

  useEffect(() => {
    if (receipt.id) {
      confirm(async () => {
        let res = await interfaces({ id: receipt.id, ...receipt });
        if (res.code === requestCode.successCode) { successCallBack && successCallBack(); }
      });
    }
    return () => { setReceipt({}) }
  }, [receipt.id, receipt.listen]); // receipt.listen,防止重复点击没效果

  return [setReceipt];
}
export default useDel;
