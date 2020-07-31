import { put, takeEvery ,call,select} from 'redux-saga/effects'
import {requestCode} from '@/utils/varbile'
import * as SAGA from '@/redux/constants/sagaType'
import {getAccessMenuList} from '@/api/login'
import {getMenuTree} from '@/redux/action/user'

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
}
export default function* users(){
    yield takeEvery(SAGA.SAGA_GETMENUTREE, effects.getMenTree);
}