import * as types from '@/redux/constants/actionType'

export const initialState = {
  getMenuTree: [],
  loadingMenuTree: false,
  getMenuList: {
    list: [],
    total: 0
  },
  getUserList: [],
  getUserInfo: {},
  loadingUserInfo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GETMENUTREE:
      return { ...state, getMenuTree: action.data };
    case types.LOADING_MENU_TREE:
      return { ...state, loadingMenuTree: action.data };
    case types.GETMENULIST:
      return { ...state, getMenuList: action.data };
    case types.GET_USER_LIST:
      return { ...state, getUserList: action.data };
    case types.GET_USER_INFO:
      return { ...state, getUserInfo: action.data }
    case types.LOADING_USER_INFO:
      return { ...state, loadingUserInfo: action.data }
    default:
      return state
  }
}
