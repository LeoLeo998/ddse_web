<template>
  <el-dialog title="修改限价订单" :visible.sync="dialogVisible" width="480px">
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
          <span>当前止损价</span>
          <span>{{ oderInfo.SL }}</span>
        </div>
        <div class="info-row">
          <span>当前获利价</span>
          <span>{{ oderInfo.TP }}</span>
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
        <div class="flex-start-center">
          <el-form-item label="当前止损价 :">{{ oderInfo.SL }}</el-form-item>
          <el-form-item label="当前获利价 :">{{ oderInfo.TP }}</el-form-item>
        </div>
        <el-divider content-position="left">修改订单</el-divider>
        <div class="flex-start-center">
          <el-form-item label="止损价 :"> <el-input-number size="small" v-model="form.sl"></el-input-number></el-form-item>
          <el-form-item label="获利价 :"> <el-input-number size="small" v-model="form.tp"></el-input-number></el-form-item>
        </div> -->
      </el-form>
    </div>
    <template slot="footer">
      <div class="flex-center">
        <el-button small class="primarily-btn danger" type="danger" @click="deleteEntrust" :loading="deleteLoading">删除订单</el-button>
        <el-button small class="primarily-btn" type="success" @click="updateEntrust" :loading="updateLoading">修改订单</el-button>
        <!-- <el-button small type="danger" @click="deleteEntrust" :loading="deleteLoading" style="margin-right:50px">删除订单</el-button>
        <el-button small class="primarily-btn buy-btn" type="success" @click="updateEntrust" :loading="updateLoading">修改订单</el-button> -->
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
      deleteLoading: false,
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
    ...mapActions(['deleteEntrustFetch', 'updateEntrustFetch']),

    async deleteEntrust() {
      this.deleteLoading = true
      let res = await this.deleteEntrustFetch({
        ticket: this.oderInfo.TICKET
      })
      if (res.status == 200) {
        this.$message.success('撤单成功')
        // setTimeout(() => {
        //   this.$emit('entrustListFetch')
        // }, 3500)
        this.dialogVisible = false
      } else {
        this.$message.error(res.msg)
      }
      this.deleteLoading = false
    },

    async updateEntrust() {
      this.updateLoading = true
      let res = await this.updateEntrustFetch({
        ticket: this.oderInfo.TICKET,
        sl: this.form.sl,
        tp: this.form.tp
      })
      if (res.status == 200) {
        this.$message.success('订单更新成功')
        // setTimeout(() => {
        //   this.$emit('entrustListFetch')
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
    &.danger {
      background: #F56C6C;
    }
  }
  .el-form-item {
    margin-bottom:10px;
  }
  </style>