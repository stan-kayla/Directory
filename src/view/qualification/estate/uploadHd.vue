<template>
  <div id="upload1" v-cloak v-if="loading">
    <uploadState v-if="data" :data='data'></uploadState>
    <p v-if="!data||data.sign_status=='审核未通过'">(说明：房地产资质等级证书分为一级、二级、三级、四级。）</p>
    <uploadForm v-if="!data||data.sign_status=='审核未通过'" :data='data' :name='name' @load="load" :levelLsit='levelLsit'
                :levelAdd='levelAdd' :example='example'>
    </uploadForm>
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
    name: 'auditinfo2',
    data () {
      return {
        loading: false,
        levelLsit: ['一级', '二级', '三级', '四级'],
        levelAdd: 1, // 等级修正
        data: '',  // 已上传的信息
        name: '房地产企业等级类型',
        example: require('./1_cert.png') // 示例图片,
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/sign/mylist/2/1', '',
          resj => {
            this.data = resj.rows[0]
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
