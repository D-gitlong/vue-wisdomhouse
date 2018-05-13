import api from '@/api/api'
import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // // 用户登录信息
    // userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
    // // 用户数据信息
    // userData: [],
    token: localStorage.getItem('token'),
    user: ''
}

const actions = {
    /**
     * 用户登录
     */
    setToken({commit}, res){
        localStorage.setItem('token', res)
        localStorage.setItem('loginStatus', true)
        commit(types.SET_TOKEN,res)
        commit(types.SET_LOGIN_STATUS, true)
    },

    /**
     * 退出登录
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        // localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        commit(types.COM_IS_SHOW_MENU, false)
        commit(types.SET_TOKEN, '')
        commit(types.SET_LOGIN_STATUS, false)
        document.getElementById('header-fixed').style.height = 'auto'
        // commit(types.SET_USER_INFO, {})
    },

    /**
     * 获取用户信息
    */ 
    getUserData({ commit }, res) {
        commit(types.GET_USER_DATA, res)
    }
}

const getters = {
    getToken: state => state.token,
    getUserData: state => state.user,
    getLoginStatus: state => state.loginStatus
}

const mutations = {
    
    [types.SET_TOKEN](state, res) {
        state.token = res
    },
    [types.SET_LOGIN_STATUS](state, res) {
        state.loginStatus = res
    },
    [types.GET_USER_DATA](state, res) {
        state.user = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}