<template>
  <div id="register" class="container">
    <manager-header/>
    <div class="registerForm">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="account">
          <el-col :span="12">
            <el-input v-model="registerForm.account"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">4-16位字符，由英文字母和数字组成的</el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-col :span="12">
            <el-input v-model="registerForm.phone"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">可通过该手机号码快速找回密码</el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-col :span="12">
            <el-input v-model="registerForm.code">
              <el-button slot="append" @click="getCode" :class="codeBtnDisabled ? 'is-waiting' : ''">{{codeBtnText}}</el-button>
            </el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
        </el-form-item>
        <el-form-item label="密码" prop="pwd1">
          <el-col :span="12">
            <el-input type="password" v-model="registerForm.pwd1"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">最少8个字符，需包含大小写字母及数字</el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-col :span="12">
            <el-input type="password" v-model="registerForm.pwd2" @keyup.enter.native="submitForm('registerForm')"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="11">请再次输入密码</el-col>
        </el-form-item>
        <el-form-item>
          <el-checkbox name="type" v-model="confirmProtocol">
            <b>我已经阅读并同意《
              <router-link class="link-protocol" to="/protocol" target="_blank">平台合作协议</router-link>》
            </b>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!confirmProtocol" type="primary" @click="submitForm('registerForm')">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import ManagerHeader from '../../components/managerHeader'
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'Register',
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
          if (this.registerForm.pwd2 !== '') {
            this.$refs.registerForm.validateField('pwd2')
          }
          if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,30}$/.test(value))) {
            callback(new Error('最少8个字符，需包含大小写字母及数字'))
          }
          callback()
        }
      }
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.pwd1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        confirmProtocol: true,
        codeBtnDisabled: false,
        codeBtnText: '获取短信验证码',
        codeBtnTime: 90,
        registerForm: {
          account: '',
          phone: '',
          code: '',
          pwd1: '',
          pwd2: ''
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
          pwd1: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pwd2: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    components: {ManagerHeader},
    mounted () {
      EventBus.$emit('setHomeHeader', '账号信息')
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              '/account/register',
              this.registerForm,
              resj => {
                if (resj.code === 0) {
                  this.$router.push({ path: '/registercompany' })
                } else {
                  this.$alert(resj.message)
                }
              }
            )
          } else {
            console.log('提交失败')
            return false
          }
        })
      },
      getCode () {
        this.$refs.registerForm.validateField('account', (errorAccount) => { // 用户名合法性判断
          if (!errorAccount) {
            this.$refs.registerForm.validateField('phone', (errorPhone) => { // 电话号合法性判断
              if (!errorPhone) {
                this.$api.post(
                  '/account/sendsms',
                  {phone: this.registerForm.phone, account: this.registerForm.account},
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
<style lang="scss">
  #register{
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
    .registerForm{
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
      .link-protocol{
        color: $hot-dark;
      }
      .link-protocol:hover{
        color: #d0425d;
      }
    }
  }
</style>
