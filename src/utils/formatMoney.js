export default class formatMoney{
  /**
   * @param {Number | String} 11223344.56789
   * @return {String} 11,223,344.57
   * @description 将金额格式化保留2位小数(四舍五入),没3为加一个,包小数最多16位
   * @example formatMon.format(11223344.56789)  // 11,223,344.57
   **/
  static format(data){
    let money = Number(data.toString().match(/^\d+(?:\.\d{0,2})?/)).toString();
    let intNum = money.split('.')[0];
    let decimalNum = money.split('.')[1]
    let result = [],counter = 0;
    for(let i = intNum.length - 1;i >= 0;i--) {
      counter++;
      result.unshift(intNum[i]);
      if(!(counter % 3) && i != 0){
        result.unshift(',');
      }
    }
    if(decimalNum){
      return result.join('') + '.' + decimalNum
    }else{
      return result.join('')
    }
  }
}
