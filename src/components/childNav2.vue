<template>
	<div class="menus-wrap" v-show="!isShowNav2">
    <div class="backMenus" @click="upMsg2"><i class="fa fa-angle-left"></i>MAIN MENU</div>
		<group class="child-menus">
      <div class="weui-cell vux-tap-active weui-cell_access" :key="c.id" v-for="c in childMenus.categories">
        <div class="vux-cell-bd vux-cell-primary">
          <p><label class="vux-label">
          <a href="javascript:;" @click="toChild3(c)">{{c.name}}</a>
        </label> </p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </group>
	</div>
</template>
<script>
import { Group } from 'vux'
import { mapState, mapGetters, mapActions } from 'vuex'
export default{
  name: 'childNav2',
	props:{
    childMenus: [Object, Array]
  },
	components: {
    Group
  },
  computed: {
    ...mapGetters(['isShowNav','isShowNav2'])
  },
  methods: {
    toChild3(m) {
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
    },
    upMsg2() {
      this.$emit('toChangMenus2',true)
      // document.querySelector('.nav').style.overflowY = 'scroll'
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