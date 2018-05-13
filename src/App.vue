<template>
  <div id="app">

    <div class="top-header" id="header-fixed">
      <router-view name="routerHeader"></router-view>
      <router-view name="routerSearch" v-show="isShowSearch"></router-view>
    </div>
    <transition name="fade">
      <keep-alive include="product">
        <router-view class="main" id="main"></router-view>
      </keep-alive>
      
    </transition>
    <transition name="fade">
      <router-view name="routerOther"></router-view>
    </transition>
    <!-- <transition name="fade" v-if="!$route.meta.keepAlive">
      <router-view class="main"></router-view> v-if="$route.meta.keepAlive"
      <router-view name="routerOther"></router-view>
    </transition> -->
		
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import api from '@/api/api'

export default {
  name: 'app',
  mounted (){
    window.addEventListener('scroll', this.handleScroll,true)
    this.inputBug()
    api.Cart()
      .then((response)=>{
        if (response.data.error_code == 0) {
          this.orderlist = response.data.goods_groups
          this.orderlist.forEach((el)=>{
            this.cartAmount = el.total_amount
            this.$store.dispatch('getCartCount', el.total_amount)
          })
        }
      })
  },
  computed: {
    ...mapGetters(['isShowSearch'])
  },
  methods: {
    handleScroll () {
      this.$store.state.isVal ? this.$store.dispatch('isShowSearch',true) : this.$store.dispatch('isShowSearch',false)
      let main = document.querySelector('.main') ? document.querySelector('.main') : ''
      if (main) {
        this.$store.getters.isShowSearch ? main.style.top=94+'px' : main.style.top=46+'px'
      }
    },
    inputBug() {
      let headerFixed = document.querySelector('#header-fixed')
      let commonHeader = document.querySelector('.common-header')
      document.querySelector('body').addEventListener('focus', (ev) => {
        if (ev.target.nodeName === 'INPUT' && ev.target.type !== 'checkbox') {
          setTimeout(function() {
            let top = document.body.scrollTop || document.documentElement.scrollTop
            
            headerFixed.style.position = 'absolute'
            headerFixed.style.top = top+'px'
            if (commonHeader) {
              commonHeader.style.position = 'absolute'
              commonHeader.style.top = top+'px'
            }
            // commonHeader ? document.querySelector('.common-header').style.cssText = 'position:absolute;top:'+top+'px' : ''
          }, 100); 
        }
      }, true)
      document.querySelector('body').addEventListener('touchend', (ev) => {  
        if(ev.target.className !== 'INPUT' && ev.target.type !== 'checkbox') {
          [].forEach.call(document.querySelectorAll("input"), function(el,i){
            document.querySelectorAll("input")[i].blur()
          });
        }
      }, true);  
      document.querySelector('body').addEventListener('blur', (ev) => {
        if (ev.target.nodeName === 'INPUT' && ev.target.type !== 'checkbox') {
          // document.querySelector('#header-fixed').style.cssText = ''
          // document.querySelector('.common-header') ? document.querySelector('.common-header').style.cssText = '' : ''
          headerFixed.style.position = 'fixed'
          headerFixed.style.top = 0
          if (commonHeader) {
            commonHeader.style.position = 'fixed'
            commonHeader.style.top = 0
          }
        }
      }, true)
    }
  },
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll,true)
  }
}


</script>
<style type="text/css">
[v-cloak] {
  display: none;
}
</style>
<style lang="scss">
.weui-toast{
  top: 50%!important; margin-top: -3.8em!important;
}
#app{
  height: 100%;
  .vux-rater-box{
    background: url(./assets/img/bg/start_none.png) no-repeat; background-size: contain; text-indent: -999999px;
  }
  .vux-rater-box.is-active{
    background: url(./assets/img/bg/start_all.png) no-repeat; background-size: contain;
  }

}
.top-header{
  position: fixed; top:0; right: 0; left: 0; width: 100%; z-index:999;
  .header{
    height: 46px;
  }
}
.main{
  position: absolute; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; z-index: 900; transition: top .3s; -webkit-overflow-scrolling: touch;
}
.fade-leave-to{
  visibility: hidden;
}
.fade-enter-active{
  animation: toLeft .3s;
}

@keyframes toLeft
{
  from {
    transform: translate(120%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}

</style>