<template>
    <div class="ex-order-book">
        <div class="check-type-box">
            <div class="left">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-3kwgah"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 21v-8H3v8h8zm-6-2v-4h4v4H5z" fill="#2EBD85"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 11V3H3v8h8zM5 9V5h4v4H5z" fill="#F6465D"></path><path fill="currentColor" d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-3kwgah"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 21V3H3v18h8zm-6-2V5h4v14H5z" fill="#2EBD85"></path><path fill="currentColor" d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-3kwgah"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 21V3H3v18h8zm-6-2V5h4v14H5z" fill="#F6465D"></path><path fill="currentColor" d="M13 3h8v2h-8zM13 19h8v2h-8zM13 11h8v2h-8v-2zM13 7h8v2h-8V7zM13 15h8v2h-8v-2z"></path></svg>
            </div>
            <div class="right">
                <div class="decimal">
                    0.01 <i class="fa fa-sort-down"></i>
                </div>
                <div class="more">
                    <i class="fa fa-ellipsis-v"></i>
                </div>
            </div>
        </div>
        <div class="book-box">
            <div class="o-li sell-list">
                <ul>
                    <li>
                        <div class="li-class title">
                            价格(USDT)
                        </div>
                        <div class="li-class title">
                            数量(BTC)
                        </div>
                        <div class="li-class title">
                            成交额
                        </div>
                    </li>
                    <li v-for="(item,key) in 10">
                        <div class="li-class price-down">
                            61230.23
                        </div>
                        <div class="li-class">
                            1.2101
                        </div>
                        <div class="li-class last">
                            4256.32004
                        </div>
                        <div class="bar">
                            <div class="bg red" :style="`width:${Math.random() * 160}px`"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="center-price">
                <div class="left">
                    <p class="price">
                        60985.23
                    </p>
                    <p class="price-d">
                        $60985.23
                    </p>
                </div>
                <div class="right">
                    更多
                </div>
            </div>
            <div class="o-li buy-list">
                <ul>
                    <li v-for="(item,key) in 10">
                        <div class="li-class price-up">
                            61230.23
                        </div>
                        <div class="li-class">
                            1.2101
                        </div>
                        <div class="li-class last">
                            4256.32004
                        </div>
                        <div class="bar">
                            <div class="bg green" :style="`width:${Math.random()*20 + Math.random() * 150}px`"></div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.ex-order-book {
    width: 320px;
    border:1px solid rgb(70, 70, 70);
    border-top:none;
    background-color: #fff;
    .css-3kwgah {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        color: currentcolor;
        font-size: 24px;
        fill: currentcolor;
        width: 18px;
        height: 18px;
    }
    .check-type-box {
        display: flex;
        justify-content: space-between;
        padding:16px 16px 0;
        border:1px solid #e1e1e1;
        border-right:none;
        border-left:none;
        .left {

        }
        .right {
            display: flex;
            .decimal {
                margin-right: 20px;
                font-size: 12px;
                cursor: pointer;
                i {
                    transform: translateY(-2.5px);
                }
            }
            .more {
                cursor: pointer;
            }
        }
    }
    .book-box {
        padding:0 0 8px 15px;
    }
    .o-li {
        ul {
            li {
                width: 100%;
                display: flex;
                list-style: none;
                height: 20px;
                line-height: 20px;
                position: relative;
                margin:2px 0;
                height: 30px;
                line-height: 30px;
                .li-class {
                    flex: 1;
                    font-size: 12px;
                    color: rgb(132, 142, 156);
                    width: 33.3%;
                    text-align: right;
                    position: relative;
                    z-index: 1;
                    
                    &:first-child {
                        text-align: left;
                    }
                    &.last {
                        padding-right: 15px;
                    }
                }
                .bar {
                    position: relative;
                    
                    .bg {
                         position: absolute;
                        height: 20px;
                        top:0;
                        right: 0;
                        width: 20%;
                        height: 100%;
                    }
                    .red {
                        background-color: rgba(246, 70, 93,.3);
                    }
                    .green {
                        background-color: rgba(14, 203, 129,.3);
                    }
                }
            }
        }
    }
    .center-price {
        height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            .price {
                font-size: 20px;
                margin-right: 5px;
            }
            .price-d {
                font-size: 12px;
                color: rgb(132, 142, 156);
            }
        }
        .right {
            color: rgb(132, 142, 156);
            font-size: 12px;
            cursor: pointer;
            padding-right: 15px;
        }
    }
}
</style>