import { put, takeEvery ,call,takeLatest,takeLeading} from 'redux-saga/effects'
import {requestCode} from '@/utils/varbile'
import * as SAGA from '@/redux/constants/sagaType'
import {getAccessMenuList,getAccessMenu,userList,userInfo} from '@/api/login'
import {getMenuTree,getMenuList,getUserList,getUserInfo} from '@/redux/action/user'
import {menuAccessType,pagationType} from '@/interfaces'
import tools from '@/utils'
export interface sagaGetMenuListType {
    type:SAGA.SAGA_GETMENULIST;
    payload:pagationType
};
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
    *getMenuList({payload}:sagaGetMenuListType){
        try {
            const res:responseData=yield call(getAccessMenu,payload);
            let {list=[],total=0}=res.data;
            if(res.code===requestCode.successCode && list.length){
                list=list.map((item:menuAccessType)=>Object.assign({},item,{createTime:tools.formatDate(item.createTime,'YYYY-MM-DD hh:mm:ss')}));
            }
            yield put(getMenuList({list,total}))
        } catch (error) {
            yield put(getMenuList({list:[],total:0}));
        }
    },
    *getUserData(){
        try {
           
            const res:responseData=yield call(userList);
            res.code===requestCode.successCode &&  (yield put(getUserList(res.data)));
        } catch (error) {
            yield put(getUserList([]));
        }
    },
    *getUserInfoData(){
        try {
            const res:responseData=yield call(userInfo);
            res.code===requestCode.successCode &&  (yield put(getUserInfo(res.data)));
        } catch (error) {
             yield put(getUserInfo({}));
        }
    },
}
export default function* users(){
    yield takeEvery(SAGA.SAGA_GETMENUTREE, effects.getMenTree);
    yield takeLatest(SAGA.SAGA_GETMENULIST, effects.getMenuList);
    yield takeLatest(SAGA.SAGA_GET_USER_LIST, effects.getUserData);
    yield takeLeading(SAGA.SAGA_GET_USER_INFO, effects.getUserInfoData);
}