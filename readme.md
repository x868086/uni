# 业务流程图
##  登录

```flow
st=>start: Login
e=>end: End
op1=>operation: auth_user
op2=>operation: save_doubleToken[cookie,storage]
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
    op4=>operation:  set_state_done
    op5=>operation:  set_state_reject
    op6=>operation: send_message

    cond1=>condition: feasible?

    st->op2(right)->cond1
    cond1(yes)->op3->op4->op6
    cond1(no)->op5->op6->e

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
- *state_id: TINYINT, unsigned, autoIncrement, primaryKey*
- *state_code: TINYINT, unsigned, unique*
- *state_name: STRING(64), unique*

#### market_group
id | is_market_group | market_group_name
-- | -- | --
1 | M | 公众
2 | G | 政企
3 | S2 | 校园
- *id: TINYINT, unsigned, autoIncrement, primaryKey*
- *is_market_group: STRING(8), unique*
- *market_group_name: STRING(64), unique*

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
- *role_id: TINYINT, unsigned, autoIncrement, primaryKey*
- *role: STRING(128), unique*
- *role_name: STRING(128), unique*
- *scope: TINYINT, unsigned, unique*

说明：**后端API权限控制**，在API接口中增加scope值限制，读取请求中附带的scope值和API接口中的scope值比较，小于等于scope值的请求允许，大于scope值的请求抛出错误。
[^_^]: M：manage；是管理序列。user_id
[^_^]: P：profession是专业序列 比如财务、人力资源等。
[^_^]: T：technology是技术序列，诸如工程师等。
[^_^]: S：strikingly；是营销序列。
[^_^]: 其他职务的英语：
[^_^]: 董事长、Chairman of the Board。
[^_^]: 总经理、General Manager (GM)。
[^_^]: 副总经理、Assistant Manager 。
[^_^]: 部门主管、Department Chief, Market Director,Deaprt Director, Supervisor。
[^_^]: 财务部经理、Manager of Finance or Finance Manager。
[^_^]: 文员、Clerk, Associate。
[^_^]: 助手、Assistant, Secrectry。
[^_^]: 行政助理、Administrative Assistant。
[^_^]: 总务专员、Specialist of General Affairs。

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
- *id: SMALLINT, unsigned, autoIncrement, primaryKey*
- *user_id: INTEGER(11), unsigned*
- *role_id: TINYINT, unsigned*

说明：用户的角色列表，**一个用户可同时拥有多个角色**，permissions表中用户的roles数组关联roleroutes表生成用户权限内的路由表。

#### routes
route_id | path | name
-- | -- | -- |
1  | /  | 首页
2	| /permission | 权限管理 
3	| /edit | 信息发布
4	| /dashboard | 面板 
5   | /b2i2c | B2I2C运营
- *route_id: SMALLINT, unsigned, autoIncrement, primaryKey*
- *path: STRING(128), unique*
- *name: STRING(128), unique*

说明：前端所有页面的路由信息，**前端新增页面后将路由信息添加到该表中**


#### roleroutes
id | role_id | route_id 
-- | -- |-- |
1	| 1	| 1
2	| 1	| 2
3   | 1 | 4
4	| 3	| 3
5	| 3	| 4
6	| 7	| 5
- *id: SMALLINT, unsigned, autoIncrement, primaryKey*
- *role_id: TINYINT, unsigned*
- *route_id: SMALLINT, unsigned*

说明：角色路由信息。**前端页面级权限控制**，用户登录后获取用户的role_id，role，使用role_id获取roleroutes表中role_id对应的route_id，用route_id关联routes表生成用户权限内能访问的路由表，再使用router.addRoutes()方法动态添加路由信息，生成用户能访问的页面路由权限。**前端页面DOM级权限控制**，使用DOM绑定自定义指令控制页面元素随用户role级别渲染，DOM绑定的自定义指定大于用户role则不渲染。




#### users
user_id	| org_id	| account	| secret	| nick_name	| created_by	| state_code 
-- | -- |-- | -- |-- |-- | -- |-- |-- |
1	| 1	| 18600000001	| abcdef123de	| Json	| 1	| 1
2	| 3	| 18600000003	| abcdef123de	| Penny	| 1	| 1
3	| 8	| 18600000004	| abcdef123de	| Lily	| 1	| 0
4	| 12	| 18600000005	| abcdef123de	| Jack	| 1	| 0
5	| 17	| 18600000006	| abcdef123de	| White	| 1	| 0
6	| 20	| 18600000007	| abcdef123de	| Kitty	| 1	| 0
- *user_id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *org_id: INTEGER(11), unsigned, allowNull:false*
- *account: STRING(128), unique*
- *secret: STRING(128), set(val){this.setDataValue('secret', pwd)}*
- *nick_name: STRING(128), allowNull:true,*
- *created_by: INTEGER(11), unsigned*
- *state_code: TINYINT, unsigned, defaultValue:1*

#### organizations
org_id	| channel_id | yf_code	| is_market_group	| parent_manager_id	| org_desc	| scope	| created_by | state_code 
-- | -- |-- |-- | -- |-- |-- | -- |-- | -- |
1 |	| | |			0	| root	| 66	| 1 | 1
2 |	| | |			1	| 宜昌	| 60	| 1 | 1
3	|	| | | 		2	| 公众	| 54	| 1 | 1
4	|	| | |		2	| 政企	| 54	| 1 | 1
5	|	| | |		3	| 营销部	| 48	| 1 | 1
6	|	| | | 		3	| 综合服务支撑中心	| 48	| 1 | 1
7	|	| | |		4	| 政企客户事业部	| 48	| 1 | 1
8	|	| YF0307 | M |		5	| 西陵营服中心	| 42	| 1 | 1
9	|	| YF0337 | M |		5	| 五峰城西营服中心	| 42	| 1 | 1
10	|	| YF0590 | S2 |		7	| 城区校园营服中心	| 42	| 1 | 1
11	|	| YF0307 | M |		8	| 西陵东山网格	| 36	| 1 | 1
12	|	| YF0337 | M |		9	| 五峰城西一网格	| 36	| 1 | 1
13	|	| YF0590 | S2 |		10	| 三峡大学网格	| 36	| 1 | 1
14	| 09C15	| YF0307	| M	| 11	| 正兴合作厅	| 30	| 1 | 1
15	| YVBBJ	| YF0307	| M	| 11	| 易杰数码宜昌市管理本部	| 30	| 1 | 1
16	| YFYUJ	| YF0307	| M	| 11	| 宜昌市oppo渠道管理本部	| 30	| 1 | 1
17	| 09CAA	| YF0337	| M	| 12	| 五峰新时空手机世界五峰店	| 30	| 1 | 1
18	| Y1ZRI	| YF0337	| M	| 12	| 五峰城关自有营业厅	| 30	| 1 | 1
19	| YAAJ0	| YF0590	| S2	| 13	| 宜昌市城区三峡大学图书城自有营业厅（校园）	| 30	| 1 | 1
20	|	| YF0307 | M | |			直销员1	| 24	| 1 | 1
21	|	| YF0337 | M | |			直销员2	| 24	| 1 | 1
22	|	| YF0590 | S2 | |			直销员3	| 24	| 1 | 1
- *org_id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *channel_id: STRING(64), unique, allowNull:true*
- *yf_code: STRING(64), allowNull:true*
- *is_market_group: STRING(8), allowNull:true*
- *parent_manager_id: INTEGER(11), unsigned*
- *org_desc: STRING(128)*
- *scope: TINYINT, unsigned*
- *created_by: INTEGER(11), unsigned*
- *state_code: TINYINT, unsigned, defaultValue:1*

说明：用户表中取出org_id，在organizations表中使用**递归查询**查找org_id对应的所有子节点，子节点关联的channel_id就是用户权限下所有可查看的渠道列表。具体过程：取users表user_id对应的org_id, 用org_id关联organizations表中的parent_manager_id取**其对应的**org_id，即取出指定父节点的所有org_id。递归该过程直到parent_manager_id中没有指定的org_id,此时关联出channel_id即用户权限下所有的渠道列表。

**role_id决定用户权限内的可访问路由信息，scope值决定用户后端API接口的最高权限，org_id和scope值同时使用决定用户在ornanizations表中其org_id下所有子节点对应的channel_id**


#### SMS验证码
sms_id | user_id | sms_code | expires_time
--| --| --| --|
1 | 24 | 666666 | 1591778708054
2 | 24 | 666666 | 1592037984389
- *sms_id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *account: STRING(128), allowNull:false*
- *sms_code: STRING(8), allowNull:false*
- *expires_time: STRING(32), allowNull:false*


#### OSS文件
file_id | file_name | path | size | create_by
-- | -- | -- | -- | -- |
1 | B2I2C号码20200505 | cloud://dev-b93ee9 | 96696.32 | 1
2 | B2I2C号码20200201 | cloud://dev-b93ee9 | 658 | 1
- *file_id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *file_name: STRING(256)*
- *path: STRING(256)*
- *size: INTEGER(11), unsigned, unique*
- *create_by: INTEGER(11), unsigned*

#### 日志信息
id | logo_date | account | api | status_code | error_code | error_message
-- | -- | --| --| --| --| --|
1 | 2020-05-01 12:20:01 | 15600000001 | /file/upload | 200 | | |
2 | 2020-05-01 12:20:01 | 15600000001 | /file/upload | 500 | 10000| abcdefg|
- *id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *logo_date: STRING(256)*
- *account: STRING(256)*
- *api: STRING(256)*
- *status_code: INTEGER(11), unsigned*
- *error_code: INTEGER(11), unsigned*
- *error_message: STRING(256)*

#### 证件号码
id | serial | fee | pdlevel20 | pdlevel30 | pdlevel40
--| --| --| --| --| --|
1 | 4205251988 | 25

- *id: INTEGER(11), unsigned, autoIncrement, primaryKey*
- *serial: STRING(20), unique*
- *fee: INTEGER(11), unsigned*
- *pdlevel20: STRING(256)*
- *pdlevel30: STRING(256)*
- *pdlevel40: STRING(256)*



#### b2i2c 二次销售号码
id | serial_number | product_name | yf_code | id_desc | fee | dev_name | dev_phone | contact_phone | operate_time | operate
-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |-- |
1 | 15607200000 | 腾讯大王卡 | YF0307 | 西陵营服中心 | 15 | John | 15600000001 | 15600000002 | 1589185965494 | 
2 | 15607200010 | 腾讯大王卡 | YF0307 | 西陵营服中心 | 25 | Lily | 15600000011 | 15600000012 | 1589185965494 | 已处理
3 | 15607200020 | 腾讯小王卡 | YF0337 | 五峰城西营服中心 | 35 | Kitty | 15600000021 | 15600000022 | 1589185965494 | 待处理
3 | 15607200030 | 腾讯小王卡 | YF0590 | 城区校园营服中心 | 25 | Json | 15600000031 | 15600000032 | 1589185965494 | 驳回
4 | 15607200040 | QQ卡 | YF0307 | 西陵营服中心 | 15 | Json | 15600000041 | 15600000042 | 1589185965494 | 删除

- *id: SMALLINT(11), unsigned, autoIncrement, primaryKey*
- *serial_number: STRING(20), unique, allowNull:false*
- *product_name: STRING(32), allowNull:false*
- *yf_code: yf_code: STRING(64), allowNull:true*
- *id_desc: STRING(128), allowNull:true*
- *fee: TINYINT, unsigned,*
- *dev_name: STRING(128), allowNull:true*
- *dev_phone: STRING(20), allowNull:true*
- *contact_phone: STRING(20), allowNull:true*
- *operate_time: STRING(32), allowNull:true*
- *operate: STRING(32), allowNull:false, defaultValue: 待提交*




#### threshold 阈值列表
id | config_name | state_code | start_date | end_date | operator | gt | lte | title |
--| --| --| --| --| --| --| --| --|
1 | 花呗红包20%赠费 | 1 | 1589185965494 | 1589185965494 | 林艳 | 20 | 30 | 低消48元，赠送红包10元，赠送时长24月
2 | 花呗红包20%赠费 | 1 | 1589185965494 | 1589185965494 | 林艳 | 30 | 40 | 低消58元，赠送红包14元，赠送时长24月
3 | 花呗红包30%赠费 | 1 | 1589185965494 | 1589185965494 | 林艳 | 50 | 69 | 低消98元,赠送红包29元,赠送时长24月
4 | 花呗红包30%赠费 | 1 | 1589185965494 | 1589185965494 | 林艳 | 69 | 79 | 低消108元,赠送红包29元,赠送时长24月
- *id SMALLINT(11), unsigned, autoIncrement, primaryKey*
- *config_name STRING(128), allowNull:false*
- *state_code TINYINT,unsigned,allowNull:false,default:1*
- *start_date STRING(64), allowNull:true*
- *end_date STRING(64), allowNull:true*
- *operator STRING(128), allowNull:false*
- *gt INTEGER(11), unsigned, allowNull:false*
- *lte INTEGER(11), unsigned, allowNull:false*
- *title STRING(128), unique,allowNull:false*


### 2. TCB 云数据库？
#### articles 文章
```js
[
    {"article_id": 1,
    "public_date": 1589185965494,
    "author": "张三",
    "type": "资费",
    "channel_name": "营销部",
    "title": "关于做好5G折扣资费推广的通知",
    "content": "<span>关于做好5G折扣资费推广的通知关于做好5G折扣资费推广的通知</span>",
    "state_code": 0},

    {"article_id":2,
    "public_date": 1589185965494,
    "author": "张三",
    "type": "业务规范",
    "channel_name": "政企营销中心",
    "title": "CBSS欠费用户操作流程",
    "content": "<span>CBSS欠费用户操作流程CBSS欠费用户操作流程</span>",
    "state_code": 1}
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



### 登录
#### 用户登录
##### URL
```js
POST /users/verify
````
##### Parameters
- account: 账号 [type: string]
- secret: 密码 [type: string]
- loginTypeCode: 登录类型 [type: number]


##### Response 200
```js
{
    "accessToken": "adf123dfas031dkiweoqk",
    "refreshToken" "adf123dfas031dkiweoqk"
}
````

##### Response_description
- data: [type: object]
- accessToken: 权限令牌 [type: string]
- refreshToken: 刷新令牌 [type: string]

说明: 账号密码校验通过后签发accessToken,账号密码校验通过后签发accessToken包含通过account关联查询users表中的user_id，org_id，channels，scopeTop有效期2小时。同时签发refreshToken，有效期1个月。


#### 刷新令牌
##### URL
```js
GET /users/tokenrefresh
````
##### Parameters
- **BasicAuth:** refreshToken令牌 [type: string]


##### Response 200
```js
{
    "accessToken": "adf123dfas031dkiweoqk",
    "refreshToken" "adf123dfas031dkiweoqk"
}
````

##### Response_description
- data: [type: object]
- accessToken: 权限令牌 [type: string]
- refreshToken: 刷新令牌 [type: string]

说明: Koa全局中间件判断accessToken是否过期后，如果过期了使用refreshToken获取新的accessToken(有效期2小时)和新的refreshToken(有效期3天)。refreshToken中存放用户的account，用户密码密文。



#### 获取用户信息 ?
##### URL
```js
POST /users/userinfo
````
##### Parameters
- accessToken: 令牌 [type: string]

##### Response 200
```js
{
    "user_id": 1,
    "org_id":1,
    "roles": [1,2,3],
    "scope": [66,60,54],
    "scope_top": 66,
    "role_name": "管理员",
    "loginType": "web"
}
````
说明： 通过user_id关联查询permissions表中的roles数组,roles数组生成用户权限内的路由对象。通过roles数组关联roles表中的scope数组，取scope数组的最大值就是用户后端API接口的最高权限。**以上返回的数据通过后端token解密后不能存储在前端，将解密的数据挂载到后端ctx的上下文上提高安全性**。

##### Response_description
- data: [type: object]
- user_id: 用户id [type: number]
- org_id: 用户组织节点id [type: number]
- roles: 用户角色id数据, **前端根据roles数组动态生成用户可访问路由对象** [type: array]
- scope: 用户后端API接口权限级别 [type: array]
- scope_top: 用户后端API接口的最高权限 [type: number]
- role_name: 用户最高角色名称 [type: string]
- loginType: 用户登录类型 [type: string]

### 用户
#### 用户权限内渠道列表 ?
##### URL
```js
POST /users/channels
````
##### Parameters
- user_id: 用户id [type: number]
- org_id: 用户组织节点id [type: number]
- scope_top: 用户后端API接口的最高权限 [type: number]

##### Response 200
```js
[
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
]
````

##### Response_description
- data: [type: array]
- scope: 用户后端API接口权限级别 [type: number]
- org_desc: 用户组织节点名称 [type: string]
- channels: 用户权限渠道列表 [type: array]

说明: **递归查找**，按org_desc层级汇总org_desc下所有channels列表

#### 用户列表获取
##### URL
```js
GET /users/list
````
##### Parameters
- offset: 查询时跳过的个数 [type: number]
- limit: 查询时需要返回的个数 [type: number]
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
- data: [type: array]
- account: 账号 [type: string]
- roles_name: 用户权限名称数组 [type: string]
- org_desc: 用户组织节点名称 [type: string]
- nickname: 用户昵称 [type: string]
- state_name: 状态 [type: string]

#### 用户添加
##### URL
```js
POST /users/create
````
##### Parameters
- account: 账号 [type: string]
- secret: 密码 [type: string]
- nickname: 用户昵称 [type: string]
- org_id: 用户组织节点id [type: number]
- roles: 用户角色id数组 [type: number]

##### Response 201
```js
{
    "error_code": 0,
    "msg":"user created",
    "request": "POST /users/create"
}
````

##### Response_description
- data: [type:object]

#### 用户启用
##### URL
```js
GET /users/<str:account>/enable
````
##### Parameters
- account: 用户账号 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg":"user enable",
    "request": "GET /users/<str:account>/enable"    
}
````

