<template>
  <el-dialog title="修改持仓订单" :visible.sync="dialogVisible" width="480px" style="border-radius:5px;">
    <div class="cc-dialog">
      <el-form :model="form" :rules="rule">
        <div class="info-row">
          <span>订单编号</span>
          <span>{{ oderInfo.TICKET }}</span>
        </div>
        <div class="info-row">
          <span>交易品种</span>
          <span>{{ oderInfo.SYMBOL }}</span>
        </div>
        <div class="info-row">
          <span>手数</span>
          <span>{{ oderInfo.VOLUME }}</span>
        </div>
        <div class="info-row">
          <span>订单类型</span>
          <span>{{ oderInfo.CMD === 1 ? '卖出' : '买入' }}</span>
        </div>
        <el-divider content-position="left">修改订单</el-divider>
        <div>
          <div class="row">
            <label for="">止损价</label>
            <el-input v-model="form.sl" clearable></el-input>
          </div>
          <div class="row">
            <label for="">获利价</label>
            <el-input v-model="form.tp" clearable></el-input>
          </div>
        </div>
        <!-- <el-form-item label="订单编号 :">{{ oderInfo.TICKET }}</el-form-item>
        <el-form-item label="交易品种 :">{{ oderInfo.SYMBOL }}</el-form-item>
        <el-form-item label="手数 :">{{ oderInfo.VOLUME }}</el-form-item>
        <el-form-item label="订单类型 :">{{ oderInfo.CMD === 1 ? '卖出' : '买入' }}</el-form-item>
        <el-divider content-position="left">修改订单</el-divider>
        <div>
          <div class="row">
            <label for="">止损价</label>
            <el-input v-model="form.sl" clearable></el-input>
          </div>
          <div class="row">
            <label for="">获利价</label>
            <el-input v-model="form.tp" clearable></el-input>
          </div>
        </div> -->
      </el-form>
    </div>
    <template slot="footer">
      <div class="flex-center">
        <el-button small class="primarily-btn" type="success" @click="closePosition" :loading="closeLoading">市价平仓</el-button>
        <el-button small class="primarily-btn" type="success" @click="updatePosition" :loading="updateLoading">修改订单</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    oderInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      form: {
        sl: 0,
        tp: 0
      },
      rule: {},
      closeLoading: false,
      updateLoading: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {
    oderInfo: {
      handler(val) {
        this.form.sl = val.SL
        this.form.tp = val.TP
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['closePositionFetch', 'updatePositionFetch']),

    async closePosition() {
      this.closeLoading = true
      let res = await this.closePositionFetch({
        ticket: this.oderInfo.TICKET,
        volume: this.oderInfo.VOLUME
      })
      if (res.status == 200) {
        this.$message.success('平仓成功')
        // setTimeout(() => {
        //   this.$emit('positionListFetch')
        // }, 3500)
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg)
      }
      this.closeLoading = false
    },

    async updatePosition() {
      this.updateLoading = true
      let res = await this.updatePositionFetch({
        ticket: this.oderInfo.TICKET,
        sl: this.form.sl,
        tp: this.form.tp
      })
      if (res.status == 200) {
        this.$message.success('订单更新成功')
        // setTimeout(() => {
        //   this.$emit('positionListFetch')
        // }, 3500)
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg)
      }
      this.updateLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.cc-dialog {
  .info-row {
    display: flex;
    justify-content:space-between;
    margin-bottom:10px;
    span {
      color:var(--font-body-);
    }
  }
  .row {
    margin-bottom: 20px;
    .el-input input {
      background: red;
    }
  }
}
/deep/.el-dialog__header {
  padding: 30px 40px 0;
}
/deep/.el-dialog__body {
  padding: 30px 40px 0;
}
.flex-center {
  padding:0 20px;
  padding-bottom:30px;
  display: flex;
  .primarily-btn {
    flex:1;
  }
}
.primarily-btn {
  background-color: var(--color-green-);
}
.el-form-item {
  margin-bottom:10px;
}
</style>
