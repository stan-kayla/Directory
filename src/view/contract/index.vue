<template>
  <div id="contract" v-if="loaded">
    <contract-info-tab v-if="state"></contract-info-tab>
    <div class="sign" v-else>
      <el-table
        id="contract-table"
        v-loading="loading"
        :data="content"
        style="width: 925px">
        <el-table-column
          label="合同标题">
          <template slot-scope="scope">
            <a @click.prevent="sign(contract.id)">{{contract.doc_name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="doc_state"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="sign(contract.id)" v-if="contract.doc_state === '未签署'">签署合同</el-button>
            <a :href="pdfDownlodUrl+contract.id">
              <el-button type="text">下载合同</el-button>
            </a>
            <div v-if="contract.doc_state === '已签署'">
              <pay :payId="contract.id" :on-success="get_data" v-if="!order.channel"></pay>
              <div v-if="order.channel =='remittance' && order.pay_state=='未付款'">付款审核中</div>
              <div v-if="order.pay_state=='已付款'">
                <apply-bill :applyId="order.orderid" :on-success="get_data"
                            v-if="order.invoice_state == '未申请'"></apply-bill>
                <span v-if="order.invoice_state == '已申请'">发票已申请</span>
                <div v-if="order.invoice_state == '已开具'">
                  <div>物流公司:{{tax.express_company}}</div>
                  <div>物流单号:{{tax.express_number}}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="合同签署"
        :visible.sync="dialogVisible"
        width="662px">
        <div v-loading="cloading">
          <pdf :src="pdfShowUrl+contract.id" :page="page" @progress="cloading=false"
               @num-pages="numPages = $event"></pdf>
          <div class="pdf-btn">
            <el-input-number size="mini" v-model.number="page" :min="1" :max="numPages">
            </el-input-number>
            <div class="pdf-total" v-if="numPages > 0">共{{numPages}}页</div>
          </div>
          <template v-if="contract.doc_state === '未签署'">
            <div class="contract-agree">
              <el-checkbox v-model="checkbox" label="agree">同意</el-checkbox>
            </div>
            <div class="text-center">
              <el-button type="primary" @click="signContract(contract.id)" :disabled="!checkbox">签署合同</el-button>
            </div>
          </template>
        </div>
      </el-dialog>
    </div>
    <Matter></Matter>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  import Matter from '../../components/matters'
  import ApplyBill from './apply-bill'
  import { EventBus } from '../../util/eventBus'
  import Pay from './pay'
  import ContractInfoTab from '../companyinfo/contractInfoTab'

  export default {
    name: 'contract',
    components: {
      ContractInfoTab,
      Pay,
      ApplyBill,
      pdf,
      Matter
    },
    data () {
      return {
        loaded: false,
        content: [],
        dialogVisible: false,
        page: 1, // PDF总页数
        numPages: 0, // PDF当前页数
        checkbox: '', // 合同确认
        pdfDownlodUrl: this.baseUrl + '/contract/download/', // pdf下载
        pdfShowUrl: this.baseUrl + '/contract/pdf/', // pdf预览
        loading: false, // 合同列表loading
        cloading: true, // pdf预览loading
        order: '', // 订单信息
        tax: '', // 开票信息
        contract: '', // 合同信息
        state: true // 电子合同委托书和合同列表切换标志
      }
    },
    mounted () {
      this.getState().then(
        this.getInfo
      ).then(
        this.get_data
      ).then(
        this.getTax
      ).catch()
      EventBus.$emit('setHomeHeader', '合同与付款')
    },
    methods: {
      // 判断用户当前状态
      getState () {
        return new Promise((resolve, reject) => {
          this.$api.get('/ent/state', null,
            resj => {
              switch (resj.data.state) {
                case '企业注册':
                  this.$alert('请先完成企业信息补全', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                      this.$router.replace('/registercompany')
                    }
                  })
                  break
                case '完善企业信息':
                  this.$alert('请先完成企业信息补全', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                      this.$router.replace('/home/companyinfo')
                    }
                  })
                  break
                case '资质认证':
                  this.$alert('请先完成资质认证', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                      this.$router.replace('/home/qualification')
                    }
                  })
                  break
                default:
                  resolve()
                  break
              }
            })
        })
      },
      // 获取电子合同委托书详情
      getInfo () {
        return new Promise((resolve, reject) => {
          this.$api.get('/contract/info', null, (r) => {
            let data = r.data
            if (!data) {
              this.state = true
            } else if (data.contract_state === '未签署' || data.contract_state === '已签署') {
              resolve()
              this.state = false
            } else {
              this.state = true
            }
            this.loaded = true
          })
        })
      },
      // 获取合同列表
      get_data () {
        return new Promise((resolve, reject) => {
          this.$api.get('/contract/me', {}, (r) => {
            this.content = r.data
            if (r.data.length) {
              this.contract = r.data[0]
              this.order = r.data[0].tails
              this.loading = false
              if (this.order.invoice_state === '已开具') {
                resolve()
              }
            }
          })
        })
      },
      // 获取发票信息
      getTax () {
        this.$api.get('/zxOrder/detail?id=' + this.order.orderid, null, (r) => {
          this.tax = r.data.tails
        })
      },
      // 打开合同签署弹出层
      sign (id) {
        this.dialogVisible = true
        // this.cloading = true
        // this.getInfo()
      },
      // 签署合同
      signContract (id) {
        this.$api.get('/contract/mysign/' + id, {}, (r) => {
          this.dialogVisible = false
          this.loading = true
          this.get_data()
          if (this.contract.doc_state === '已签署') {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  #contract {
    .sign {
      margin-top: 25px;
      margin-bottom: 100px;
      .pdf-btn {
        position: relative;
        text-align: center;
      }
      .pdf-total {
        position: absolute;
        bottom: 2px;
        left: 410px;
        float: left;
      }
      .contract-agree {
        text-align: center;
        margin: 20px 0;
      }
      .el-dialog__footer {
        text-align: center;
      }
      .el-button--text {
        color: #2d2f33;
      }
      #contract-table {
        border: 1px solid #ebeef5;
        text-align: center;
        th {
          text-align: center;
          color: black;
          border-right: 1px solid #ebeef5;
        }
        td {
          border-right: 1px solid #ebeef5;
        }
      }
    }
    .el-alert {
      margin-bottom: 15px;
    }
  }
</style>