##### Response_description
- data: [type: object]

#### 用户删除
##### URL
```js
GET /users/<str:account>/remove
````
##### Parameters
- account: 用户账号 [type: string]

##### Response 204
```js 
{
    "error_code": 0,
    "msg":"user removed",
    "request": "GET /users/<str:account>/remove"    
}
````

##### Response_description
- data: [type: object]

#### 用户编辑
##### URL
```js
POST /users/<str:account>/modify
````
##### Parameters
- account: 用户账号 [type: string]
- nick_name: 用户昵称 [type: string]
- secret: 用户密码 [type: string]
- org_id: 用户组织节点id [type: number]
- roles: 用户角色id数组 [type: number]

##### Response 202
```js 
{
    "error_code": 0,
    "msg":"user updated",
    "request": "GET /users/<str:account>/modify"    
}
````

##### Response_description
- data: [type: object]

#### 用户搜索
##### URL
```js
POST /users/search
````
##### Parameters
- account: 账号 [type: string]
- nickname: 用户昵称 [type: string]

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
- data: [type: object]
- account: 账号 [type: string]
- roles_name: 用户角色名称数组 [type: array]
- org_desc: 用户组织节点名称 [type: string]
- nickname: 用户昵称 [type: string]
- state_name: 状态 [type: string]


#### 用户密码修改
##### URL
```js
POST /users/security
````
##### Parameters
- account: 用户账号 [type: string]
- secret: 用户密码 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "secret changed",
    "request": "POST /users/security"
}
````

