/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}



export function isPhone(str) {
  /**
     * 手机号码
     * 移动：134 135 136 137 138 139 147 150 151 152 157 158 159 178 182 183 184 187 188 198
     * 联通：130 131 132 145 155 156 166 171 175 176 185 186
     * 电信：133 149 153 173 177 180 181 189 199
     * 虚拟运营商: 170
     */
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/
  if (!reg.test(str) || !str) {
    return false
  } else {
    return true
  }
}


export function isChinesStr(str) {
  /**
   * 中文字符串开头，完整字符串中包含中英文符号和数字
   */
  let reg = /^([\u4E00-\u9FFF])+(.)*$/;
  if (reg.test(str) && str.length > 1) {
    return true
  } else {
    return false
  }
}
