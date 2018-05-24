<template>
  <el-alert
    :title="title"
    :description="description"
    type="warning"
    close-text="知道了，仍要继续浏览">
  </el-alert>
</template>
<script>
  export default {
    name: 'Warn',
    props: {
      isQQIE: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      if (this.isQQIE) {
        this.title = '提示: 您在使用QQ浏览器的IE兼容模式，可能导致浏览异常。'
        this.description = '解决方法（任选其一）：改用QQ浏览器极速模式；安装Chrome(谷歌浏览器）或Firefox（火狐）浏览器来使用本系统。'
      }
    },
    data () {
      return {
        title: '提示: 您在使用低版本的IE浏览器，使用不兼容的浏览器可能导致浏览异常。',
        description: '解决方法（任选其一）：升级至IE10或更高版本；安装Chrome(谷歌浏览器）或Firefox（火狐）浏览器来使用本系统。'
      }
    }
  }
</script>
