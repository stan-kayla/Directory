<template>
  
  <section id="company-introduction">
    <div class="redLine"></div>
    <div class="container">
      <el-row>
      <el-col :span="2" class="introduction-text v-outter-table title-h4">
        <h4>红门e家:</h4>
      </el-col>
      <el-col :span="22">
        <ul class="detail-list">
          <li class="col" v-for="(item,index) in detaillists" :key="index">
            <a v-bind:href="item.url" target="_blank">{{item.name}}
            </a>
          </li>
        </ul>
      </el-col>
    </el-row>
    </div>
    
  </section>
</template>

<script>
  export default {
    name: 'company-introduction',
    data () {
      return {
        scroll: '',
        detaillists: [
          {
            url: 'http://www.bjxfj.gov.cn/',
            name: '北京'
          },
          {
            url: 'http://www.fire.sh.cn/infoplat/platformData/infoplat/pub/xiaofang_2542/shouye_7602/index.html',
            name: '上海'
          },
          {
            url: 'http://www.gdfire.gov.cn/',
            name: '广东'
          },
          {
            url: 'http://www.tjxf.gov.cn/',
            name: '天津'
          },
          {
            url: 'http://www.cqfire.com/main/',
            name: '重庆'
          },
          {
            url: 'http://www.hebxf.gov.cn/',
            name: '河北'
          },
          {
            url: 'http://sx.119.gov.cn/xiaofang/',
            name: '山西'
          },
          {
            url: 'http://lns.ln119.gov.cn/xiaofang/',
            name: '辽宁'
          },
          {
            url: 'http://www.jxfxh119.com/',
            name: '吉林'
          },
          {
            url: 'http://www.hlfire.gov.cn/index.aspx?security_verify_data=313434302c393030',
            name: '黑龙江'
          },
          {
            url: 'http://www.js119.com/',
            name: '江苏'
          },
          {
            url: 'http://www.zjxf119.com/xiaofang',
            name: '浙江'
          },
          {
            url: 'http://www.ah119.cn/',
            name: '安徽'
          },
          {
            url: 'http://www.fjxf.gov.cn/xiaofang/',
            name: '福建'
          },
          {
            url: 'http://www.jx-fire.gov.cn/',
            name: '江西'
          },
          {
            url: 'http://sd.119.gov.cn/xiaofang/',
            name: '山东'
          },
          {
            url: 'http://www.119.ha.cn/',
            name: '河南'
          },
          {
            url: 'http://www.hbfire.com/',
            name: '湖北'
          },
          {
            url: 'http://www.hn119.gov.cn/',
            name: '湖南'
          },
          {
            url: 'http://www.hnsxfxh.com/',
            name: '海南'
          },
          {
            url: 'http://www.sc119.gov.cn/',
            name: '四川'
          },
          {
            url: 'http://www.gzxf119.gov.cn/xiaofang/',
            name: '贵州'
          },
          {
            url: 'http://www.yn119.cn/',
            name: '云南'
          },
          {
            url: 'http://www.sn119.gov.cn/',
            name: '陕西'
          },
          {
            url: 'http://www.gs119.gov.cn/',
            name: '甘肃'
          },
          {
            url: 'http://www.qh119.gov.cn/',
            name: '青海'
          },
          {
            url: 'http://www.nmgxfw.com/',
            name: '内蒙古'
          },
          {
            url: 'http://www.gx119.gov.cn/',
            name: '广西'
          },
          {
            url: 'http://www.xz119.gov.cn/xiaofang',
            name: '西藏'
          },
          {
            url: 'http://www.nx119.org.cn/',
            name: '宁夏'
          },
          {
            url: 'http://www.xjxf.com/',
            name: '新疆'
          },
          {
            url: 'http://www.zxzx119.com/article-reddoor-1.html',
            name: '更多>>'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  html,body{background-color: #fff;}
  #company-introduction {
    margin-bottom: 10px;
    .redLine{width:100%;height:1px;background-color:#cc0033;margin-bottom: 10px;}
    .title-h4{color: #cc0033;font-size: 18px;letter-spacing:2px;line-height: 22px;}
    .detail-list li{list-style: none;margin-left: -10px;line-height: 20px;
        a{font-size: 14px;color: #cc0033;float: left;margin-left: 15px;}
        a:hover{text-decoration: underline;}
    }
  }
</style>
