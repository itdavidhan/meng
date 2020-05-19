import Vue from 'vue'
import App from './App.vue'
import router from './router'
import _ from 'lodash'
import ViewUI from 'view-design'
import './assets/css/reset.css'
import './assets/css/common.css'
import 'view-design/dist/styles/iview.css'
import lottie from 'vue-lottie'

Vue.component('lottie', lottie)

Vue.use(ViewUI)
Vue.prototype._ = _

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
