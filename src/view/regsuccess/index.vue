<template>
  <div id="regsuccess" class="container">
    <manager-header/>
    <el-row class="content">
      <el-col :span="10" class="left text-center">
        <img src="./QRcode.png" alt="二维码">
        <span>扫描关注订阅号</span>
      </el-col>
      <el-col :span="14" class="right">
        <h3>欢迎入驻中消在线企业名录平台！</h3>
        <ul>
          <li>公司名称：{{compName}}</li>
          <li>您注册的账号：{{account}}</li>
          <li>手机号码：{{phone}}</li>
        </ul>
      </el-col>
    </el-row>
    <div class="text-center">
      <el-button type="primary" @click="gotoMemberCenter">进入会员中心</el-button>
    </div>
  </div>
</template>
<script>
  import ManagerHeader from '../../components/managerHeader'
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'RegSuccess',
    components: {ManagerHeader},
    data () {
      return {
        compName: '',
        account: '',
        phone: ''
      }
    },
    mounted () {
      this.getInfo()
      EventBus.$emit('ifLogin', true)
      EventBus.$emit('setHomeHeader', '注册成功')
    },
    methods: {
      getInfo () {
        this.$api.get(
          '/ent/json',
          {},
          resj => {
            this.compName = resj.data.ent_name
            this.account = resj.data.tails.userinfo[0].account
            this.phone = resj.data.tails.userinfo[0].phone
          }
        )
      },
      gotoMemberCenter () {
        this.$router.push({path: '/home/membercenter'})
      }
    }
  }
</script>
<style lang="scss" scoped>
  #regsuccess{
    padding: 40px 0;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    li{
      list-style: none;
    }
    .content{
      width: 720px;
      margin: 60px auto;
      .left{
        img{
          width: 150px;
          height: 150px;
        }
        span{
          display: block;
          margin-top: 10px;
          font-size: 14px;
        }
      }
      .right{
        h3{
          margin: 16px 0;
          color: #f19149;
          font-size: 25px;
        }
        li{
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
</style>

