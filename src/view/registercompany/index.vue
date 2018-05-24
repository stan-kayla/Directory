<template>
  <div id="register-comp" class="container">
    <manager-header/>
    <div class="registerForm">
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px">
        <el-form-item label="公司名称" prop="ent_name">
          <el-col :span="18">
            <el-input v-model="registerForm.ent_name" placeholder="公司信息必须真实有效"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
          <el-col class="tip" :span="5">注册公司的名字</el-col>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="contacter">
          <el-col :span="18">
            <el-input v-model="registerForm.contacter" placeholder="请输入联系人姓名"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-col :span="18">
            <el-input v-model="registerForm.tel" placeholder="请输入联系人的手机号码"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
        </el-form-item>
        <el-form-item label="职位" prop="title">
          <el-col :span="18">
            <el-input v-model="registerForm.title" placeholder="请输入职位信息"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-col :span="18">
            <el-input v-model="registerForm.email" placeholder="请输入联系人的邮箱地址"></el-input>
          </el-col>
          <el-col class="requier" :span="1">*</el-col>
        </el-form-item>
        <el-form-item label="推荐企业" prop="ent_expert">
          <el-col :span="18">
            <el-switch
              v-model="recommend"
              active-text="企业推荐"
              inactive-text="自荐"
              @change="switchRecommend">
            </el-switch>
          </el-col>
          <el-collapse-transition>
            <el-col :span="18" v-if="recommend">
              <el-input v-model="registerForm.ent_expert" placeholder="例如：宝龙地产，嘉凯城"
                        @keyup.enter.native="submitForm('registerForm')"></el-input>
            </el-col>
          </el-collapse-transition>
          <el-collapse-transition>
            <el-col class="requier" :span="1" v-if="recommend">*</el-col>
          </el-collapse-transition>
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
  import { EventBus } from '../../util/eventBus'

  export default {
    name: 'RegisterCompany',
    data () {
      const validateEntname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入公司名称'))
        } else {
          callback()
        }
      }
      const validateContacter = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入联系人姓名'))
        } else {
          callback()
        }
      }
      const validateTel = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else {
          if (!(/^1[345789]\d{9}$/.test(value))) {
            callback(new Error('请输入正确的11位手机号'))
          }
          callback()
        }
      }
      const validateTitle = (rule, value, callback) => {
        callback()
      }
      const validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱地址'))
        } else {
          if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value))) {
            callback(new Error('请输入正确的邮箱地址'))
          }
          callback()
        }
      }
      return {
        recommend: true,
        confirmProtocol: true,
        registerForm: {
          ent_name: '',
          contacter: '',
          tel: '',
          title: '',
          email: '',
          ent_expert: ''
        },
        rules: {
          ent_name: [
            {validator: validateEntname, trigger: 'blur'}
          ],
          contacter: [
            {validator: validateContacter, trigger: 'blur'}
          ],
          tel: [
            {validator: validateTel, trigger: 'blur'}
          ],
          title: [
            {validator: validateTitle, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          ent_expert: [{required: true, message: '请输入推荐公司', trigger: 'blur'}]
        }
      }
    },
    components: {ManagerHeader},
    mounted () {
      this.hadCompName()
      this.getUserPhone()
      EventBus.$emit('setHomeHeader', '联系人信息')
    },
    methods: {
      hadCompName () {
        this.$api.get(
          '/home/ent',
          {},
          resj => {
            if (resj.ent_name) {
              EventBus.$emit('setLoginState', 1)
            } else {
              EventBus.$emit('setLoginState', 2)
            }
          }
        )
      },
      getUserPhone () {
        this.$api.get(
          '/ent/getUser',
          {},
          resj => {
            if (resj.code === 0) {
              this.registerForm.tel = resj.data.phone
            } else {
              this.$alert(resj.message)
            }
          }
        )
      },
      switchRecommend () {
        if (this.recommend) {
          this.registerForm.ent_expert = ''
        } else {
          this.registerForm.ent_expert = '自荐'
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              '/account/ent',
              this.registerForm,
              resj => {
                if (resj.code === 0) {
                  this.$router.push({path: '/regsuccess'})
                }
              }
            )
          } else {
            console.log('提交失败')
            return false
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  #register-comp {
    padding: 40px 0;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    .registerForm {
      width: 720px;
      margin: 50px auto 0;
      .requier {
        color: red;
        font-family: 'simsun';
        text-align: center;
      }
      .tip {
        color: #929292;
      }
    }
  }
</style>
