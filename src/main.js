import Vue from 'vue'
import App from './App.vue'
import './assets/js/rem.js'
import './assets/css/reset.styl'
import './common/common.css'
import router from './router'
import { url } from "./api/url"
// import VConsole from 'vconsole'
Vue.prototype.URL = url
import Vant from 'vant'
import { Lazyload } from 'vant'
// new VConsole()

Vue.use(Lazyload)
// import 'vant/lib/index.css';
// import { Progress } from 'vant'
// import Button from 'vant/lib/button'
// import 'vant/lib/button/style'
// Vue.use(Progress)
// Vue.use(Button)
// import Vant from 'vant'
// import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
