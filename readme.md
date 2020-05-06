# 业务流程图
##  登录

```flow
st=>start: Login
e=>end: End
op1=>operation: auth_user
op2=>operation: save_token[cookie,storage]
sub1=>subroutine: get_proxy
op3=>operation: get_userinfo
op4=>operation: create_vuex_routerlist
op5=>operation: beforeEach()
op6=>operation: addRouters()
op7=>operation: next()
op8=>operation: next("/login")
op9=>operation: next("/)

cond1=>condition: empty_token?
cond2=>condition: whiteList?
cond3=>condition: roles_downloaded?
cond4=>condition: is_path_login?

io1=>inputoutput: token
io2=>inputoutput: rolelist

st->op1(right)->io1->op2->op3->io2->op4->op6->op5->cond1
cond1(yes)->cond2
cond2(yes)->op7->e
cond2(no)->op8->e
cond1(no)->cond4
cond4(yes)->op9->e
cond4(no)->cond3
cond3(yes)->op7
cond3(no)->op3

```

## B2I2C运营 号码二次销售

```flow
    st=>start: Start
    e=>end: End
    io1=>inputoutput: importCSV
    io2=>inputoutput: outputCSV
    op2=>operation: fetch_list_CMS
    op3=>operation: assignment
    op4=>operation:  set_state_serial
    op5=>operation: send_message

    cond1=>condition: feasible?

    st->io1->op2(right)->cond1
    cond1(yes)->op3->op4->op5->io2->e
    cond1(no)->op4->op5->io2->e

```

[^_^]:# st=>start: 页面加载
[^_^]:# e=>end: End:>http://www.google.com
[^_^]:# op1=>operation: get_hotel_ids|past
[^_^]:# op2=>operation: get_proxy|current
[^_^]:# sub1=>subroutine: get_proxy|current
[^_^]:# op3=>operation: save_comment|current
[^_^]:# op4=>operation: set_sentiment|current
[^_^]:# op5=>operation: set_record|current

[^_^]:# cond1=>condition: ids_remain空?
[^_^]:# cond2=>condition: proxy_list空?
[^_^]:# cond3=>condition: ids_got空?
[^_^]:# cond4=>condition: 爬取成功??
[^_^]:# cond5=>condition: ids_remain空?

[^_^]:# io1=>inputoutput: ids-remain
[^_^]:# io2=>inputoutput: proxy_list
[^_^]:# io3=>inputoutput: ids-got

[^_^]:# st->op1(right)->io1->cond1
[^_^]:# cond1(yes)->sub1->io2->cond2
[^_^]:# cond2(no)->op3
[^_^]:# cond2(yes)->sub1
[^_^]:# cond1(no)->op3->cond4
[^_^]:# cond4(yes)->io3->cond3
[^_^]:# cond4(no)->io1
[^_^]:# cond3(no)->op4
[^_^]:# cond3(yes, right)->cond5
[^_^]:# cond5(yes)->op5
[^_^]:# cond5(no)->cond3
[^_^]:# op5->e]


---
# API 接口文档
###  JSON格式约定
任何参数提交（除 GET 参数外）均需要严格符合JSON数据格式。不要以单引号表示JSON 的键或者值。在blink api中所有json数据字符串都必须以双引号" " 来引用。请再在HTTP头里加上Content-Type： application/json

### HTTP请求返回结果
1. 返回特定信息
```js
{
    "content":"API接口文档",
    "num":5,
    "type":100,
    "pubdate":"2019-04-03"
}
```
2. 返回一组消息,通用消息样式。由msg,code,request 三个参数组成JSON响应体
```js
{
    "error_code": 0,
    "msg": 'art add success!',
    "request":"POST /v1/art/add_art"
}

{
    "error_code": 10001,
    "msg": 'error_json !',
    "request":"get /v1/users/add_user"
}

```

### 返回码
#### 1. HTTP状态码
状态码 | 信息 | 说明
----- | ---- | ------
200 | OK | 请求成功
201 | CREATED | 创建成功
202 | ACCEPTED | 更新成功
204 | NO CONTENT | 删除成功
301 | MOVED PERMANENTLY | 永久重定向
304 | NOT MODIFIED | 内容无变化
400 | BAD REQUEST | 请求包含不支持参数
401 | UNAUTHORIZED | 未授权
403 | FORBIDDEN | 禁止访问
404 | NOT FOUND | 请求资源不存在
413 | REQUIRED LENGTH TO LARGE | 上传文件超过限制
500 | INTERNAL SERVER ERROR | 内部错误

