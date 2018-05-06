import Vue from 'vue'
import App from './App'
import router from './router'
import './scss/main.scss'
import ui from './components/index'
import storage from './util/storage'
import http from '@/util/http'

Vue.config.productionTip = false

Vue.use(ui)

Vue.prototype.$storage = storage
Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
