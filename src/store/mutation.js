export default {
  setQUOSocket: (state, v) => (state.socketObj = v),
  setTRANSocket: (state, v) => (state.socketObj2 = v),
  setMarketData: (state, v) => (state.marketData = v),
  setIsLight: (state, v) => (state.isLight = v),
  setIsLogin: (state, v) => (state.isLogin = v),
  setSelectMarket: (state, v) => (state.selectMarket = v),
  setUserInfo: (state, v) => (state.userInfo = v),
  setCurrentSymbolInfo: (state, v) => (state.currenSymbolInfo = v),
  setQuotesWsData: (state, v) => (state.quotes_ws_data = v),
  setProductData: (state, v) => (state.productData = v),
  setPositionList: (state,v) => (state.positionList = v),
  setIsMobile: (state,v) => (state.isMobile = v),
}
