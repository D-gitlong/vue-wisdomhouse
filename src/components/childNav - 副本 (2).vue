<template>
<div>
  <transition name="mainFade" v-if="!childMenus.categories">
    <div class="menus-wrap" >
      <div class="backMenus" @click="upMsg()"><i class="fa fa-angle-left"></i>MAIN MENU</div>
      <group class="child-menus">
        <div class="weui-cell vux-tap-active weui-cell_access" :key="c.id" v-for="(c,index) in childMenu">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label">
            <a href="javascript:;" @click="toChild2(c)">{{c.name}}</a>
          </label> </p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
      </group>
    </div>
  </transition>
  <!-- <transition name="childFade">
    <child-nav v-show="!isShowNav2" @toChangMenus2="change2" :child-menus="childMenus"></child-nav>
  </transition> -->

  <transition name="childFade" v-if="childMenus.categories">
    <child-nav :child-menu="childMenus.categories"></child-nav>
  </transition>


</div>
</template>
<script>
import { Group } from 'vux'
import { mapState, mapGetters, mapActions } from 'vuex'
var list = null,index2 = 0, list2 = null
export default{
  name: 'childNav2',
  props:{
    childMenu: [Object, Array]
  },
  components: {
    Group
  },
  computed: {
    ...mapGetters(['isShowNav','getMenusCategories'])
  },
  data() {
    return{
      childMenus: []
    }
  },
  methods: {
    upMsg() {
      // console.log(--index2)
      // console.log(childMenu)
      // let res
      // let list = this.getMenusCategories
      // this.digui(list)

      // for(let i in list){
        
      //   // console.log(list[i],i)
      //   for(let j in list[i]){
      //     console.log(list[i][j])
      //   }
      // }
      // console.log(res)
      // this.childMenus = dd
      // console.log(list)
      let obj = {}
      index2--
      if (index2 == -1) {
        index2 = 0
        this.$store.dispatch('isShowNav',true)
      }else{
        
        obj.categories = list
        this.childMenus = obj
      }

      this.$emit('toChangMenus',true)
      document.querySelector('.nav').style.overflowY = 'scroll'
    },
    toChild2(m) {
      // console.log(this.childMenu)

      index2++
      list = this.childMenu
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
        // this.childMenu = list2
        this.$store.dispatch('isShowMenu',false)
        document.getElementById('header-fixed').style.height = 'auto'

        /*for(let i in this.getMenusCategories){
          let cate = this.getMenusCategories[i].categories
          for(let j in cate){
            // console.log(cate[i])
            if (m.id == cate[i].id) {
              console.log(cate[i].categories)
              this.childMenu = cate[i].categories
            }
          }
        }*/
      }else{
        this.childMenus = m
      }
    }
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