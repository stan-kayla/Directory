<template>
  <div id="sign-info-tab" v-show="loaded">
    <!--审核状态提示框-->
    <el-alert
      :title="'营业执照审核未通过：'+(this.signInfo.approve_text||'无')"
      type="error"
      show-icon
      v-if="this.signInfo.sign_status==='审核未通过'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="营业执照审核中,请耐心等待"
      type="warning"
      show-icon
      v-if="this.signInfo.sign_status==='未审核'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="营业执照审核已通过，完成电子合同委托书与企业信息提交后前往资质认证进行企业资质认证"
      type="success"
      show-icon
      v-if="this.signInfo.sign_status==='审核已通过'"
      class="status-alert">
    </el-alert>
    <!--信息表单-->
    <el-row>
      <el-col :span="12" :offset="4">
        <!--编辑状态-->
        <el-form :model="form" ref="signForm" :rules="rules" label-width="140px" v-if="isEdit">
          <el-form-item label="营业执照" prop="signFile">
            <file-upload @file-change="signChange"
                         :preview="form.signFile"></file-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
        <!--查看状态-->
        <el-form :model="form" label-width="140px" v-else>
          <el-form-item label="营业执照">
            <img :src="this.baseUrl + '/uploadify/renderFile/'+form.signFile" alt="sign" class="img-responsive">
          </el-form-item>
          <el-form-item v-if="signInfo.sign_status!=='未审核'">
            <el-button type="primary" @click="isEdit = true">编辑</el-button>
            <router-link to="/home/qualification" v-if="signInfo.sign_status==='审核已通过'">
              <el-button type="primary">下一步</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElForm from 'element-ui/packages/form/src/form'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import FileUpload from '../../components/fileUpload/index'

  export default {
    components: {
      FileUpload,
      ElFormItem,
      ElForm
    },
    name: 'sign-info-tab',
    data () {
      return {
        loadUrl: '/sign/mylist/1/19',
        formUrl: '/sign/upload',
        loaded: '',
        signInfo: '',
        form: {
          signFile: '',
          sign_kind: 1,
          sign_type: 19,
          pk_sign: ''
        },
        rules: {
          signFile: [{required: true, message: '请上传营业执照', trigger: 'submit'}]
        },
        isEdit: true
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get(this.loadUrl, null,
          resj => {
            if (resj.rows.length) {
              let data = resj.rows[0]
              this.signInfo = data
              this.formUrl = '/sign/update/'
              this.form.signFile = data.sign_file
              this.form.pk_sign = data.pk_sign
              this.isEdit = false
            } else {
              this.isEdit = true
            }
            this.loaded = true
          })
      },
      submit () {
        this.$refs.signForm.validate((valid) => {
          if (valid) {
            if (typeof this.form.signFile === 'string') {
              // 不更改已经上传的              this.load()
            } else {
              let formData = new FormData()
              formData.append('signFile', this.form.signFile)
              formData.append('sign_kind', this.form.sign_kind)
              formData.append('sign_type', this.form.sign_type)
              if (this.form.pk_sign) { formData.append('pk_sign', this.form.pk_sign) }
              this.$api.post(this.formUrl, formData,
                resj => {
                  this.load()
                })
            }
          } else {
            return false
          }
        })
      },
      signChange (file) {
        this.form.signFile = file
      }
    }
  }
</script>

<style scoped>

</style>
