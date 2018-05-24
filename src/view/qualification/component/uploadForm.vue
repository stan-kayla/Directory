<template>
  <div id='uploadForm'>
    <el-row>
      <el-col :span="20" :offset="1">
        <el-form :model="form" ref="form" labelWidth="200px" :rules="rules">
          <el-form-item v-if='levelLsit' :label="name" prop="sign_type">
            <el-radio-group v-model="form.sign_type">
              <el-radio v-for="(item,index) in levelLsit" :label="index+levelAdd" :key="index">{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if='!levelLsit&&!data' :label="name" prop="sign_name">
            <el-input v-model="form.sign_name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="资质证书" prop="signFile">
            <file-upload :example="example" @file-change="fileChange"></file-upload>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button @click="submit" type="primary">审核提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import FileUpload from '../../../components/fileUpload/index.vue'

  export default {
    components: {
      FileUpload
    },
    name: 'uploadForm',
    data () {
      return {
        addUrl: '/sign/upload',
        updateUrl: '/sign/update/',
        loading: false,
        imgFile: this.baseUrl + '/uploadify/renderFile/', // 在线图片地址
        form: {
          signFile: '',
          sign_type: '',
          sign_kind: 2,
          sigh_name: ''
        },
        rules: {
          sign_type: [{required: true, message: '请选择证书类型', trigger: 'submit'}],
          signFile: [{required: true, message: '清上传资质证书', trigger: 'submit'}],
          sign_name: [{required: true, message: '清输入证书名称', trigger: 'submit'}]
        }
      }
    },
    props: ['data', 'load', 'levelLsit', 'example', 'levelAdd', 'name'],
    methods: {
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.data ? this.update() : this.add()
          } else {
            return false
          }
        })
      },
      add () {
        let formData = new FormData()
        formData.append('signFile', this.form.signFile)
        formData.append('sign_kind', this.form.sign_kind)
        if (this.levelLsit && (this.form.sign_type !== 10 || this.levelAdd !== 7)) {
          formData.append('sign_type', this.form.sign_type)
        } else if (this.form.sign_type === 10 && this.levelAdd === 7) {
          formData.append('sign_type', 23)
        } else {
          formData.append('sign_type', 21)
          formData.append('sign_name', this.form.sign_name)
        }
        this.$api.post(this.addUrl, formData,
          resj => {
            this.$emit('load')
          })
      },
      update () {
        let formData = new FormData()
        formData.append('signFile', this.form.signFile)
        formData.append('pk_sign', this.data.pk_sign)
        formData.append('sign_type', this.form.sign_type)
        this.$api.post(this.updateUrl, formData,
          resj => {
            this.$emit('load')
          })
      },
      fileChange (file) {
        this.form.signFile = file
      }
    }
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .status {
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    text-align: center;
    padding: 20px;
    p {
      margin: 0;
      padding: 0;
      font-size: 20px;
      text-align: right;
    }
    span {
      width: 100%;
      display: block;
      /* margin: 20px; */
      font-size: 20px;
      color: rgb(137, 137, 137);
      text-align: left
    }
    img {
      height: 171px;
      display: block;
    }
  }

  .el-form-item__label {
    font-weight: 600
  }

  .tips:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
</style>
