const { LinValidator, Rule } = require("../../core/validator/lin-validator");

class AccountValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule("isLength", "账号长度不符合规范", { min: 11, max: 128 }),
    ];

    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "密码长度最少6位", { min: 6, max: 128 }),
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

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.offset = [new Rule("isInt", "分页参数为正整数", { min: 0, max: 100 })]
    this.limit = [new Rule("isInt", "分页参数为正整数", { min: 1, max: 100 })]
  }
}

module.exports = {
  AccountValidator,
  PositiveIntegerValidator
};
