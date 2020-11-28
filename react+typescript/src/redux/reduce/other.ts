import * as types from '@/redux/constants/actionType'
import { actionType } from '@/redux/action/interfaces'
const initialState = {
  loading: false
};

export default (state = initialState, action: actionType) => {
  switch (action.type) {
    case types.LOADING_START:
      return { ...state, loading: true };
    case types.LOADING_END:
      return { ...state, loading: false };
    default:
      return state
  }
}
