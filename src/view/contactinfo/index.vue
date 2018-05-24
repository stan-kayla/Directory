<template>
  <div id="contactinfo">
    <div class="content-body v-outter-table">
      <div class="v-table-cell">
        <el-row v-if="contact_list">
          <el-col :span="8" v-for="(item,index) in contact_list" :key="'contact'+index">
            <div class="contact-card active text-ellipsis">
              <div class="info-item">
                <el-col :span="6">
                  <i class="fa fa-user"></i>
                </el-col>
                <el-col :span="18">{{item.contacter}}</el-col>
              </div>
              <el-row class="info-item">
                <el-col :span="6">
                  <i class="fa fa-mobile"></i>
                </el-col>
                <el-col :span="18">{{item.tel}}</el-col>
              </el-row>
              <el-row class="info-item">
                <el-col :span="6">
                  <i class="fa fa-mortar-board"></i>
                </el-col>
                <el-col :span="18">{{item.title}}</el-col>
              </el-row>
              <el-row class="info-item">
                <el-col :span="6">
                  <i class="fa fa-envelope"></i>
                </el-col>
                <el-col :span="18">{{item.email}}</el-col>
              </el-row>
              <div class="operation-item">
                <a @click="modal('update',item.pk_ent_contacts)"><i
                  class="fa fa-edit"></i></a>
                <a @click="del_data(item.pk_ent_contacts)"><i
                  class="fa fa-trash-o"></i></a>
              </div>
            </div>
          </el-col>
          <el-dialog
            title="修改"
            :visible.sync="dialog"
            width="563px">
            <el-form :label-position="labelPosition" label-width="120px" :rules="rules" ref="form" :model="form">
              <el-form-item label="联系人姓名：" prop="contacter">
                <el-input v-model="form.contacter" type="text"></el-input>
              </el-form-item>
              <el-form-item label="联系方式：" prop="tel">
                <el-input v-model="form.tel" type="text"></el-input>
              </el-form-item>
              <el-form-item label="职位：" prop="title">
                <el-input v-model="form.title" type="text"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="form.email" type="text"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="update_data('form',form.pk_ent_contacts)">提交</el-button>
            </span>
          </el-dialog>
          <el-col :span="8" v-for="(item,index) in (3-contact_list.length)" :key="'contactAdd'+index"><a
            @click.prevent="modal('add')" class="contact-card"><i class="fa fa-plus"></i></a></el-col>
          <el-dialog
            title="新增"
            :visible.sync="dialogadd"
            width="563px">
            <el-form :label-position="labelPosition" label-width="120px" :rules="rules" ref="form" :model="form">
              <el-form-item label="联系人姓名：" prop="contacter">
                <el-input v-model="form.contacter" type="text"></el-input>
              </el-form-item>
              <el-form-item label="联系方式：" prop="tel">
                <el-input v-model="form.tel" type="text"></el-input>
              </el-form-item>
              <el-form-item label="职位：" prop="title">
                <el-input v-model="form.title" type="text"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="form.email" type="text"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="add_data('form')">提交</el-button>
            </span>
          </el-dialog>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'

  export default {
    name: 'contactinfo',
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!(/^1[345789]\d{9}$/.test(value))) {
          return callback(new Error('请填写正确的联系电话'))
        } else {
          callback()
        }
      }
      return {
        contact_list: '',
        item1: '',
        key: '',
        dialog: false,
        dialogadd: false,
        deldialog: false,
        labelPosition: 'right',
        form: {
          contacter: '',
          tel: '',
          title: '',
          email: ''
        },
        rules: {
          contacter: [
            {required: true, message: '请输入联系人信息', trigger: 'onblur'}
          ],
          tel: [
            {required: true, message: '请输入联系方式', trigger: 'onblur'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ]
        }
      }
    },
    mounted () {
      this.get_data()
      EventBus.$emit('setHomeHeader', '联系人信息')
    },
    methods: {
      get_data () {
        this.$api.post('/ent/contacts/list', {}, (r) => {
          this.contact_list = r.data
        })
      },
      update_data (form, id) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$api.post('/ent/contacts/update/' + id, this.form, (r) => {
              this.$message.success(r.message)
              this.resetForm(form)
              this.dialog = false
              this.get_data()
            })
          } else {
            return false
          }
        })
      },
      add_data (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$api.post('/ent/contacts/save/', this.form, (r) => {
              this.$message.success(r.message)
              this.get_data()
              this.resetForm(form)
              this.dialogadd = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      del_data (id) {
        this.$confirm('请确认是否删除？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.get('/ent/contacts/remove/' + id, this.form, (r) => {
            this.$message.success(r.message)
            this.get_data()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      modal (type, id) {
        if (type === 'update') {
          this.$api.post('/ent/contacts/getinfo/' + id, this.form, (r) => {
            this.form = r.data
          })
          this.dialog = true
        } else if (type === 'add') {
          this.dialogadd = true
        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss">
  #contactinfo {
    padding: 0 25px;
    .content-body {
      min-height: 550px;
      width: 100%;
    }
    .el-col-8 {
      padding: 0 10px;
    }
    .contact-card {
      display: inline-block;
      text-align: center;
      background-color: #d9d9d9;
      color: #fff;
      height: 330px;
      width: 100%;
      border-radius: 5px;
    }
    .active {
      background-color: #fff;
      color: #666;
      border: 1px solid #c41335;
      padding: 40px 15px;
      font-size: 16px;
      line-height: 32px;
      i {
        font-size: 30px;
      }
    }
    .info-item {
      height: 54px;
    }
    .operation-item {
      margin-top: 20px;
      text-align: right;
      i {
        margin-left: 10px;
      }
      a {
        color: #666;
        cursor: pointer;
      }
    }
    .fa-plus {
      font-size: 60px;
      line-height: 330px;
    }
    .el-input__inner {
      width: 80%;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
</style>
