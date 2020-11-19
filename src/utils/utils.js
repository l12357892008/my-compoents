
/////////////////////////////////////////////////////////////////////////
//// All rights reserved.
//// author: BadMin
//// Summary: 工具箱,ES6
//// Date: 2020年06月18日 17:45:44 Thursday
//////////////////////////////////////////////////////////////////////////

(function(window){
  const
    toString = Object.prototype.toString,
    indexOf = Array.prototype.indexOf;

  class MyUtils{

    constructor(arg) {
        this.seed = 5;
    }

    random(min, max){  // 返回一个在区间[min,max]之间的随机整数
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    randomCol(){  // 返回一个随机颜色
      let r = this.random(0, 255)
      let g = this.random(0, 255)
      let b = this.random(0, 255)
      return `rgb(${r},${g},${b})`;
    }

    /**
     * 伪随机数生成,即当seed不变,那返回的随机数也不变
     * 重点(seed * 9301 + 49297) % 233280，为什么是这三个数
     * 像Math.seededRandom这种伪随机数生成器叫做线性同余生成器（LCG, Linear Congruential Generator)，几乎所有的运行库提供的rand都是采用的LCG，形如：
     * n+1=a*n+c(mod m)
     * 生成的伪随机数序列最大周期m，范围在0到m-1之间。要达到这个最大周期，必须满足：
     * 1.c与m互质
     * 2.a - 1可以被m的所有质因数整除
     * 3.如果m是4的倍数，a - 1也必须是4的倍数
     * 以上三条被称为Hull-Dobell定理。作为一个伪随机数生成器，周期不够大是不好意思混的，所以这是要求之一。
     * 因此才有了：a=9301, c = 49297, m = 233280这组参数，以上三条全部满足。
     */
    seededRandom(max, min) {
        max = max || 1;
        min = min || 0;
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rnd = this.seed / 233280.0;
        return min + rnd * (max - min);
    };

    // 获取一串随机字符串,可用作临时密钥
    randomId() {
    	let s = [];
    	let hexDigits = "0123456789qwertyuiopasdfghjklzxcvbnm";
    	for (let i = 0; i < 36; i++) {
    		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    	}
    	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    	s[8] = s[13] = s[18] = s[23] = "-";
    	let uuid = s.join("");
    	return uuid;
    }
    /**
     * Create a cached version of a pure function.输入一个函数，返回一个函数
     * 为纯函数创建一个cached版本函数,注:纯函数,即输入值不变那输出值一定不变
     * 原理是创建一个对象用于存储 输入值和输出值 对应的键值对
     * 当值传入先在对象里找,如果存在直接返回，如果不存在那就走原本的函数并存入对象
     */
    cached(fn) {
      var cache = Object.create(null);
      return (function cachedFn (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str))
      })
    }
  }
  let utils = new MyUtils();
  // 连字符连接转驼峰,cached版
  utils.camelize = utils.cached(function (str) {
    return str.replace(/-(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; })
  });
  /*字符串首字母大写,cached版本*/
  utils.capitalize = utils.cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });
  window.utils = utils;
})(window)
