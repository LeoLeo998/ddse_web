<template>
  <el-dialog title="修改限价订单" :visible.sync="dialogVisible" width="800px">
    <div>
      <el-form :model="form" label-width="150px" :rules="rule">
        <el-form-item label="订单编号 :">{{ oderInfo.TICKET }}</el-form-item>
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
        </div>
      </el-form>
    </div>
    <template slot="footer">
      <div class="flex-center">
        <el-button small type="danger" @click="deleteEntrust" :loading="deleteLoading" style="margin-right:50px">删除订单</el-button>
        <el-button small class="primarily-btn buy-btn" type="success" @click="updateEntrust" :loading="updateLoading">修改订单</el-button>
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
        this.$toast.success('操作成功')
        setTimeout(() => {
          this.$emit('entrustListFetch')
        }, 3500)
        this.dialogVisible = false
      } else {
        this.$toast.error(res.msg)
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
        this.$toast.success('操作成功')
        setTimeout(() => {
          this.$emit('entrustListFetch')
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
