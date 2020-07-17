// apiList记录着后端api接口中需要设定权限才能访问的接口信息, 白名单接口默认apiScope：1
const apiList = [
  // users
  { requestRegexp: /\/v1\/users\/create/, apiScope: 66 },
  { requestRegexp: /\/v1\/users\/\w*\/enable/, apiScope: 66 },
  { requestRegexp: /\/v1\/users\/\w*\/remove/, apiScope: 66 },
  { requestRegexp: /\/v1\/users\/\w*\/search/, apiScope: 66 },
  { requestRegexp: /\/v1\/users\/\w*\/modify/, apiScope: 66 },
  { requestRegexp: /\/v1\/users\/security/, apiScope: 1 },
  { requestRegexp: /\/v1\/users\/smscode/, apiScope: 1 },
  { requestRegexp: /\/v1\/users\/list/, apiScope: 66 },

  // role
  { requestRegexp: /\/v1\/role\/create/, apiScope: 66 },
  { requestRegexp: /\/v1\/role\/\w*\/remove/, apiScope: 66 },
  { requestRegexp: /\/v1\/role\/\w*\/enable/, apiScope: 66 },
  { requestRegexp: /\/v1\/role\/\w*\/modify/, apiScope: 66 },
  { requestRegexp: /\/v1\/role\/\w*\/search/, apiScope: 66 },
  { requestRegexp: /\/v1\/role\/list/, apiScope: 66 },

  // b2iserial
  { requestRegexp: /\/v1\/b2iserial\/list/, apiScope: 24 },
  { requestRegexp: /\/v1\/b2iserial\/\w*\/search/, apiScope: 24 },
  { requestRegexp: /\/v1\/b2iserial\/\w*\/modify/, apiScope: 24 },
  { requestRegexp: /\/v1\/b2iserial\/\w*\/allocate/, apiScope: 48 },
  { requestRegexp: /\/v1\/b2iserial\/\w*\/reject/, apiScope: 48 },
  { requestRegexp: /\/v1\/b2iserial\/\w*\/remove/, apiScope: 48 },

  // threshold
  { requestRegexp: /\/v1\/threshold\/list/, apiScope: 48 },
  { requestRegexp: /\/v1\/threshold\/\w*\/bingo/, apiScope: 24 },
  { requestRegexp: /\/v1\/threshold\/search/, apiScope: 48 },
  { requestRegexp: /\/v1\/threshold\/create/, apiScope: 48 },
  { requestRegexp: /\/v1\/threshold\/modify/, apiScope: 48 },
  { requestRegexp: /\/v1\/threshold\/enable/, apiScope: 48 },
  { requestRegexp: /\/v1\/threshold\/remove/, apiScope: 48 },

  //actions
  { requestRegexp: /\/v1\/thomas\/uploadfile/, apiScope: 48 },
  { requestRegexp: /\/v1\/thomas\/getlist/, apiScope: 48 },
  { requestRegexp: /\/v1\/thomas\/removefile/, apiScope: 48 },
  { requestRegexp: /\/v1\/thomas\/rollingrow/, apiScope: 48 },

  //specialserial
  { requestRegexp: /\/v1\/middleplatform\/\w*\/specialserial-search/, apiScope: 30 },
];

const whiteList = [
  { requestRegexp: /\/v1\/users\/verify/ },
  { requestRegexp: /\/v1\/users\/tokenrefresh/ },
  { requestRegexp: /\/v1\/users\/tokenverify/ },
];

module.exports = {
  apiList,
  whiteList,
};
