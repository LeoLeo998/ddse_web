<template>
    <div class="deal-history">
        <div class="deal-type-box">
            <span class="active">最新成交</span>
            <span>我的成交</span>
        </div>
        <div class="tab-box">
            <ul>
                <li>
                    <div class="li-head">价格</div>
                    <div class="li-head">数量</div>
                    <div class="li-head">时间</div>
                </li>
                <div class="market-list">
                    <li v-for="(item,key) in 20">
                        <div class="li-item price-up">
                            21200.32
                        </div>
                        <div class="li-item">
                            0.125
                        </div>
                        <div class="li-item">15:24:16</div>
                    </li>
                </div>
                
            </ul>
        </div>
    </div>
</template>

<style lang="less" scoped>
@color1:rgb(119, 119, 119);
@color2:rgb(132, 142, 156);
@color3:rgb(234, 236, 239);
.deal-history {
    padding:15px;
    border-top:1px solid rgb(70, 70, 70);
    background-color: #fff;
    .deal-type-box {
        span {
            font-size: 14px;
            color: rgb(132, 142, 156);
            margin-right: 20px;
            cursor: pointer;
        }
    }
    .tab-box {
        width: 100%;
        margin-top: 8px;
        ul {
            width: 100%;
            
            li {
                display: flex;
                list-style: none;
                height: 30px;
                line-height: 30px;
            }
            .market-list {
                height: 303px;
                overflow: hidden;
                &::-webkit-scrollbar {
                    width: 3px;
                    height: 1px;
                    border-radius: 10px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 10px;
                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background: @color1;
                }
                &::-webkit-scrollbar-track {
                    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius:10px;
                    // background: rgb(22, 26, 30);
                    background-color: transparent;
                }
            }
        }
        .li-head {
            color:@color2;
            font-size: 12px;
            height: 20px;
        }
        .li-item {
            font-size: 12px;
            height: 24px;
            i {
                color:@color2;
            }
            .left-coin {
                color:@color3;
                font-size: 12px;
            }
            .right-coin {
                color:@color2;
                font-size: 12px;
            }
        }
        .li-head,.li-item {
            width: 33.3%;
            text-align: right;
            &:first-child {
                text-align: left;
            }
        }
    }
}
</style>