##### Response_description
- data: [type: object]
- account: 账号 [type: string]
- secret: 密码 [type: string]

#### 短信验证码
##### URL
```js
POST /users/smscode
```
##### Parameters
- account: 账号 [type: string]

##### Response 200
```js
{
    "error_code": 0,
    "msg": "验证码:455825, 有效期5分钟",
    "request": "POST /users/smscode"
}

````

##### Response_description
- data: [type: object]


### 角色
#### 角色列表获取
##### URL
```js
GET /roles/list
````
##### Parameters
- 

##### Response 200
```js
{
    "offset": 0,
    "limit": 10,
[
    {"role_id": 1,
    "role":"Admin",
    "role_name": "管理员",
    "state_name": "启用",
    "role_route": [
                {
                    "path": "/edit",
                    "name": "信息发布"
                },
                {
                    "path": "/dashboard",
                    "name": "面板"
                }
            ]
    },
    {"role_id": 3,
    "role":"DepartmentChief",
    "role_name": "业务主管",
    "state_name": "启用",
    "role_route": [
                {
                    "path": "/",
                    "name": "首页"
                },
                {
                    "path": "/permission",
                    "name": "权限管理"
                },
                {
                    "path": "/edit",
                    "name": "信息发布"
                }
            ]
    },
    {"role_id": 7,
    "role":"MarketDirector",
    "role_name": "营服经理",
    "state_name": "启用",
    "role_route": [}
]       
} 
````

##### Response_description
- data: [type: array]
- role_id: 角色id [type: number]
- role_name: 角色名称 [type: string]
- state_name: 状态 [type: string]
- paths: 用户角色路由权限数组 [type: array]

#### 角色启用
##### URL
```js
GET /roles/<int:role_id>/enable
````
##### Parameters
- role_id: 角色id [type: number]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "role enable",
    "request": "GET /roles/<int:role_id>/enable"
}
````

