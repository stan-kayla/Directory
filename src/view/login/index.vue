<template>
  <div id="login" class="banner-bg" v-if="loaded">
    <div class="container v-outter-table" :style="{height:bgHeight+'px'}">
      <el-row class="v-table-cell">
        <el-col :span="16">
          <img src="./login-text.png" class="img-responsive">
        </el-col>
        <el-col :span="8">
          <login-panel></login-panel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import LoginPanel from './loginPanel.vue'

  export default {
    components: {LoginPanel},
    name: 'login',
    mounted () {
      this.$api.get('/account/islogin', null,
        resj => {
          if (resj.message === '已登录') {
            this.$router.replace('/home/membercenter')
          } else {
            this.loaded = true
          }
        })
    },
    data () {
      return {
        bgHeight: window.innerHeight - 90,
        loaded: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #login {
    padding-top: 20px;
    background-image: url('./login-bg.jpg');
    img {
      height: 350px;
    }
  }
</style>
