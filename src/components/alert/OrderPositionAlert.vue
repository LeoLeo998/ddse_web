<template>
    <div class="order-position-alert">
        <div class="content">
            11
        </div>
    </div>
    
</template>
<script>
export default {
    components:{
    }
}
</script>
<style lang="less" scoped>
.order-position-alert {
    position: fixed;
    width: 100%;
    padding:100vh;
    left:0;
    top:0;
    background-color: rgba(0, 0, 0, 0.5);
    .content {
        width: 600px;
        padding:20px;
        background-color: #fff;
        top:50%;
        left:50%;
        margin-left:-300px;
    }
}
</style>