##### Response_description
- data: [type: object]

#### 分组编辑
##### URL
```js
POST /roles/<int:role_id>/modify
````
##### Parameters
- role_id: 角色id [type: number]
- role: 角色描述 [type: string]
- role_name: 角色名称 [type: number]
- roleRoute: 角色路由数组 [type: array]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "role updated",
    "request": "POST /roles/<int:role_id>/modify"
}
````

##### Response_description
- data: [type: object]

#### 分组删除
##### URL
```js
GET /role/<int:role_id>/remove
````
##### Parameters
- role_id：角色id [type: number]

##### Response 204
```js 
{
    "error_code": 0,
    "msg": "role removed",
    "request": "GET /roles/<int:role_id>/remove"
}
````

##### Response_description
- data: [type: object]

#### 分组添加
##### URL
```js
POST /role/create
````
##### Parameters
- role: 角色描述 [type: string]
- roleName: 角色名称 [type: string]
- scope: 后端API接口权限级别 [type: number]
- roleRoute: 角色路由数组 [type: array]

##### Response 201
```js 
{
    "error_code": 0,
    "msg": "role created",
    "request": "POST /roles/create"
}
````

##### Response_description
- data: [type: object]


### 市场运营
#### 1. B2I2C运营
#### 号码列表获取
##### URL
```js
GET /b2iserial/list
````
##### Parameters
- 

