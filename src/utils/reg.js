/**正则判断 */
const
  phoneReg = /^1[3-9]\d{9}$/,   //手机号正则格式
  emailReg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i, //邮箱正则表达式

  /* 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符*/
  passwordReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,

  // 匹配数字用的正则
  numReg = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/,

  // 用于按空白字符切分
  blankReg = /\S+/g,

  // 匹配HTML标记,用于防范xss攻击
  htmlReg = /^<([a-z]+)\s*\/?>(?:<\/\1>)?$/i,

  // 因此，正确的匹配中文字符正则表达式为：
  chineseReg = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g;
  // 如果不希望匹配标点、符号，在正则中去掉对应的范围即可：
  // 3000-303F   CJK 符号和标点   FF00-FFEF   全角ASCII、全角标点

export default class Verify {
  /**
   * 验证手机号
   * @param {Number} tel ,电话号码
   * @return {Boolean}
   * @description 判断输入格式是否为电话号码格式
  */
  static isPhone(val) {
    return phoneReg.test(val)
  }

  /**
   * 验证邮箱
   * @param {String} emial,邮箱地址
   * @return {Boolen}
   * @description 判断输入格式是否为邮箱格式
   */
  static isEmail(val) {
    return emailReg.test(val)
  }

}
