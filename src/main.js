// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'normalize.css'
import './style/index.scss'
import '../static/css/font-awesome.min.css'
import api from './util/api' // 引用API文件
import { EventBus } from './util/eventBus'

Vue.prototype.$api = api // 绑定API方法到全局
Vue.prototype.baseUrl = api.root
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.userState !== undefined && record.meta.userState !== 3)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    api.get('/account/islogin', null,
      resj => {
        if (resj.message === '未登录') {
          ElementUI.MessageBox.alert(resj.message, '温馨提示', {
            confirmButtonText: '确定',
            callback: () => {
              next({
                path: '/login',
                query: {redirect: to.fullPath}
              })
              EventBus.$emit('setLoginState', 3)
            }
          })
        } else {
          next()
          EventBus.$emit('setLoginState', to.meta.userState)
        }
      })
  } else if (to.matched.some(record => record.meta.userState === undefined)) {
    next()
  } else {
    next() // 确保一定要调用 next()
    EventBus.$emit('setLoginState', to.meta.userState)
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
