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
# 数据表
### 1. RDS MySQL
#### state
state_id | state_code | state_name
-- | -- | --
1 | 0 | 停用
2 | 1 | 启用
3 | 2 | 注销

#### market_group
id | is_market_group | market_group_name
-- | -- | --
1 | M | 公众
2 | G | 政企
3 | S2 | 校园

#### roles
role_id | role | role_name | scope
-- | -- |-- | -- |
1	| Admin	| 管理员	| 66
2	| President	| 总经理	| 60
3	| DepartmentChief	| 部门经理	| 54
4	| DepartmentSupervisor	| 业务主管	| 48
5	| MarketDirector	| 营服经理	| 42
6	| StoreSupervisor	| 渠道主管	| 36
7	| StoreManager	| 店长	| 30
8	| DirectSeller	| 直销员	| 24
说明：**后端API权限控制**，在API接口中增加scope值限制，读取请求中附带的scope值和API接口中的scope值比较，大于等于scope值的允许，小于scope值的抛出错误。


#### routers
route_id | path | rid 
-- | -- |-- |
1	| permission	| 1
2	| permission	| 2
3	| edit	| 1
4	| edit	| 2
5	| edit	| 3
6	| dashboard	| 1
7	| dashboard	| 4
说明：**前端页面级权限控制**，用户登录后获取用户的role_id，role，使用role_id获取routers表中role_id对应的path，生成用户权限内能访问的路由表，再使用router.addRoutes()方法动态添加路由信息，生成用户能访问的页面路由权限。**前端页面DOM级权限控制**，使用DOM绑定自定义指令控制页面元素随用户role级别渲染，DOM绑定的自定义指定大于用户role则不渲染。

#### users
user_id	| role_id	| org_id	| account	| password	| nick_name	| created_by	| state_code
-- | -- |-- |-- | -- |-- |-- | -- |-- |
1	| 1	| 0	| 18600000001	| abcdef123de	| json	| 1	| 1
1	| 2	| 0	| 18600000001	| abcdef123de	| json	| 1	| 1
2	| 3	| 3	| 18600000003	| abcdef123de	| penny	| 1	| 1
3	| 4	| 7	| 18600000004	| abcdef123de	| lily	| 1	| 0

#### depart
org_id	| channel_id | yf_code	| is_market_group	| parent_manager_id	| org_desc	| scope	| created_by
-- | -- |-- |-- | -- |-- |-- | -- |-- |
0 |	| | |			1	| root	| 66	| 1
2 |	| | |			1	| 宜昌	| 60	| 1
3	|	| | | 		2	| 公众	| 54	| 1
4	|	| | |		2	| 政企	| 54	| 1
5	|	| | |		3	| 营销部	| 48	| 1
6	|	| | | 		3	| 综合服务支撑中心	| 48	| 1
7	|	| | |		4	| 政企客户事业部	| 48	| 1
8	|	| | |		5	| 西陵营服中心	| 42	| 1
9	|	| | |		5	| 五峰城西营服中心	| 42	| 1
10	|	| | |		7	| 城区校园营服中心	| 42	| 1
11	|	| | |		8	| 西陵东山网格	| 36	| 1
12	|	| | |		9	| 五峰城西一网格	| 36	| 1
13	|	| | |		10	| 三峡大学网格	| 36	| 1
14	| 09C15	| YF0307	| G	| 11	| 正兴合作厅	| 30	| 1
15	| YVBBJ	| YF0307	| G	| 11	| 易杰数码宜昌市管理本部	| 30	| 1
16	| YFYUJ	| YF0307	| G	| 11	| 宜昌市oppo渠道管理本部	| 30	| 1
17	| 09CAA	| YF0337	| G	| 12	| 五峰新时空手机世界五峰店	| 30	| 1
18	| Y1ZRI	| YF0337	| G	| 12	| 五峰城关自有营业厅	| 30	| 1
19	| YAAJ0	| YF0590	| S2	| 13	| 宜昌市城区三峡大学图书城自有营业厅（校园）	| 30	| 1
20	|	| | | |			直销员1	| 24	| 1
21	|	| | | |			直销员2	| 24	| 1
22	|	| | | |			直销员3	| 24	| 1
说明：用户表中role_id取出对应的org_id，在depart表中使用**递归查询**查找org_id对应的所有子节点，子节点关联的channel_id就是用户权限下所有可查看的渠道列表。具体过程：取users表uid对应的org_id, 用org_id关联depart表中的parent_manager_id取**其对应的**org_id，即取出指定父节点的所有org_id。递归该过程直到parent_manager_id中没有指定的org_id,此时关联出channel_id即用户权限下所有的渠道列表。


