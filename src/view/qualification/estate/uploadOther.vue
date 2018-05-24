<template>
  <div id="upload1" v-cloak v-if="loading">
    <div v-for="(item,index) in data">
      <uploadState v-if="data[index]" :data = 'data[index]' backButton=false></uploadState>
      <uploadForm v-if="!data[index]||data[index].sign_status=='审核未通过'" :data = 'data[index]'
                  @load="load" name='证书名称' :example='example[0]'>
      </uploadForm>
    </div>
    <div id='newEdit'>
      <uploadForm :example='example[1]' name='新增证书名称' @load="load">
      </uploadForm>
    </div>
    <div class="text-center">
      <router-link to="/home/membercenter">
        <el-button type="primary">返回会员中心</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import FileUpload from '../../../components/fileUpload/index.vue'
  import uploadState from '../component/uploadState.vue'
  import uploadForm from '../component/uploadForm.vue'

  export default {
    components: {
      FileUpload,
      uploadState,
      uploadForm
    },
    name: 'auditinfo5',
    data () {
      return {
        loading: false,
        levelLsit: ['一级', '二级'],
        levelAdd: [15, 17, 13], // 等级修正
        data: '',  // 已上传的信息
        name: ['消防维保机构等级类型', '消防检测机构等级类型', '消防安全评估机构等级类型'],
        example: [require('./1_cert.png'), require('./1_cert.png'), require('./1_cert.png')] // 示例图片,
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/sign/mylist/2/6', '',
          resj => {
            this.data = ''
            for (var i = 0; i < 3; i++) {
              this.data = resj.rows
            }
            console.log(this.data)
            this.loading = true
            // if(resj.rows[0].sign_kind)
            // this.level = resj.rows[0].sign_kind
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
  .tips:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  #newEdit {
    border-top: 2px dotted #ECECEC;
    padding-top: 20px;
  }
</style>
