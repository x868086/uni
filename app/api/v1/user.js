const Router = require('koa-router');

const basicAuth = require('basic-auth');

const router = new Router({
  prefix: '/v1/users',
});

const { UserService } = require('../../services/user');
const { SmsService } = require('../../services/sms');

const {
  PaginationValidator,
  AccountValidator,
  UserSecurityValidator,
  UserModifyValidator,
  TokenValidator,
} = require('../../validators/validator');

router.post('/verify', async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  const { accessToken, refreshToken } = await new UserService(
    ctx.request.body
  ).userVerify();
  ctx.body = { accessToken, refreshToken };
});

router.post('/tokenverify', async (ctx, next) => {
  const v = await new TokenValidator().validate(ctx);
  let { role, nick_name, org_desc, roles, roles_name } = await new UserService(
    ctx.request.body
  ).verifyToken();
  ctx.body = { role, nick_name, org_desc, roles, roles_name };
});

router.get('/tokenrefresh', async (ctx, next) => {
  const token = basicAuth(ctx.req);
  if (!token || !token.name) {
    throw new global.errs.Forbidden('token信息不合法');
  }
  const { accessToken, refreshToken } = await new UserService({
    refreshToken: token.name,
  }).tokenRefresh();
  ctx.body = { accessToken, refreshToken };
});

router.post('/create', async (ctx, next) => {
  const v = await new UserModifyValidator().validate(ctx);
  let { account, nickName } = await new UserService(
    ctx.request.body
  ).userCreate();
  throw new global.errs.Success(
    `${account}-${nickName} 用户信息已创建`,
    0,
    201
  );
});

router.get('/:account/enable', async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  let { account, nickName } = await new UserService(ctx.params).userEnable();
  throw new global.errs.Success(`${account}-${nickName} 的用户已启用`, 0, 202);
});

router.get('/:account/remove', async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  let { account, nickName } = await new UserService(ctx.params).userRemove();
  throw new global.errs.Success(`${account}-${nickName} 的用户已删除`, 0, 202);
});

router.get('/:account/search', async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  let userInfo = await new UserService(ctx.params).userSearch();
  ctx.body = userInfo;
});

router.post('/:account/modify', async (ctx, next) => {
  const v = await new UserModifyValidator().validate(ctx);
  let { account, nickName } = await new UserService({
    account: v.get('path.account'),
    nickName: v.get('body.nickName'),
    orgId: v.get('body.orgId'),
    secret: v.get('body.secret'),
    roles: v.get('body.roles'),
  }).userModify();
  throw new global.errs.Success(
    `${account}-${nickName} 用户信息已更新`,
    0,
    202
  );
});

router.get('/list', async (ctx, next) => {
  const v = await new PaginationValidator().validate(ctx);
  let result = await new UserService(ctx).userList(
    v.get('query.offset'),
    v.get('query.limit')
  );
  ctx.body = { result };
});

router.post('/security', async (ctx, next) => {
  const v = await new UserSecurityValidator().validate(ctx);
  let { account } = await new UserService(ctx.request.body).userSecurity();
  throw new global.errs.Success(`${account} 用户密码修改成功`, 0, 202);
});

router.post('/smscode', async (ctx, next) => {
  const v = await new AccountValidator().validate(ctx);
  let { sms_code } = await new SmsService(ctx.request.body).getSmsCode();
  throw new global.errs.Success(`验证码:${sms_code}, 有效期5分钟`, 0, 200);
});

module.exports = {
  user: router,
};
