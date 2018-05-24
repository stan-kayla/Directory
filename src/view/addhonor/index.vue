<template>
  <div id="addhonor" class="container">
    <h3><i class="fa fa-trophy colorin"></i> 荣誉资料</h3>
    <div class="honorform">
      <el-form :model="honorForm" :rules="rules" ref="honorForm" label-width="100px">
        <el-form-item label="荣誉名称" prop="honor_name">
          <el-input v-model="honorForm.honor_name"></el-input>
        </el-form-item>
        <el-form-item label="荣誉图片" prop="honor_pic">
          <el-upload
            class="avatar-uploader"
            ref="imgUpload"
            :action="baseUrl+'/uploadify/uploadimg'"
            name="imgFile"
            :headers="uploadImgHeader"
            :file-list="imgList"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-remove="handleOnRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="handleExceed">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              <el-alert
                title="只能上传一张jpg/png文件，且不超过2M"
                type="warning"
                :closable="false">
              </el-alert>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('honorForm')">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AddHonor',
    mounted () {
      if (this.$route.params.id !== undefined) {
        this.isChangePage = true
        this.infoSet(this.$route.params.id)
      }
    },
    data () {
      return {
        path: '/honor/save', // 添加接口
        isChangePage: false,
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        },
        honorForm: {
          honor_name: '',
          honor_pic: ''
        },
        rules: {
          honor_name: [
            { required: true, message: '请输入荣誉名称', trigger: 'blur' }
          ],
          honor_pic: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ]
        },
        imgList: [],
        imageUrl: ''
      }
    },
    methods: {
      infoSet (id) {
        this.honorForm.id = id
        this.$api.get(
          '/honor/detail',
          {id},
          resj => {
            this.honorForm.honor_name = resj.data.honor_name
            this.honorForm.honor_pic = resj.data.honor_pic
            this.imgList.push({name: this.honorForm.honor_name, url: `${this.baseUrl}/uploadify/renderFile/${resj.data.honor_pic}`})
            this.imageUrl = `${this.baseUrl}/uploadify/renderFile/${resj.data.honor_pic}`
          }
        )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              this.path,
              this.honorForm,
              resj => {
                this.openMessageBox()
              },
              err => {
                this.$message.error(err.message)
              }
            )
          } else {
            this.$message.error('请确认信息填写正确!')
            return false
          }
        })
      },
      reset () {
        this.resetForm('honorForm')
        this.resetUpload('imgUpload')
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      resetUpload (uploadName) {
        this.$refs[uploadName].fileList.splice(0)
        this.imageUrl = ''
        // this.$refs[uploadName].clearFiles()
      },
      handleBeforeUpload (file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          this.$message.error('图片格式错误！')
          return false
        } else if (file.size > 1024 * 1024 * 2) {
          this.$message.error('图片大小超过限制！')
          return false
        } else {
          return true
        }
      },
      handleOnRemove (file, fileList) {
        this.imgList.pop()
        this.honorForm.honor_pic = ''
      },
      handleSuccess (resj, file) {
        if (resj.code) { // 未成功
          this.$message.error(resj.message)
        } else {
          this.imgList.splice(0, this.imgList.length)
          this.imgList.push({name: resj.fileName, url: `${this.baseUrl}/uploadify/renderFile/${resj.fileId}`})
          this.honorForm.honor_pic = resj.fileId
          this.imageUrl = URL.createObjectURL(file.raw)
        }
      },
      handleError () {
        this.$message.error('图片上传失败，请重试!')
      },
      handleExceed () {
        this.$message.error('超出图片上传个数限制!')
      },
      openMessageBox () {
        if (this.isChangePage) {
          this.$confirm('恭喜您，荣誉修改成功！', '温馨提示', {
            confirmButtonText: '再次修改',
            cancelButtonText: '返回我的发布'
          }).then(() => {}).catch(() => {
            this.$router.go(-1)
          })
        } else {
          this.$confirm('恭喜您，荣誉录入已提交成功！', '温馨提示', {
            confirmButtonText: '继续录入',
            cancelButtonText: '返回我的发布'
          }).then(() => {
            this.reset()
          }).catch(() => {
            this.$router.go(-1)
          })
        }
      }
    },
    watch: {
      isChangePage (val) {
        if (val) {
          this.path = '/honor/update' // 修改接口
        } else {
          this.path = '/honor/save' // 添加接口
        }
      }
    }
  }
</script>
<style lang="scss">
  #addhonor{
    padding: 40px;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    h3{
      font-weight: bold;
      .colorin{
        color: #d8bd21;
      }
    }
    .honorform{
      width: 720px;
      margin: 50px auto 0;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: $hot-dark;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

