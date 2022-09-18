<template>
    <div class="market-change">
        <div class="title">
            <span>市场异动</span>
            <i class="fa fa-angle-double-up"></i>
        </div>
        <div class="market-box" v-for="(item,key) in 2">
            <div class="item">
                <p class="market">
                    <span class="left-coin">BTC</span>
                    <span class="right-coin">/USDT</span>
                </p>
                <p class="time">
                    15:45:20
                </p>
            </div>
            <div class="item">
                <p class="change price-down">-5.11%</p>
                <p class="txt">今日新低</p>
            </div>
            <div class="item ">
                <div class="block">
                    --
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@color1:rgb(119, 119, 119);
@color2:rgb(132, 142, 156);
@color3:rgb(234, 236, 239);
.market-change {
    border-top:1px solid rgb(70, 70, 70);
    padding:15px;
    // margin-top:15px;
    background-color: #fff;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
            font-size: 14px;
            color: rgb(234, 236, 239);
        }
    }
    .market-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:15px 0;
        .item {
            flex:1;
            text-align: right;
            &:first-child {
                text-align: left;
            }
            p {
                font-size: 12px;
                span {
                    font-size: 12px;
                }
                .left-coin {
                    color:@color3;
                }
                .right-coin,.time {
                    color:@color2;
                }
                .txt {
                    color:#fff;
                }
            }
            .block {
                display: inline-block;
                width: 54px;
                height: 24px;
                background-color: rgb(246, 70, 93);
                margin-top:8px;
                border-radius: 5px;
                text-align: center;
                line-height: 24px;
            }
        }
    }
}
</style>