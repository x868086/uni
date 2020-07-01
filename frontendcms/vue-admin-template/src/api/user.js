import request from '@/utils/request';
import axios from 'axios';

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/users/verify',
    method: 'post',
    data,
  });
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(data) {
  return request({
    url: '/users/tokenverify',
    method: 'post',
    data,
  });
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }

export function tokenRefresh(token) {
  return axios
    .get(`${process.env.VUE_APP_BASE_API}/users/tokenrefresh`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      // return error
      return Promise.reject(error);
    });
}
