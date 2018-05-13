import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    isLoading: false,
    showToast: false,
    leftNavStatus: false,
    showSuccess: true,
	showFail: false,
    toastMsg: '操作成功',
    showTimePicker: false,
    alertMsg: '退出登录',
    showAlert: false,
    isShowSearch: false,
    isVal: '',
    isShowBack: true,
    isShowMenu: false,
    isShowNav: true,
    isShowNav2: true,
    comGeolocation: '',
    menusCategories: null
}

const actions = {
    setMenusCategories({commit}, res){
        commit(types.GET_MENUS_CATEGORIES, res)
    },
    isShowSearch({commit}, status){
        commit(types.COM_IS_SHOW_SEARCH, status)
    },
    isShowMenu({commit}, status){
        commit(types.COM_IS_SHOW_MENU, status)
    },
    isShowNav({commit}, status){
        commit(types.COM_IS_SHOW_NAV, status)
    },
    isShowNav2({commit}, status){
        commit(types.COM_IS_SHOW_NAV2, status)
    },
    isShowBack({commit}, status){
        commit(types.COM_IS_SHOW_BACK, status)
    },
    setGeolocation({commit}, status){
        commit(types.COM_GEOLOCATION, status)
    },
    
    setLoadingState({ commit }, status) {
        commit(types.COM_LOADING_STATUS, status)
    },
    setNavState({ commit }, status) {
        commit(types.COM_NAV_STATUS, status)
    },
    showToast({ commit }, status) {
        commit(types.COM_SHOW_TOAST, status)
    },
    showSuccess({ commit }, status) {
        commit(types.COM_SHOW_SUCCESS, status)
    },
    showFail({ commit }, status) {
        commit(types.COM_SHOW_FAIL, status)
    },
    toastMsg({ commit }, str) {
        commit(types.COM_TOAST_MSG, str)
    },
    showAlert({ commit }, status) {
        commit(types.COM_SHOW_ALERT, status)
    },
    alertMsg({ commit }, str) {
        commit(types.COM_ALERT_MSG, str)
    },
    showTimePicker({ commit }, status) {
        commit(types.COM_SHOW_TIME_PICKER, status)
    }

}

const getters = {
    isShowSearch: state => state.isShowSearch,
    isShowBack: state => state.isShowBack,
    isShowMenu: state => state.isShowMenu,
    isShowNav: state => state.isShowNav,
    isShowNav2: state => state.isShowNav2,
    getGeolocation: state => state.comGeolocation,
    isLoading: state => state.isLoading,
    showToast: state => state.showToast,
    showAlert: state => state.showAlert,
    getMenusCategories: state => state.menusCategories
}


const mutations = {
    [types.GET_MENUS_CATEGORIES](state, res){
        state.menusCategories = res
    },
    [types.COM_IS_SHOW_SEARCH](state, status){
        state.isShowSearch = status
    },
    [types.COM_IS_SHOW_BACK](state, status){
        state.isShowBack = status
    },
    [types.COM_IS_SHOW_MENU](state, status){
        state.isShowMenu = status
    },
    [types.COM_IS_SHOW_NAV](state, status){
        state.isShowNav = status
    },
    [types.COM_IS_SHOW_NAV2](state, status){
        state.isShowNav2 = status
    },
    [types.COM_GEOLOCATION](state, status){
        state.comGeolocation = status
    },

    [types.COM_LOADING_STATUS](state, status) {
        state.isLoading = status
    },
    [types.COM_SHOW_TOAST](state, status) {
        state.showToast = status
    },
    [types.COM_SHOW_SUCCESS](state, status) {
        state.showSuccess = status
    },

    [types.COM_SHOW_FAIL](state, status) {
        state.showFail = status
    },

    [types.COM_TOAST_MSG](state, str) {
        state.toastMsg = str
    },

    [types.COM_NAV_STATUS](state, status) {
        state.leftNavStatus = status
    },

    [types.COM_SHOW_TIME_PICKER](state, status) {
        state.showTimePicker = status
    },

    [types.COM_SHOW_ALERT](state, status) {
        state.showAlert = status
    },
    [types.COM_ALERT_MSG](state, str) {
        state.alertMsg = str
    },
}


export default {
    state,
    actions,
    getters,
    mutations
}