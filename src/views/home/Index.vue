<template>
    <div class="home-page">
        <div class="content">
            <div class="head">
                <div>
                    <p class="big-title">
                        买币上MSB
                    </p>
                    <p class="small-title">
                        专业的区块链资产交易平台
                    </p>
                    <div class="to-register-btn" @click="$router.push('/register')">
                        去注册
                    </div>
                </div>
            </div>
            <div class="swiper-box">
                
                <div class="item" v-for="i in 5">
                    <slider ref="slider" :options="options" @slide='slide' @tap='onTap' @init='onInit'>
                        <slideritem v-for="(item,index) in 3" :key="index">
                            <p class="market">BTC/USDT <span>0.17%</span></p>
                            <p class="price">58700.23</p>
                            <p class="usd-price">$58700.23</p>
                        </slideritem>
                        <!-- 设置loading,可自定义 -->
                        <!-- <div slot="loading">loading...</div> -->
                    </slider>
                </div>
            </div>
            <div class="banner-box">
                <div class="item">
                    banner图
                </div>
                <div class="item">
                    banner图
                </div>
                <div class="item">
                    banner图
                </div>
                <div class="item">
                    banner图
                </div>
            </div>
            <div class="market-trend">
                <p class="title">市场趋势</p>
                <ul>
                    <div class="th-box">
                        <li class="th">名称</li>
                        <li class="th">最新价</li>
                        <li class="th">24h涨跌</li>
                        <!-- <li class="th">行情</li> -->
                        <li class="th">24H Volume</li>
                    </div>
                    <div class="td-box" v-for="item in 4">
                        <li class="td">
                            <img src="https://huobicfg.s3.amazonaws.com/currency_icon/btc.png" alt="">
                            <span class="coin-name">BTC</span>
                            <span class="coin-fullname">Bitcoin</span>
                        </li>
                        <li class="td">
                            <span class="txt1">
                                $58140.23
                            </span>
                        </li>
                        <li class="td">
                            <span class="txt2">
                                4.5%
                            </span>
                        </li>
                        <!-- <li class="td"></li> -->
                        <li class="td txt1">
                            340K
                            <!-- <button class="buy-btn">
                                购买
                            </button> -->
                        </li>
                    </div>
                </ul>
            </div>
            <div class="novice-guide">
                <p class="title">新手指引</p>
                <p class="small-title">即刻开启数字货币交易学习</p>
                <div class="item-box">
                    <div class="item"></div>
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
            </div>
            <div class="mobile-down-box">
                <p class="title">随时随地开启交易</p>
                <p class="small-title">与多种装置相容，可以既安全又便利地开始交易</p>
                <div class="content">
                    下载页图片盒子
                </div>
            </div>
            <div class="introduce-box">
                <p class="title">开启您的数字货币之旅</p>
                <div class="item-box">
                    <div class="item">
                        <img src="" alt="">
                        <p class="txt1">0手续费买卖数字货币</p>
                        <p class="txt2">使用多种支付方式交易数字货币，0手续费，安全快捷</p>
                    </div>
                    <div class="item">
                        <img src="" alt="">
                        <p class="txt1">最优的交易费率</p>
                        <p class="txt2">优惠的交易费率，富有竞争力的VIP权益，享受最优品质的服务</p>
                    </div>
                    <div class="item">
                        <img src="" alt="">
                        <p class="txt1">可信赖的安全保障</p>
                        <p class="txt2">我们复杂的安全措施和SAFU基金保护您的数字资产免受所有风险。</p>
                    </div>
                    <div class="item">
                        <img src="" alt="">
                        <p class="txt1">24*7小时客服支持</p>
                        <p class="txt2">24*7小时全天候、全日制运营模式，第一时间为您解答相关咨询。</p>
                    </div>
                </div>
            </div>
            <div class="to-trans-box">
                <p class="title">
                    开始交易
                </p>
                <div class="btn-box">
                    <button class="register-btn" @click="$router.push('/register')">
                        立即注册
                    </button>
                    <button class="trans-btn" @click="$router.push('/exchange')">
                        开始交易
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { slider, slideritem } from 'vue-concise-slider'
export default {
    data () {
        return {
            options:{
                currentPage: 0,
                thresholdDistance:500,
                thresholdTime:100,
                autoplay:3000,
                loop:true,
                direction:'vertical',
                loopedSlides:1,
                slidesToScroll:1,
                timingFunction: 'ease',
                speed: 500,
                pagination: false,
            }
        }
    },
    components: {
        slider,
        slideritem
    },
    methods:{
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
    .content {
        width: 1280px;
        margin:0 auto;
        padding: 50px 0;
        .head {
            // margin-top:50px;
            height: 300px;
            display: flex;
            align-items: center;
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
            margin-top:100px;
            .item {
                text-align: center;
                line-height: 135px;
                color:#fff;
                flex: 1;
                height: 135px;
                margin-right:20px;
                background-color: forestgreen;
                border-radius:5px;
                &:last-child {
                    margin-right:0;
                }
                img {
                    // width: 100%;
                }
            }
        }
        .market-trend {
            margin-top:100px;
            .title {
                font-size: 32px;
                font-weight: 600;
                margin-bottom:20px;
            }
            ul {
                list-style: none;
                width: 100%;
                .th-box,.td-box {
                    .th,.td {
                        &:nth-child(1) {
                            width: 25%;
                        }
                        &:nth-child(2) {
                            width: 25%;
                        }
                        &:nth-child(3) {
                            width: 25%;
                        }
                        &:nth-child(4) {
                            width: 25%;
                        }
                    }
                }
                .th-box {
                    width: 100%;
                    display: flex;
                    height: 50px;
                    align-items: center;
                    .th {
                        font-size: 14px;
                        color:#707A8A;
                    }
                }
                .td-box {
                    width: 100%;
                    height: 70px;
                    border-bottom:1px solid #eee;
                    display: flex;
                    align-items: center;
                    .td {
                        display: flex;
                        align-items: center;
                        .coin-name {
                            margin-left:10px;
                        }
                        .coin-fullname {
                            margin-left:10px;
                            font-size: 14px;
                        }
                    }
                    img {
                        width: 32px;
                        height: 32px;
                        border-radius:32px;
                    }
                    .coin-name,.txt1 {
                        font-size: 20px;
                        color:#1e2329;
                    }
                    .coin-fullname {
                        font-size: 20px;
                        color: #707A8A;
                    }
                    .txt2 {
                        font-size: 20px;
                        color:rgb(3, 166, 109);
                    }
                    .buy-btn {
                        padding: 5px 12px;
                        border-radius: 4px;
                        border:1px solid #eee;
                    }
                }
            }
        }
        .novice-guide {
            margin-top:100px;
            .title {
                font-size: 32px;
                color:#1e2329;
            }
            .small-title {
                color: #474D57;
                margin-top: 16px;
                font-size: 16px;
            }
            .item-box {
                display: flex;
                margin-top:20px;
                .item {
                    flex: 1;
                    height:208px;
                    margin-right:20px;
                    border-radius:5px;
                    background-color: gold;
                    &:last-child {
                        margin:0;
                    }
                }
            }
        }
        .mobile-down-box {
            margin-top:100px;
            .title {
                font-size: 32px;
                color:#1e2329;
            }
            .small-title {
                color: #474D57;
                margin-top: 16px;
                font-size: 16px;
            }
            .content {
                text-align: center;
                padding:100px 0;
            }
        }
        .introduce-box {
            margin-top:100px;
            .title {
                font-size: 32px;
                color:#1e2329;
            }
            .item-box {
                display: flex;
                align-items: center;
                margin-top:50px;
                .item {
                    flex:1;
                    margin-right:20px;
                    padding:20px;
                    border-radius:5px;
                    &:hover {
                        background-color: #f5f5f5;
                    }
                    &:last-child {
                        margin:0;
                    }
                    img {
                        width: 64px;
                        height: 64px;
                    }
                    .txt1 {
                        font-size: 16px;
                        color:#1E2329;
                        margin-top:24px;
                    }
                    .txt2 {
                        font-size: 14px;
                        color: #474D57;
                        margin-top: 16px;
                    }
                }
            }
        }
        .to-trans-box {
            background-color: #FAFAFA;
            padding:40px 0;
            text-align: center;
            margin-top:100px;
            .title {
                font-size: 32px;
                margin-bottom:32px;
                font-weight: 600;
            }
            .btn-box {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .register-btn {
                width: 120px;
                height:35px;
                border:none;
                border-radius: 5px;
                background-color: #03A66D;
                font-size: 14px;
                color:#fff;
                margin:0 10px;
            }
            .trans-btn {
                width: 120px;
                height: 35px;
                border:none;
                border-radius: 5px;
                margin:0 10px;
            }
        }
    }
}
</style>