/**格式化数据 */

export default class format{
  /**
    * @param {Date} time
    * @return {String}
    * @example formatDate.format(new Date)
    * @description 将Date对象,或非标准格式日期字符串转为标准日期String类型
   */
  static formatDate(time){
    let d = new Date(time);
    if(!(d instanceof Date) || isNaN(d.getTime())) {
      return time;
    }
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = d.getHours()+'';
    let seconds = d.getSeconds() + '';
    let minutes = d.getMinutes()+'';

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' +[hours, minutes, seconds].join(':');
  }

  /**************************************************/
  static isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * @param {Number | String} 11223344.56789
   * @return {String} 11,223,344.57
   * @description 将金额格式化保留2位小数(四舍五入),每3位加一个,包小数最多16位
   * @example formatMon.format(11223344.56789)  // 11,223,344.57
   **/
  static formatMoney(data) {
    console.log(this.isNumber(data));
    if (!data || !this.isNumber(data)) { // 如果不为数字或者不存在直接原路返回
      return data
    }
    let money = Number(data.toString().match(/^\d+(?:\.\d{0,2})?/)).toString();
    let intNum = money.split('.')[0];
    let decimalNum = money.split('.')[1]
    let result = [],
      counter = 0;
    for (let i = intNum.length - 1; i >= 0; i--) {
      counter++;
      result.unshift(intNum[i]);
      if (!(counter % 3) && i != 0) {
        result.unshift(',');
      }
    }
    if (decimalNum) {
      return result.join('') + '.' + decimalNum
    } else {
      return result.join('')
    }
  }

  /****************************************************************/
  /**
   * @param {Number | String} 18000000000
   * @return {String} 180 0000 0000
   * @description 将11为电话号码格式化为3 4 4格式
   * @example formatPhone.format(13588881111)  // 135 8888 1111
   **/
  static formatPhone(data){
    let phone = data.toString().trim();
    if(data.length > 11){ return phone }  // 不是11位就滚呐
    return phone.substr(0, 3) + ' ' + phone.substr(3, 4) + ' ' + phone.substr(7, 4);
  }
}
