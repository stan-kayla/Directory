<template>
  <div id="homepage">
    <!-- <home-nav></home-nav> -->
    <div class="container">
      <a class="banner-btn" href="http://d.zxzx119.com/register" target="_blank"></a>
      <img src="./images/banner-homepage.png" class="img-responsive top10">
      <el-row>
        <el-col :span="24">
          <img src="./images/bg-title.png" class="img-responsive" style="margin: 20px 0"/>
        </el-col>
      </el-row>
      <el-row class="company-list">
        <div v-for="item in moduleList">
          <el-col :span="4" class="icon" style="background-color: #fff;">
            <img :src="item.icon">
            <div class="mask">
            </div>
            <div class="photo-text" v-html="item.name"><p>{{item.name}}</p></div>
          </el-col>
        </div>
      </el-row>
    </div>
    <div class="bg-content-new"></div>
    <div class="container">
      <el-row>
        <el-col :span="24">
          <img src="./images/bg-title-5.png" class="img-responsive" style="margin: 20px 0"/>
        </el-col>
        <el-col :span="24" class="info-title">入驻中消企业名录的房企可以自由选择有资质的消防相关企业， 消防相关企业入驻后变相被纳入到了百强房企的品牌库。</el-col>
      </el-row>
    </div>
    <div class="bg-content">
      <div class="container">
        <p class="p1"><span class="redtext">中消在线</span>企业名录平台，汇总百强房企招投标信息</p>
        <p class="p2">搭建百强房企与消防企业的沟通桥梁，为百强房企提供合作黏连</p>
        <p class="p3">通过<span class="redtext">中消在线</span>平台增加品牌传播度及影响力</p>
        <p class="p4">全国消防装备采购信息公告，入驻平台即可知晓</p>
        <p class="p5">满足平台上下游会员单位供应链全流程快速融资需求</p>
      </div>
    </div>
    <div class="container">
      <el-row class="company-list-all" style="margin-top: 45px;">
        <el-row class="tab-tit">
          <a href="javascript:;" class="header" @click="curId=0" :class="{'cur':curId===0}">地产企业</a>
          <a href="javascript:;" class="header" @click="curId=1" :class="{'cur':curId===1}">消防企业</a>
          <a href="javascript:;" class="header" @click="curId=2" :class="{'cur':curId===2}">其他企业</a>
        </el-row>
        <el-row class="tab-con">
          <el-col v-show="curId===0">
            <el-row class="rowLine-big">
              <el-col :span="3" v-for="item in landImgBig" :key="item" class="bigImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="bgImg"></div>
                <!-- <img :src="item.ad_file" class="img-responsive"> -->
                <span>{{item.ad_name}}</span>
              </el-col>
            </el-row>
            <el-row class="rowLine-small">
              <el-col :span="2" v-for="item in landImgSmall" :key="item" class="smallImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="divImg"></div>
                <span>{{item.ad_name}}</span>
              </el-col>
              <el-col :span="2">
                <router-link to="/register">
                  <el-button type="primary" class="changeP">+</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-show="curId===1">
            <el-row class="rowLine-big">
              <el-col :span="3" v-for="item in fireImgBig" :key="item" class="bigImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="bgImg"></div>
                <!-- <img :src="item.ad_file" class="img-responsive"> -->
                <span>{{item.ad_name}}</span>
              </el-col>
            </el-row>
            <el-row class="rowLine-small">
              <el-col :span="2" v-for="item in fireImgSmall" :key="item" class="smallImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="divImg"></div>
                <span>{{maxSlice(item.ad_name)}}</span>
              </el-col>
              <el-col :span="2">
                <router-link to="/register">
                  <el-button type="primary" class="changeP">+</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-show="curId===2">
            <el-row class="rowLine-big">
              <el-col :span="3" v-for="item in otherImgBig" :key="item" class="bigImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="bgImg"></div>
                <span>{{item.ad_name}}</span>
              </el-col>
            </el-row>
            <el-row class="rowLine-small">
              <el-col :span="2" v-for="item in otherImgSmall" :key="item" class="smallImg">
                <div v-bind:style="{ 'background-image': 'url(' + item.ad_file + ')'}" class="divImg"></div>
                <span>{{maxSlice(item.ad_name)}}</span>
              </el-col>
              <el-col :span="2">
                <router-link to="/register">
                  <el-button type="primary" class="changeP">+</el-button>
                </router-link>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </div>

    <company-introduction></company-introduction>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '../../components/myFooter'
  import CompanyIntroduction from './company-introduction'

  export default {
    components: {
      MyFooter,
      CompanyIntroduction
    },
    data: function () {
      return {
        maxLength: 12,
        landImgBig: '',
        landImgSmall: '',
        fireImgBig: '',
        fireImgSmall: '',
        otherImgBig: '',
        otherImgSmall: '',
        moduleList: [
          {
            name: '百强房产企业品牌库',
            icon: require('./images/list-img1.png')
          },
          {
            name: '万家消防专项<br>产品供应商',
            icon: require('./images/list-img2.png')
          },
          {
            name: '全国各省消防总队<br>战略合作',
            icon: require('./images/list-img3.png')
          },
          {
            name: '国际消防产品库国际产品中消嫁接',
            icon: require('./images/list-img4.png')
          },
          {
            name: '消防产业链各端口<br>名录建立',
            icon: require('./images/list-img5.png')
          },
          {
            name: '行业内标杆维保单位',
            icon: require('./images/list-img6.png')
          }
        ],
        activeName2: 'first',
        curId: 0
      }
    },
    name: 'homepage',
    mounted () {
      this.get_data()
    },
    methods: {
      maxSlice: function (item) {
        return item.length > this.maxLength ? item.slice(0, this.maxLength) + '...' : item
      },
      get_data: function () {
        this.$api.get('/advertisement/pindex', {page: 1, code: 1, pagesize: 20}, (r) => {
          this.landImgBig = r.data.rows.slice(0, 6)
          this.landImgSmall = r.data.rows.slice(7, 15)
        })
        this.$api.get('/advertisement/pindex', {page: 1, code: 2, pagesize: 20}, (r) => {
          this.fireImgBig = r.data.rows.slice(0, 6)
          this.fireImgSmall = r.data.rows.slice(7, 15)
        })
        this.$api.get('/advertisement/pindex', {page: 1, code: 1, pagesize: 25}, (r) => {
          this.otherImgBig = r.data.rows.slice(16, 22)
        })
        this.$api.get('/advertisement/pindex', {page: 1, code: 2, pagesize: 25}, (r) => {
          this.otherImgSmall = r.data.rows.slice(16, 24)
        })
      }
    }
  }
