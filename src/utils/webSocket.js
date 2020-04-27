/**
 * @description  webSocket持久化连接
 */

export default class WebSocketClass{
  constructor(url) {
    this.ws = null   // websocket对象
    this.wsUrl = url
    this.lockReconnect = false   // 避免重复连接
    this.tt = null
    this.createWebSocket()
  }

  createWebSocket() {  // 创建WebSocket连接
    try {
      this.ws = new WebSocket(this.wsUrl);
      console.log('创建WebSocket连接')
      this.init();
    } catch(e) {
      console.log('连接错误:' + e)
      this.reconnect(this.wsUrl);
    }
  }

  init() {  // 初始化
    let that = this
    this.ws.onclose = function () {
      console.log('链接断开')
      that.reconnect(that.wsUrl)
    }
    this.ws.onerror = function() {
      console.log('链接异常')
      that.reconnect(that.wsUrl)
    }
    this.ws.onopen = function () {
      console.log('连接正常')
      that.heartCheck.start(that)  // 函数内部this指代init(){}里的上下文，要强行用that存在最外面class的上下文
    }
    this.ws.onmessage = function (event) {  // 收到消息
      console.log(event.data)
      //拿到任何消息都说明当前连接是正常的
      that.heartCheck.start(that)
    }
  }

  reconnect(url) {  // 重链接
    let that = this
    console.log('重连')
    if(this.lockReconnect) {
      console.log('重连接已锁，不做处理')
      return;
    };
    this.lockReconnect = true
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      that.lockReconnect = false
      that.createWebSocket()
    }, 4000)
  }

  heartCheck = {  // 心跳检测
    num: 3,  // 3次心跳均未响应重连
    start: function(that){
      var _num = this.num  // 这里this指代heartCheck自身上下文
      setTimeout(function(){
          try{
            /*这里发送一个心跳，后端收到后，返回一个心跳消息，
            onmessage拿到返回的心跳就说明连接正常*/
            that.ws.send("test")
            _num--
            //计算答复的超时次数
            if(_num === 0) {
              that.ws.colse()
            }
          }catch(e){
            console.log(e)
          }
      }, 300*1000)  // 每3分钟发送一次心跳
    }
  }
}
