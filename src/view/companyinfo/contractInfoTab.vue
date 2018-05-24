<template>
  <div id="contract-info-tab" v-show="loaded">
    <!--审核状态提示框-->
    <el-alert
      :title="'电子合同委托书审核未通过：'+(this.contractInfo.audit_text||'无')"
      type="error"
      show-icon
      v-if="this.contractInfo.contract_state==='审核未通过'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="电子合同委托书审核中,请耐心等待"
      type="warning"
      show-icon
      v-if="this.contractInfo.contract_state==='未审核'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="电子合同委托书审核已通过，完成营业执照与企业信息提交后前往资质认证进行企业资质认证"
      type="success"
      show-icon
      v-if="this.contractInfo.contract_state==='审核已通过'"
      class="status-alert">
    </el-alert>
    <!--信息表单-->
    <el-row>
      <el-col :span="12" :offset="4">
        <!--编辑状态-->
        <el-form :model="form" ref="contractForm" :rules="rules" label-width="140px" v-if="isEdit">
          <el-form-item label="电子合同委托书" prop="sign_file">
            <el-upload
              :action="fileUrl"
              drag
              name="imgFile"
              :limit="1"
              :headers="uploadImgHeader"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :on-error="handleError"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                <el-alert
                  title=""
                  type="warning"
                  :closable="false">
                  请打印<a :href="exampleFilePath" style="color: #1c78ab" target="_blank">电子合同委托书</a>填写完毕后拍照上传
                </el-alert>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="受委托人姓名" prop="admin_user">
            <el-input v-model="form.admin_user"></el-input>
          </el-form-item>
          <el-form-item label="受委托人手机号" prop="admin_phone">
            <el-input v-model="form.admin_phone"></el-input>
          </el-form-item>
          <el-form-item label="受委托人身份证号" prop="admin_iden_code">
            <el-input v-model="form.admin_iden_code"></el-input>
          </el-form-item>
          <el-form-item label="受委托人职务" prop="admin_position">
            <el-input v-model="form.admin_position"></el-input>
          </el-form-item>
          <el-form-item label="法人姓名" prop="corporate_name">
            <el-input v-model="form.corporate_name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
        <!--查看状态-->
        <el-form :model="form" ref="contractForm" :rules="rules" label-width="140px" v-else>
          <el-form-item label="电子合同委托书">
            <img :src="this.baseUrl + '/uploadify/renderFile/'+form.sign_file" alt="contract" class="img-responsive">
          </el-form-item>
          <el-form-item label="受委托人姓名">{{form.admin_user}}</el-form-item>
          <el-form-item label="受委托人手机号">{{form.admin_phone}}</el-form-item>
          <el-form-item label="受委托人身份证号">{{form.admin_iden_code}}</el-form-item>
          <el-form-item label="受委托人职务">{{ form.admin_position }}</el-form-item>
          <el-form-item label="法人姓名">{{form.corporate_name}}</el-form-item>
          <el-form-item v-if="contractInfo.contract_state!=='未审核'">
            <el-button type="primary" @click="toggleEdit">编辑</el-button>
            <router-link to="/home/qualification" v-if="contractInfo.contract_state==='审核已通过'">
              <el-button type="primary">下一步</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'contract-info-tab',
    data () {
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
      const validateIdCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入委托人身份证号'))
        } else {
          if (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value))) {
            callback(new Error('请输入正确的委托人身份证号'))
          }
          callback()
        }
      }
      return {
        loadUrl: '/contract/info',
        formUrl: '/contract/uploaddoc2/',
        exampleFilePath: 'http://cdn.zxzx119.com/2017chinafire.pdf',
        fileUrl: this.baseUrl + '/uploadify/upload',
        loaded: '',
        contractInfo: '',
        form: {
          sign_file: '',
          admin_user: '',
          admin_phone: '',
          admin_iden_code: '',
          admin_position: '',
          corporate_name: ''
        },
        fileList: [],
        rules: {
          sign_file: [{required: true, message: '请上传电子合同委托书', trigger: 'submit'}],
          admin_user: [{required: true, message: '请输入受委托人姓名', trigger: 'submit'}],
          admin_phone: [{required: true, validator: validateTel, message: '请输入受委托人手机号', trigger: 'submit'}],
          admin_iden_code: [{required: true, validateTel: validateIdCode, message: '请输入受委托人身份证号', trigger: 'submit'}],
          admin_position: [{required: true, message: '请输入受委托人职务', trigger: 'submit'}],
          corporate_name: [{required: true, message: '请输入法人姓名', trigger: 'submit'}]
        },
        isEdit: true,
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get(this.loadUrl, null,
          resj => {
            if (resj.data) {
              this.contractInfo = resj.data
              this.formUrl = '/contract/updatedoc/'
              this.form = resj.data
              this.fileList.push({name: '电子合同委托书', url: `${this.baseUrl}/uploadify/renderFile/${this.form.sign_file}`})
              this.isEdit = false
            } else {
              this.isEdit = true
            }
            this.loaded = true
          })
      },
      submit () {
        this.$refs.contractForm.validate((valid) => {
          if (valid) {
            this.$api.post(this.formUrl + this.form.sign_file, this.form,
              resj => {
                this.load()
              })
          } else {
            return false
          }
        })
      },
      toggleEdit () {
        this.isEdit = true
      },
      handleSuccess (res, file) {
        if (res.error === 0) {
          this.form.sign_file = res.fileId
        } else {
          this.$message.error(res.message)
        }
      },
      beforeUpload (file) {
        const isImg = /.(jpg|jpeg|png)$/i.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isImg) {
          this.$message.error('电子合同委托书图片只能是 JPG ，JPEG , PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('电子合同委托书图片大小不能超过 2MB!')
        }
        return isImg && isLt2M
      },
      handleRemove () {
        this.form.sign_file = ''
      },
      handleError () {
        this.$message.error('图片上传失败，请重试!')
      },
      handleExceed () {
        this.$message.error('超出图片上传个数限制!')
      }
    }
  }
</script>

<style>
</style>
