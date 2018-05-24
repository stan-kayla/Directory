<template>
  <div id="upload1" v-cloak v-if="loading">
    <product-table v-if="!data" keyword=''/>
    <div  class="btn-center">
      <el-button v-if="!data" @click="submit" type="primary">确认提交</el-button>
    </div>
    <entQuaCer v-if="data"/>
  </div>
</template>

<script>
  import ProductTable from '../../../components/product-table.vue'
  import entQuaCer from '../component/entQuaCer.vue'

  export default {
    components: {
      ProductTable,
      entQuaCer
    },
    name: 'auditinfo2',
    data () {
      return {
        loading: false,
        data: false
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      submit () {
        this.$api.post('/product/sign', '',
          resj => {
            console.log(resj)
          }
        )
      },
      load () {
        this.$api.get('/entCert/info', '',
          resj => {
            if (resj.data && resj.data !== '') {
              this.data = true
            }
            console.log(this.data)
            this.loading = true
            // if(resj.rows[0].sign_kind)
            // this.level = resj.rows[0].sign_kind
          })
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
  .btn-center{
    text-align: center;
    margin: 40px 0 30px 0;
  }

  #newEdit {
    border-top: 2px dotted #ECECEC;
    padding-top: 20px;
  }
</style>
