<template>
  <div id="app">
    <warn v-if="judgeBrowserNotSupport()" :isQQIE="isQQIE"/>
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
  import myHeader from './components/myHeader.vue'
  import Warn from './components/warn.vue'
  import {EventBus} from './util/eventBus'

  export default {
    name: 'app',
    components: {myHeader, Warn},
    data () {
      return {
        isQQIE: false
      }
    },
    mounted () {
      this.judgeLogined()
    },
    methods: {
      judgeLogined () {
        if (!this.$route.meta.userState) {
          this.$api.get('/account/islogin', null,
            resj => {
              if (resj.message === '未登录') {
                EventBus.$emit('setLoginState', 3)
              } else {
                EventBus.$emit('setLoginState', 1)
              }
            }
          )
        }
      },
      judgeBrowserNotSupport () { // 判断是否是IE10以下版本,true为不支持
        const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        const _isQQIE = userAgent.indexOf('QQBrowser') > -1 && userAgent.indexOf('Chrome') === -1 // 判断是否qq浏览器兼容模式
        if (_isQQIE) {
          this.isQQIE = true
          return true
        }
        const is10AndLessIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否是包括10及以下的IE浏览器
        if (is10AndLessIE) {
          const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
          reIE.test(userAgent)
          const IEVersion = parseFloat(RegExp['$1'])
          if (IEVersion < 10) {
            return true
          }
        }
        return false
      }
    }
  }
</script>

<style>
</style>
