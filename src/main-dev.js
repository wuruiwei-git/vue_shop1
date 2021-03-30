import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 配置树形table表格
import TreeTable from 'vue-table-with-tree-grid'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css'

// 引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式
// 导入axios
import axios from 'axios' // for bubble theme

// 配置请求根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 请求拦截器
// 请求在到达 服务器之前，先会调用use中的这个回调函数来添加请求头信息
// 在request拦截器中，展示进度条NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 在 response拦截其中，隐藏进度条NProgress.done();
axios.interceptors.response.use(confirm => {
  NProgress.done()
  return confirm
})
// 挂在到vue的原型对象上，这样每一个请求都可以使用this进行发起请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 将富文本编辑器注为全局可用的组件
Vue.use(VueQuillEditor /* { default global options } */)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
