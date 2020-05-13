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
*state_id: TINYINT, unsigned, autoIncrement, primaryKey*
*state_code: TINYINT, unsigned, unique*
*state_name: STRING(64), unique*

#### market_group
id | is_market_group | market_group_name
-- | -- | --
1 | M | 公众
2 | G | 政企
3 | S2 | 校园
*id: TINYINT, unsigned, autoIncrement, primaryKey*
*is_market_group: STRING(8), unique*
*market_group_name: STRING(64), unique*

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
*role_id: TINYINT, unsigned, autoIncrement, primaryKey*
*role: STRING(128), unique*
*role_name: STRING(128), unique*
*scope: TINYINT, unsigned, unique*
说明：**后端API权限控制**，在API接口中增加scope值限制，读取请求中附带的scope值和API接口中的scope值比较，大于等于scope值的允许，小于scope值的抛出错误。

#### permissions
id| user_id | role_id 
--| -- | -- | 
1 | 1 | 1 
2 | 1 | 2
3 | 2 | 3
4 | 3 | 5
5 | 4 | 6
6 | 5 | 7
7 | 6 | 8
*id: SMALLINT, unsigned, autoIncrement, primaryKey*
*user_id: INTERGER(11), unsigned*
*role_id: TINYINT, unsigned*
说明：用户的角色列表，**一个用户可同时拥有多个角色**，permissions表中用户的roles数组关联roleroutes表生成用户权限内的路由表。

#### routes
route_id | path | name
-- | -- | -- |
1  | /  | 首页
2	| /permission | 权限管理 
3	| /edit | 信息发布
4	| /dashboard | 面板 
5   | /b2i2c | B2I2C运营
*route_id: SMALLINT, unsigned, autoIncrement, primaryKey*
*path: STRING(128), unique*
*name: STRING(128), unique*
说明：后端所有页面的路由信息，**前端新增页面后将路由信息添加到该表中**


#### roleroutes
id | role_id | route_id 
-- | -- |-- |
1	| 1	| 1
2	| 1	| 2
3   | 1 | 4
4	| 3	| 3
5	| 3	| 4
6	| 7	| 5
*id: SMALLINT, unsigned, autoIncrement, primaryKey*
*role_id: TINYINT, unsigned*
*route_id: SMALLINT, unsigned*
说明：**前端页面级权限控制**，用户登录后获取用户的role_id，role，使用role_id获取roleroutes表中role_id对应的route_id，用route_id关联routes表生成用户权限内能访问的路由表，再使用router.addRoutes()方法动态添加路由信息，生成用户能访问的页面路由权限。**前端页面DOM级权限控制**，使用DOM绑定自定义指令控制页面元素随用户role级别渲染，DOM绑定的自定义指定大于用户role则不渲染。




#### users
user_id	| org_id	| account	| password	| nick_name	| created_by	| state_code
-- | -- |-- | -- |-- |-- | -- |-- |
1	| 1	| 18600000001	| abcdef123de	| Json	| 1	| 1
2	| 3	| 18600000003	| abcdef123de	| Penny	| 1	| 1
3	| 8	| 18600000004	| abcdef123de	| Lily	| 1	| 0
4	| 12	| 18600000005	| abcdef123de	| Jack	| 1	| 0
5	| 17	| 18600000006	| abcdef123de	| White	| 1	| 0
6	| 20	| 18600000007	| abcdef123de	| Kitty	| 1	| 0
*user_id: INTERGER(11), unsigned, autoIncrement, primaryKey*
*org_id: INTERGER(11), unsigned, unique*
*account: STRING(256), unique*
*password: STRING(256), set(val){this.setDataValue('password', pwd)}*
*nick_name: STRING(256), allowNull:true,*
*created_by: INTERGER(11), unsigned*
*state_code: TINYINT, unsigned, unsigned*