### 2. TCB 云数据库
#### b2i2c 二次销售号码
```js
[
    {"serial_number":'15607200000',
    "product_name":"腾讯大网卡",
    "belong":"YF0307",
    "fee":15,
    "dev_name":"张三",
    "contact_phone":"15607200000",
    "operate_time",1589185965494,
    "operate":"已处理"},

    {"serial_number":'15607200000',
    "product_name":"腾讯大网卡",
    "belong":"YF0307",
    "fee":15,
    "dev_name":"张三",
    "contact_phone":"15607200000",
    "operate_time",1589185965494,
    "operate":"驳回"},

    {"serial_number":'15607200000',
    "product_name":"腾讯大网卡",
    "belong":"YF0307",
    "fee":15,
    "dev_name":"张三",
    "contact_phone":"15607200000",
    "operate_time",1589185965494,
    "operate":"删除"},    
]
```

#### thresholds 阈值列表
```js
[
    {"cid":1,
    "config_name":"5G折扣资费推荐",
    "state_code":1,
    "start_date":1589185965494,
    "operator:"林艳",
    "items":[{"gte":70.3,"lt":91.3,"title":"129元档打7折"},
    {"gte":91.3,"lt":119.3,"title":"159元档打7折"},
    {"gte":399.3,"lt":Infinity,"title":"599元档打7折"}],

    {"cid":2,
    "config_name":"花呗分期推荐20%赠费",
    "state_code":0,
    "start_date":1589185965494,
    "operator:"林艳",
    "items":[{"gte":0,"lt":15,"title":"ARPU值低于45元,请查询单卡弹窗结果"},
    {"gte":45,"lt":50,"title":"低消78元,赠送红包23元,赠送时长24月"},
    {"gte":50,"lt":Infinity,"title":"ARPU值超过50,不予推荐20%赠费花呗分期活动"}],
    },

    {"cid":3,
    "config_name":"花呗分期推荐30%赠费",
    "state_code":1,
    "start_date":1589185965494,
    "operator:"林艳",
    "items":[{"gte":50,"lt":69,"title":"低消98元,赠送红包29元,赠送时长24月"},
    {"gte":69,"lt":79,"title":"低消108元,赠送红包29元,赠送时长24月"},
    {"gte":278,"lt":Infinity,"title":"低消超过278,不予推荐花呗分期活动"}],
    }
]
```

#### articles 文章
```js
[
    {"aid":1,
    "public_date":1589185965494,
    "author":"张三",
    "type":"资费",
    "depart_name":"营销部",
    "title":"关于做好5G折扣资费推广的通知",
    "content":"<span>关于做好5G折扣资费推广的通知关于做好5G折扣资费推广的通知</span>",
    "state_code":0},

    {"aid":2,
    "public_date":1589185965494,
    "author":"张三",
    "type":"业务规范",
    "depart_name":"政企营销中心",
    "title":"CBSS欠费用户操作流程",
    "content":"<span>CBSS欠费用户操作流程CBSS欠费用户操作流程</span>",
    "state_code":1}
]
```

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
    "error_code": 10001,
    "msg": 'error_json !',
    "request":"GET /v1/users/add_user"
}

