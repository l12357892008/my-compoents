/**
 * 简化封装原生js中的方法
 */

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

// 简化长度,顺便方便压缩
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

/*类型相关函数*/
function isUndef (v) {
  return v === undefined || v === null
}
function isDef (v) {
  return v !== undefined && v !== null
}
function isTrue (v) {
  return v === true
}
function isFalse (v) {
  return v === false
}
/*是否为基本数据类型，不包含null和underfined*/
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/*快速判断一些是否为引用数据类型*/
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/*获取精确的数据类型   ex:[object Array]  截取Array部分*/
function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/*严格对象类型检查. 只对纯js对象返回true，就是通过 { }、new Object()、Object.create(null) 创建的对象*/
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

/**是否为正则数据类型 */
function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/*将值转化为string*/
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
