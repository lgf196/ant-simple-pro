const getters = {
  loading: state => state.app.loading,
  collapsed: state => state.app.collapsed,
  sliderTheme: state => state.app.sliderTheme,
  tagsNavVisible: state => state.app.tagsNavVisible,
  user: state => state.user.currentUser,
  resourceList: state => state.user.resourceList,
  accessMenus: state => state.user.accessMenus
}
export default getters
