<template>
	<div class="header">
		<x-header>
		  <div class="header-left" slot="overwrite-left">
		  	<span class="h-icon" style="width: 30px; height: 30px; top: -10px;" @click="back" v-show="isShowBack">
		  		<x-icon type="ios-arrow-left" size="30"></x-icon>
		  	</span>
		  	
		  	<span class="h-icon" style="width: 35px; height: 35px;" @click="onClickMore">
		  		<x-icon type="navicon" size="35"></x-icon>
		  	</span>
		  	
		  	<router-link to="/" class="header-logo">
		  		<img src="../../assets/img/logo.png" />
		  	</router-link>
		  </div>
		  <div class="header-right clearfix" slot="right">
		  	<a href="javascript:void(0);" @click="showSearch" v-show="!isShowSearch"><i class="fa fa-search"></i></a>
		  	<router-link to="">
		  		<i class="fa fa-bell-o"></i>
		  	</router-link>
        <!-- <router-link to="/cart" class="shopping-cart-a" :class="[isOn ? 'on' : '']"> -->
		  	<router-link to="/cart" class="shopping-cart-a" :class="[isOn ? 'on' : '']">
		  		<div class="shopping-cart">
		  			<i class="cart-icon" :class="[goodsNumber>0 ? 'on' : '']"></i>
		  			<span v-if="goodsNumber>0">{{goodsNumber>=99?'99+':goodsNumber}}</span>
		  		</div>
		  	</router-link>
		  </div>
		</x-header>

		<!-- <transition name="fadeD"> -->
		  <div class="left-menus" id="left-menus" v-show="isShowMenu">
				<transition name="fade">
			    <div class="layer" @click="hideMenus" v-show="isShowMenu"></div>
			  </transition>
				<transition name="fade2">
			    <div class="menus-personal" v-show="isShowMenu">
			    	<div class="close" @click="hideMenus">
			      	<icon icon-class="guanbi4" icon-style="iconx"></icon>
			      </div>
			      <a v-if="getLoginStatus" href="#/personalCenter" class="personal-btn clearfix">
			        <i class="fa fa-2x fa-user-circle-o"></i>HELLO, {{getUserData.username}}
			      </a>
			      <a v-if="!getLoginStatus" href="#/login" class="personal-btn clearfix">
			        HELLO. SIGN IN
			      </a>
			    </div>
			  </transition>  
			    <div class="menus-nav-wrap">
				    <div class="menus-nav">
				      <swiper :options="swiperOption" ref="mySwiper">  
						    <swiper-slide>
						    	<transition name="slide">
							      <nav class="nav" v-show="isShowMenu">
						          <nav-list></nav-list>
							      </nav>
						      	</transition>
						    </swiper-slide> 
								<!-- <swiper-slide>
									<transition name="slideR">
										<div v-show="isShowMenu">
											<h3>New from the community</h3>
							    		<img src="static/images/slide.jpg" />
							    	</div>
							    </transition>
						    </swiper-slide>
						    <swiper-slide>
						    	<div v-show="isShowMenu">
							    	<img src="static/images/slide.jpg" />
							    </div>
						    </swiper-slide> -->
				      </swiper>
				    </div>
			    </div>
		  </div>
		
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import API from '@/api/api'
import { Flexbox, FlexboxItem, Radio, Group, Cell, Badge, Drawer, XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
import { swiper, swiperSlide } from 'vue-awesome-swiper'  
require('swiper/dist/css/swiper.css') 
import icon from '@/components/icon.vue'
import navList from '@/views/nav/nav.vue'

export default {
  name: 'headers',
	directives: {
    TransferDom
  },
  components: {
  	navList,
  	swiper,  
    swiperSlide, 
  	Flexbox,
  	FlexboxItem, 
  	Radio,
  	Group,
  	Cell,
  	Badge,
  	Drawer,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    icon
  },
  data () {
    return {
      isShow: false,
      isBackShow: false,
      isOn: false,
      swiperOption: {  
	      slidesPerView: 'auto',
        paginationClickable: true
      }
    }
  },
  methods: {
  	back () {
  		this.$router.go(-1)
  	},
  	onClickMore () {
		  document.getElementById('header-fixed').style.height = document.documentElement.clientHeight+"px"
      this.$store.dispatch('isShowMenu',true)
      this.$store.dispatch('isShowNav',true)
      this.$store.dispatch('isShowNav2',true)
    },
    hideMenus () {
    	this.$store.dispatch('isShowMenu',false)
    	this.$store.dispatch('isShowNav',true)
    	this.$store.dispatch('isShowNav2',true)
    	document.getElementById('header-fixed').style.height = 'auto'
    	document.querySelector('.nav').style.overflowY = 'scroll'
    },
    showSearch () {
    	if(!this.$store.getters.isShowSearch){
    		this.$store.dispatch('isShowSearch',true)
    	}
      // document.querySelector('.weui-icon-clear').click()
      //document.querySelector('.proceedBtn').style.top = 92 + 'px'
    	this.$nextTick(function() {
    		let selectNum = document.querySelector('.select-num')
    		let allH = selectNum ? selectNum.offsetHeight : ''
    		let headerH = document.querySelector('.top-header').offsetHeight
    		document.querySelector('.main').style.top=headerH+'px'
    		selectNum ? selectNum.style.marginTop=-(allH/2-46)+'px' : ''
    	})
    }
  },
  computed:{
  	swiper() {
      return this.$refs.mySwiper.swiper; 
    },
    ...mapGetters(['getUserData', 'getLoginStatus', 'isShowSearch', 'isShowBack', 'isShowMenu', 'goodsNumber'])
  },
  watch: {
    isShowMenu(newVal, oldVal) {
      if (newVal == true) {
        document.querySelector('.main').style.overflowY = "hidden";
      } else {
        document.querySelector('.main').style.overflowY = "scroll";
      }
    },
    goodsNumber(newVal, oldVal){
      if (newVal != oldVal) {
        this.isOn = true
        setTimeout(()=>{
          this.isOn = false
        },2000)
      }
      
    }
  },
  mounted() {
  	API.UserInfo()
      .then(res => {
        if(res.data.error_code == 0) {
        	this.$store.dispatch('getUserData',res.data.user)
        }
      })
  }
}

</script>

<style scoped lang="scss">
@import "../../assets/scss/function";
.header-left{
	position: relative; min-width: 155px;
	.h-icon{
		display: inline-block; position:relative;top:-8px;left:-5px;
	}
	.header-logo{
		float: none; position: relative; top: -22px; left: -8px; height: 46px; display: inline-block; background-color: $headerBg;
	}
}
.shopping-cart-a{
	display: block; height: 26px; width: 30px; position: relative; transform: scale(1); transition: all .1s ease-in-out;
	span{
		font-size: .8rem; color: #fff; display: inline-block; width: 30px; text-align: center; position: absolute; top: -8px; left: 50%; transform: translate(-50%, 0);
	}
	&.on{
		transform: scale(1.3); 
		span{
			animation: toBottom .2s .4s;
		}
	}
}
.shopping-cart{
	width: 35px; position: relative;
	.cart-icon{
		display: inline-block; position: absolute; left: 0; top: 0; width: 30px; height: 26px; background: url(../../assets/img/bg/bg3.png) 0 -26px no-repeat; background-size: cover;
		&.on{
			background: url(../../assets/img/bg/bg3.png) 0 2px no-repeat; background-size: cover;
		}
	}
	

}
.vux-header {
	background: $headerBg;
	.header-right{
		a {margin-left: 15px;}
		.fa{
			font-size: 1.6em; color: $headerIconBg;
		}
	}
}
.left-menus{
  position: absolute; left: 0; top: 0; width: 100%; height: 100%; color: #333; overflow: hidden;
  .layer{
    position: absolute; width: 100%; height: 100%; background: $headerBg; opacity: .9; z-index: 10;
  }
  .menus-personal{
    position: relative; z-index: 15; padding: 12px; vertical-align: middle;
    .personal-btn{
      color: $headerIconBg; display: block; line-height: 30px; font-size: .8rem;
      .fa{
      	margin-top: 2px; float: left; margin-right: 10px;
      }
    }
    .close{
      float: right; padding-top: 5px;
      .comIcon{ fill: $headerIconBg; }
    }
    .fa-user-circle{
      margin-right: 10px;
    }
  }
  .img-list{
  	position: relative; left: 0; top: 0; z-index: 15;
  	
  	a{
  		display: block;
  		width: 300px;
  	}
  	img{
  		height: 400px;
  	}
  }
  .menus-nav-wrap{
  	height: 100%; overflow: hidden; position: relative; z-index: 15; overflow-x: scroll
  }
  .menus-nav{
    position: relative; z-index: 15; height:100%; 
    nav{
      height: 100%; overflow-y: scroll; position: relative; z-index: 15; background: #fff; padding-bottom: 100px; -webkit-overflow-scrolling : touch;
    }
  }
  .swiper-container{
  	height: 100%;
  }
  .swiper-slide{
  	text-align: center;
  	img{
  		width: 85%!important; margin-top: 60px;
  	}
  	h3{
  		color: $headerIconBg; padding: 18px 0; font-size: 16px; text-align: left; margin-left: 7%; position: absolute; left: 0; top: 0;
  	}
  }
  .swiper-slide:first-child{
  	text-align: left; width: 80%!important; margin: 0 -3% 0 4%; background: #fff;
  	img{
  		width: auto;
  	}
  }
}
.fade-enter-active, .fade2-enter-active{
	animation: fadeIn .3s;
}
.fade-leave-active, .fade2-leave-active{
	animation: fadeOut .3s;
}
.slide-enter-active{
	animation: slideInLeft .5s;
}
.slide-leave-active{
	animation: slideOutLeft .5s;
}
.slideR-enter-active{
	animation: slideInRight .4s;
}
.slideR-leave-active{
	animation: slideOutRight .4s;
}
.fadeD-enter-active{
	animation: fadeInDownBig .8s;
}
.fadeD-leave-active{
	animation: fadeOutDownBig .8s;
}
@keyframes toBottom
{
  0% {
    transform: translate(-50%,0);
  }
  50% {
    transform: translate(-50%,-70%);
  }
  100% {
   transform: translate(-50%,0);
  }
}
</style>
<style>
@import '../../assets/scss/animate.css';
.left-menus .menus-nav .weui-cells{
	margin-top: 0; font-size: 14px;
}
.menus-nav .weui-cells:last-child:after{
	border-bottom: 0;
}
.h-search .weui-search-bar__box .weui-search-bar__input{
	border-radius: 0;
}
</style>