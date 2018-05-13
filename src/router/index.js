import Vue from 'vue'
import Router from 'vue-router'
import Nav from '@/views/nav/nav.vue'
import Header from '@/views/header/header.vue'
import Search from '@/views/search/search.vue'
import NotFoundComponent from '@/components/notFoundComponent.vue'
import api from '@/api/api'
import store from '@/vuex/store'
import * as types from '@/vuex/types'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        requireAuth: true
      },
      components: {
        routerOther: resolve => require(['@/views/login/login'], resolve)
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        default: resolve => require(['@/views/home/home'], resolve),
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/product',
      name: 'product',
      components: {
        default: resolve => require(['@/views/product/product'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      },
      meta: { 
        keepAlive: true
      }
    },
    {
      path: '/product2',
      name: 'product2',
      components: {
        default: resolve => require(['@/views/product/product2'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/details/:id',
      name: 'details',
      components: {
        default: resolve => require(['@/views/details/details'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/details/:id/descript',
      name: 'descript',
      components: {
        default: resolve => require(['@/views/details/descript'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/details/:id/about',
      name: 'about',
      components: {
        default: resolve => require(['@/views/details/about'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/comment/:id/customerImg',
      name: 'customerImg',
      components: {
        default: resolve => require(['@/views/comment/customerImg'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/comment/:id/reviews',
      name: 'reviews',
      components: {
        default: resolve => require(['@/views/comment/reviews'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/comment/:id/reviewMention',
      name: 'reviewMention',
      components: {
        default: resolve => require(['@/views/comment/reviewMention'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/comment/:id/allReviews',
      name: 'allReviews',
      components: {
        default: resolve => require(['@/views/comment/allReviews'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/writeReview',
      name: 'writeReview',
      components: {
        default: resolve => require(['@/views/comment/writeReview'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/writeReview2',
      name: 'writeReview2',
      components: {
        default: resolve => require(['@/views/comment/writeReview2'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      components: {
        default: resolve => require(['@/views/order/myOrder'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/viewOrder/:id',
      name: 'viewOrder',
      components: {
        default: resolve => require(['@/views/order/viewOrder'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      components: {
        default: resolve => require(['@/views/order/orderDetails'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: resolve => require(['@/views/cart/cart'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/shipAddress',
      name: 'shipAddress',
      components: {
        routerOther: resolve => require(['@/views/address/shipAddress'], resolve)
      }
    },
    {
      path: '/selectAddress',
      name: 'selectAddress',
      components: {
        routerOther: resolve => require(['@/views/address/selectAddress'], resolve)
      }
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      components: {
        routerOther: resolve => require(['@/views/address/myAddress'], resolve)
      }
    },
    {
      path: '/addPaymethod',
      name: 'addPaymethod',
      components: {
        routerOther: resolve => require(['@/views/pay/addPaymethod'], resolve)
      }
    },
    {
      path: '/selectPaymethod',
      name: 'selectPaymethod',
      components: {
        routerOther: resolve => require(['@/views/pay/selectPaymethod'], resolve)
      }
    },
    {
      path: '/selectOption',
      name: 'selectOption',
      components: {
        routerOther: resolve => require(['@/views/pay/selectOption'], resolve)
      }
    },
    {
      path: '/week',
      name: 'week',
      components: {
        routerOther: resolve => require(['@/views/address/week'], resolve)
      }
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      components: {
        default: resolve => require(['@/views/settings/personalCenter'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '/editPicture',
      name: 'editPicture',
      components: {
        default: resolve => require(['@/views/settings/editPicture'], resolve),
        routerNav: Nav,
        routerHeader: Header,
        routerSearch: Search
      }
    },
    {
      path: '*',
      component: NotFoundComponent 
    }
  ]
})

this.a.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.token) {
      to.path === '/login' ? next({ path: '/', query: { redirect: to.fullPath }}) : next()
    }
    else {
      to.path !== '/login' ? next({ path: '/login', query: { redirect: to.fullPath }}) : next()
    }
  }
  else {
    next();
  }
})

this.a.afterEach((to, from) => {
  // if (to.name != 'product' && from.name == 'details') {
  //   document.documentElement.scrollTop = 0
  // }
  store.commit('COM_LOADING_STATUS', {isLoading: false})
  // 跳转页面时清楚搜索框的值
  if (store.state.isVal) {
    document.querySelector('.weui-icon-clear').click()
    document.querySelector('.weui-search-bar__input').blur()
  }
})

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  api.setHeader(window.localStorage.getItem('token'))
  store.commit(types.SET_TOKEN, window.localStorage.getItem('token'))
}