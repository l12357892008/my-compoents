
/////////////////////////////////////////////////////////////////////////
//// All rights reserved.
//// author: Bobby
//// Summary: 工具箱
//// Date: 2020年06月18日 17:45:44 Thursday
//////////////////////////////////////////////////////////////////////////


// 获取url域名  ex: https://game.wemeo.com
export function getHost(href) {
  href = href || window.location.href;
  var head = href.indexOf('https://') != -1 ? 'https://' : 'http://';
  var _href = href.replace('http://', '').replace('https://', '');
  if (_href.split('/').length > 0) {
      var s = _href.split('/')[0];
      head += s.split(':')[0];
      return head;
  }
  return false;
}

//获取路径参数
// decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码
// encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURIComponent(r[2]);
	return null;
}

// 合并对象到第一个,当作拷贝用则属于浅拷贝
export function merge(target) {
	for (let i = 1, j = arguments.length; i < j; i++) {
		let source = arguments[i] || {};
		for (let prop in source) {
			if (source.hasOwnProperty(prop)) {
				let value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}
	return target;
}

// 深克隆
const deepClone = obj => {
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(key => {
      clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    });
    return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
};

// 预加载图片
export function preloadImage(data,imgUrl) {
    data.onComplete = data.onComplete || function () {}
    if (!data.src || data.src.length == 0)
        return data.onComplete();
    let src = data.src;
    let len = src.length;
    let index = 0;
    let imageUrl = imgUrl || '';
    for (let x = 0; x < len; x++) {
        let img = new Image();
        img.onload = img.onerror = function () {
            index++;
            if (index == len)
                data.onComplete();
        }
        img.src = imageUrl + src[x];
    }
}

export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

    if (el.classList) {
        return el.classList.contains(cls);
    }

    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

export function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }

    if (!el.classList) {
        el.className = curClass;
    }
};

export function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }

    if (!el.classList) {
        el.className = trim(curClass);
    }
};

/**
 * Create a cached version of a pure function.输入一个函数，返回一个函数
 * 为纯函数创建一个cached版本函数,注:纯函数,即输入值不变那输出值一定不变
 * 原理是创建一个对象用于存储 输入值和输出值 对应的键值对
 * 当值传入先在对象里找,如果存在直接返回，如果不存在那就走原本的函数并存入对象
 */
export function cached(fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

// 连字符连接转驼峰，非cached版
export function camelize(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
}
// 驼峰转连字符，非cached版
export function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
};

/**
 * Remove an item from an array.从数组中移除某项
 * 改变原数组,返回删除的值
 */
export function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/*检测属性是否存在自身而非原型链上*/
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/*字符串首字母大写,非cached版*/
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/*类数组转化为真数组*/
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/*判断一下两个值是否相等,如果是对象就看内部属性和值是否完全一致*/
export function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}


/**
 * 传入一个函数,返回这个函数的once版,
 * 只会运行一次,即便多次调用也只运行一次
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}
