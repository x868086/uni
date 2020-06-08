const { LinValidator, Rule } = require("../../core/validator/lin-validator");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.offset = [new Rule("isInt", "分页参数为正整数", { min: 0, max: 100 })]
    this.limit = [new Rule("isInt", "分页参数为正整数", { min: 1, max: 100 })]
  }
}

class AccountValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule("isLength", "账号长度不符合规范", { min: 11, max: 128 }),
    ];

    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "密码长度最少6位，最大128位", { min: 6, max: 128 }),
      new Rule('matches', '密码组合不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ];

    this.smsCode = [
      new Rule("isOptional"),
      new Rule("isInt", "验证码为6位数字", { min: 100000, max: 999999 }),
    ];

    this.loginType = [
      new Rule("isOptional"),
      new Rule("isInt", "登陆类型码为3位整数", { min: 100, max: 600 }),
    ];
  }
}


class UserModifyValidator extends AccountValidator {
  constructor() {
    super();
    this.orgId = [
      new Rule("isInt", "组织节点编号应为整数", { min: 1, max: 999999 })
    ]

    this.nickName = [
      new Rule("isLength", "昵称不符合长度规范", { min: 3, max: 32 }),
    ]
  }
  validateRoles(val) {
    if (!(val.body.roles.length) || !(val.body.roles instanceof Array)) {
      throw new global.errs.ParametersException('用户组类型应为必备参数且为数组类型')
    } else {
      return true
    }
  }
}




module.exports = {
  AccountValidator,
  UserModifyValidator,
  PositiveIntegerValidator
};
