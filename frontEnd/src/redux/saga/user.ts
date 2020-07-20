import { put, takeEvery ,call,select} from 'redux-saga/effects'
import {requestCode} from '@/utils/varbile'
import {SAGA_GETMENUTREE} from '@/redux/constants/sagaType'
export const effects={
    *getMenTree(){
       try {
           
       } catch (error) {
           
       }
    },
}
export default function* access(){
    yield takeEvery(SAGA_GETMENUTREE, effects.getMenTree);
 }