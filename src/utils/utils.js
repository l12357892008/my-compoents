
/////////////////////////////////////////////////////////////////////////
//// All rights reserved.
//// author: BadMin
//// Summary: 工具箱
//// Date: 2020年06月18日 17:45:44 Thursday
//////////////////////////////////////////////////////////////////////////

(function(window){
  const 
    toString = Object.prototype.toString,
    indexOf = Array.prototype.indexOf;

  class MyUtils{
    /* 检测数据类型*/
    type(obj) {
      let typeName = toString.call(obj);
      if(typeName === '[object Object]'){
        return obj.constructor.name;
      }
      typeName = typeName.replace(/^\[object\s(\w*)\]$/g,'$1');
      return typeName;
    }
    isFunction(obj){
      return this.type(obj) === "Function";
    }
    isArray(obj){
      return this.type(obj) === "Array";
    }
    isObject(obj){
      return this.type(obj) === "Object";
    }
    // 获取一串随机字符串,可用作临时密钥
    randomid() {
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
  }

  // 将实例挂载到window上
  // let utils = function(){
  //   return new MyUtils();
  // };
  let utils = new MyUtils();
  window.utils = utils;
})(window)
