<template>
  <div id="memberCenter">
    <el-row v-if="memberInfo">
      <el-col :span="5">
        <img v-if="memberInfo.ent_logo" :src="imgurl+memberInfo.ent_logo" class="img-responsive memberlogo">
        <img src="./images/logo.png" class="img-responsive memberlogo" v-else>
      </el-col>
      <el-col :span="8">
        <div class="info-name">{{memberInfo.ent_name}}</div>
        <el-row class="text-font">
          <el-col :span="12">第
            <span class="text-hot">
              {{new Date().getFullYear()-memberInfo.create_time.substring(0,4)+1}}
            </span>年
          </el-col>
          <el-col :span="12" v-if="entStatus">状态:
            <span :style="{'color':entStatus[ent_state()]}">【{{ent_state()}}】</span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <h1 class="welcome">欢迎登录中消在线！</h1>
    <el-row v-if="clicked">
      <h2 class="step">请您按照以下步骤进行操作</h2>
      <div id="arrowButtonBox">
        <a @click="companyinfo_data()"
           class="arrowButton fcolorStep" :style="{'background-color':backgroundStep[click1_step()]}" :class="backgroundStep[clicked.step1]">
          <div class='arrowText'>
            <p>{{clicked.step1}}</p>
          </div>
        </a>
        <a @click="qualificationinfo_data()"
           class="arrowButton colorStep"
           :style="{'background-color':backgroundStep[click2_step()]}" :class="backgroundStep[clicked.step2]">
          <div class='arrowText'>
            <p>{{clicked.step2}}</p>
          </div>
        </a>
        <a @click="contractinfo_data()"
            class="arrowButton colorStep" :class="backgroundStep[clicked.step3]"
           :style="{'background-color':backgroundStep[click3_step()]}">
          <div class='arrowText'>
            <p>{{clicked.step3}}</p>
          </div>
        </a>
        <a @click="payinfo_data()"
           class="arrowButton colorStep" :class="backgroundStep[clicked.step4]"
           :style="{'background-color':backgroundStep[click4_step()]}">
          <div class='arrowText'>
            <p>{{clicked.step4}}</p>
          </div>
        </a>
      </div>
    </el-row>
  </div>
</template>

<script>
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'memberCenter',
    data () {
      return {
        memberInfo: '',
        clicked: '',
        imgurl: this.baseUrl + '/uploadify/renderFile/',
        companyurl: '/home/companyinfo/',
        qualificationurl: '/home/qualification/',
        contracturl: '/home/contract',
        noticeurl: '/notice/manager/',
        step: {
          step1UnReady: '企业信息未完善',
          step1Ready: '企业信息已提交',
          step1Pass: '企业信息审核已通过',
          step1NoPass: '企业信息审核未通过',
          step2UnReady: '资质信息未完善',
          step2Ready: '资质信息已提交',
          step2Pass: '资质信息审核已通过',
          step2NoPass: '资质信息审核未通过',
          step3UnReady: '合同未签订',
          step3Ready: '合同已签订',
          step4UnReady: '会员费未付款',
          step4Ready: '会员费已付款'
        },
        entStatus: {
          '未提交': '#909399',
          '审核中': '#c41335',
          '未认证': '#603811',
          '待签约': '#409eff',
          '未交费': '#e6a23c',
          '有效': '#67c23a'
        },
        backgroundStep: {
          '企业信息未完善': 'fcolorStepFail',
          '企业信息已提交': 'fcolorStepReady',
          '企业信息审核已通过': 'fcolorStep',
          '企业信息审核未通过': 'fcolorStepFail',
          '资质信息未完善': 'colorStepFail',
          '资质信息已提交': 'colorStepReady',
          '资质信息审核已通过': 'colorStep',
          '资质信息审核未通过': 'colorStepFail',
          '合同未签订': 'colorStepFail',
          '合同已签订': 'colorStep',
          '会员费未付款': 'colorStepFail',
          '会员费已付款': 'colorStep',
          '已通过': '#c41335',
          '已提交': '#e6a23c',
          '未完善': '#b2b2b2',
          '不通过': '#b2b2b2'
        }
      }
    },
    mounted () {
      this.get_data()
      EventBus.$emit('setHomeHeader', '会员中心')
    },
    methods: {
      get_data () {
        this.$api.get('/home/ent', {}, (r) => {
          this.memberInfo = r
        })
        this.$api.post('/ent/progress', {}, (r) => {
          this.clicked = r.data
        })
      },
      companyinfo_data () {
        if (this.clicked.step1 !== this.step.step1Pass) {
          this.$router.push({path: this.companyurl})
        }
      },
      qualificationinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 !== this.step.step2Pass) {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      contractinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 === this.step.step2Pass) {
            if (this.clicked.step3 !== this.step.step3Ready) {
              this.$router.push({path: this.contracturl})
            }
          } else {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      payinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 === this.step.step2Pass) {
            if (this.clicked.step3 === this.step.step3Ready) {
              if (this.clicked.step4 !== this.step.step4Ready) {
                this.$router.push({path: this.contracturl})
              }
            } else {
              this.$router.push({path: this.contracturl})
            }
          } else {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      ent_state () {
        let state = ''
        if (this.memberInfo.ent_state === '有效') {
          state = '有效'
        } else {
          if (this.clicked.step1 === this.step.step1UnReady) {
            state = '未提交'
          }
          if (this.clicked.step1 === this.step.step1Ready || this.clicked.step2 === this.step.step2Ready || this.clicked.step2 === this.step.step2NoPass) {
            state = '审核中'
          }
          if (this.clicked.step2 === this.step.step2UnReady && this.clicked.step1 === this.step.step1Pass) {
            state = '未认证'
          }
          if (this.clicked.step2 === this.step.step2Pass && this.clicked.step1 === this.step.step1Pass) {
            state = '待签约'
          }
          if (this.clicked.step3 === this.step.step3Ready && this.clicked.step4 === this.step.step4UnReady) {
            state = '未交费'
          }
        }
        console.log(state)
        return state
      },
      click1_step () {
        let step = ''
        if (this.clicked.step1 === this.step.step1Pass) {
          step = '已通过'
        } else if (this.clicked.step1 === this.step.step1NoPass) {
          step = '不通过'
        } else if (this.clicked.step1 === this.step.step1Ready) {
          step = '已提交'
        } else {
          step = '未完善'
        }
        return step
      },
      click2_step () {
        let step = ''
        if (this.clicked.step2 === this.step.step2Pass) {
          step = '已通过'
        } else if (this.clicked.step2 === this.step.step2NoPass) {
          step = '不通过'
        } else if (this.clicked.step2 === this.step.step2Ready) {
          step = '已提交'
        } else {
          step = '未完善'
        }
        return step
      },
      click3_step () {
        let step = ''
        if (this.clicked.step3 === this.step.step3UnReady) {
          step = '未完善'
        } else {
          step = '已通过'
        }
        return step
      },
      click4_step () {
        let step = ''
        if (this.clicked.step4 === this.step.step4UnReady) {
          step = '未完善'
        } else {
          step = '已通过'
        }
        return step
      }
    }
  }
