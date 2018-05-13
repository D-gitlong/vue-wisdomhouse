<template>
	<div class="h-search">
    <transition name="down">
		<search v-show="isShowSearch"
    @on-change="changeNum"
    :results="results"
    :disabled= "isDisabled"
    v-model="value"
    position="absolute"
    auto-scroll-to-top top="46px"
    @on-submit="onSubmit"
    cancel-text="cancel"
    placeholder="What are you looking for?"
    ref="search"></search>
    </transition>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Search, Group, Cell, XButton } from 'vux'
export default {
  name: 'searchs',
  components: {
    Search,
    Group,
    Cell,
    XButton
  },
  data () {
    return {
      results: [],
      value: '',
      isDisabled: false
    }
  },
  computed:{
    ...mapGetters(['isShowSearch'])
  },
  updated () {
    // if(this.$store.getters.isShowSearch){
    //   this.$refs.search.setFocus()
    // }
    this.$store.state.isVal = this.value

  },
  methods: {
    changeNum() {
      if (this.value.length >= 90) {
        this.value = this.value.substring(0,90)
        this.isDisabled = true
      }else{
        this.isDisabled = false
      }
    },
    onSubmit () {
      if (!this.value || this.value < 1) {
        this.$vux.toast.text('Please enter the correct keyword', 'middle')
        return;
      }
      this.$router.push({ 
        path: '/product', 
        query: { 
          sortKey: 0,
          sortValue: 0,
          keyword: this.value,
          category: null,
          navTitle: this.value,
          navStyle: 'search'
        } 
      })

      this.$refs.search.setBlur()
    }
  }
}

</script>

<style lang="scss">
@import "../../assets/scss/function";
.h-search
{
  height: 48px;
  .weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{
    display: none;
  }
  .weui-search-bar__form:after{
    border-radius: 0;
  }
  .weui-search-bar__cancel-btn{
    color: #999;
  }
  .weui-search-bar{
    background: $headerBg;
  }
  .weui-search-bar:before{
    border-top: 0;
  }
  .weui-search-bar__box .weui-icon-search, .weui-search-bar__box .weui-icon-clear, .weui-search-bar__label{
    line-height: 36px;
  }
  .weui-search-bar__box .weui-search-bar__input{
    padding: 8px 0;
  }
  .weui-search-bar{
    padding: 2px 10px 10px;
  }
}
.down-enter-active{
  animation: fadeInDown10 .5s;
}
.down-leave-active{
  animation: fadeOutDown10 .2s;
}
</style>