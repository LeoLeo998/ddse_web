<template>
  <el-dialog title="修改持仓订单" :visible.sync="dialogVisible" width="800px">
    <div>
      <el-form :model="form" label-width="150px" :rules="rule">
        <el-form-item label="订单编号 :">{{ oderInfo.TICKET }}</el-form-item>
        <el-form-item label="交易品种 :">{{ oderInfo.SYMBOL }}</el-form-item>
        <el-form-item label="手数 :">{{ oderInfo.VOLUME }}</el-form-item>
        <el-form-item label="订单类型 :">{{ oderInfo.CMD === 1 ? '卖出' : '买入' }}</el-form-item>
        <el-divider content-position="left">修改订单</el-divider>
        <div class="flex-start-center">
          <el-form-item label="止损价 :"> <el-input-number size="small" v-model="form.sl"></el-input-number></el-form-item>
          <el-form-item label="获利价 :"> <el-input-number size="small" v-model="form.tp"></el-input-number></el-form-item>
        </div>
      </el-form>
    </div>
    <template slot="footer">
      <div class="flex-center">
        <el-button small class="primarily-btn buy-btn" type="success" @click="closePosition" :loading="closeLoading" style="margin-right:50px">市价平仓</el-button>
        <el-button small class="primarily-btn buy-btn" type="success" @click="updatePosition" :loading="updateLoading">修改订单</el-button>
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
        this.$toast.success('操作成功')
        setTimeout(() => {
          this.$emit('positionListFetch')
        }, 3500)
        this.dialogVisible = false
      } else {
        this.$toast.error(res.msg)
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
        this.$toast.success('操作成功')
        setTimeout(() => {
          this.$emit('positionListFetch')
        }, 3500)
        this.dialogVisible = false
      } else {
        this.$toast.error(res.msg)
      }
      this.updateLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.primarily-btn {
  background-color: #03a66d;
}
</style>
