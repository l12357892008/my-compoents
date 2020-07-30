// dom 操作函数

/* istanbul ignore next */

import Vue from 'vue';

const isServer = Vue.prototype.$isServer;  // 是否允许在node服务端环境

// 加上 istanbul ignore next 后自动化测试计算覆盖率的时候就会忽略紧跟后面的代码块
/* istanbul ignore next */
export const on = (function() {  // 在element元素上监听event,并执行handler函数
  if (!isServer && document.addEventListener) {  // 浏览器环境且是高版本浏览器
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {  // ie7 ie8 没有addEventListener时用attachEvent
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {  // 销毁监听
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const once = function(el, event, fn) {  // 在el元素上监听event,执行一次fn后销毁监听
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
