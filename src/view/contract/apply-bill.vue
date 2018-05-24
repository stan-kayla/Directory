<template>
    <span id="apply-bill">
      <el-button type="text" @click="billdialog = true">申请发票</el-button>
      <el-dialog
        title="申请发票"
        :visible.sync="billdialog"
        width="700px">
        <el-form :label-position="labelPosition" label-width="100px" ref="form" :model="form" :rules="rules">
          <el-form-item label="发票抬头：" prop="invoice_rise">
            <div class="form-text">{{form.invoice_rise}}</div>
          </el-form-item>
          <el-form-item label="税号：" prop="tax_num">
            <div class="form-text">{{form.tax_num}}</div>
          </el-form-item>
            <el-form-item label="收件人：" prop="recipient_name">
              <el-input v-model="form.recipient_name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="recipient_add">
              <el-input v-model="form.recipient_add" type="text"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="form.phone" type="text"></el-input>
            </el-form-item>
            <el-form-item label="邮编：" prop="zip_code">
              <el-input v-model="form.zip_code" type="text"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="apply_bill('form',applyId)">提交</el-button>
  </span>
      </el-dialog>
    </span>
</template>

<script>
  export default {
    name: 'apply-bill',
    props: ['applyId', 'onSuccess'],
    data () {
      var checkPhone = (rule, value, callback) => {
        if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请填写正确的联系电话'))
        } else {
          callback()
        }
      }
      return {
        labelPosition: 'right',
        company_list: '',
        billdialog: false,
        form: {
          invoice_rise: '',
          tax_num: '',
          invoice_type: 1,
          recipient_name: '',
          recipient_add: '',
          phone: '',
          zip_code: ''
        },
        rules: {
          invoice_type: [
            {required: true, message: '请输入收件类型', trigger: 'submit'}
          ],
          recipient_name: [
            {required: true, message: '请输入收件人', trigger: 'submit'}
          ],
          recipient_add: [
            {required: true, message: '请输入地址', trigger: 'submit'}
          ],
          phone: [
            {required: true, message: '请输入联系电话', trigger: 'submit'},
            {validator: checkPhone, trigger: 'blur'}
          ],
          zip_code: []
        }
      }
    },
    mounted () {
      this.get_data()
    },
    methods: {
      get_data () {
        this.$api.post('/ent/json', {}, (r) => {
          this.company_list = r.data
          this.form.invoice_rise = this.company_list.ent_name
          this.form.tax_num = this.company_list.ent_id
        })
      },
      apply_bill (form, id) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$api.post('/invoice/save?id=' + id, this.form, (r) => {
              this.$message.success(r.message)
              this.onSuccess()
              this.dialogVisible = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  #apply-bill {
    .el-dialog__header {
      text-align: left;
    }
    .el-dialog__body {
      margin-left: 50px;
      .form-text {
        text-align: left;
      }
    }
    .el-form-item__content {
      width: 400px;
    }
  }
</style>
