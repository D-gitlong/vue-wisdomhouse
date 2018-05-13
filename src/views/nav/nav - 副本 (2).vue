<template>
  <div>
    <transition name="mainFade">
      <group v-show="isShowNav">
        <div class="weui-cell vux-tap-active weui-cell_access">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label">
            <a href="#/">Home</a></label> </p>
          </div>
        </div>

        <div class="weui-cell vux-tap-active weui-cell_access">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label"><a href="
              #/myOrder">Your Orders</a></label> </p>
          </div>
        </div>
        
        <div class="weui-cell vux-tap-active weui-cell_access">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label"><a href="
              #/myAddress">Your shipping</a></label> </p>
          </div>
        </div>

        <div class="weui-cell vux-tap-active weui-cell_access" :key="m.id" v-for="m in menus">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label">
            <a href="javascript:;" @click="toChild(m)">{{m.name}}</a></label> </p>
          </div>
          <div v-if="m.categories?m.categories.length>0:'' " class="weui-cell__ft"></div>
        </div>
        <div class="weui-cell vux-tap-active weui-cell_access">
          <div class="vux-cell-bd vux-cell-primary">
            <p><label class="vux-label">
            <a href="javascript:;" @click="logout">Sign out</a></label> </p>
          </div>
        </div>
        
      </group>
    </transition>
    <transition name="childFade">
      <child-nav v-show="!isShowNav" @toChangMenus="change" :child-menu="childMenu"></child-nav>
    </transition>
  </div>
</template>

<script>
import API from '@/api/api'
import { mapState, mapGetters, mapActions } from 'vuex'
import { Group } from 'vux'
import childNav from '@/components/childNav'
export default {
  name: 'navs2',
  components: {
    Group,
    childNav
  },
  data () {
    return {
      menus: [],
      childMenu: []
    }
  },
  computed: {
    ...mapGetters(['isShowNav'])
  },
  methods: {
    toChild(m) {
      if (m.categories.length <= 0) {
        this.$router.push({ 
          path: 'product', 
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
        this.childMenu = m.categories
        console.log(m.categories)
        this.$store.dispatch('isShowNav',false)
      }
    },
    change(val) {
      this.$store.dispatch('isShowNav',val)
    },
    logout() {
      if (window.localStorage.getItem('token')) {
        this.$store.dispatch('setSignOut')
        this.$vux.toast.text('Logout success', 'middle')
        this.$router.push({ path: '/' })
      }
    }
  },
  mounted() {
    let PER_PAGE = 1000
    API.Category({
      page: 1,
      per_page: PER_PAGE
    }).then((response)=>{
      if(response.data.error_code == 0){
        this.menus = response.data.categories
        
        this.$store.dispatch('setMenusCategories',response.data.categories)
      }
    })


  }
}
</script>

<style lang="scss">
.menus-nav{
  .vux-cell-bd{ width: 100%;}
  .weui-cell a{
    display: block; padding: 8px 0;
  }
}
.childFade-leave{
  visibility: hidden;
}
.childFade-enter-active{
  animation: toLeft .3s;
}
.mainFade-enter-active{
  animation: toRight .3s;
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
@keyframes toRight
{
  from {
    transform: translate(-120%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}
</style>
