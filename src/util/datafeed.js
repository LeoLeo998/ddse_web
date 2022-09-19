const config = {
  supported_resolutions: ["1","5","15","30", "60","1D"],supports_time: true
};
window.historyList = [];
window.SubscriberList = [];
var priceMap = new Object();
class DataFeed {
    constructor(vm) {
        this.vm = vm
        this._subscribers = {};
    }
  
    // 服务端配置
    onReady(cb) {
        setTimeout(()=>{
          cb(config)
        },0)
    }
    //// 解析数据
    resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {

      setTimeout(function() {

        var symbol_stub = {
          name: symbolName,
          has_intraday: true,
          has_no_volume: true,
          timezone: "Asia/Shanghai",
          minmov: 1,
          minmov2: 0,
          pricescale: 100,
          session: "24x7",
          //supported_resolutions: ["1","5","15","30", "60"],
          ticker: symbolName,
          type: "forex"
        }
        onSymbolResolvedCallback(symbol_stub);
      })
    }

    //这里做的事,更新历史数据,注册onMessage回调,触发实时更新的回调方法
    getBars(symbolInfo, resolution, from, to, onHistoryCallback, onErrorCallback, firstDataRequest) {
      //渲染历史数据
      function _send (data) {
        var bars = [];
        var meta = {noData:false};
        for(var i=0;i<data.rows.length;i++){				      			
          var bar = new Object();
          bar.time=parseInt(data.rows[i].datetime);
          bar.close=parseFloat(data.rows[i].close);
          bar.open=parseFloat(data.rows[i].open);
          bar.high=parseFloat(data.rows[i].high);
          bar.low=parseFloat(data.rows[i].low);
          bars.push(bar);				      			
        }
        //onHistoryCallback(bars, {noData:false});				      		
        if(data.status == 200){
          meta = {noData:false};
        }else{
          meta = {noData:true};
        }
        for (const his of window.historyList) {
          if(his.sym.name == data.name && his.from == data.from && his.to == data.to && his.resolution == data.resolution){
            his.callback(bars,meta)
          }
        }
        
      }

      window.historyList.push({
        sym:symbolInfo,
        from:from,
        to:to,
        resolution:resolution,
        callback:onHistoryCallback
      });

      //向长连接发消息,触发ws服务的KlineHistory方法
      
      
      var data = new Object();
      data.symbol = symbolInfo.name;
      data.time = resolution;
      data.startDate = from;
      data.endDate = to;
      this.vm.marketListFetch(data).then(res => {
        if(res.rows.length > 0){
            var lastPrice = res.rows[res.rows.length-1];
            if(priceMap[symbolInfo.name+resolution] == null){
              priceMap[symbolInfo.name+resolution] = lastPrice; 
            }else if(priceMap[symbolInfo.name+resolution].datetime < lastPrice.datetime){
              priceMap[symbolInfo.name+resolution] = lastPrice;
            }
        }
        _send(res);
      }).catch(err => {

      })
      
    }
    //实时更新
    subscribeBars (symbolInfo, resolution, onRealtimeCallback, subscriberUID,onResetCacheNeededCallback) {
      //注册多个更新实时数据的回调,多条线展示的时候,能分得清哪个回调用哪个数据
      window.SubscriberList.push(
        {
          symbol: symbolInfo,
          resolution: resolution,
          id: subscriberUID.toLowerCase(),
          callback: onRealtimeCallback
        }
      );
      //console.log( '订阅' + subscriberUID.toLowerCase())
      //向长连接发消息,触发ws服务的KlineUpdata方法

    }
    //取消订阅,撤销掉某条线的实时更新
    unsubscribeBars (subscriberUID){
      //console.log('取消订阅'+subscriberUID);

      const idx = window.SubscriberList.findIndex(n => n.id === subscriberUID)
      
      if (idx < 0) return

      window.SubscriberList.splice(idx, 1);
      
    }
    formatData (productPrice) {
      if(priceMap == null){
				return;
			}
      var newPrice = productPrice.buy_price;
      for (const sub of window.SubscriberList) {
				
				if(sub.symbol.name == productPrice.symbol){
					
					var lastPriceData = priceMap[productPrice.symbol+sub.resolution];
					
					var updateDate = new Date(productPrice.datetime);
					updateDate.setUTCMilliseconds(0);
					updateDate.setUTCSeconds(0);

					if(sub.resolution=="5" || sub.resolution=="15" || sub.resolution=="30" ){
						var minute = updateDate.getMinutes();
						updateDate.setMinutes(minute - minute%sub.resolution);
					}else if(sub.resolution=="60"){
						updateDate.setMinutes(0);
					}else if(sub.resolution=="1D"){
						updateDate.setHours(0);
						updateDate.setMinutes(0);
					}
					
					
					if( updateDate.getTime() == lastPriceData.datetime){
						
						var newPriceData = new Object();
						
						newPriceData.datetime = lastPriceData.datetime;									
						newPriceData.open = lastPriceData.open;									
						newPriceData.close = newPrice;
						newPriceData.high = lastPriceData.high;
						newPriceData.low = lastPriceData.low;
						
						if(newPrice > lastPriceData.high){
							newPriceData.high = newPrice;
						}
						
						if(newPrice < lastPriceData.low){
							newPriceData.low = newPrice;
						}
						
						var new_bar = {
								time:newPriceData.datetime,
								close:newPriceData.close,
								open:newPriceData.open,
								high:newPriceData.high,
								low:newPriceData.low,
						};
						sub.callback(new_bar);
						
					}else if(updateDate.getTime() > lastPriceData.datetime){						
						var new_bar = {
								time:updateDate.getTime(),
								close:newPrice,
								open:newPrice,
								high:newPrice,
								low:newPrice,
						};
						sub.callback(new_bar);
					}
				}
			}
      var time = ["1","5","15","30", "60","1D"];
			
			for(var i=0;i<time.length;i++){
				

				if(priceMap[productPrice.symbol+time[i]] != null){
					
					var updateDate = new Date(productPrice.datetime);
					updateDate.setUTCMilliseconds(0);
					updateDate.setUTCSeconds(0);

					if(time[i]=="5" || time[i]=="15" || time[i]=="30" ){
						var minute = updateDate.getMinutes();
						updateDate.setMinutes(minute - minute%time[i]);
					}else if(time[i]=="60"){
						updateDate.setMinutes(0);
					}else if(time[i]=="1D"){
						updateDate.setHours(0);
						updateDate.setMinutes(0);
					}
					
					var lastPriceData = priceMap[productPrice.symbol+time[i]];
					
					if(updateDate.getTime() == lastPriceData.datetime){
						
						priceMap[productPrice.symbol+time[i]].close = newPrice;
						
						if(newPrice > lastPriceData.high){
							priceMap[productPrice.symbol+time[i]].high = newPrice;
						}
						
						if(newPrice < lastPriceData.low){
							priceMap[productPrice.symbol+time[i]].low = newPrice;
						}
						
					}else if(updateDate.getTime() > lastPriceData.datetime){
						
						priceMap[productPrice.symbol+time[i]].datetime = updateDate.getTime();
						priceMap[productPrice.symbol+time[i]].open = newPrice;
						priceMap[productPrice.symbol+time[i]].close = newPrice;
						priceMap[productPrice.symbol+time[i]].high = newPrice;
						priceMap[productPrice.symbol+time[i]].low = newPrice;
						
					} 
				}
			}
			
    }
      // 循环读取实时数据
    async readTicker(data) {
      for (let listenerGuid in this._subscribers) {
        this.update(listenerGuid, data);
      }
    }
    
}
  
export default DataFeed