import api from '@/api/api'
import * as types from '../types'

const state = {
    detail: ''
}

const actions = {

    /**
     * 获取首页列表详情
     */
    getDetail({ commit }, palyload) {
        // if(palyload.router == 'sport') {
        //     api.SportsDetail(palyload.id)
        //         .then(res => {
        //             commit(types.COM_LOADING_STATUS, false)
        //             commit(types.GET_SPORTS_DETAIL, res)
        //         })
        // } else if(palyload.router == 'travel') {
        //     api.TravelsDetail(palyload.id)
        //         .then(res => {
        //             commit(types.COM_LOADING_STATUS, false)
        //             commit(types.GET_TRAVELS_DETAIL, res)
        //         })
        // }   
        // api.indexDetails(palyload.id)
        //   .then(res => {
        //   	console.log(res)
        //       commit(types.GET_INDEX_DETAIL, res)
        //   })

    //     axios.post('/indexDetails').then((response)=>{
				// 	if(response.data.list){
				// 		commit(types.GET_SLIDERS,response.data.list);
				// 	}
				// });
    },
}

const getters = {
    getDetail: state => state.detail
}

const mutations = {
    [types.GET_INDEX_DETAIL](state, res) {
      state.detail = res.data
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}