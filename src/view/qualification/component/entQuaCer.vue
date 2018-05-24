<template>
  <div id='entQuaCer'>
    <el-row>
      <el-col :span='24' id='entQuaCerImg'>
        <p>&emsp;&emsp;{{message.tails.ent_name}}于{{startTime[0]}}年{{startTime[1]}}月{{startTime[2]}}日至{{endTime[0]}}年{{endTime[1]}}月{{endTime[2]}}日经<i>中消在线</i>（www.zxzx119.com)审核，符合消防质量要求，认证合格。</p>
        <span>{{startTime[0]}}年{{startTime[1]}}月{{startTime[2]}}日</span>
      </el-col>
      <el-col :span='24' id='entQuaCertitle'></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'entQuaCer',  // 企业资格证书
    data () {
      return {
        message: {}, // 保存通过数据
        startTime: [],
        endTime: []
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/entCert/info', this.data,
        resj => {
          this.message = resj.data
          this.startTime = resj.data.cert_startdate.split('-')
          this.startTime[2] = this.startTime[2].split(' ')[0]
          this.endTime = resj.data.cert_enddate.split('-')
          this.endTime[2] = this.endTime[2].split(' ')[0]
        },
        err => {
          console.log(err.message)
        })
      }
    }
  }
</script>
<style>
  #entQuaCer {
    width: 100%;
    position: relative;
    margin-top: 20px
  }
  #entQuaCerImg {
    background: url('./entQuaCer.png') no-repeat;
    width: 818px;
    height: 578px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    position: relative;
    left: 50%;
    margin-left: -409px;
  }
  #entQuaCerImg p {
    position: absolute;
    top: 48.8%;
    display: block-inline;
    width: 67%;
    left:16.6%;
    text-align: left;
    font-size: 20px;
    -webkit-font-smoothing: subpixel-antialiased;
  }
  #entQuaCerImg i {
    color: red;
    font-style: normal
  }
  #entQuaCerImg span {
    font-size:13px;
    position:absolute;
    top:76.3%;
    left:74%
  }
</style>
