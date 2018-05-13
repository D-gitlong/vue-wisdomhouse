<template>
<div>
  <transition name="mainFade">
  	<div class="menus-wrap" v-show="isShowNav2">
      <div class="backMenus" @click="upMsg"><i class="fa fa-angle-left"></i>MAIN MENU</div>
  		<group class="child-menus">
        <div class="weui-cell vux-tap-active weui-cell_access" :key="c.id" v-for="c in childMenu.categories">
          <div class="vux-cell-bd vux-cell-primary">
            <p>
              <label class="vux-label">
                <a href="javascript:;" @click="toChild2(c)">{{c.name}}</a>
              </label>
            </p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </group>
  	</div>
  </transition>
  <transition name="childFade">
    <child-nav-child v-show="!isShowNav2" @toChangMenus2="change2" :child-menus="childMenus"></child-nav-child>
  </transition>
</div>
</template>
<script>
import { Group } from 'vux'
import { mapState, mapGetters, mapActions } from 'vuex'
import childNavChild from '@/components/childNav2'
export default{
  name: 'childNav',
	props:{
    childMenu: [Object, Array]
  },
	components: {
    Group,
    childNavChild
  },
  computed: {
    ...mapGetters(['isShowNav','isShowNav2'])
  },
  data() {
    return{
      childMenus: []
    }
  },
  methods: {
    upMsg() {
      this.$emit('toChangMenus',true)
      document.querySelector('.nav').style.overflowY = 'scroll'
    },
    toChild2(m) {
      if (m.categories.length <= 0) {
        this.$router.push({ 
          name: 'product', 
          query: { 
            sortKey: 0,
            sortValue: 0,
            keyword: null,
            category: m.id,
            title:    m.name,
            navTitle: m.name,
            navStyle: 'default'
          } 
        })
        this.$store.dispatch('isShowMenu',false)
        document.getElementById('header-fixed').style.height = 'auto'
      }else{
        this.childMenus = m
        this.$store.dispatch('isShowNav2',false)
      }
      
    },
    change2(val) {
      this.$store.dispatch('isShowNav2',val)
    }
  },
  updated() {
    // document.querySelector('.nav').style.overflowY = 'hidden'
  }
}
</script>
<style scoped lang="scss">
@import "../assets/scss/function";
.backMenus{
  background: $headerBg; padding: 10px 15px; color: $headerIconBg; border-bottom: 0; font-size: 1rem; position: absolute; left: 0; top: 0; right: 0;
  .fa{
    font-size:1.5em; margin-right: 10px; position: relative; top: 2px;
  }
}
.child-menus{
  position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow-y: scroll; height: 100%; padding-bottom: 100px;
}
</style>