const { LinValidator, Rule } = require("../../core/validator/lin-validator");

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.int = [new Rule("isInt", "参数必须为正整数", { min: 0, max: 100000 })]
  }
}

class PaginationValidator extends LinValidator {
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
      new Rule("isLength", "验证码为6位数字", { min: 6, max: 6 }),
    ];

    this.loginType = [
      new Rule("isOptional"),
      new Rule("isInt", "登陆类型码为3位整数", { min: 100, max: 600 }),
    ];
  }


}


class UserSecurityValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule("isLength", "账号长度不符合规范", { min: 11, max: 128 }),
    ];
    this.smsCode = [
      new Rule("isOptional"),
      new Rule("isLength", "验证码为6位数字", { min: 6, max: 6 }),
    ];
    this.secret = [
      new Rule("isOptional"),
      new Rule("isLength", "密码长度最少6位，最大128位", { min: 6, max: 128 }),
      new Rule('matches', '密码组合不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ];
    this.secretConfirm = this.secret
  }

  validatePassword(val) {
    const pw1 = val.body.secret
    const pw2 = val.body.secretConfirm
    if (pw1 !== pw2) {
      throw new global.errs.ParametersException('两次输入密码不一致')
    } else {
      return true
    }
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

class RoleValidator extends LinValidator {
  constructor() {
    super()
    this.role = [
      new Rule("isLength", "角色标识不符合规范,最少三位字符", { min: 3, max: 128 })
    ]
    this.roleName = [
      new Rule("isLength", "角色名称不符合规范,最少三位字符", { min: 3, max: 128 })
    ]
    this.scope = [
      new Rule("isInt", "角色权限级别标识不符合规范，区间(0,54]", { min: 1, max: 54 })
    ]
  }
  validateRoleRoute(val) {
    if ((val.body.roleRoute.length) && val.body.roleRoute instanceof Array) {
      return true
    } else {
      throw new global.errs.ParametersException('角色组为必备参数且为数组类型')
    }
  }
}

class B2iserialValidator extends LinValidator {
  constructor() {
    super()
    this.serialnumber = [
      new Rule("isLength", "用户手机号码不符合规范,11位字符", { min: 11, max: 11 })
    ]
    this.operate = [
      new Rule("isOptional"),
      new Rule("isIn", "操作类型必须是['待处理','已处理','驳回','删除']选项中的某一项", ['待处理', '已处理', '驳回', '删除'])
    ]
    this.operateTime = [
      new Rule("isOptional"),
      new Rule("isInt", "操作时间必须是时间戳格式", { min: 1000000000000 })
    ]
  }
}

class B2iserialModifyValidator extends B2iserialValidator {
  constructor() {
    super()
    this.devName = [
      new Rule("isLength", "发展人名称不符合标识,最小3位字符，最大16位字符", { min: 3, max: 16 })
    ]
    this.devPhone = [
      new Rule("isLength", "发展人手机号码不符合规范,11位字符", { min: 11, max: 11 })
    ]
    this.contactPhone = [
      new Rule("isLength", "用户联系号码不符合规范,11位字符", { min: 11, max: 11 })
    ]
    this.operate = [
      new Rule("isIn", "操作类型必须是['待处理','驳回','删除']选项中的某一项", ['待处理', '驳回', '删除'])
    ]
    this.operateTime = [
      new Rule("isInt", "操作时间必须是时间戳格式", { min: 1000000000000 })
    ]
  }
}


class ThresholdValidator extends LinValidator {
  constructor() {
    super()
    this.configName = [new Rule("isLength", "阈值名称不符合规范,最少3个字符", { min: 3, max: 64 })]
  }
}

class ThresholdCreateValidator extends ThresholdValidator {
  constructor() {
    super()
    this.startDate = [new Rule("isInt", "创建时间必须是时间戳格式", { min: 1000000000000 })]
    this.endDate = this.startDate
    this.operator = [new Rule("isLength", "创建者信息,最少2个字符,最大16个字符", { min: 2, max: 16 })]
    this.gt = [new Rule("isInt", "阈值规则区间最小值必须为整数", { min: 0 })]
    this.lte = this.gt
    this.title = [new Rule("isLength", "阈值规则信息最少5个字符,最大64个字符", { min: 5, max: 64 })]
  }
  validateLte(val) {
    if (Number(val.body.lte) <= Number(val.body.gt)) {
      throw new global.errs.ParametersException('阈值规则区间最大值必须大于最小值')
    } else {
      return true
    }
  }
}

class ThresholdModifyValidator extends ThresholdValidator {
  constructor() {
    super()
    this.startDate = [new Rule("isInt", "创建时间必须是时间戳格式", { min: 1000000000000 })]
    this.endDate = this.startDate
    this.operator = [new Rule("isLength", "创建者信息,最少2个字符,最大16个字符", { min: 2, max: 16 })]
  }
  validateItems(val) {
    let { items } = val.body
    let condition1 = items.every(e => {
      return typeof (e.gt) === 'number' && typeof (e.lte) === 'number' && e.title.length > 5
    })
    let condition2 = items.every(e => {
      return e.lte > e.gt
    })

    // 判断提交的阈值规则信息是否重复
    let arr = []
    let condition3 = items.reduce((result, e) => {
      arr.includes(e.title) ? result.push(e.title) : ''
      arr.push(e.title)
      return result
    }, [])


    if (condition1 && condition2 && (condition3.length === 0)) {
      return true
    } else {
      throw new global.errs.ParametersException('阈值规则区间值为整数,阈值规则区间最大值必须大于最小值,阈值规则信息最少5个字符,阈值规则信息不能重复')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.accessToken = [
      new Rule("isOptional"),
      new Rule("isJWT", "非有效token信息")
    ]
    this.refreshToken = [
      new Rule("isOptional"),
      new Rule("isJWT", "非有效token信息")
    ]
  }
}




module.exports = {
  PositiveIntegerValidator,
  AccountValidator,
  UserSecurityValidator,
  UserModifyValidator,
  PaginationValidator,
  RoleValidator,
  B2iserialValidator,
  B2iserialModifyValidator,
  ThresholdValidator,
  ThresholdCreateValidator,
  ThresholdModifyValidator,
  TokenValidator
};