##### Response 200
```js
[{
    "serial_number": "15607200000",
    "product_name": "腾讯大王卡",
    "belong": "YF0307",
    "fee": 15,
    "dev_name": "Jack",
    "dev_phone":"18600000001",
    "contact_phone": "18600000001",
    "operate":""
},{
    "serial_number": "15607200000",
    "product_name": "腾讯大王卡",
    "belong": "YF0307",
    "fee": 15,
    "dev_name": "Jack",
    "dev_phone":"18600000001",
    "contact_phone": "18600000001",
    "operate":""  
}] 
````

##### Response_description
- data: [type: array]
- serial_number: 号码 [type: string]
- product_name: 产品名称 [type: string]
- fee: 月租 [type: number]
- dev_name: 派送人 [type: string]
- dev_phone: 派送人联系电话 [type: string]
- contact_phone: 客户联系电话 [type: string]
- operate: 当前处理环节 [type: string]

#### 号码提交
##### URL
```js
GET /b2iserial/<string:serialnumber>/modify
````
##### Parameters
- serialnumber: 号码 [type: string]
- devName: 发展人名称 [type: string]
- devPhone: 发展人联系电话 [type: string]
- contactPhone: 用户联系电话 [type: string]
- operate: 操作类型 [type: string]
- operateTime: 操作时间 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "二次销售信息提交成功",
    "request": "POST /b2iserial/<string:serialnumber>/modify"
}
````


