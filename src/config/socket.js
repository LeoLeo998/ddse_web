import bus from '@/util/bus';
export default class Socket {
    socket = null;
    maxReload = 10;
	that = null;
    constructor (wsurl,that) {
		// , options, wsOptions
        // this.maxReload = options.maxReload || maxReload
		// this.wsOptions = wsOptions
		this.wsurl = wsurl
		this.that = that;
		this.createSocket()
    }
    createSocket() {
		// if (this.reloadCount > this.maxReload) {
		// 	console.error(`连接${this.maxReload}次，请刷新重试`)
		// 	return
		// }

		// this.socket = new WebSocket(this.wsurl, this.wsOptions);
		this.socket = new WebSocket(this.wsurl)
		this.socket.onopen = this._onopen.bind(this);
		this.socket.onclose = this._onclose.bind(this);
		this.socket.onerror = this._onerror.bind(this);
		this.socket.onmessage = this._onmessage.bind(this);
		// this.socket.send
	}
    _onopen(msg) {
		console.log(msg,'ws已连接')
        //open 
	}
	_onclose(err) {
		// 关闭连接
		console.log(err,'ws已断开')
	}
	_onerror(err) {
        //错误，结束
		console.log(err,'ws连接错误')
		this.socket.close()
        
	}
	_onmessage(msg) {
		if(this.wsurl.indexOf(8002) > -1) {
			let marketData = JSON.parse(JSON.stringify(this.that.getMarketData)),
				lastData = marketData[marketData.length - 1];
			if(msg.data) {
				let data = JSON.parse(msg.data)
				if(data.symbol == this.that.getSelectMarket) {
					this.that.setCurrentSymbolInfo(data)
					bus.$emit('updateData',data)
				}
			}
		}
		

        // 回参
	}
    send (data, callback, method) {
		//发送订阅 do 
        // console.log(this.socket)
		data = JSON.stringify(data)
		this.socket.send(data)
		return this
	}
}