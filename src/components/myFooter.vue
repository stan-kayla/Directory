<template>
  <div id="myFooter">
    <div class="container">
      <el-row>
        <el-col :span="8" class="marginLeft10">
          <el-row class="link-text">
            <el-col :span="4">
              <a href="http://www.zxzx119.com/article-about-1.html">关于我们</a>
            </el-col>
            <el-col :span="1" class="footer-shortline"></el-col>
            <el-col :span="4">
              <a href="http://www.zxzx119.com/legal.html">法律声明</a>
            </el-col>
            <el-col :span="1" class="footer-shortline"></el-col>
            <el-col :span="4">
              <a href="http://www.zxzx119.com/privacy.html">隐私保护</a>
            </el-col>
            <el-col :span="1" class="footer-shortline"></el-col>
            <el-col :span="4">
              <a href="http://www.zxzx119.com/disclaimer.html">免责声明</a>
            </el-col>
            
           <!--  <el-col :span="1" class="footer-shortline"></el-col>
            <el-col :span="4">
              <a :href="baseUrl+'/map.html'">网站地图</a>
            </el-col> -->
          </el-row>
          <el-row class="link-text">
            <el-col :span="24">&copy;上海中消网络科技有限公司&nbsp;版权所有</el-col>
          </el-row>
          <el-row class="link-text no-bottom">
            <el-col :span="24">ICP备案编号：沪ICP备16039608号</el-col>
          </el-row>
          <!-- <div class="link">友情链接:</div>
          <el-row class="link-text">
            <el-col :span="12">
              <a href="http://www.gov.cn/">国务院</a>
              <a href="http://www.mps.gov.cn/" class="link-text-left">公安部</a>
            </el-col>
            <el-col :span="12"><a href="http://www.119.gov.cn/xiaofang/">公安部消防局</a></el-col>
          </el-row>
          <el-row class="link-text">
            <el-col :span="12"><a href="http://www.cccf.com.cn/getIndex.do">中国消防产品信息网</a></el-col>
            <el-col :span="12"><a href="http://www.zhongxiaogroup.com/">中消集团有限公司</a></el-col>
          </el-row>
          <el-row class="link-text">
            <el-col :span="12"><a :href="baseUrl+'/article-supervision-1.html'">监督举报</a></el-col>
            <el-col :span="12"><a :href="baseUrl+'/article-reddoor-1.html'">红门e家</a></el-col>
          </el-row> -->
        </el-col>
        <el-col :span="1" class="footer-rightline"></el-col>
        <el-col :span="6" class="tel-line">
          <div class="link-bottom text-left">服务热线：400-1919-119,1380-1919-119</div>
          <div class="link-bottom text-left">（周一至周五9:00—17:00，节假日顺延)</div>
          <div class="text-left">邮箱：4001919119@zxzx119.com</div>
        </el-col>
        <el-col :span="5" class="footer-right">
          <el-row>
            <el-col :span="12">
              <img src="../images/QRcode.png" class="img-responsive center-block">
              <div class="text-center num">关注公众号</div>
            </el-col>
            <el-col :span="12">
              <img src="../images/119.png" class="img-responsive center-block">
              <div class="text-center">下载app</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myFooter'
  }
</script>

<style lang="scss">
  $line: 1px solid $white-max;
  #myFooter {
    .marginLeft10{margin-left: 10px;}
    background-color: $hot-dark;
    color: $white-max;
    padding-top: 80px;
    padding-bottom: 60px;
    font-size: 14px;
    .link-text {
      margin-top: 30px;
      .link-text-left{
        margin-left: 43px;
      }
      .el-col-4{width: 18.667%;
        a{font-size: 16px;}
      }

    }
    .no-bottom{
      margin:5px 0px 15px 0px;
    }
    .footer-right{
      margin: 15px 0 0 152px;
      /*.marginLeft20{margin-left: -20px;}*/
      .text-center{margin: -10px -10px 0 -10px;font-weight: bold;font-size: 16px;}
    }
    .tel-line {
      margin-top: 30px;
    }
    .link-bottom {
      padding-bottom: 15px;
    }
    a {
      color: $white-max;
    }
    a:hover, a:focus {
      color: #ddd;
      background-color: transparent;
      text-decoration: none;
    }
    .num {
      margin: -10px -10px 0 -10px;
    }
    .footer-rightline {
      border-left: $line;
      height: 141px;
      margin: 18px 40px 0 -10px;
    }
    .footer-shortline{border-left:$line;height: 14px;margin-top: 3px;}
    img {
      margin-bottom: 15px;width: 100px;height: 100px;
    }
    .footer-topline {
      border-top: $line;
      width: 100%;
      margin-top: 33px;
      margin-bottom: 25px;
    }
    .footer-text-bottom {
      margin-bottom: 16px;
      a {
        padding: 10px;
      }
    }
  }
</style>
