import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts

import moment from 'moment'

moment.locale('zh-cn')
Vue.prototype.$moment = moment

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css' // 样式

// 创建v-highlight全局指令
Vue.directive('highlight', function(el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

import { elIcons } from '@/api/icons'
import * as enums from '@/api/enums'
import * as enumFormatter from '@/api/enumFormatter'
import * as commonFunction from '@/api/common'
import { pickerOptions } from '@/api/pickerOptions'
import { dateOptions } from '@/api/dateOptions'

Vue.prototype.elIcons = elIcons
Vue.prototype.enums = enums
Vue.prototype.enumFormatter = enumFormatter
Vue.prototype.pickerOptions = pickerOptions
Vue.prototype.dateOptions = dateOptions
Vue.prototype.commonFunction = commonFunction

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