#### 号码分配
##### URL
```js
POST /b2iserial/<string:serial_number>/allocate
````
##### Parameters
- serial_number: 号码 [type: string]
- operate: 操作类型 [type: string]
- operateTime: 操作时间 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "二次销售信息处理成功",
    "request": "POST /b2iserial/<string:serial_number>/allocate"
}
````

##### Response_description
- data: [type: object]

#### 号码驳回
##### URL
```js
POST /b2iserial/<string:serial_number>/reject
````
##### Parameters
- serial_number: 号码 [type: string]
- operate: 操作类型 [type: string]
- operateTime: 操作时间 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "二次销售信息已驳回",
    "request": "POST /b2iserial/<string:serial_number>/reject"    
}
````

##### Response_description
- data: [type: object]

#### 号码删除
##### URL
```js
POST /b2iserial/<string:serial_number>/remove
````
##### Parameters
- serial_number: 号码 [type: string]
- operate: 操作类型 [type: string]
- operateTime: 操作时间 [type: string]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "二次销售信息已删除",
    "request": "POST /b2iserial/<string:serial_number>/remove" 
}
````

##### Response_description
- data: [type: object]

#### 号码搜索
##### URL
```js
GET /b2iserial/<string:serial_number>/search
````
##### Parameters
- serial: 手机号码 [type: string]