{
    "error_code": 0,
    "msg": 'user created!',
    "request":"POST /v1/users/add_user"
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
    "error_code": 0,
    "msg": "adf123dfas031dkiweoqk",
    "request": "POST /web/token"

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
- token: 令牌

##### Response 200
```js
{
    "uid": 2,
    "gid": 1,
    "scope": 16,
    "yf_code": "YF0309",
    "nickname": "json"
}
````

##### Response_description
- 

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
[{
    "uid":1,
    "gid":[1,2,3],
    "scope": 32,
    "account": "18600000001",
    "nickname" "json",
    "state_name": 1,
    "yf_code":"YF0315",
    "yf_name": "西陵营服中心",
    "groups": ["市场运营","B2I2C运营","营服总"]
},{
    "uid":2,
    "gid":[1],
    "scope": 8,
    "account": "18600000001",
    "nickname" "penny",
    "state_name": 0,
    "yf_code":"YF0315",
    "yf_name": "伍家营服中心",
    "groups": ["市场运营"]
}]
````

##### Response_description
- uid: 用户id
- gid: 用户组id
- scope: 用户权限级别
- account: 账号
- nickname: 用户昵称
- state_name: 用户状态
- yf_code: 营服编码
- yf_name: 营服名称
- groups: 权限

#### 用户添加
##### URL
```js
POST /web/users/add_user
````
##### Parameters
- account: 账号
- password: 密码
- nickname: 用户昵称
- gid: 用户组id
- yf_code: 营服编码

##### Response 201
```js
{
    "error_code": 0,
    "msg":"user created",
    "request": "POST /web/users/add_user"
}
````

##### Response_description
- 

#### 用户启用
##### URL
```js
GET /web/users/<int:uid>/enable
````
##### Parameters
- uid: 用户id

##### Response 201
```js 
{
    "error_code": 0,
    "msg":"user enable",
    "request": "GET /web/users/2/enable"    
}
````

##### Response_description
- 

#### 用户删除
##### URL
```js
GET /web/users/<int:uid>/remove
````
##### Parameters
- uid: 用户id

##### Response 201
```js 
{
    "error_code": 0,
    "msg":"user disable",
    "request": "GET /web/users/2/remove"    
}
````

##### Response_description
- 

#### 用户编辑
##### URL
```js
GET /web/users/<int:uid>/modify
````
##### Parameters
- uid: 用户id

##### Response 200
```js 
{
    "error_code": 0,
    "msg":"user modify",
    "request": "GET /web/users/2/modify"    
}
````

##### Response_description
-

#### 用户搜索
##### URL
```js
GET /web/users/search
````
##### Parameters
- account: 账号
- nickname: 用户昵称
-

##### Response 200
```js
{
    "uid":1,
    "gid":[1,2,3]
    "scope": 32,
    "account": "18600000001",
    "nickname" "json",
    "state_name": 1,
    "yf_code":"YF0315",
    "yf_name": "西陵营服中心",
    "groups": ["市场运营","B2I2C运营","营服总"]
}
````

##### Response_description
- uid: 用户id
- gid: 用户组id
- scope: 用户权限级别
- account: 账号
- nickname: 用户昵称
- state_name: 用户状态
- yf_code: 营服编码
- yf_name: 营服名称
- groups: 权限

#### 用户密码修改
##### URL
```js
POST /web/users/security
````
##### Parameters
- account: 账号
- password: 用户密码

##### Response 201
```js 
{
    "error_code": 0,
    "msg": "password updated",
    "request": "POST /web/users/security"
}
````

##### Response_description
- account: 账号
- password: 密码

#### 短信验证码
##### URL
```js
POST /web/token/smscode
```
##### Parameters
- account: 账号

##### Response 200
```js
{
    "smsCode" "12D51"
}
````

##### Response_description
-smsCode: 短信验证码


### 分组
#### 分组列表获取
##### URL
```js
GET /web/group/list
````
##### Parameters
- 

##### Response 200
```js 
[
    {
        "gid":1,
        "group_name": "市场运营",
        "role":Depart Director,
        "state_code": 0
    },
    {
        "gid":2,
        "group_name": "管理员",
        "role":Admin,
        "state_code": 0
    }
]
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

## 权限管理

## 数据结构
#### 用户 user
```js

```



