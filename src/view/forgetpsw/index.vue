<template>
  <div id="forgetpsw" class="container">
    <manager-header/>
    <div class="forgetForm">
      <el-form :model="forgetForm" :rules="rules" ref="forgetForm" label-width="100px">
        <el-form-item label="用户名" prop="account">
          <el-col :span="12">
            <el-input v-model="forgetForm.account"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">您的用户名</el-col>
        </el-form-item>
        <el-form-item label="安全手机" prop="phone">
          <el-col :span="12">
            <el-input v-model="forgetForm.phone"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">注册时绑定的手机号</el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="12">
            <el-input type="password" v-model="forgetForm.password"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">最少8个字符，需包含大小写字母及数字</el-col>
        </el-form-item>
        <el-form-item label="手机验证码" prop="code">
          <el-col :span="12">
            <el-input v-model="forgetForm.code" @keyup.enter.native="submitForm('forgetForm')">
              <el-button slot="append" @click="getCode" :class="codeBtnDisabled ? 'is-waiting' : ''">{{codeBtnText}}</el-button>
            </el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('forgetForm')" >提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import ManagerHeader from '../../components/managerHeader'
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'ForgetPsw',
    components: {ManagerHeader},
    data () {
      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          if (!(/^[a-zA-Z]\w{3,15}$/.test(value))) {
            callback(new Error('请输入以字母开头由英文字母和数字组成的4-16位用户名'))
          }
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!(/^1[345789]\d{9}$/.test(value))) {
            callback(new Error('请输入正确的11位手机号'))
          }
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          if (!(/\d{6}/.test(value))) {
            callback(new Error('请输入正确的验证码'))
          }
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,30}$/.test(value))) {
            callback(new Error('最少8个字符，需包含大小写字母及数字'))
          }
          callback()
        }
      }
      return {
        codeBtnDisabled: false,
        codeBtnText: '获取短信验证码',
        codeBtnTime: 90,
        forgetForm: {
          account: '',
          phone: '',
          code: '',
          password: ''
        },
        rules: {
          account: [
            { validator: validateAccount, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      EventBus.$emit('setHomeHeader', '忘记密码')
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              '/account/reset',
              this.forgetForm,
              resj => {
                if (resj.code === 0) {
                  this.openMessageBox(resj.message, action => {
                    this.$router.go(-1)
                  })
                } else {
                  this.$message({
                    type: 'error',
                    message: resj.message
                  })
                }
              }
            )
          } else {
            console.log('提交失败')
            return false
          }
        })
      },
      openMessageBox (message, callback) {
        this.$alert(message, '温馨提示', {
          confirmButtonText: '去登陆',
          callback
        })
      },
      getCode () {
        this.$refs.forgetForm.validateField('account', (errorAccount) => { // 用户名合法性判断
          if (!errorAccount) {
            this.$refs.forgetForm.validateField('phone', (errorPhone) => { // 电话号合法性判断
              if (!errorPhone) {
                this.$api.post(
                  '/account/restsms',
                  {phone: this.forgetForm.phone, account: this.forgetForm.account},
                  resj => {
                    this.setCodeBtnTime()
                    this.$message({
                      message: resj.message,
                      type: 'success'
                    })
                  }
                )
              } else {
                console.log(errorPhone)
              }
            })
          } else {
            console.log(errorAccount)
          }
        })
      },
      setCodeBtnTime () {
        if (!this.codeBtnTime) { // 0秒时重置
          this.codeBtnDisabled = false
          this.codeBtnText = '获取短信验证码'
          this.codeBtnTime = 90
          return 'reset time'
        } else {
          this.codeBtnDisabled = true
          this.codeBtnText = `重新发送(${this.codeBtnTime})`
          this.codeBtnTime--
        }
        setTimeout(() => {
          this.setCodeBtnTime()
        }, 1000)
      }
    }
  }
</script>
<style lang="scss" scoped>
  #forgetpsw{
    padding: 40px 0;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    .el-input-group__append button.is-waiting{
      pointer-events: none;
    }
    .el-input-group__append button.is-waiting:before{
      pointer-events: none;
      background-color: rgba(255,255,255,.35);
    }
    .forgetForm{
      width: 720px;
      margin: 50px auto 0;
      .requier{
        color: red;
        font-family: 'simsun';
        text-align: center;
      }
      .tip{
        color: #929292;
      }
    }
  }
</style>