#### 2. 错误码error_code
错误码 | 信息 | 说明
----- | ---- | -----
0 | ok | 成功
10000 | error_param | 请求参数错误 
10001 | error_json | json格式错误
10002 | error_resouce | 找不到资源
10003 | error_unknown | 未知错误
10004 | error_forbidden | 禁止访问
10005 | error_unauthorized | 未授权
10006 | error_server | 内部错误


## WEB端
### 登录
#### 用户登录
##### URL
```js
POST /web/token
````
##### Parameters
- account: 账号
- password: 密码

##### Response 201
```js
{
    "account": abcdef,
    "token": adf123dfas031dkiweoqk,
    "uid": 1
}
````

##### Response_description
- account: 账号
- token: 令牌
- uid: 用户id


#### token校验
##### URL
```js
POST /web/token/verify
````
##### Parameters
- token 

##### Response 200
```js
{
    "error_code": 0,
    "msg": 'verify success!',
    "request":"POST /web/token/verify"
}
````

##### Response_description
- 

#### 忘记密码
##### URL
```js
POST /web/token/forgot
```
##### Parameters
- account

##### Response 200
```js
{
    "content":"验证码已发送",
    "smsCode" "12D51"
}
````

##### Response_description
-content: 获取验证码提示 
-smsCode: 第三方短信验证码


### 用户
#### 用户列表获取
##### URL
```js
GET /web/users/list
````
##### Parameters
- 

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户添加
##### URL
```js
POST /web/users/add_user
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户启用
##### URL
```js
GET /web/users/<int:uid>/enable
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户删除
##### URL
```js
GET /web/users/<int:uid>/remove
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户编辑
##### URL
```js
GET /web/users/<int:uid>/modify
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户搜索
##### URL
```js
GET /web/users/search
````
##### Parameters
- account: 账号
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 用户密码修改
##### URL
```js
POST /web/users/security
````
##### Parameters
- account: 账号
- password: 用户密码

##### Response 200
```js 
````

##### Response_description
- account: 账号
- password: 密码
-


### 分组
#### 分组列表获取
##### URL
```js
GET /web/group/list
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 分组启用
##### URL
```js
GET /web/group/<int:gid>/enable
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 分组编辑
##### URL
```js
GET /web/group/<int:gid>/modify
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 分组删除
##### URL
```js
GET /web/group/<int:gid>/remove
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 分组添加
##### URL
```js
POST /web/group/add_group
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-


### 市场运营
#### 1. B2I2C运营
#### 号码列表获取
##### URL
```js
GET /web/serial/list
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 号码分配
##### URL
```js
GET /web/serial/<int:id>/allocate
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 号码驳回
##### URL
```js
GET /web/serial/<int:id>/reject
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 号码删除
##### URL
```js
GET /web/serial/<int:id>/remove
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 号码搜索
##### URL
```js
GET /web/serial/search
````
##### Parameters
- serial: 手机号码
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 明细导出
##### URL
```js
GET /web/serial/export
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-


#### 2. 存量经营
#### 配置列表获取
##### URL
```js
GET /web/conf/list
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 配置启用
##### URL
```js
GET /web/conf/<int:cfid>/enable
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 配置删除
##### URL
```js
GET /web/conf/<int:cfid>/remove
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 配置提交
##### URL
```js
POST /web/conf/add_conf
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-


### 信息发布
#### 信息列表获取
##### URL
```js
GET /web/art/list
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 信息启用
##### URL
```js
GET /web/art/<int:artid>/enable
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 信息删除
##### URL
```js
GET /web/art/<int:artid>/remove
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 信息编辑
##### URL
```js
POST /web/art/<int:artid>/modify
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 信息发布
##### URL
```js
POST /web/art/add_art
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-


### 数据导入
#### 数据上传
##### URL
```js
POST /web/binary/import
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-


### 日志管理
#### 日志列表获取
##### URL
```js
GET /web/log/list
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-

#### 日志搜索
##### URL
```js
GET /web/log/search
````
##### Parameters
- 
-
-

##### Response 200
```js 
````

##### Response_description
- 
-
-





