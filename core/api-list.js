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
]

const whiteList = [
    { requestRegexp: /\/v1\/users\/verify/ },
    { requestRegexp: /\/v1\/users\/tokenrefresh/ }
]


module.exports = {
    apiList,
    whiteList
}