##### Response 200
```js 
{
    "serial_number": "15607200000",
    "product_name": "腾讯大王卡",
    "id_desc": "YF0307",
    "fee": 15,
    "dev_name": "Jack",
    "dev_phone": "18600000001",
    "contact_phone": "18600000001",
    "operate":"已处理"    
}
````
##### Response_description
- data: [type: object]
- serial_number: 号码 [type: string]
- product_name: 产品名称 [type: string]
- fee: 月租 [type: number]
- dev_name: 派送人 [type: string]
- dev_phone: 派送人联系电话 [type: string]
- contact_phone: 联系电话 [type: string]
- operate: 当前处理环节 [type: string]



#### 2. 存量经营
#### 阈值列表获取
##### URL
```js
GET /threshold/list
````
##### Parameters
- 

##### Response 200
```js 
[
    {
    "id":1,
    "config_name": "5G折扣资费推荐",
    "state_name": "生效",
    "start_date": 1589185965494,
    "end_date": 1589185965494,
    "operator:"林艳",
    "items":[{"gt":1,"lte":5,"title":"低消48元，赠送红包10元，赠送时长24月"}]
    },{
    "id":2,
    "config_name":"花呗分期推荐20%赠费",
    "state_name": "失效",
    "start_date": 1589185965494,
    "end_date": 1589185965494,    
    "operator:"林艳",
    "items":[{"gt":1,"lte":5,"title":"低消48元，赠送红包10元，赠送时长24月"}]
    },{
    "id":3,
    "config_name":"花呗分期推荐30%赠费",
    "state_name": "失效",
    "start_date": 1589185965494,
    "end_date": 1589185965494,    
    "operator:"林艳",
    "items":[{"gt":1,"lte":5,"title":"低消48元，赠送红包10元，赠送时长24月"}]        
    }
]
````


#### 单个阈值获取
##### URL
```js
POST /threshold/list
````
##### Parameters
- configName: 阈值名称 [type: string]

##### Response 200
```js 
[
    {
    "id":1,
    "config_name": "5G折扣资费推荐",
    "state_name": "生效",
    "start_date": 1589185965494,
    "end_date": 1589185965494,
    "operator:"林艳",
    "items":[{"gt":1,"lte":5,"title":"低消48元，赠送红包10元，赠送时长24月"}]
    }
]
````
##### Response_description
- data: [type: array]
- id: 阈值规则id [type: number]
- config_name: 阈值规则名称 [type: string]
- state_name: 状态 [type: string]
- start_date: 开始时间, 时间戳 [type: number] [timestamp]
- end_date: 结束时间, 时间戳 [type: number] [timestamp]
- operator: 操作人 [type: string]
- items: 阈值详情 [type: Array]



#### 阈值匹配
##### URL
```js
GET /threshold/<int:arpu>/bingo
````
##### Parameters
- arpu: 月均消费值 [type: number]
##### Response 200
```js
[{
        "config_name": "花呗红包30%赠费",
        "gt": 196,
        "lte": 212,
        "title": "低消298元,赠送红包86元,赠送时长24月",
        "start_date": "2020-6-17 15:24:49",
        "end_date": "2020-6-17 15:24:49"
    },
    {
        "config_name": "花呗分期推荐40%赠费",
        "gt": 208,
        "lte": 313,
        "title": "5G套餐599元,赠送286元,赠送时长24月",
        "start_date": "2020-6-17 15:24:49",
        "end_date": "2020-6-17 15:24:49"
}]
```




#### 配置启用
##### URL
```js
GET /threshold/<str:configname>/enable
````
##### Parameters
- id: 阈值规则id [type: number]

##### Response 202
```js 
{
    "error_code": 0,
    "msg": "threshold updated",
    "request": "GET /threshold/<str:configname>/enable" 
}
````

##### Response_description
- data: [type: object]

#### 配置删除
##### URL
```js
GET /threshold/<str:configname>/remove
````
##### Parameters
- 

##### Response 204
```js
{
    "error_code": 0,
    "msg": "threshold removed",
    "request": "GET /threshold/<str:configname>/remove" 
}
````

##### Response_description
- data: [type: object]

#### 配置提交
##### URL
```js
POST /threshold/create
````
##### Parameters
- config_name: 阈值规则名称 [type: string]
- start_date: 开始时间 [type: number] [timestamp]
- end_date: 结束时间 [type: number] [timestamp]
- operator: 操作人 [type: string]
- items: 配置详情，数组，区间值 [type: array]

##### Response 201
```js
{
    "error_code": 0,
    "msg": "threshold created",
    "request": "POST /threshold/create"     
}
````

