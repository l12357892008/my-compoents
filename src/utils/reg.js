const phoneReg = /^1[345789]\d{9}$/;   //手机号正则格式
const emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; //邮箱正则表达式
/* 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符*/
const passwordReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
const userReg = /^[a-zA-Z0-9_-]{4,16}$/;  //用户名正则，4到16位（字母，数字，下划线，减号）
const posIntReg = /^\d+$/; //正整数正则
const negIntReg = /^-\d+$/; //负整数正则
const intReg = /^-?\d+$/; //整数正则
const posReg = /^\d*\.?\d+$/; //正数正则
const negReg = /^-\d*\.?\d+$/; //负数正则
const cardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证号（18位）正则

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
