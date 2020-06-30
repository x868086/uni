// import { login, getInfo, logout } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'

import { login, getInfo } from '@/api/user'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    nickname: '',
    avatar: '',
    roles: [],
    orgdesc: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  SET_ACCESSTOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_REFRESHTOKEN: (state, refreshToken) => {
    state.refreshToken = refreshToken
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, role) => {
    state.roles = role
  },
  SET_ROLESNAME: (state, rolesname) => {
    state.rolesname = rolesname
  },
  SET_ORG: (state, orgdesc) => {
    state.orgdesc = orgdesc
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), secret: password }).then(response => {
        // const { data } = response
        const { accessToken, refreshToken } = response
        // commit('SET_TOKEN', data.token)
        commit('SET_ACCESSTOKEN', accessToken)
        commit('SET_REFRESHTOKEN', refreshToken)
        // setToken(data.token)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({ accessToken: state.accessToken }).then(response => {
        const { nick_name, org_desc, roles, roles_name } = response
        if (!roles) {
          reject('登录过程出错,请重新登录.')
        }


        // 用户昵称截取最后一位字符，在前端用圆形元素内嵌名字最后一位字符实现
        let avatar = nick_name.substr(-1)

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('用户角色信息为非空数组.')
        }

        commit('SET_ROLES', roles)
        commit('SET_ROLESNAME', roles_name)
        commit('SET_NICKNAME', nick_name)
        commit('SET_ORG', org_desc)
        commit('SET_AVATAR', avatar)
        // resolve(data)
        // resolve(response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })


      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

