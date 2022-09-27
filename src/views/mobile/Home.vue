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
    padding:16px;
    background-color: #fff;
    p,span,div,a,th,td{
        font-family: 'URWDIN' !important;
    }
    .go-trans {
        padding: 0 0 8px;
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
    }
    .go-trans2 {
        font-size: 16px;
        font-weight: 200;
        line-height: 20px;
        margin-bottom: 16px;
    }
    .trans-btn {
        border-radius: 4px;
        outline: none;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 1;
        pointer-events: auto;
        font-family: URWDIN, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei";
        margin-bottom: 20px;
        height: 48px;
        font-size: 18px;
        padding: 0px 18px;
        background: rgb(45, 189, 150);
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: 48px;
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
                font-size: 12px;
                line-height: 16px;
                margin-right: 4px;
                color: rgba(0, 20, 42, 0.6);
            }
            .hq{
                font-size: 12px;
                color: rgb(237, 102, 102);
            }
            .price span{
                display: block;
                color:#00142A;
                font-size: 16px;
                line-height: 20px;
            }
            .d-price span{
                font-size: 12px;
                line-height: 16px;
                color: rgba(0, 20, 42, 0.6);
            }
            &:nth-child(3),&:nth-child(4) {
                margin-top:20px;
            }
        }
    }
    .hot-market2 {
        .title {
            height: 40px;
            line-height: 40px;
            border-bottom:1px solid #eee;
            margin-top:30px;
        }
        table {
            width: 100%;
            tr {
                
                th {
                    padding: 14px 16px;
                    background: rgb(255, 255, 255);
                    color: rgba(0, 20, 42, 0.6);
                    font-weight: 400;
                    font-size: 14px;
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
                    height: 48px;
                    padding:10px 0;
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
                            width: 24px;
                            margin-right:8px;
                        }
                        .symbol {
                            color:#00142A;
                            font-size: 14px;
                        }
                        .full-symbol {
                            color:#00142A99;
                            font-size: 12px;
                        }
                       
                    }
                    .fd {
                        color: #f5455b;
                        font-size: 14px;
                    }
                    .d-price {
                        color:#00142A99;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .yd {
        margin:60px 0;
        img {
            width: 100%;
        }
        .big-txt {
            color: rgb(9, 17, 51);
            font-weight: 500;
            font-size: 24px;
            margin-top:20px;
        }
        .small-txt {
            color:#00142A99;
            font-size: 14px;
            margin-top:12px;
        }
    }
}
</style>


