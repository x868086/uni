const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  // token: state => state.user.token,
  accessToken: (state) => state.user.accessToken,
  refreshToken: (state) => state.user.refreshToken,
  avatar: (state) => state.user.avatar,
  nickname: (state) => state.user.nickname,
  roles: (state) => state.user.roles,
  rolesname: (state) => state.user.rolesname,
  orgdesc: (state) => state.user.orgdesc,
  channelId: (state) => state.user.channelId,
  permission_routes: (state) => state.permission.routes,
  channelArray: (state) => state.user.channelArray
}
export default getters
