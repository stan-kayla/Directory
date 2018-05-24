<template>
  <div id="pay">
    <el-button type="text" @click="getPayInfo">点击付款</el-button>
    <el-dialog title="付款方式" :visible.sync="dialogShow" width="600px" id="pay-dialog">
      <h2 class="text-center">友情提示</h2>
      <template v-if="payType==='remittance'">
        <p>
          *企业入驻的会员费用为<span class="text-hot">{{payInfo.amount/100}}</span>元/年,我们将在收到款项之日起,为您完成企业入驻。
          使用对公付款方式时，请在转账备注中写明<span class="text-hot">“企业入驻会员费”</span>。
        </p>
        <p>
          *由于银行间转账并非实时到账，请提前安排。我们将在收到款项后，用短信和邮件的方式提醒您。届时可在<span class="text-green">“合同与付款”</span>页面下载签约合同，并申请开票信息。们将用快递的方式，将发票快递给您。
        </p>
        <p>
          <b>公司名称：</b><span>上海中消网络科技有限公司</span>
        </p>
        <p>
          <b>开户银行：</b><span>交通银行上海第一支行</span>
        </p>
        <p>
          <b>银行账号：</b><span>310066726018800051881</span>
        </p>
        <p>
          <b>订单编号：</b><span>{{payInfo.id}}</span>
        </p>
      </template>
      <template v-else>
        <p>
          *企业入驻的会员费用为<span class="text-hot">{{payInfo.amount/100}}</span>元/年,我们将在收到款项之日起,为您完成企业入驻。
          届时您可在<span class="text-green">“合同与付款”</span>页面，下载签约合同，并申请开票信息。我们将用快递的方式，将发票快递给您。
        </p>
        <p>
          *如您目前决定稍后付款，可登录后前往 <span class="text-green">“合同与付款”</span>页面缴费。
        </p>
      </template>
      <h3 class="text-hot">选择支付方式付款</h3>
      <el-row v-model="payType">
        <el-col :span="8">
          <el-radio v-model="payType" label="alipay_pc_direct">
            <img src="./images/alipay.jpg" alt="">
          </el-radio>
        </el-col>
        <el-col :span="8">
          <el-radio v-model="payType" label="wx_pub_qr">
            <img src="./images/wx.jpg" alt="" class="img-responsive">
          </el-radio>
        </el-col>
        <!--<el-col :span="6">
          <el-radio v-model="payType" label="upacp_pc">
            <img src="./images/bankol.jpg" alt="" class="img-responsive">
          </el-radio>
        </el-col>-->
        <el-col :span="8">
          <el-radio v-model="payType" label="remittance">
            <img src="./images/bank.jpg" alt="" class="img-responsive">
          </el-radio>
        </el-col>
      </el-row>
      <el-collapse-transition>
        <div class="qrCode" v-show="qrCode&&payType==='wx_pub_qr'">
          <vue-qrcode :value="qrCode" :options="{ size: 200 }"></vue-qrcode>
        </div>
      </el-collapse-transition>
      <div class="text-center button-container">
        <el-button type="primary" v-if="payType=='alipay_pc_direct'||payType=='upacp_pc'" @click="aliPay">立即付款
        </el-button>
        <el-button type="primary" v-if="payType=='remittance'" @click="remittancePay">汇款成功</el-button>
        <el-button type="primary" @click="dialogShow=false">稍后付款</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import pingpp from 'pingpp-js'
  import VueQrcode from '@xkeshi/vue-qrcode'

  export default {
    components: {
      VueQrcode
    },
    name: 'pay',
    props: ['payId', 'onSuccess'],
    data () {
      return {
        dialogShow: false,
        payInfoUrl: '/contract/order/',
        remittanceUrl: '/zxOrder/update/',
        payUrl: '/pay/',
        payStatusUrl: '/pay/status/',
        payStatus: '',
        payInfo: '',
        payType: '',
        qrCode: ''
      }
    },
    methods: {
      getPayInfo () {
        this.$api.post(this.payInfoUrl + this.payId, null,
          resj => {
            this.payInfo = resj.data
            this.dialogShow = true
          })
      },
      remittancePay () {
        this.$api.post(this.remittanceUrl + this.payInfo.id, null,
          resj => {
            this.onSuccess()
            this.dialogShow = false
          })
      },
      aliPay () {
        this.$api.post(`${this.payUrl}${this.payType}/${this.payInfo.id}`, null,
          resj => {
            if (this.payType === 'wx_pub_qr') {
              this.qrCode = resj.data.credential.wx_pub_qr
            } else {
              pingpp.setUrlReturnCallback((err, url) => {
                if (err) {
                  this.$message.error(err)
                } else {
                  window.open(url)
                }
              }, ['alipay_pc_direct', 'upacp_pc'])
              pingpp.createPayment(resj.data, (result, err) => {
                console.log(result)
                console.log(err.msg)
                console.log(err.extra)
                if (result === 'success') {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                } else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                } else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                }
              })
            }
            this.pay_status()
          }
        )
      },
      pay_status () {
        this.$api.post(this.payStatusUrl + this.payInfo.id, null,
          resj => {
            if (resj.data.pay_state === '未付款') {
              this.payStatus = setTimeout(() => {
                this.pay_status()
              }, 2000)
            } else {
              this.dialogShow = false
              clearTimeout(this.payStatus)
              this.onSuccess()
            }
          })
      }
    },
    watch: {
      payType (value) {
        if (value === 'wx_pub_qr') {
          this.aliPay()
        }
      }
    }
  }
</script>

<style lang="scss">
  #pay-dialog {
    text-align: left;
    .el-dialog__body {
      padding: 20px 60px;
    }
    p {
      text-align: left;
    }
    .text-hot {
      color: #c51234;
    }
    .text-green {
      color: #089b01
    }
    h3.text-hot {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .el-radio {
      margin-bottom: 20px;
      img {
        width: 95px;
        height: 34px;
        margin-bottom: -13px;
        display: inline-block;
      }
    }
    .qrCode {
      height: 200px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
</style>
