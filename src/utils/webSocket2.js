class Socket {
    /**
     * @description: 初始化实例属性，保存参数
     *
     */
    constructor(options) {
        this.url = options.url;
        this.callback = options.received;
        this.name = options.name || 'default';
        this.ws = null;
        this.status = null;
        this.pingInterval = null;
        this._timeout = 3000;   // 心跳检测频率
        this.isHeart = options.isHeart;  // 是否进行心跳检测
        this.isReconnection = options.isReconnection;  // 是否断开重连
    }
    connect(data) {
        this.ws = new WebSocket(this.url);
        // 建立连接
        this.ws.onopen = (e) => {
            this.status = 'open';
            console.log("连接成功", e)
            if(this.isHeart) {
                // 心跳
                this._heartCheck()
            }
            // 给后台发送数据
            if(data !== undefined) {
                return this.ws.send(JSON.stringify({type: 'init'}))
            }
        }
        // 接受服务器返回的信息
        this.ws.onmessage = (e) => {
            if(typeof this.callback === 'function'){
                return this.callback(e.data)
            }else{
                console.log('参数的类型必须为函数')
            }
        }
        // 关闭连接
        this.ws.onclose = (e) => {
            console.log('onclose',e)
            this._closeSocket(e)
        }
        // 报错
        this.onerror = (e) => {
            console.log('onerror',e)
            this._closeSocket(e)
        }
    }
    sendMsg(data) {
        let msg = JSON.stringify(data)
        return this.ws.send(msg)
    }
    _resetHeart() {
        clearInterval(this.pingInterval)
        return this
    }
    _heartCheck() {
        this.pingInterval = setInterval(() => {
            if(this.ws.readyState === 1) {
                this.ws.send(JSON.stringify({type: 'ping'}))
            }
        },this._timeout)
    }
    _closeSocket(e) {
        this._resetHeart()
        if(this.status !== 'close') {
            console.log('断开，重连', e)
            if(this.isReconnection){
                // 重连
                this.connect()
            }
        }else{
            console.log('手动关闭了', e)
        }
    }
    close() {
        this.status = 'close'
        this._resetHeart()
        return this.ws.close();
    }
}