</script>



<style lang="scss">
  #homepage {
    .redtext{
      color: #C41335
    }
    .p1{
      position: absolute;margin-top: 428px;margin-left: -123px;font-weight: 600;
    }
    .p2{
      position: absolute;margin-left: -65px;margin-top: 222px;width: 380px;font-weight: 600;
    }
    .p3{
      position: absolute;margin-left: 320px;margin-top: 78px;font-weight: 600;
    }
    .p4{
      position: absolute;margin-left: 886px;margin-top: 168px;width: 400px;font-weight: 600;
    }
    .p5{
    position: absolute;margin-left: 917px;margin-top: 434px;width: 400px;font-weight: 600;
  }
  background-color: $white-max;
  .top10{margin-top: 10px;border-radius: 3px;}
  .container{position:relative;}
  .bg-content{height: 604px;background: url(./images/bg-content-5.png) no-repeat center;}
  .bg-content-new{margin: 70px auto 0 auto;height: 655px;background: url(./images/bg-content-new.png) no-repeat center;}

  .banner-btn{
    position: absolute;background-image: url(./images/btn.png);width: 93px;height: 30px;display: inline-block;
    margin-top: 232px;
    margin-left: 830px;
    cursor: pointer;
  }
  .banner-bg {
    background-image: url('./images/bg-content.png');
    position: relative;
    padding: 100px 0;
  }
  .info-title{color:#161616;text-align: center;}
  .company-list{background: url(./images/bg-content.png) 0 0;padding: 35px 0;
    .icon{margin: 0 95px;height: 260px;margin-bottom: 10px;overflow: hidden;position: relative;
    img{display: block;margin: 50px auto 40px auto;}
    .photo-text{text-align: center;color: #000;padding: 0 20px;margin-top: 25px;}
    }
  }
  .company-list-all{
    background: url(./images/bg-content-6.png) 0 0;height: 550px;margin-bottom: 90px;
    .tab-tit a{width: 30%;text-align: center;background-color: #fff;color: #c41335;display: inline-block;line-height: 38px;cursor: pointer;margin: 35px 13px 45px 0;}
    & a:first-child{margin-left:45px;}
    .tab-tit .cur{background-color:#7f041f;color: #fff;outline:none;}
    .tab-tit a:active{outline:none;}
    .rowLine-big{margin-left: 45px;
      .bigImg{margin-right: 12px;width: 170px;height: 170px;overflow: hidden;background-color: #fff;position: relative;
        span{padding: 0 15px;color: #000;line-height: 15px;font-size: 14px;display: inline-block;text-align: center;position: absolute;top:130px;width: 100%;}
        .bgImg{width: 140px;height: 95px;background-position: center;background-repeat: no-repeat;background-size: 70%;position: absolute;left: 50%;
          margin-left: -70px;top: 20px;}
      }
    }
    .rowLine-small{margin-left: 45px;position: relative;margin-top: 45px;
      .smallImg{margin-right: 12px;background-color: #fff;width: 108px;height: 108px;position: relative;
          span{color: #000;line-height: 12px;font-size: 10px;display: inline-block;text-align: center;position: absolute;top: 75px;width: 100%;padding: 0 10px;}
      }
      div{
        img{width: 100%;height: 100%;overflow: hidden;}
        .changeP{position: absolute;background-image:url(./images/qiye-small-imgAdd.png);width: 108px;height: 108px;top: 0px;left: 965px;}
      }
      .divImg{width: 96px;height: 80px;background-position: center;background-repeat: no-repeat;background-size: 70%;}
    }

  }
}
</style>
