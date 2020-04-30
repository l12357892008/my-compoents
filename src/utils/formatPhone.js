export default class formatPhone{
  /**
   * @param {Number | String} 18000000000
   * @return {String} 180 0000 0000
   * @description 将11为电话号码格式化为3 4 4格式
   * @example formatPhone.format(13588881111)  // 135 8888 1111
   **/
  static format(data){
    let phone = data.toString().trim();
    if(data.length > 11){ return phone }  // 不是11位就滚呐
    return phone.substr(0, 3) + ' ' + phone.substr(3, 4) + ' ' + phone.substr(7, 4);
  }
}
