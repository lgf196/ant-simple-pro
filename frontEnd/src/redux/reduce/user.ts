import {GETMENUTREE} from '@/redux/constants/actionType'

const  initialState={
    getMenuTree:[]
};

export default (state = initialState, action:any)=> {
    switch (action.type) {
        case GETMENUTREE:
            return {...state,getMenuTree:action.data};
        default: 
            return state
    }
}