</script>

<style scoped lang="scss">
  #memberCenter {
    margin-left: 20px;
    .memberlogo {
      width: 136px;
      height: 136px;
    }
    .info-name {
      font-size: 20px;
      color: #1111b3;
      line-height: 74px;
    }
    .text-font {
      font-size: 14px;
      .text-hot {
        color: $hot-dark;
      }
      .status-green {
        color: #089b01;
        font-weight: 800;
      }
    }
    .welcome {
      text-align: center;
      color: #c41335;
      font-size: 23px;
      margin: 100px 0 30px 0;
    }
    .step {
      font-size: 18px;
      margin: 0 0 30px 0;
    }
    .arrowButton {
      height: 100px;
      width: 200px;
      text-align: center;
      line-height: 30px;
      color: white;
      font-weight: 600;
      position: relative;
      float: left;
      transition: margin 0.2s;
      margin-right: 10px;
    }
    .arrowButton:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-width: 50px 35px;
      border-style: solid;
      position: absolute;
      left: 0px;
      top: 0;
      z-index: 2;
    }
    .arrowButton:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-width: 50px 35px;
      border-style: solid;
      position: absolute;
      right: -69px;
      top: 0;
      z-index: 3;
    }
    .colorStep, .colorStepFail, .colorStepcolorStepReady {
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 35px;
        margin-right: -15px;
      }
    }
    .colorStep:before {
      border-color: transparent transparent transparent #fff;
    }
    .colorStep:after {
      border-color: transparent transparent transparent #c31435;
    }
    .colorStepFail:after {
      border-color: transparent transparent transparent #b2b2b2;
    }
    .colorStepReady:after {
      border-color: transparent transparent transparent #e6a23c;
    }
    .fcolorStep, fcolorStepReady, fcolorStepFail {
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 15px;
      }
    }
    .fcolorStep:before, .fcolorStep:after {
      border-color: transparent transparent transparent #c31435;
    }
    .fcolorStepReady:before, .fcolorStepReady:after {
      border-color: transparent transparent transparent #e6a23c;
    }
    .fcolorStepFail:before, .fcolorStepFail:after {
      border-color: transparent transparent transparent #b2b2b2;
    }
    .arrowText {
      text-align: center;
      font-size: 17px;
      width: 200px;
      height: 100%;
      position: absolute;
      left: 0px;
      z-index: 4;
    }
  }
</style>
