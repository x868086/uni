# 业务流程图
##  登录

```flow
st=>start: login
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
cond2(yes)->op7
cond2(no)->op8
cond1(no)->cond4
cond4(yes)->op9
cond4(no)->cond3
cond3(yes)->op7
cond3(no)->op3

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
