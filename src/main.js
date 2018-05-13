// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import './assets/scss/reset.css'
import 'font-awesome/css/font-awesome.css'
import './assets/fonts/iconfont'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error: require('./assets/img/error.png'),
  loading: require('./assets/img/loading.gif')
})

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper)

import { DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)

import axios from 'axios'
Vue.prototype.$http = axios

// import Minimongo from 'minimongo'
// Vue.use(Minimongo)

// let IndexedDb = Minimongo.IndexedDb;

// window.db = new IndexedDb({namespace: 'lifeBulbData'}, function() {
//   db.addCollection('textData')
//   db.addCollection('imgData')
// })
// Vue.use(db)
Vue.config.productionTip = false

/* eslint-disable no-new */

// const FastClick = require('fastclick')
// FastClick.attach(document.body)

document.getElementsByTagName("body")[0].addEventListener("click",function(e) {
  if(e.target && e.target.nodeName == "A" && e.target.hash.substr(0,1) == '#') {
    document.getElementById('header-fixed').style.height = 'auto'
		store.dispatch('isShowMenu',false)
  }
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


