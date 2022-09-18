<template>
    <div class="format-input" :class="theme === 'light' ? 'light':'night'">
        <div class="title-left" v-if="title">
            {{title}}
        </div>
        <i v-if="icon" :class="icon"></i>
        <input :type="type" :style="`text-align:${txtPosition}`" v-model="val">
        <div class="title-right" v-if="title2">
            {{title2}}
        </div>
        <button @click="rightBtnClick" v-if="righttxt">
            {{righttxt}}
        </button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            val:'',
        }
    },
    props:{
        title:{
            type:String,
            default:''
        },
        title2:{
            type:String,
            default:''
        },
        icon:{
            type:String,
            default:''
        },
        theme:{
            type:String,
            default:'light'
        },
        txtPosition:{
            type:String,
            default:'right'
        },
        type:{
            type:String,
            default:'text'
        },
        righttxt:{
            type:String,
            default:''
        },
        // val:''
    },
    created () {
        this.val = this.value;
    },
    methods:{
        rightBtnClick () {
            this.$emit('rightClick')
        }
    },
    watch:{
        val (v) {
            this.$emit('change', v)
        },
        value(v) {
            console.log(v)
            this.val = this.value;
        }
    }
}
</script>

<style lang="less" scoped>
.format-input {
    height: 40px;
    border-radius: 4px;
    background-color: rgba(43, 47, 54, 0.9);
    position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    margin:12px 0;
    &.light {
        background-color: #fff;
        border:1px solid #e0e3eb;
        .title-left {
            // color:#000;
            color:rgb(132, 142, 156);
        }
        input {
            // color:rgb(132, 142, 156);
            // color:#111;
        }
    }
    .title-left {
        position: absolute;
        left:15px;
        box-sizing: content-box;
        width: 70px;
        top:10px;
    }
    .title-right {
        position: absolute;
        box-sizing: content-box;
        width: 50px;
        right:15px;
        top:10px;
        text-align: right;
    }
    button {
        position: absolute;
        width: 50px;
        height: 25px;
        padding:0 10px;
        background-color: transparent;
        border: none;
        outline: none;
        border-radius:3px;
        background-color: #03A66D;
        color:#fff;
        right:15px;
        top:6.5px;
        font-size: 12px;
    }
    input {
        width: calc(~"100% - 150px");
        position: absolute;
        left:85px;
        height: 38px;
        background-color: transparent;
        outline: none;
        border:none;
        color:#fff;
        text-align: right;
        padding: 0 10px;
    }
}
</style>