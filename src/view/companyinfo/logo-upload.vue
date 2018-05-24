<template>
  <div id="logo-upload">
    <el-upload
      class="Logo-uploader"
      :action="fileUrl"
      name="imgFile"
      :headers="uploadImgHeader"
      :show-file-list="false"
      :on-success="handleLogoSuccess"
      :before-upload="beforeLogoUpload"
    >
      <div style="width: 178px;height: 178px;position: absolute" v-loading="logoLoading"></div>
      <img v-if="logoId" :src="imgPath+logoId" class="Logo">
      <i v-else class="el-icon-plus Logo-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'logo-upload',
    props: ['logoId'],
    data () {
      return {
        fileUrl: this.baseUrl + '/uploadify/upload',
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        },
        imgPath: this.baseUrl + '/uploadify/renderFile/',
        logoLoading: false
      }
    },
    methods: {
      handleLogoSuccess (res, file) {
        if (res.error === 0) {
          this.$emit('update:logoId', res.fileId)
        } else {
          this.$message.error(res.message)
        }
        this.logoLoading = false
      },
      beforeLogoUpload (file) {
        const isImg = /.(jpg|jpeg|png)$/i.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isImg) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        } else if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        } else {
          this.logoLoading = true
        }
        return isImg && isLt2M
      }
    }
  }
</script>

<style lang="scss">
  .Logo-uploader {
    .el-upload {
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      &:hover {
        border-color: $hot-dark;
      }
    }
    .Logo-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .Logo {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
