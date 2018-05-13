import axios from 'axios'
import store from '@/vuex/store'
// import qs from 'qs'
import * as _ from '../util/tool'
// import XXTEA from '../util/xxtea'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = window.GLOBAL_CONFIG.API_HOST; //请求地址
// axios.defaults.headers.common['Authorization'] = 'Bearer '+null;
axios.defaults.headers['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers['content-Type'] = 'application/json';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type';
axios.defaults.headers.common['X-ECAPI-UserAgent'] = 'Platform/Wechat';
axios.defaults.headers.common['X-ECAPI-UDID'] = 'null';
axios.defaults.headers.common['X-ECAPI-Ver'] = "1.1.0";
axios.defaults.headers.common['X-ECAPI-Sign'] = 'null';
/*axios.post('/v2/ecapi.config.get').then((res)=>{
      
  if (res.data.error_code == 0) {
    let key = "getprogname()";
    let data = res.data.data;
    console.log(JSON.parse( XXTEA.XXTEA.decryptFromBase64(data, key) ))
    return JSON.parse( XXTEA.XXTEA.decryptFromBase64(data, key) );
  }
});*/

// 请求添加头部信息
axios.interceptors.request.use((config) => {
    // config.headers = {
    //   "Authorization": "Bearer " + localStorage.getItem('auth_token'),
    //   "Accept": "application/json, text/plain, */*",
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "x-requested-with,content-type"
    // }
    return config;
},(error) =>{
     //_.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{

    // if(!res.data.success){
    //   //console.log(res)
    //     //_.toast(res.data.msg);
    //     return Promise.reject(res);
    // }
    return res;
}, (error) => {
    //_.toast("网络异常", 'fail');
    console.log("网络异常");
    return Promise.reject(error);
});

export function Post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function Fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url,params)
      .then((response)=>{
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
   */
  Login(params) {
    return Post('/v2/ecapi.auth.signin', params)
  },
  /**
   * 把token存到http的header
   */
  setHeader(params){
    axios.defaults.headers.common['X-ECAPI-Authorization'] = params;
  },
  /**
   * 用户注册
   */
  Signup(params) {
    return Post('/v2/ecapi.auth.default.signup', params)
  },
  /**
  * 获取用户信息
  */
  UserInfo(params) {
    return Post('/v2/ecapi.user.profile.get', params)
  },
  /**
  * 首页banner图
  */
  Banner(params) {
    return Post('/v2/ecapi.banner.list', params)
  },
  /**
  * 首页产品列表
  */
  ProductIndex(params) {
    return Post('/v2/ecapi.home.product.list', params)
  },
   /**
  * 首页产品列表type
  */
  ProductIndexType(params) {
    return Post('/v2/ecapi.type.product.list', params)
  },
  /**
  * 购物车列表
  */
  Cart(params) {
    return Post('/v2/ecapi.cart.get', params)
  },
  /**
  * 添加到购物车
  */
  AddCart(params) {
    return Post('/v2/ecapi.cart.add', params)
  },
  /**
  * 购物车-编辑商品数量
  */
  UpdateCar(params) {
    return Post('/v2/ecapi.cart.update', params)
  },
  /**
  * 购物车-删除商品
  */
  Delete(params) {
    return Post('/v2/ecapi.cart.delete', params)
  },
  /**
  * 产品列表
  */
  ProductList(params) {
    return Post('/v2/ecapi.product.list', params)
  },
  /**
  * 产品详情
  */
  ProductDetails(params) {
    return Post('/v2/ecapi.product.get', params)
  },
  /**
  * 产品评论列表
  */
  ProductComment(params) {
    return Post('/v2/ecapi.review.product.list', params)
  },
  /**
  * 菜单分类
  */
  Category(params) {
    return Post('/v2/ecapi.category.list', params)
  },
  /**
  * 收货地址管理
  */
  Consignee(params) {
    return Post('/v2/ecapi.consignee.list', params)
  },
  /**
  * 地址列表
  */
  Region(params) {
    return Post('/v2/ecapi.region.list', params)
  },
  /**
  * 添加收货地址
  */
  ConsigneeAdd(params) {
    return Post('/v2/ecapi.consignee.add', params)
  },
  /**
  * 更新收货地址
  */
  ConsigneeUpdate(params) {
    return Post('/v2/ecapi.consignee.update', params)
  },
  /**
  * 更新收货地址
  */
  ConsigneeSetDefault(params) {
    return Post('/v2/ecapi.consignee.setDefault', params)
  },
  /**
  * 删除收货地址
  */
  ConsigneeDelete(params) {
    return Post('/v2/ecapi.consignee.delete', params)
  },
  /**
  * 提交订单（立即购买）
  */
  Purchase(params) {
    return Post('/v2/ecapi.product.purchase', params)
  },
  /**
  * 提交订单（从购物车）
  */
  CartPurchase(params) {
    return Post('/v2/ecapi.cart.checkout', params)
  },
  /**
  * 订单详情
  */
  OrderDetails(params) {
    return Post('/v2/ecapi.order.get', params)
  },
  /**
  * 我的订单
  */
  MyOrder(params) {
    return Post('/v2/ecapi.order.list', params)
  },
  /**
  * 确认收货
  */
  Confirm(params) {
    return Post('/v2/ecapi.order.confirm', params)
  },
  /**
  * 删除订单
  */
  DeleteOrder(params) {
    return Post('/v2/ecapi.order.del', params)
  },
  /**
  * 获取评价订单的信息
  */
  GetCommentOrder(params) {
    return Post('/v2/ecapi.order.get', params)
  },
  /**
  * 评价产品订单
  */
  ReviewtOrder(params) {
    return Post('/v2/ecapi.order.review', params)
  },
  /**
  * 评价产品订单
  */
  ReviewtProduct(params) {
    return Post('/v2/ecapi.product.comment.create', params)
  },
  /**
  * 取消订单
  */
  CancelOrder(params) {
    return Post('/v2/ecapi.order.cancel', params)
  }
}