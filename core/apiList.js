// apiList记录着后端api接口中需要设定权限才能访问的接口信息
const apiList = [
    { requestRegexp: /\/v1\/users\/create/, apiScope: 66 },
    { requestRegexp: /\/v1\/users\/\w*\/enable/, apiScope: 66 },
    { requestRegexp: /\/v1\/users\/\w*\/remove/, apiScope: 66 },
    { requestRegexp: /\/v1\/users\/list/, apiScope: 66 }
]


module.exports = {
    apiList
}