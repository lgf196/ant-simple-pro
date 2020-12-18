import { RootState } from './index'
const getters = {
  loading: (state: RootState) => state.app.loading,
  collapsed: (state: RootState) => state.app.collapsed,
  user: (state: RootState) => state.user.currentUser,
  accessMenus: (state: RootState) => state.user.accessMenus
}
export default getters
