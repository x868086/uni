const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // token: state => state.user.token,
  accessToken: state => state.user.accessToken,
  refreshToken: state => state.user.refreshToken,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  roles: state => state.user.roles,
  orgdesc: state => state.user.orgdesc,
  permission_routes: state => state.permission.routes
}
export default getters
