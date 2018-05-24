<template>
  <div id="myHeader">
    <nav class="navbar navbar-static-top" :style="{'left':-scroll+'px'}">
        <div class="navbar-redLine">
          <div class="container clearfix">
            <em>中消在线欢迎您的到来！</em>
            <ul class="clearfix">
              <li>
                <a href="http://d.zxzx119.com/login">登录</a>
                <i class="header-shortline"></i>
                <a href="http://d.zxzx119.com/register">注册</a>
              </li>
              <li>
                <a href="javascript:void(0);"><i class="navbar-redLine-icon icon-phone"></i></a>
                <div class="triangle-up"><em class="showER1"></em></div>
              </li>
              <li class="marginL">
                <a href="javascript:void(0);"><i class="navbar-redLine-icon icon-weixin"></i></a>
                <div class="triangle-up"><em class="showER2"></em></div>
              </li>
              <li>服务热线：400-1919-119</li>
            </ul>
          </div>
        </div>
      <div class="container position">
        <a class="navbar-brand" :href="baseUrl+'/'"></a>
        <div class="col col-input v-outter-table">
          <form method="GET" :action="baseUrl+'/s'" class="v-table-cell changeWidth" style="width:34px;">
            <input type="hidden" value="article" name="m">
            <el-input id="js-input-search" placeholder="搜索" name="k" onfocus="this.setAttribute('placeholder', ''); getFocus(this);" onblur="if (this.value == '') this.setAttribute('placeholder', '搜索');getBlur(this);">
              <el-button id="js-btn-search" slot="append" icon="el-icon-search" native-type="submit" size="large"> 
              </el-button>
            </el-input>
          </form>
        </div>
        <ul class="navbar-list">
          <li class="col" v-for="(item,index) in navlist" :key="index" :class="{'selected':index==3}">
            <a :href="(item.url.startsWith('/'))?baseUrl+item.url:item.url">{{item.name}}
              <!-- <span>{{item.icon}}</span> -->
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <!-- //app.zxzx119.com/ -->
</template>

<script>
  export default {
    name: 'myHeader',
    props: ['selected'],
    data () {
      return {
        scroll: '',
        navlist: [
          {
            url: 'http://www.zxzx119.com/',
            name: '首页'
          },
          {
            url: 'http://www.zxzx119.com/article-encyclop-1.html',
            name: '中消百科'
          },
          {
            url: 'http://www.zxzx119.com/article-cloud-1.html',
            name: '中消云'
            // icon: '新'
          },
          {
            url: 'http://d.zxzx119.com/',
            name: '企业名录'
          },
          {
            url: 'http://www.zxzx119.com/article-detect-1.html',
            name: '产品检测'
            // icon: '新'
          },
          {
            url: 'http://www.zxzx119.com/article-examine-1.html',
            name: '专业审图'
          },
          {
            url: 'http://www.zxzx119.com/article-safeTraining-1.html',
            name: '安全培训'
          },
          {
            url: 'http://www.zxzx119.com/article-publicBidding-1.html',
            name: '招标公示'
          },
          {
            url: 'http://www.zxzx119.com/119',
            name: '紧急呼叫119'
          }
        ]
      }
    },
    methods: {
      fixedScrollX () {
        this.scroll = document.documentElement.scrollLeft || document.body.scrollLeft
      },
      setCookieLanguage (type) {
        var d = new Date()
        d.setHours(d.getHours() + (1)) // 保存一个小时
        document.cookie = 'lang=' + type + '; expires=' + d.toGMTString()
        window.location.reload()
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.fixedScrollX)
    }
  }
</script>

<style lang="scss">
  #myHeader {
    $header-bgcolor: #ffffff;
    
    .header-shortline{height: 12px;margin: 2px 10px 0 10px;width: 1px;background-color: #fff;display: inline-block;}
    & + * {
      /*margin-top: 135px;*/
    }
    .el-input .el-input__inner {
      /*border-radius: 20px 0 0 20px;*/
      border-color: #cc0033;
      height: 30px;
    }
    .el-input .el-input-group__append {
      /*border-radius: 0 20px 20px 0;*/
       border-color: #cc0033;
       width: 35px;
       height: 28px;
       background-color: #fff;
    }
    .el-input .el-button{color: #cc0033!important;}
    li {
      list-style: none;
    }
    .container {
      margin-right: auto;
      margin-left: auto;
    }
    .position{position: relative;height: 110px;}
    /*header redLine 设置*/
    .navbar-redLine{width: 100%;background-color: #cc0033;height: 40px;line-height: 40px;font-size: 14px;}
    .navbar-redLine .container em{font-style: normal;display: block;float: left;color: #fff;}
    .navbar-redLine .container ul{float: right;
        li{float: left;color: #fff;margin-left: 40px;position: relative;
          em{width: 125px;height: 125px;position: absolute;top: 40px;left: -35px;z-index: 10001;}
          .showER1{background-image: url(../images/119.png);left:-23px;}
          .showER2{background-image: url(../images/QRcode.png);left:-20px;}
          a{color: #fff;}
          .triangle-up {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 8px solid white;
            width: 0;
            height: 0;
            margin-top: -23px;
            margin-left: 32px;
            display: none;
          }
          a:hover{
            + .triangle-up{display:block; }
          }
            .navbar-redLine-icon{width: 74px;height: 40px;display: inline-block;margin: 0 5px 0 0;}
            .icon-phone{background: url(../images/navbar-icon.png) 0 0;}
            .icon-weixin{background: url(../images/navbar-icon.png) 80px 0px;}
          }
      .marginL{margin-left: 12px;}
    }
    .navbar {
      /*position: fixed;
      top: 0;*/
      border:3px solid #c41335;
      background-color: $header-bgcolor;
      height: 150px;
      background-size: 100%;
      min-width: 1160px;
      width: 100%;
    }
    .navbar-static-top {
      z-index: 99999;
      border-width: 0 0 3px;
    }
    .navbar-brand {
      float: left;
      margin: -3px 35px 0 0;
      width: 115px;
      height: 105px;
      background-image: url("../images/logo.png");
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .navbar-list {
      overflow: hidden;position: absolute;right: 0;bottom: 3px;
    }
    .col {
      /*//height: px;*/
      float: left;
      line-height: 25px;
      text-align: center;
      font-size: 18px;
      & > a {
        display: block;
        height: 48px;
        line-height: 55px;
        padding: 0 20px;
        color: #000;
        position: relative;
      }
     
      & > a span {
        color: #fff;font-size: 12px;font-style: normal;display: inline;padding:0 3px;
        position: absolute;top: 0px;right: 0px;background-color: #cc0033;border-radius: 20px;line-height: 18px;
      }
      & > a:hover { color: #c41335;}
    }
    .selected > a{border-bottom: 3px solid #c41335;color: #c41335;font-weight: 600;}
    .col-input {
      height: 25px;
      position: absolute;
      right: 0;
      top: 20px;
      .el-input-group {
        display: table; /*//inline-table使元素产生5个额外空白像素*/
        button {
          margin: -13px -15px -13px -30px; /*// 解决IE中icon不居中问题*/
          width: 34px;
        }
      }
      form {
        height: 25px;
      }
      margin: {
        left: 65px;
        right: 8px;
      }
    ;
      width: 200px;
    }
    .navbar-translate {
      color: #fff;
      font-size: 14px;
      line-height: 95px;
      a {
        color: #fff;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
</style>
