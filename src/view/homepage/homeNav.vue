<template>
  <nav id="homenav">
    <ul class="container list-inline">
      <li :span="4" v-for="(item,index) in menuList" :key="index">
        <a :href="item.href">{{item.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'homeNav',
    data () {
      return {
        menuList: [
          {
            name: '门户首页',
            href: '//www.zxzx119.com'
          },
          {
            name: '解决方案',
            href: '//www.zxzx119.com/article-solve-1.html'
          },
          {
            name: '教育培训',
            href: '//www.zxzx119.com/article-onlineEdu-1.html'
          },
          {
            name: '第三方审图',
            href: '//e.zxzx119.com/'
          },
          {
            name: '中消百科',
            href: '//www.zxzx119.com/article-encyclop-1.html'
          },
          {
            name: '紧急呼叫119',
            href: '//www.zxzx119.com/119'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  #homenav {
    height: 70px;
    background-color: #111;
    ul li{
      line-height: 70px;
      padding: 0 20px;
      &:first-child{
        margin-left: -100px;
      }
      a {
        height: 100%;
        width: 100%;
        display: inline-block;
        color: $white-max;
      }
    }
  }
</style>
