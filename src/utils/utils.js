
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
  }

  // 将实例挂载到window上
  // let utils = function(){
  //   return new MyUtils();
  // };
  let utils = new MyUtils();
  window.utils = utils;
})(window)
