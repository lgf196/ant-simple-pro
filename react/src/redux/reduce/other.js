import * as types from '@/redux/constants/actionType'

export const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_START:
      return { ...state, loading: true };
    case types.LOADING_END:
      return { ...state, loading: false };
    default:
      return state
  }
}
