<template>
    <div >
        <div class="home-page">
            <div class="head" >
                <div class="head-content">
                    <div class="right" v-if="getIsMobile">
                        <img src="/static/images/home/part1-1.png" alt="">
                    </div>
                    <div class="left">
                        <p class="title">全球首家数字资产结算全品种衍生品交易平台</p>
                        <p class="small-title">
                            全品种覆盖、去中心化资产托管
                        </p>
                        <div class="btn-box">
                            <button class="major" @click="$router.push('/register')">
                                立即注册
                            </button>
                            <button @click="$router.push('/exchange')">
                                立即交易
                            </button>
                        </div>
                    </div>
                    <div class="right" v-if="!getIsMobile">
                        <img src="/static/images/home/part1-1.png" alt="">
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="banner-box" v-if="!getIsMobile">
                    <!-- 配置slider组件 -->
                    <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
                        <slideritem v-for="(item,index) in someList" :key="index" :style="item.style">
                            <img :src="`/static/images/home/${item.img}.jpg`" alt="">
                        </slideritem>
                        <div slot="loading">loading...</div>
                    </slider>
                </div>
                <div class="market-trend">
                    <p class="title">热门榜</p>
                    <ul>
                        <div class="th-box">
                            <li class="th">名称</li>
                            <li class="th">最新价</li>
                            <li class="th">24h涨跌</li>
                            <li class="th" v-if="!getIsMobile">24H最高</li>
                            <li class="th" v-if="!getIsMobile">24H最低</li>
                            <li class="th">操作</li>
                        </div>
                        <div class="td-box" v-for="item in hotList">
                            <li class="td">
                                <!-- <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt=""> -->
                                <span class="coin-name">{{item.symbol}}</span>
                            </li>
                            <li class="td">
                                <span class="txt1" :class="item.buy_price_direction == 'up' ? 'price-up' : 'price-down'">
                                    {{item.buy_price}}
                                </span>
                            </li>
                            
                            <li class="td">
                                <span class="txt2" :class="getRange(item) > 0 ? 'price-up' : 'price-down'">
                                    {{ getRange(item) }}%
                                </span>
                            </li>
                            <li class="td" v-if="!getIsMobile">
                                {{item.high}}
                            </li>
                            <li class="td" v-if="!getIsMobile">
                                {{item.low}}
                            </li>
                            <li class="td txt1">
                                <button class="buy-btn" @click="$router.push('/exchange')">
                                    交易
                                </button>
                            </li>
                        </div>
                    </ul>
                    <router-link class="show-more" to="/market">查看更多<i class="fa fa-angle-right"></i></router-link>
                </div>
                <div class="part2">
                    <div class="left">
                        <p class="big-txt">
                            全球第一的数字资产结算全球衍生品交易所
                        </p>
                        <p class="small-txt">
                            加密数字货币合约&nbsp;&nbsp;&nbsp;贵金属&nbsp;&nbsp;&nbsp;能源 <br>
                            全球指数&nbsp;&nbsp;&nbsp;主流股票合约&nbsp;&nbsp;&nbsp;外汇
                        </p>
                    </div>
                    <div class="right">
                        <img src="/static/images/home/part2.png" alt="">
                    </div>
                </div>
                <div class="part3">
                    <div class="left">
                        <img src="/static/images/home/part3.png" alt="">
                    </div>
                    <div class="right">
                        <p class="big-txt">
                            去中心化Web3钱包授权登陆
                        </p>
                        <p class="small-txt">
                            去中心化Web3钱包授权登陆，全智能合约管理保证金资产，没有后台和管理员权限
                            无需担心资产安全，专注 于您的交易
                        </p>
                    </div>
                </div>
                <div class="part4">
                    <p class="big-txt">欢迎加入DDSE社区</p>
                    <p class="small-txt">
                        关注我们即可获得5 USDT奖励！
                    </p>
                    <div class="link-box">
                        <img class="item" src="/static/images/home/p4-1.png" alt="">
                        <img class="item" src="/static/images/home/p4-2.png" alt="">
                        <img class="item" src="/static/images/home/p4-3.png" alt="">
                        <img class="item" src="/static/images/home/p4-4.png" alt="">
                        <img class="item" src="/static/images/home/p4-5.png" alt="">
                    </div>
                </div>
                <div class="part5">
                    <div class="left">
                        <p class="big-txt">
                            安全,易用的数字货币市场
                        </p>
                        <p class="small-txt">
                            下载SuperEx 手机应用程序，随时关注市场，在玩的时刻进行交易，无论你身在何处。
                        </p>
                        <div class="download-box">
                            <img class="code" src="/static/images/home/p5-code.png" alt="">
                            <div class="right-download">
                                <img class="item" src="/static/images/home/p5-1.png" alt="">
                                <img class="item" src="/static/images/home/p5-2.png" alt="">
                                <br>
                                <img class="item item2" src="/static/images/home/p5-3.png" alt="">
                                <img class="item item2" src="/static/images/home/p5-4.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="/static/images/home/p5-banner.png" alt="">
                    </div>
                </div>
                <div class="part6">
                    <p class="title">
                        FAQ
                    </p>
                    <div class="content-box">
                        <div class="faq-box">
                            <div class="item">
                                <p class="big-txt">
                                    什么是比特币？
                                </p>
                                <div class="small-txt">
                                    比特币是世界上最大、最著名的去中心化加密货币。 它采用区块链作为底层技术，允许用户通过点对点网络传输数据和资产，且无需任何中间人和中央银行。
                                </div>
                            </div>
                            <div class="item">
                                <p class="big-txt">
                                    在 DDSE 上交易安全吗？
                                </p>
                                <div class="small-txt">
                                    DDSE及其团队部署了全球最专业的安全网络架构体系，并不断优化和升级安全系统，以确保用户资产和账户安全。
                                </div>
                            </div>
                            <div class="item">
                                <p class="big-txt">
                                    1 美元可以购买数字资产吗？
                                </p>
                                <div class="small-txt">
                                    由于数字资产具有无限分割的特性，在DDSE即使1美元也可以购买数字资产。
                                </div>
                            </div>
                            <div class="item">
                                <p class="big-txt">
                                    法定货币出入金是否有限制？
                                </p>
                                <div class="small-txt">
                                    DDSE严格遵守所在国的各项法律法规，不同国家的出入金规则不同。在法律允许的国家，DDSE 对法定货币出入金不收取任何费用且没有限制，目前C2C市场支持多种法定货币，为用户提供7*24小时的出入金服务。
                                </div>
                            </div>
                        </div>
                        <div class="start-box">
                            <p class="big-txt">即将开启您的数字货币交易，准备好了吗？</p>
                            <p class="small-txt">只需3分钟即可完成账户设置 并开始交易</p>
                            <button class="ks" @click="$router.push('/register')">开立账户</button>
                        </div>
                    </div>
                </div>
                <div class="part8">
                    <div class="content">
                        <div class="left">
                            <img class="logo" src="/static/images/logo.png" alt="">
                            <p class="lx">
                                联系我们
                            </p>
                            <img class="link-p" src="/static/images/home/p7-link.png" alt="">
                            <div class="email-box">
                                客户支持: support@xt.com<br>
                                上币支持: bd@xt.com<br>
                                上币申请: listing@xt.com<br>
                                IDO/IGO申请: xtstarter@xt.com<br>
                                合作伙伴: partnerships@xt.com
                            </div>
                        </div>
                        <div class="right" v-if="!getIsMobile">
                            <div class="cell">
                                <p class="title">
                                    技术支持
                                </p>
                                <p class="txt">
                                    APP下载<br>
                                    API文档<br>
                                    常见问题<br>
                                    提交工单<br>
                                    清除缓存
                                </p>
                            </div>
                            <div class="cell">
                                <p class="title">
                                    技术支持
                                </p>
                                <p class="txt">
                                    关于XT.com<br>
                                    加入我们<br>
                                    官方公告<br>
                                    费率说明<br>
                                    数字资产介绍<br>
                                    日程表<br>
                                    XT媒体工具包<br>
                                    官方验证通道<br>
                                    P2P商家申请<br>
                                    代理商<br>
                                    Ecosystem
                                </p>
                            </div>
                            <div class="cell">
                                <p class="title">
                                    条款说明
                                </p>
                                <p class="txt">
                                    隐私保护<br>
                                    用户协议<br>
                                    执法请求
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot" v-if="!getIsMobile">
                    <p class="hz">合作伙伴</p>
                    <img src="/static/images/home/foot.png" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- <MobileHome v-else/> -->
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'
import HCharts from '@/components/chart/Index'
import MobileHome from '@/views/mobile/Home'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            options:{
                currentPage: 0,
                tracking: false,
                thresholdDistance: 50,
                thresholdTime: 300,
                infinite: 4,
                slidesToScroll: 4,
                loop: true,
                loopedSlides:4,
                pagination: false
            },
            someList:[{
                img:'banner1',
            },{
                img:'banner2',
            },{
                img:'banner3',
            },{
                img:'banner4',
            },{
                img:'banner1',
            },{
                img:'banner2',
            },{
                img:'banner3',
            },{
                img:'banner4',
            }]
        }
    },
    components: {
        slider,
        slideritem,
        HCharts,
        MobileHome,
    },
    computed:{
        ...mapGetters(["getProductData"]),
        hotList () {
            let data = Object.values(JSON.parse(JSON.stringify(this.getProductData)))
            data = data.filter(v => {
                return v.hot == 1
            })
            data = data.slice(0,5)
            return data
        },
    },
    created () {
        this.getData()
    },
    methods:{
        ...mapActions([
            "productListFetch"
        ]),
        ...mapMutations([
            "setProductData"
        ]),
        async getData () {
            let res = await this.productListFetch()
            let hot;
            if(res.rows.length > 0) {
                hot = res.rows.filter(v => {
                    return v.hot === 1
                })
            }
            // this.hotList = hot.slice(0,5)

            // this.dataList = res.rows
            let obj = {}
            res.rows.forEach(v => {
                obj[v.symbol] = {}
                obj[v.symbol] = v
            })
            this.setProductData(obj)
        },
        getRange(item) {
            return (((item.buy_price - item.close) / item.close) * 100).toFixed(2)
        },
        slide (data) {
            // console.log(data)
        },
        onTap (data) {
            // console.log(data)
        },
        onInit (data) {
            // console.log(data)
        }
    }
}
</script>
<style lang="less" scoped>
.home-page {
    background-color: #fff;
    div,span,p,li,a,button{
        font-family: URWDIN !important;
    }
    .head {
        height: 442px;
        display: flex;
        align-items: center;
        background-image: url("/static/images/home/part1-bg.png");
        background-repeat: no-repeat;
        //background-size: 100% ;
        background-position: 0px -80px;
        .head-content {
            margin:0 auto;
            display: flex;
            justify-content:space-between;
            align-items: center;
            
            .left {
                .title {
                    font-size: 45px;
                    font-weight: 900;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: 1.33;
                    letter-spacing: normal;
                    color: #000;
                }
                .small-title {
                    font-size: 18px;
                    color: #000;
                    margin-top:18px;
                }
                .btn-box {
                    margin-top:50px;
                    button {
                        height: 54px;
                        cursor: pointer;
                        border-radius: 6px;
                        color: #000;
                        line-height: 1.14;
                        text-align: center;
                        border:1px solid rgb(145, 145, 145);
                    }
                    .major {
                        background-color: var(--color-green-);
                        color: #fff;
                        margin-right:20px;
                        border:none;
                    }
                }
            }
        }
        .big-title {
            font-size: 48px;
        }
        .small-title {
            font-size: 16px;
            margin-top: 16px;
            color: #474D57;
            font-weight: 400;
        }
        .to-register-btn {
            border:none;
            background-color: transparent;
            width: 200px;
            padding: 10px 15px;
            margin-top:20px;
            background-color: #03A66D;
            text-align: center;
            color:#fff;
            border-radius:5px;
        }
    }
    .content {
        .swiper-box {
            display: flex;
            .item {
                flex: 1;
                // padding:20px 20px 20px 0;
                height:80px;
                .slider-container > .slider-touch > .slider-wrapper > .slider-item {
                    display: block;
                    text-align: left;
                }
                .market {
                    font-size: 16px;
                    color:#1e2329;
                    span {
                        // margin-left:20px;
                        color:rgb(207, 48, 74);
                    }
                }
                .price {
                    font-size: 24px;
                    color:#1e2329;
                    font-weight: 600;
                    margin:5px 0;
                }
                .usd-price {
                    font-size: 14px;
                    color:#474d57;
                }
            }
        }
        .banner-box {
            display: flex;
            
            margin:0 auto;
            margin-top:38px;
            .slider-item {
                border-radius: 6px;
                overflow: hidden;
                width: 23.5%;
                margin-right: 2%;
                img{
                    width: 100%;
                    //max-height: 163px;
                }
            }
            .item {
                height: 163px;
                text-align: center;
                line-height: 135px;
                color:#fff;
                flex: 1;
                margin-right:24px;
                background-color: forestgreen;
                border-radius:5px;
                &:last-child {
                    margin-right:0;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .market-trend {
            .show-more {
                display: block;
                text-align: center;
                padding: 16px;
                color: rgb(45, 189, 150);
                font-weight: 400;
                font-size: 16px;
                text-decoration: none;
                font-family: URWDIN;
                i {
                    color: rgb(45, 189, 150);
                    font-size: 20px;
                    margin-left:10px;
                }
            }
            .title {
                display: inline-block;
                padding-bottom:7px;
                font-size: 24px;
                margin-bottom:20px;
                border-bottom:3px solid var(--color-green-);
            }
            ul {
                list-style: none;
                width: 100%;
                .th-box,.td-box {
                    .td {
                        &:last-child {
                            display: flex;
                            justify-content: end;
                        }
                    }
                }
                .th-box {
                    width: 100%;
                    display: flex;
                    height: 50px;
                    align-items: center;
                    .th {
                        text-align: center;
                        font-size: 14px;
                        color: #00142a99;
                        &:first-child {
                            text-align: left;
                        }
                        &:last-child {
                            text-align: right;
                        }
                    }
                }
                .td-box {
                    width: 100%;
                    height: 70px;
                    border-bottom:1px solid #eee;
                    display: flex;
                    align-items: center;
                    .txt1,.txt2 {
                        font-family: URWDIN;
                    }
                    .td {
                        text-align: center;
                        font-family: URWDIN;
                        .coin-name {
                            //margin-left:10px;
                        }
                        .coin-fullname {
                            margin-left:10px;
                            font-size: 14px;
                        }
                        &:first-child {
                            text-align: left;
                        }
                        &:last-child {
                            text-align: right;
                        }
                    }
                    img {
                        width: 24px;
                        height: 24px;
                        border-radius:24px;
                    }
                    .coin-name {
                        font-size: 16px;
                        color:#00142a;
                        font-family: URWDIN;
                    }
                    .txt1 {
                        font-size: 14px;
                        font-family: URWDIN;
                    }
                    .coin-fullname {
                        font-size: 14px;
                        color: #68727e;
                    }
                    .txt2 {
                        font-family: URWDIN;
                        font-size: 14px;
                        color: var(--color-green-);
                    }
                    .buy-btn {
                        border-radius: 4px;
                        border:1px solid #eee;
                        background: transparent;
                        padding: 9px 14px 8px;
                        border-radius: 4px;
                        border: solid 1px var(--font-primary-);
                        font-size: 15px;
                        font-weight: normal;
                        font-stretch: normal;
                        font-style: normal;
                        line-height: 1;
                        letter-spacing: normal;
                        color: var(--font-primary-);
                        cursor: pointer;
                    }
                }
            }
        }
        .part2 {
            display: flex;
            align-items: center;
            margin:0 auto;
            margin-top:70px;
            .left {
                .big-txt {
                    font-size: 52px;
                    color: #000;
                }
                .small-txt {
                    font-size: 18px;
                    line-height: 1.78;
                    color: #000;
                    margin-top:40px;
                }
            }
            
        }
        .part3 {
            display: flex;
            align-items: center;
            margin:0 auto;
            margin-top:70px;
            .right {
                .big-txt {
                    font-size: 52px;
                    color: #000;
                }
                .small-txt {
                    font-size: 18px;
                    line-height: 1.78;
                    color: #000;
                    margin-top:40px;
                }
            }
        }
        .part4 {
            height: 393px;
            background-image: url('/static/images/home/part4-bg.png');
            background-repeat: no-repeat;
            background-position: 0 0 ;
            background-size: 100% 100%;
            margin:0 auto;
            margin-top:130px;
            display: flex;
            align-content: center;
            flex-wrap: wrap;
            .big-txt {
                width: 100%;
                text-align: center;
                font-size: 52px;
                line-height: 1.33;
                color: #000;
            }
            .small-txt{
                width: 100%;
                text-align: center;
                font-size: 18px;
                line-height: 1.78;
                color: #000;
                margin-top:18px;
            }
            .link-box {
                width: 100%;
                text-align: center;
                margin-top:63px;
                .item {
                    width: 51px;
                    height: 51px;
                    margin-right:43px;
                    &:last-child {
                        margin:0;
                    }
                }
            }
        }
        .part5 {
            display: flex;
            align-items: center;
            margin:0 auto;
            padding-top:180px;
            .left {
                .big-txt {
                    font-size: 52px;
                    color: #000;
                }
                .small-txt {
                    font-size: 18px;
                    line-height: 1.78;
                    color: #000;
                    margin-top:34px;
                }
                .download-box {
                    margin-top:50px;
                    display: flex;
                    .right-download {
                        .item {
                            &.item2 {
                                margin-top:11px;
                            }
                        }
                    }
                }
            }
        }
        .part6 {
            
            
            padding-top:227px;
            padding-bottom:100px;
            background-image: url('/static/images/home/p7-bg.png');

            background-repeat: no-repeat;
            background-position: 100% 100%;
            background-size: 100% 100%;
            .title {
                font-size: 34px;
                font-weight: 500;
                color: #000;
                text-align: center;
            }
            .content-box {
                
                margin:0 auto;
                margin-top:44px;
                .faq-box {
                    display: grid;
                    margin-top: 40px;
                }
                .item {
                    //display:inline-grid;
                    .big-txt {
                        font-size: 24px;
                        color: #000;
                    }
                    .small-txt {
                        font-size: 14px;
                        line-height: 1.57;
                        color: #00142a99;
                        margin-top:12px;
                    }
                }
            }
            .start-box {
                text-align: center;
                margin-top:120px;
                .big-txt {
                    
                    font-size: 36px;
                    line-height: 1;
                    text-align: center;
                    color: #000;
                }
                .small-txt {
                    font-size: 20px;
                    line-height: 1.6;
                    text-align: center;
                    color: #65707c;
                    margin-top:16px;
                }
                .ks {
                    margin-top:50px;
                    padding: 12px 17px;
                    border-radius: 4px;
                    //background-color: var(--font-primary-);
                    background: rgb(45, 189, 150);
                    font-size: 16px;
                    line-height: 1;
                    text-align: center;
                    border:none;
                    color: #fff;
                    cursor: pointer;
                }
            }
        }
        .part8 {
            
            background-color: #fff;
            padding-top:64px;
            padding-bottom:100px;
            .content {
                
                margin:0 auto;
                display: flex;
            }
            .left{
                flex:1;
                .logo {
                    width: 146px;
                    height: 39px;
                }
                .lx {
                    font-size: 20px;
                    line-height: 1;
                    margin-top:46px;
                    color: #31333a;
                }
                .link-p {
                    width: 381px;
                    height: 66px;
                    margin-top:29px;
                }
                .email-box {
                    margin-top:24px;
                    font-size: 16px;
                    line-height: 2;
                    color: #68727e;
                }
            }
            .right {
                flex:1;
                display: flex;
                
                .cell {
                    flex:1;
                    .title {
                        font-size: 20px;
                        color: #31333a;
                    }
                    .txt {
                        margin-top:24px;
                        font-size: 16px;
                        line-height: 2;
                        color: #68727e;
                    }
                }
            }
        }
        .foot {
            margin:0 auto;
            .hz {
                padding-top:11px;
                font-size: 14px;
                color: #68727e;
            }
            img {
                width: 1207px;
                height: 59px;
                margin-top:14px;
            }
        }
    }
}
@media (min-width:768px) {
    .banner-box,.market-trend,.foot,.part8>.content,.part6>.content-box,.part5,.part3,.part2,.head > .head-content{
        width: 100%;
        max-width: 1240px;
        padding:0 20px;
    }
    .market-trend {
        margin:0 auto;
        margin-top:40px;
    }
    .home-page .content .market-trend ul {
        .td,.th {
            width: 16.666%;
            &:last-child {
                text-align: right;
            }
        }
    }
    .head-content {
        .left,.right {
            flex:1;
        }
        .left {
            .btn-box {
                button {
                    padding: 14px 37px 14px 38px;
                    font-size: 22.4px;
                }
            }
            .title {
                width: 495px;
            }
        }
        .right {
            img {
                width: 562px;
                height: 308px;
            }
        }
    }
    .part2 {
        img {
            width: 490px;
        }
        .left{
            width: 60%;
            .big-txt {
                width: 583px;
            }
        }
        .right {
            width: 40%;
        }
    }
    .part3 {
        img {
            width: 490px;
        }
        .left{
            width: 40%;
        }
        .right {
            width: 60%;
            .small-txt {
                width: 661px;
            }
        }
    }
    .part5 {
        .left,.right {
            width:50%;
        }
        .right {
            img {
                min-width: 600px;
                width: 100%;
                //height: 488px;
            }
        }
        .download-box {
            .code {
                width: 210px;
                height: 210px;
                margin-right:17px;
            }
            .right-download {
                .item {
                    width: 147px;
                    height: 97px;
                    margin-right:14px;
                }
            }
        }
    }
    .part6 {
        .small-txt {
            width: 490px;
        }
        .start-box {
            .big-txt,.small-txt {
                width: 100%;
            }
            .ks {
                width: 98px;
                height: 40px;
            }
        }
    }
    .faq-box {
        gap: 60px 200px;
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width:768px) {
    .home-page {
        .head {
            height:700px;
            .head-content {
                width: 90%;
                flex-wrap: wrap;
                .left,.right {
                    width:100%;
                    .btn-box {
                        button {
                            padding: 8px 14px ;
                            font-size: 18px;
                        }
                    }
                    .title {
                        width:90%;
                    }
                }
                .right {
                    img {
                        width: 90%;
                    }
                }
            }
        }
        .banner-box,.market-trend,.foot,.part8>.content,.part6>.content-box,.part5,.part3,.part2,.head > .head-content{
            width: 90%;
            
        }
        .market-trend {
            margin:0 auto;
        }
        .market-trend ul {
            .td,.th {
                width: 25%;
                &:last-child {
                    text-align: right;
                }
            }
        }
        .major {
            margin-bottom:20px;
        }
        .part2 img,.part3 img {
            width: 90%;
        }
        .part2{
            flex-wrap: wrap;
            .left,.right {
                width: 100%;
            }
        }
        .part3 {
            flex-wrap: wrap;
            .left,.right{
                width: 100%
            }
            .right{
                .big-txt,.small-txt {
                    width:90%;
                }
            }
        }
        .part5 {
            flex-wrap: wrap;
            .left,.right {
                width:100%;
                img {
                    width:90%;
                }
            }
            .download-box {
                .code {
                    width: 120px;
                    height: 120px;
                    margin-right:12px;
                }
                .right-download {
                    .item {
                        width: 100px;
                        height: 70px;
                        //margin-right:14px;
                    }
                }
            }
        }
        .part6 {
            .small-txt {
                width: 90%;
            }
            .start-box {
                .big-txt,.small-txt {
                    width: 90%;
                }
            }
        }
        .faq-box {
            gap: 24px 0;
            grid-template-columns: repeat(1, 100%);
            .item {
                width:100%;
                padding:0;
                margin-top:50px;
            }
            .jl {
                padding-left: 0;
            }
        }
    }
    
    
}

</style>