#### organizations
org_id	| channel_id | yf_code	| is_market_group	| parent_manager_id	| org_desc	| scope	| created_by
-- | -- |-- |-- | -- |-- |-- | -- |-- |
1 |	| | |			0	| root	| 66	| 1
2 |	| | |			1	| 宜昌	| 60	| 1
3	|	| | | 		2	| 公众	| 54	| 1
4	|	| | |		2	| 政企	| 54	| 1
5	|	| | |		3	| 营销部	| 48	| 1
6	|	| | | 		3	| 综合服务支撑中心	| 48	| 1
7	|	| | |		4	| 政企客户事业部	| 48	| 1
8	|	| YF0307 | M |		5	| 西陵营服中心	| 42	| 1
9	|	| YF0337 | M |		5	| 五峰城西营服中心	| 42	| 1
10	|	| YF0590 | S2 |		7	| 城区校园营服中心	| 42	| 1
11	|	| YF0307 | M |		8	| 西陵东山网格	| 36	| 1
12	|	| YF0337 | M |		9	| 五峰城西一网格	| 36	| 1
13	|	| YF0590 | S2 |		10	| 三峡大学网格	| 36	| 1
14	| 09C15	| YF0307	| M	| 11	| 正兴合作厅	| 30	| 1
15	| YVBBJ	| YF0307	| M	| 11	| 易杰数码宜昌市管理本部	| 30	| 1
16	| YFYUJ	| YF0307	| M	| 11	| 宜昌市oppo渠道管理本部	| 30	| 1
17	| 09CAA	| YF0337	| M	| 12	| 五峰新时空手机世界五峰店	| 30	| 1
18	| Y1ZRI	| YF0337	| M	| 12	| 五峰城关自有营业厅	| 30	| 1
19	| YAAJ0	| YF0590	| S2	| 13	| 宜昌市城区三峡大学图书城自有营业厅（校园）	| 30	| 1
20	|	| YF0307 | M | |			直销员1	| 24	| 1
21	|	| YF0337 | M | |			直销员2	| 24	| 1
22	|	| YF0590 | S2 | |			直销员3	| 24	| 1
*org_id: INTERGER(11), unsigned, unique, autoIncrement, primaryKey*
*channel_id: STRING(64), unique, allowNull:true*
*yf_code: STRING(64), allowNull:true*
*is_market_group: STRING(8), allowNull:true*
*parent_manager_id: INTERGER(11), unsigned*
*org_desc: STRING(256)*
*scope: TINYINT, unsigned*
*created_by: INTERGER(11), unsigned*
说明：用户表中取出org_id，在organizations表中使用**递归查询**查找org_id对应的所有子节点，子节点关联的channel_id就是用户权限下所有可查看的渠道列表。具体过程：取users表user_id对应的org_id, 用org_id关联organizations表中的parent_manager_id取**其对应的**org_id，即取出指定父节点的所有org_id。递归该过程直到parent_manager_id中没有指定的org_id,此时关联出channel_id即用户权限下所有的渠道列表。

**role_id决定用户权限内的可访问路由信息，scope值决定用户后端API接口的最高权限，org_id和scope值同时使用决定用户在ornanizations表中其org_id下所有子节点对应的channel_id**


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
    "channel_name":"营销部",
    "title":"关于做好5G折扣资费推广的通知",
    "content":"<span>关于做好5G折扣资费推广的通知关于做好5G折扣资费推广的通知</span>",
    "state_code":0},

    {"aid":2,
    "public_date":1589185965494,
    "author":"张三",
    "type":"业务规范",
    "channel_name":"政企营销中心",
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
    "request":"GET /v1/users/create"
}

