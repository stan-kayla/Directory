<template>
  <div>
    <div id="upload1" v-cloak v-if="loading">
      <div v-for="(item,index) in data" :key="index">
        <uploadState v-if="data[index]" :data='data[index]' backButton=false></uploadState>
        <uploadForm v-if="!data[index]||data[index].sign_status=='审核未通过'" :data='data[index]' @load="load"
                    :levelLsit='levelLsit' :name='name[index]' :levelAdd='levelAdd[index]' :example='example[index]'>
        </uploadForm>
      </div>
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
        data: ['', '', ''],  // 已上传的信息
        name: ['消防维保机构等级类型', '消防检测机构等级类型', '消防安全评估机构等级类型'],
        example: [require('./1_cert.png'), require('./1_cert.png'), require('./1_cert.png')] // 示例图片,
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/sign/mylist/2/5', '',
          resj => {
            this.data = ['', '', '']
            for (var i = 0; i < resj.rows.length; i++) {
              if (resj.rows[i].sign_type.indexOf('维保') >= 0) {
                this.data[0] = resj.rows[i]
              } else if (resj.rows[i].sign_type.indexOf('检测') >= 0) {
                this.data[1] = resj.rows[i]
              } else if (resj.rows[i].sign_type.indexOf('评估') >= 0) {
                this.data[2] = resj.rows[i]
              }
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
</style>