##### Response_description
- data: [type: object]


### 信息发布
#### 信息列表获取
##### URL
```js
GET /article/list
````
##### Parameters
- 

##### Response 200
```js
[
    {"article_id": 1,
    "public_date": 1589185965494,
    "author": "张三",
    "type": "资费",
    "channel_name": "营销部",
    "title": "关于做好5G折扣资费推广的通知",
    "content": "<span>关于做好5G折扣资费推广的通知关于做好5G折扣资费推广的通知</span>"},

    {"article_id": 2,
    "public_date": 1589185965494,
    "author": "张三",
    "type": "业务规范",
    "channel_name": "政企营销中心",
    "title": "CBSS欠费用户操作流程",
    "content": "<span>CBSS欠费用户操作流程CBSS欠费用户操作流程</span>"}
] 
````

##### Response_description
- data: [type: array]
- atricle_id: 文章id [type: number]
- public_date: 发布时间 [type: number] [timestamp]
- author: 作者 [type: string]
- type: 文章类型 [type: string]
- channel_name: 文章发布部门 [type: string]
- title: 文件标题 [type: string]
- content: 文章内容，html代码片段 [type: string]


#### 信息删除
##### URL
```js
GET /article/<int:article_id>/remove
````
##### Parameters
- article_id: 文章id [type: number]

##### Response 200
```js
{
    "error_code": 0,
    "msg": "article removed",
    "request": "GET /article/<int:article_id>/remove"      
}
````

##### Response_description
- data: [type: object]

#### 信息编辑
##### URL
```js
POST /article/<int:article_id>/modify
````
##### Parameters
- public_date: 发布时间 [type: number] [timestamp]
- author: 作者 [type: string]
- type: 文章类型 [type: string]
- channel_name: 文章发布部门 [type: string]
- title: 文件标题 [type: string]
- content: 文章内容，html代码片段 [type: string]

##### Response 200
```js
{
    "error_code": 0,
    "msg": "article updated",
    "request": "GET /article/<int:article_id>/modify" 
} 
````

##### Response_description
- data: [type: object]

#### 信息发布
##### URL
```js
POST /article/public
````
##### Parameters
- public_date: 发布时间 [type: number] [timestamp]
- author: 作者 [type: string]
- type: 文章类型 [type: string]
- channel_name: 文章发布部门 [type: string]
- title: 文件标题 [type: string]
- content: 文章内容，html代码片段 [type: string]

##### Response 200
```js
{
    "error_code": 0,
    "msg": "article created",
    "request": "POST /article/public" 
}
````

##### Response_description
- data: [type: object] 


### 文件上传下载
#### 数据导入
##### URL
```js
POST /file/upload
````
##### Parameters
- data: [type: binary] [enctype="multipart/form-data"]
- fileid: [type: string]

##### Response 201
```js
{
    "error_code": 0,
    "msg": "object uploaded",
    "request": "POST /file/upload" 
}
```
##### Response_description
- data: [type: object]


#### 数据导出
##### URL
```js
GET /file/<string:file_id>/export
````
##### Parameters
- file_id: 文件id [type: number]

##### Response 200
- data: [type: binary]

##### Response_description
- data: [type: binary]



### 日志管理
#### 日志列表获取
##### URL
```js
GET /log/list
````
##### Parameters
- 

##### Response 200
```js 
[
    {
        "id": 1,
        "logo_date": 1589185965494,
        "account": "15600000001",
        "api": "/file/upload"
    },{
        "id": 2,
        "logo_date": 1589185965494,
        "account": "15600000001",
        "api": "/users/list"
    }
]
````

##### Response_description
- data: [type: array]
- id: 日志id [type: number]
- logo_date: 记录时间 [type: number] [timestamp]
- account: 账号 [type: string]
- api: 访问接口名称 [type: string]

#### 日志搜索
##### URL
```js
GET /log/<int:id>/search
````
##### Parameters
- id: 日志id [type: number]

##### Response 200
```js
{
    "id": 1,
    "logo_date": "1589185965494",
    "account": "15600000001",
    "api": "/file/upload"    
}
````

##### Response_description
- data: [type: object]
- id: 日志id [type: number]
- logo_date: 记录时间 [type: number] [timestamp]
- account: 账号 [type: string]
- api: 访问接口名称 [type: string]



