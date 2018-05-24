<template>
  <div class="list-item">
    <a :href="this.baseUrl+'/ent/view/'+info.pk_ent" target="_blank" class="item-logo">
      <img :src="baseUrl+'/uploadify/renderThumb/'+info.ent_logo+'/120x120'" alt="" class="img-responsive">
    </a>
    <el-row class="item-info">
      <el-col :span="18" class="item-text">
        <a :href="this.baseUrl+'/ent/view/'+info.pk_ent" target="_blank" class="name">{{info.ent_name}}</a>
        <div>企业地址：{{info.ent_addr}}</div>
        <div>邮箱：{{info.ent_email}}</div>
        <div class="tel">{{info.ent_phone}}</div>
      </el-col>
      <el-col :span="6" class="item-region">
        <i class="fa fa-map-marker"></i><a>{{info.ent_region}}</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'list-item',
    props: ['info'],
    data () {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .list-item {
    margin-top: 25px;
    padding: 15px;
    height: 166px;
    border: 1px solid #dcdcdc;
    box-shadow: 3px 3px 3px rgba(190, 190, 190, 0.7);
    .item-logo {
      float: left;
      height: 136px;
      width: 136px;
      border: 1px solid #ddd;
      line-height: 136px;
      text-align: center;
      img {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .item-info {
      margin-left: 176px;
      .item-text{
        padding: 8px;
        line-height: 30px;
        .name{
          display: inline-block;
          font-weight: bold;
        }
        .tel{
          font-weight: bold;
          color: #0066cc;
          font-size: 16px;
        }
      }
      .item-region{
        margin-top: 100px;
        // line-height: 35px;
        i{
          font-size: 35px;
          color: #0066cc;
        }
        a{
          margin-left: 10px;
          height: 35px;
          line-height: 35px;
          display: inline-block;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
