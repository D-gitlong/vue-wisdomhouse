import Vue from 'vue'
import Vuex from 'vuex'

import com from './modules/com'
import user from './modules/user'
import details from './modules/details'
import goodsCart from './modules/goodsCart'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    user,
    details,
    goodsCart
  }
})