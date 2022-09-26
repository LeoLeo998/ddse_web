<template>
    <div class="mobile-home-page">
        <p class="go-trans">前往交易</p>

        <p class="go-trans2">立即前往购买加密货币</p>
        <div class="trans-btn" @click="$router.push('/exchange')">立即交易</div>
        <div class="hot-market">
            <div class="item">
                <a href="/exchange?market=BTCUSDm">
                    <div>
                        <span class="symbol">BTCUSDm</span>
                        <span class="hq">-1.28%</span>
                    </div>
                    <span class="price">
                        <span> 19,080.2</span>
                    </span>
                    <span class="d-price">
                        <span> $ 19,078.29</span>
                    </span>
                </a>
            </div>
            <div class="item">
                <a href="/exchange?market=BTCUSDm">
                    <div>
                        <span class="symbol">BTCUSDm</span>
                        <span class="hq">-1.28%</span>
                    </div>
                    <span class="price">
                        <span> 19,080.2</span>
                    </span>
                    <span class="d-price">
                        <span> $ 19,078.29</span>
                    </span>
                </a>
            </div>
            <div class="item">
                <a href="/exchange?market=BTCUSDm">
                    <div>
                        <span class="symbol">BTCUSDm</span>
                        <span class="hq">-1.28%</span>
                    </div>
                    <span class="price">
                        <span> 19,080.2</span>
                    </span>
                    <span class="d-price">
                        <span> $ 19,078.29</span>
                    </span>
                </a>
            </div>
            <div class="item">
                <a href="/exchange?market=BTCUSDm">
                    <div>
                        <span class="symbol">BTCUSDm</span>
                        <span class="hq">-1.28%</span>
                    </div>
                    <span class="price">
                        <span> 19,080.2</span>
                    </span>
                    <span class="d-price">
                        <span> $ 19,078.29</span>
                    </span>
                </a>
            </div>
        </div>
        <div class="hot-market2">
            <p class="title">热门榜</p>
            <table>
                <tr>
                    <th>名称</th>
                    <th>最新价/24h涨跌</th>
                </tr>
                <tr>
                    <td>
                        <div class="td-l">
                            <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="">
                            <div>
                                <span class="symbol">BTC</span> <br>
                                <span class="full-symbol">Bitcoin</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="fd">-1.28%</span><br>
                        <span class="d-price">19,060.09 USD</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="td-l">
                            <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="">
                            <div>
                                <span class="symbol">ETH</span> <br>
                                <span class="full-symbol">Ethereum</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="fd">-2.28%</span><br>
                        <span class="d-price">1313.45 USD</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="td-l">
                            <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="">
                            <div>
                                <span class="symbol">APE</span> <br>
                                <span class="full-symbol">ApeCoin</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="fd">-2.11%</span><br>
                        <span class="d-price">5.45 USD</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div class="td-l">
                            <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="">
                            <div>
                                <span class="symbol">FTM</span> <br>
                                <span class="full-symbol">Fantom</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="fd">-1.37%</span><br>
                        <span class="d-price">0.228764 USD</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="yd">
            <img src="/static/images/home/part2.png" alt="">
            <p class="big-txt">
                全球第一的数字资产结算全球衍生品交易所
            </p>
            <p class="small-txt">
                加密数字货币合约&nbsp;&nbsp;&nbsp;贵金属&nbsp;&nbsp;&nbsp;能源 <br>
                全球指数&nbsp;&nbsp;&nbsp;主流股票合约&nbsp;&nbsp;&nbsp;外汇
            </p>
        </div>
        <div class="yd">
            <img src="/static/images/home/part3.png" alt="">
            <p class="big-txt">
                去中心化Web3钱包授权登陆
            </p>
            <p class="small-txt">
                去中心化Web3钱包授权登陆，全智能合约管理保证金资产，没有后台和管理员权限 无需担心资产安全，专注于您的交易
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            activeName:'',
            activities: [{
                content: '创建账户',
            }, {
                content: '购买数字货币',
            }]
        }
    },
    methods:{
        handleClick () {

        }
    }
}
</script>
<style lang="less" scoped>
.mobile-home-page {
    padding:16PX;
    background-color: #fff;
    p,span,div,a,th,td{
        font-family: 'URWDIN' !important;
    }
    .go-trans {
        padding: 0 0 8PX;
        font-weight: 500;
        font-size: 24PX;
        line-height: 32PX;
    }
    .go-trans2 {
        font-size: 16PX;
        font-weight: 200;
        line-height: 20PX;
        margin-bottom: 16PX;
    }
    .trans-btn {
        border-radius: 4PX;
        outline: none;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 1;
        pointer-events: auto;
        font-family: URWDIN, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei";
        margin-bottom: 8PX;
        height: 48PX;
        font-size: 18PX;
        padding: 0PX 18PX;
        background: rgb(45, 189, 150);
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 48PX;
    }
    .hot-market {
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap;
        .item {
            flex:50%;
            a {
                text-decoration: none;
            }
            .symbol{
                font-size: 12PX;
                line-height: 16PX;
                margin-right: 4PX;
                color: rgba(0, 20, 42, 0.6);
            }
            .hq{
                font-size: 12PX;
                color: rgb(237, 102, 102);
            }
            .price span{
                display: block;
                color:#00142A;
                font-size: 16PX;
                line-height: 20PX;
            }
            .d-price span{
                font-size: 12PX;
                line-height: 16PX;
                color: rgba(0, 20, 42, 0.6);
            }
            &:nth-child(3),&:nth-child(4) {
                margin-top:20PX;
            }
        }
    }
    .hot-market2 {
        .title {
            height: 40PX;
            line-height: 40PX;
            border-bottom:1PX solid #eee;
            margin-top:30PX;
        }
        table {
            width: 100%;
            tr {
                
                th {
                    padding: 14PX 16PX;
                    background: rgb(255, 255, 255);
                    color: rgba(0, 20, 42, 0.6);
                    font-weight: 400;
                    font-size: 14PX;
                    &:first-child {
                        text-align: left;
                        padding-left:0;
                    }
                    &:last-child {
                        text-align: right;
                        padding-right:0;
                    }
                }
                td {
                    height: 48PX;
                    padding:10PX 0;
                    &:first-child {
                        text-align: left;
                    }
                    &:last-child {
                        text-align: right;
                    }
                    .td-l {
                        display: flex;
                        align-items: center;
                        img {
                            width: 24PX;
                            margin-right:8PX;
                        }
                        .symbol {
                            color:#00142A;
                            font-size: 14PX;
                        }
                        .full-symbol {
                            color:#00142A99;
                            font-size: 12PX;
                        }
                       
                    }
                    .fd {
                        color: #f5455b;
                        font-size: 14PX;
                    }
                    .d-price {
                        color:#00142A99;
                        font-size: 12PX;
                    }
                }
            }
        }
    }
    .yd {
        margin:60PX 0;
        img {
            width: 100%;
        }
        .big-txt {
            color: rgb(9, 17, 51);
            font-weight: 500;
            font-size: 24PX;
            margin-top:20PX;
        }
        .small-txt {
            color:#00142A99;
            font-size: 14PX;
            margin-top:12PX;
        }
    }
}
</style>


