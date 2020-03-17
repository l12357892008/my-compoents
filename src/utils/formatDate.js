export default class formatDate{
  /**
    * @param {Date} time
    * @return {String}
    * @example formatDate.format(new Date)
    * @description 将Date对象,或非标准格式日期字符串转为标准日期String类型
   */
  static format(time){
    // if(!(date instanceof Date)) return '';
    var d = new Date(time),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hours = d.getHours()+'',
    seconds = d.getSeconds() + '',
    minutes = d.getMinutes()+'';

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    return [year, month, day].join('-') + ' ' +[hours, minutes, seconds].join(':');
  }
}
