<template>
  <div id="changepassword">
    <el-row>
      <el-col :span="18" :offset="6">
        <el-form :label-position="labelPosition" label-width="80px" :rules="rules" ref="form" :model="form">
          <el-form-item label="原密码" prop="old_password">
            <el-input v-model="form.old_password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password1">
            <el-input v-model="form.new_password1" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="new_password2">
            <el-input v-model="form.new_password2" type="password"></el-input>
          </el-form-item>
          <el-col :offset="4">
            <el-form-item>
              <el-button type="primary" @click="post_data('form')">提交</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'

  export default {
    name: 'changepassword',
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.form.new_password2 !== '') {
            this.$refs.form.validateField('new_password2')
          }
          if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,30}$/.test(value))) {
            callback(new Error('最少8个字符，需包含大小写字母及数字'))
          }
          if (value === this.form.old_password) {
            callback(new Error('原密码与新密码不能相同'))
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.new_password1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        labelPosition: 'right',
        form: {
          old_password: '',
          new_password1: '',
          new_password2: ''
        },
        rules: {
          old_password: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          new_password1: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          new_password2: [
            {validator: validatePass2, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      post_data (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$api.post('/account/password/change', this.form, (r) => {
              this.$message.success(r.message)
              this.resetForm(form)
            })
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    mounted () {
      EventBus.$emit('setHomeHeader', '修改密码')
    }
  }
</script>

<style lang="scss">
  #changepassword {
    margin-top: 150px;
    .el-input__inner {
      width: 50%;
    }
  }
</style>
