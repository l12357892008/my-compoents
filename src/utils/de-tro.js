// 防抖   methods:{
//   pp:_debounce(()=>{},1000),
// }
export function _debounce(func, wait) {
  var timeout = null;
  return function () {
    var context = this  // 解决this指向改变
    var args = arguments  // 解决传参丢失问题
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.call(context, ...args)
    }, wait)
  }
}


// 节流   methods:{
//   pp:_throttle(()=>{},1000),
// }
export function _throttle(func, interval) {
  var last;
  // var timer;
  var interval = interval || 200;
  return function () {
    var args = arguments;
    var now = new Date();
    if (last && now - last < interval) {
      // clearTimeout(timer);
      // timer = setTimeout(function () {
      //   last = now;
      //   func.apply(this, args);
      // }, interval);
    } else {
      last = now;
      func.apply(this, args);
    }
  }
}
