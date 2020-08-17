import { put, takeEvery ,call,takeLatest} from 'redux-saga/effects'
import {requestCode} from '@/utils/varbile'
import * as SAGA from '@/redux/constants/sagaType'
import {getAccessMenuList,getAccessMenu} from '@/api/login'
import {getMenuTree,getMenuList} from '@/redux/action/user'
import {menuAccessType} from '@/interfaces'
import tools from '@/utils'
export const effects={
    *getMenTree(){
       try {
        const res:responseData=yield call(getAccessMenuList);
            if (res.code===requestCode.successCode) {
              yield put(getMenuTree(res.data));
            }
       } catch (error) {
            yield put(getMenuTree([]));
       }
    },
    *getMenuList(){
        try {
            const res:responseData=yield call(getAccessMenu);
            res.code===requestCode.successCode &&  (yield put(getMenuList(res.data.map((item:menuAccessType)=>Object.assign({},item,{createTime:tools.formatDate(item.createTime,'YYYY-MM-DD hh:mm:ss')})))));
        } catch (error) {
            yield put(getMenuList([]));
        }
    }
}
export default function* users(){
    yield takeEvery(SAGA.SAGA_GETMENUTREE, effects.getMenTree);
    yield takeLatest(SAGA.SAGA_GETMENULIST, effects.getMenuList);
}