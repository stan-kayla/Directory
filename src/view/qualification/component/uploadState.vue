<template>
  <div>
    <el-row id='uploadState' :gutter="20" class='status'>
      <el-col :span='12'><p>{{data.sign_type}}</p></el-col>
      <el-col :span='12'>
      <span>
          <i v-if='data.sign_status=="审核通过"' style='color:green' class="fa fa-check-circle"></i>
          <i v-if='data.sign_status=="审核未通过"' style='color:red' class="fa fa-times-circle"></i>
          {{data.sign_status}}
      </span>
      </el-col>
      <el-col :span='24' v-if='data.sign_status=="审核未通过"'>
        <el-row :gutter="20">
          <el-col :span='12'><p>已上传证书</p></el-col>
          <el-col :span='12'>
            <img :src="imgFile+data.sign_file" alt="">
          </el-col>
        </el-row>
      </el-col>
      <el-col :span='24' v-if='data.sign_status=="审核通过"'>
        <el-row :gutter="20">
          <el-col :span='24'>
            <entQuaCer></entQuaCer>
          </el-col>
          <div  class="btn-center">
            <el-button @click="nextStep" type="primary">下一步</el-button>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <div class="text-center" v-if='!backButton'>
      <router-link to="/home/membercenter">
        <el-button type="primary">返回会员中心</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import entQuaCer from './entQuaCer.vue'

  export default {
    components: {
      entQuaCer
    },
    name: 'uploadState',
    data () {
      return {
        imgFile: this.baseUrl + '/uploadify/renderFile/' // 在线图片地址
      }
    },
    props: ['data', 'backButton'],
    methods: {
      nextStep () {
        this.$router.replace('/home/contract')
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
      height:171px;
      max-width:95%;
      display:block;
    }
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
  #uploadState {
    margin-bottom: 20px
  }
</style>
