import api from '@/api/api'
import * as types from '../types'

const state = {
  cartCount : 0
}

const actions = {
  /**
   * 购物车数量
   */
  getCartCount({commit}, res){
    commit(types.GET_CART_COUNT,res)
  }
}

const getters = {
	goodsNumber: state => state.cartCount
}

const mutations = {
  [types.GET_CART_COUNT](state, res) {
    state.cartCount = res
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}