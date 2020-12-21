(function(g, fn) {
  g.Bobby = fn();
})(window, function() {

  var Bobby = function(){}

  // 20- 简化版ajax
  // 创建XMLHttpRequset请求
  Bobby.loadXMLDoc = function(data) {
    var xmlhttp;
    if (window.XMLHttpRequest) { //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
      xmlhttp = new XMLHttpRequest();
    } else { // IE6, IE5 浏览器执行代码
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    function handleSucRes(res, status, xhr) { // 处理成功的返回结果
      if (data.dataType && data.dataType.toLowerCase() == 'json') {
        try {
          res = JSON.parse(res);
        } catch (e) {}
      }
      if (data.success) {
        data.success(res, status, xhr);
      }
    }

    function handleFailRes(xhr, status, error) { // 处理成功的返回结果
      if (data.error) {
        data.error(xhr, status, error)
      }
    }
    if (data.async) {
      xmlhttp.onreadystatechange = function() { // 异步执行的时候 接收到了服务器回应时的处理
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            handleSucRes(xmlhttp.response, xmlhttp.status, xmlhttp);
          } else {
            handleFailRes(xmlhttp, xmlhttp.status, xmlhttp.response)
          }
        }
      }
    }
    xmlhttp.open(data.type, data.url, data.async);
    xmlhttp.setRequestHeader("Content-type", data.contentType);
    xmlhttp.send(data); // post才需要在send里传入参数,get会忽略
    if (!data.async) { // 同步执行时，接收到服务器回应 时的处理
      handleRes(xmlhttp.response);
    }
  }

  // 合并对象到第一个,当作拷贝用则属于浅拷贝
  Bobby.merge = function(target) {
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

  // 简易ajax入口
  Bobby.easeAjax = function(obj) {
    var data = { // 默认值
      async: true, // 是否是异步处理
      url: null, //  请求地址
      type: 'GET', // 规定的请求类型,get和post
      data: null, // 要发送的数据
      contentType: "application/x-www-form-urlencoded", //  发送数据的内容类型
      dataType: null, // 预期服务器响应的数据类型
      success: null, // (result,status,xhr)请求成功后调用的函数
      error: null, // (xhr,status,error)请求失败后调用的函数
      complete: null, // function(xhr,status) 请求完成时运行函数,无论失败成功,在success和fail之后运行
    }
    data = this.merge(data, obj);
    if (data.type.toLowerCase() == 'get') {
      var getString = '?'
      for (var i in data.data) {
        getString += i + '=' + data.data[i] + '&'
      }
      getString = getString.replace(/&$/, ''); // 去除最后一个&
      data.url = data.url + getString;
    }
    this.loadXMLDoc(data);
  }

  return Bobby;
})
