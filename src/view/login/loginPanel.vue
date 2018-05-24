<template>
  <div id="loginPanel">
    <div class="panel-header">账号登录</div>
    <div class="panel-body">
      <el-alert
        show-icon
        v-show="message"
        :title="message"
        type="warning">
      </el-alert>
      <el-form :model="form" :rules="rules" ref="formLogin">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="账号" prefix-icon="fa fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="fa fa-lock"></el-input>
        </el-form-item>
        <el-form-item prop="imgCode">
          <el-input v-model="form.imgCode" placeholder="验证码" @keyup.enter.native="submit()">
            <img slot="append" :src="imgCode" alt="" class="img-verification" @click="loadImgCode">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="features">
        <router-link to="/forgetpsw">忘记密码</router-link>&nbsp;|
        <router-link to="/register">免费注册</router-link>
        <!-- <a :href="this.baseUrl+'/account/register'">免费注册</a> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loginPanel',
    data () {
      return {
        imgCode: '',
        message: '',
        form: {
          account: '',
          password: '',
          imgCode: ''
        },
        rules: {
          account: [{required: true, message: '请输入账号', trigger: 'submit'}],
          password: [{required: true, message: '请输入密码', trigger: 'submit'}],
          imgCode: [{required: true, message: '请输入验证码', trigger: 'submit'}]
        }
      }
    },
    mounted () {
      this.loadImgCode()
    },
    methods: {
      submit () {
        this.$refs.formLogin.validate((valid) => {
          if (valid) {
            this.$api.post('/account/login', this.form,
              resj => {
                this.$api.get('/ent/state', null,
                  resj => {
                    switch (resj.data.state) {
                      case '企业注册':
                        this.$router.replace('/registercompany')
                        break
                      case '完善企业信息':
                        this.$router.replace('/home/companyinfo')
                        break
                      case '资质认证':
                        this.$router.replace('/home/qualification')
                        break
                      case '合同签署':
                        this.$router.replace('/home/contract')
                        break
                      case '企业上线':
                        this.$router.replace('/home/membercenter')
                        break
                      default:
                        this.$router.replace('/home/membercenter')
                        break
                    }
                  })
              },
              err => {
                this.message = err.message
                this.loadImgCode()
              })
          } else {
            return false
          }
        })
      },
      loadImgCode () {
        this.imgCode = this.baseUrl + '/captcha?v=' + Math.random()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #loginPanel {
    $padding-horizontal: 20px;
    background-color: $white-max;
    border: 1px solid #ddd;
    border-radius: 4px;
    .panel-header {
      font-size: 18px;
      font-weight: bold;
      padding: 10px $padding-horizontal;
      border-bottom: 1px solid #ddd;
    }
    .panel-body {
      padding: 22px $padding-horizontal;
      .message-box {
        font-size: 20px;
        border-radius: 4px;
        border: 1px solid #ddd;
        padding: 5px;
        margin-bottom: 10px;
        .fa-exclamation-circle {
          margin-right: 5px;
          color: $hot-dark;
        }
      }
      .el-alert {
        margin-bottom: 20px;
      }
      .img-verification {
        width: 100px;
        margin: 0 -20px;
        display: block;
        height: 38px;
        border-radius: 0 4px 4px 0;
      }
      .el-button {
        width: 100%;
      }
      .features {
        text-align: right;
      }
    }
  }
</style>
