import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

const accessToken = 'accessToken'
const refreshToken = 'refreshToken'

export function getAccessToken() {
  return Cookies.get(accessToken)
}


export function getRefreshToken() {
  return Cookies.get(refreshToken)
}


// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

export function setAccessToken(token) {
  return Cookies.set(accessToken, token)
}

export function setRefreshToken(token) {
  return Cookies.set(refreshToken, token)
}
export function removeToken() {
  Cookies.remove(accessToken)
  Cookies.remove(refreshToken)
  return true
}