{
    "error_code": 0,
    "msg": 'user created!',
    "request":"POST /v1/users/create"
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
POST /web/users/verify
````
##### Parameters
- account: 账号
- password: 密码

##### Response 200
```js
{
    "token": "adf123dfas031dkiweoqk"
}
````

##### Response_description
- token: 令牌
说明: 账号密码校验通过后签发token,token包含通过account关联查询users表中的user_id，org_id。

#### 获取用户信息
##### URL
```js
POST /web/users/userinfo
````
##### Parameters
- token: 令牌

##### Response 200
```js
{
    "user_id": 1,
    "org_id":1,
    "roles": [1,2,3],
    "scope": [66,60,54],
    "scope_top": 66,
    "role_name": "管理员"
}
````
说明： 通过user_id关联查询permissions表中的roles数组,roles数组生成用户权限内的路由对象。通过roles数组关联roles表中的scope数组，取scope数组的最大值就是用户后端API接口的最高权限。

##### Response_description
- user_id: 用户id
- org_id: 用户组织节点id
- roles: 用户角色id数据, **前端根据roles数组动态生成用户可访问路由对象**
- scope: 用户后端API接口权限级别
- scope_top: 用户后端API接口的最高权限
- role_name: 用户最高角色名称

### 用户
#### 用户权限内渠道列表
##### URL
```js
POST /web/users/channels
````
##### Parameters
- user_id: 用户id
- org_id: 用户组织节点id
- scope_top: 用户后端API接口的最高权限

##### Response 200
```js
{
    {
        "scope": 60,
        "org_desc": "宜昌",
        "channels": ['09C15','YVBBJ','YFYUJ','09CAA','Y1ZRI','YAAJ0']
    },{
        "scope": 36,
        "org_desc":"西陵东山网格",
        "channels": ['09C15','YVBBJ','YFYUJ']
    },{
        "scope": 30,
        "org_desc":"正兴合作厅",
        "channels": ['09C15']       
    }
}
````

##### Response_description
- scope: 用户后端API接口权限级别
- org_desc: 用户组织节点名称
- channels: 用户权限渠道列表
说明: **递归查找**，按org_desc层级汇总org_desc下所有channels列表

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
    "account": "18600000001",
    "roles_name":['管理员','总经理'],
    "org_desc":"root"
    "nickname" "Json",
    "state_name": "启用"
},{
    "account": "18600000003",
    "roles_name":['部门经理'],
    "org_desc":"公众"
    "nickname" "Penny",
    "state_name": "启用"
},{
    "account": "18600000004",
    "roles_name":['营服经理'],
    "org_desc":"西陵营服中心"
    "nickname" "Lily",
    "state_name": "停用"   
},{
    "account": "18600000005",
    "roles_name":['渠道主管'],
    "org_desc":"五峰城西一网格"
    "nickname" "Jack",
    "state_name": "停用"   
},{
    "account": "18600000006",
    "roles_name":['店长'],
    "org_desc":"五峰新时空手机世界五峰店"
    "nickname" "White",
    "state_name": "停用"   
},{
    "account": "18600000007",
    "roles_name":['直销员'],
    "org_desc":"直销员1"
    "nickname" "Kitty",
    "state_name": "停用"   
}]
````

##### Response_description
- account: 账号
- roles_name: 用户权限名称数组
- org_desc: 用户组织节点名称
- nickname: 用户昵称
- state_name: 状态

#### 用户添加
##### URL
```js
POST /web/users/create
````
##### Parameters
- account: 账号
- password: 密码
- nickname: 用户昵称
- org_id: 用户组织节点id
- roles: 用户角色id数组

##### Response 201
```js
{
    "error_code": 0,
    "msg":"user created",
    "request": "POST /web/users/create"
}
````

##### Response_description
- 

#### 用户启用
##### URL
```js
GET /web/users/<int:user_id>/enable
````
##### Parameters
- user_id: 用户id

##### Response 202
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
GET /web/users/<int:user_id>/remove
````
##### Parameters
- user_id: 用户id

##### Response 204
```js 
{
    "error_code": 0,
    "msg":"user removed",
    "request": "GET /web/users/2/remove"    
}
````

##### Response_description
- 

#### 用户编辑
##### URL
```js
POST /web/users/<int:user_id>/modify
````
##### Parameters
- user_id: 用户id
- nick_name: 用户昵称
- password: 用户密码
- org_id: 用户组织节点id
- roles: 用户角色id数组

##### Response 202
```js 
{
    "error_code": 0,
    "msg":"user updated",
    "request": "GET /web/users/2/modify"    
}
````

##### Response_description
-

#### 用户搜索
##### URL
```js
POST /web/users/search
````
##### Parameters
- account: 账号
- nickname: 用户昵称

##### Response 200
```js
{
    "account": "18600000005",
    "roles_name":['渠道主管'],
    "org_desc":"五峰城西一网格"
    "nickname" "Jack",
    "state_name": "停用"
}
````

##### Response_description
- account: 账号
- roles_name: 用户角色名称数组
- org_desc: 用户组织节点名称
- nickname: 用户昵称
- state_name: 状态


#### 用户密码修改
##### URL
```js
POST /web/users/security
````
##### Parameters
- account: 账号
- password: 用户密码

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "password changed",
    "request": "POST /web/users/security"
}
````

##### Response_description
- account: 账号
- password: 密码

#### 短信验证码
##### URL
```js
POST /web/users/smscode
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


### 角色
#### 角色列表获取
##### URL
```js
GET /web/roles/list
````
##### Parameters
- 

##### Response 200
```js 
[
    {"role_id": 1,
    "role_name": "管理员",
    "state_name": "启用",
    "paths": ['首页','权限管理','信息发布']
    },
    {"role_id": 3,
    "role_name": "部门经理",
    "state_name": "启用",
    "paths": ['信息发布','面板']
    },
    {"role_id": 7,
    "role_name": "店长",
    "state_name": "启用",
    "paths": ['B2I2C运营']}
]
````

##### Response_description
- role_id: 角色id
- role_name: 角色名称
- state_name: 状态
- paths: 用户角色路由权限数组

#### 角色启用
##### URL
```js
GET /web/roles/<int:role_id>/enable
````
##### Parameters
- role_id: 角色id 

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "role enable",
    "request": "GET /web/roles/<int:role_id>/enable"
}
````

##### Response_description
-

#### 分组编辑
##### URL
```js
POST /web/roles/modify
````
##### Parameters
- role_id: 角色id
- role: 角色描述
- role_name: 角色名称

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "role updated",
    "request": "POST /web/roles/modify"
}
````

##### Response_description
- 

#### 分组删除
##### URL
```js
GET /web/role/<int:role_id>/remove
````
##### Parameters
- role_id：角色id

##### Response 204
```js 
{
    "error_code": 0,
    "msg": "role removed",
    "request": "GET /web/roles/remove"
}
````

##### Response_description
-

#### 分组添加
##### URL
```js
POST /web/role/create
````
##### Parameters
- role: 角色描述
- role_name: 角色名称
- scope: 后端API接口权限级别
- routes: 角色路由数组

##### Response 201
```js 
    "error_code": 0,
    "msg": "role created",
    "request": "POST /web/roles/create"
````

##### Response_description
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
POST /web/conf/create
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
POST /web/art/public
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



