export default {
  getQUOSocket: state => state.socketObj,
  getTRANSocket: state => state.socketObj2,
  getMarketData: state => state.marketData,
  getIsLight: state => state.isLight,
  getIsLogin: state => state.isLogin,
  getSelectMarket: state => state.selectMarket,
  getUserInfo: state => state.userInfo,
  getCurrentSymbolInfo: state => state.currenSymbolInfo,
  getQuotesWsData: state => state.quotes_ws_data,
  getProductData: state => state.productData,
}
