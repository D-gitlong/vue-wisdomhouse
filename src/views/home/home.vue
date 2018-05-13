<template>
	<div class="home">
    <div>
    <flexbox orient="vertical">
      <!-- <swiper class="slides" dots-position="center" :aspect-ratio="400/800" style="width:100%">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <img :src="item.photo.large">
        </swiper-item>
      </swiper> -->

      <flexbox-item v-for="src in all.list" :key="src.id">
        <a href="javascript:void(0);"><img :src="src.img" /></a>
      </flexbox-item>

      <flexbox-item v-if="isShowImgsList && recently_products.length > 0" class="imgs-list list-padding com-list">
        <h3 v-if="isShowImgsList">New Arrival</h3>
        <a :href="'#/details/'+subList.id" :key="subList.id" class="imgs-info-item clearfix" v-for="subList in recently_products">
          <div class="imgs-left fl">
            <img :src="subList.default_photo.large" />
          </div>
          <div class="text-right">
            <div class="text-info">{{subList.name}}</div>
            <span class="shop-price"><i>$</i>{{subList.shop_price||'0' | fmoney}}</span>
          </div>
        </a>
        <a @click="recentlyProductType()" class="see-more withTopBorder">
          <div class="see-more-text">See more<i class="fa fa-lg fa-angle-right"></i></div>
        </a>
      </flexbox-item>

      <flexbox-item v-if="isShowOneImg" class="one-img list-padding com-list" :key="subList.id" v-for="subList in good_products">
        <h3 v-if="isShowImgsList"> Best Recommended</h3>
        <a :href="'#/details/'+subList.id" class="one-img-top">
          <div class="one-imgwrap"><img :src="subList.default_photo.large" /></div>
          <div class="clearfix">
            <span class="shop-price fr"><i>$</i>{{subList.shop_price||'0' | fmoney}}</span>
            <div class="one-img-info">{{subList.name}}</div>
          </div>
        </a>
        <a @click="goodProductType()" class="see-more withTopBorder">
          <div class="see-more-text">See more<i class="fa fa-lg fa-angle-right"></i></div>
        </a>
      </flexbox-item>

      <flexbox-item v-if="isShowChangeImg && hot_products.length > 0" class="change-img list-padding com-list">
        <h3 v-if="isShowChangeImg">Hot Recommended</h3>
        <div class="change-img-wrap">
            <a :href="'#/details/'+itemCon.id" :key="itemCon.id" class="change-img-link" v-for="(itemCon,index) in hot_products" v-show="index == num">
              <div class="change-img-content">
                <img :src="itemCon.default_photo.large" />
              </div>
              <div class="chang-img-bottom">
                <p class="text-ellipsis">{{ itemCon.name }}</p>
                <span class="shop-price fr"><i>$</i>{{ itemCon.shop_price||'0' | fmoney }}</span>
                <counter :endtime='itemCon.time'></counter>
              </div>
            </a>
          <ul class="change-img-list clearfix">
            <li v-for="(item,index) in hot_products" :key="item.id" @click="tab(index)"><img :src="item.default_photo.thumb"></li>
          </ul>
        </div>
        <a @click="hotProductType()" class="see-more withTopBorder">
          <div class="see-more-text">See more<i class="fa fa-lg fa-angle-right"></i></div>
        </a>
      </flexbox-item>

      <flexbox-item v-if="isShowSimpleImg" class="simple-img list-padding com-list">
        <h3>Holiday Home Gift Guide</h3>
        <a href="javascript:void(0);" class="simple-big-img">
          <img src="static/images/news1.jpg" />
        </a>
      </flexbox-item>
      
      <flexbox-item v-if="isShowColumnImg" class="column-img list-padding com-list" style="display: none">
        <h3>Holiday Home Gift Guide</h3>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news4.jpg" />
          <p>G25 3.5W G30 Globe with Thread Filament Style</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news5.jpg" />
          <p>A19 LED 7.5W E26, Mild White</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news6.jpg" />
          <p>LED Edsison Bulb Dimmable, Vintage LED Globe bulb, Thread LED G40 lamp 3.5 Watt 350 Lumens E26, clear tinted glass</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news7.jpg" />
          <p>3.5 Watt E26 base Edison T9 Tbular, Vintage LED Filament, clear tinted Glass</p>
        </a>
      </flexbox-item>

      <flexbox-item v-if="isShowVideo" class="video com-list">
        <h3>See what's coming to Prime Video in November</h3>
        <div class="video-wrap">
          <div class="video-btn" v-show="isBtnShow"></div>
          <video id="video-play" class="video-src" @click="videoPlay" poster="static/images/v.jpg" width="100%">
            <source src="static/video/1.mp4" type="video/mp4">
          </video>
        </div>
        
        <a href="javascript:void(0);" class="see-more withTopBorder" style="display: none">
          <div class="see-more-text">See more<i class="fa fa-lg fa-angle-right"></i></div>
        </a>
      </flexbox-item>

      <flexbox-item v-if="isShowAdvImg" class="adv-img" :key="adv.id" v-for="adv in all.list2">
        <a href="javascript:void(0);"><img :src="adv.img" /></a>
      </flexbox-item>

      <div class="finish">
        <span>
          You've reached the end. Keep exploring!
        </span>
      </div>
      
      <flexbox-item v-if="isShowLastImg" class="last-img column-img list-padding com-list" style="display: none">
        <h3>Explore Departments</h3>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news4.jpg" />
          <p>G25 3.5W G30 Globe with Thread Filament Style</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news5.jpg" />
          <p>A19 LED 7.5W E26, Mild White</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news6.jpg" />
          <p>LED Edsison Bulb Dimmable, Vintage LED Globe bulb, Thread LED G40 lamp 3.5 Watt 350 Lumens E26, clear tinted glass</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news7.jpg" />
          <p>3.5 Watt E26 base Edison T9 Tbular, Vintage LED Filament, clear tinted Glass</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news6.jpg" />
          <p>LED Edsison Bulb Dimmable, Vintage LED Globe bulb, Thread LED G40 lamp 3.5 Watt 350 Lumens E26, clear tinted glass</p>
        </a>
        <a href="javascript:void(0);" class="column-item">
          <img src="static/images/news7.jpg" />
          <p>3.5 Watt E26 base Edison T9 Tbular, Vintage LED Filament, clear tinted Glass</p>
        </a>
        
      </flexbox-item>
      <div class="all-department"><x-button class="other-shop">All Departments</x-button></div>
      
    </flexbox>
    </div>
	</div>
</template>

<script>
  import API from '@/api/api'
  import '@/util/directive'
  import { XButton, Panel, Flexbox, FlexboxItem, XImg, Swiper, SwiperItem } from 'vux'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import counter from '@/components/counter.vue';
  export default {
    name: 'home',
    data () {
      return {
        num: 0,
        good_products: [],
        hot_products: [],
        recently_products: [],
        all: {
          "list": [
            {
              "id": 1,
              "img": "./static/images/h1.jpg"
            },
            {
              "id": 2,
              "img": "./static/images/h2.jpg"
            }
          ],
          "list2": [
            {
              "id": 9900094,
              "img": "./static/images/news2.jpg"
            },
            {
              "id": 9900092,
              "img": "./static/images/news3.jpg"
            }
          ]
      },
       
        isBtnShow: true,
        isShowImgsList: false,
        isShowOneImg: false,
        isShowChangeImg: false,
        isShowSimpleImg: false,
        isShowColumnImg: false,
        isShowVideo: false,
        isShowAdvImg: false,
        isShowLastImg: false,
        allImgLink: [],
        banners: []
      }
    },
    created () {
      this.$nextTick(()=>{
        this.isShowImgsList = true
        this.isShowOneImg = true
        this.isShowChangeImg = true
        this.isShowSimpleImg = true
        this.isShowColumnImg = true
        this.isShowVideo = true
        this.isShowAdvImg= true
        this.isShowLastImg = true
      })
    
    },
    components: {
      XButton,
      Panel,
      Flexbox,
      FlexboxItem,
      XImg,
      counter,
      Swiper,
      SwiperItem
    },
    mounted(){
      this.$store.dispatch('isShowSearch',true)
      this.$store.dispatch('isShowBack',false)
      // document.documentElement.scrollTop = 0
      // 获取轮播图
      /*API.Banner({})
      .then((response)=>{
        if (response.status == 200) {
          this.banners = response.data.banners
        }
      })*/

      // 获取模块产品
      API.ProductIndex({})
      .then((response)=>{
        if (response.data.error_code == 0) {
          this.hot_products = response.data.hot_products ? response.data.hot_products.slice(0,4) : ''
          this.good_products = response.data.good_products ? response.data.good_products.slice(0,1) : ''
          this.recently_products = response.data.recently_products ? response.data.recently_products.slice(0,3) : ''
        }
      })
    },
    methods: {
      tab(index) {
        this.num = index
      },
      hotProductType() {
        this.$router.push({ 
          path: 'product', 
          query: { 
            type: 'is_hot'
          } 
        })
      },
      recentlyProductType() {
        this.$router.push({
          path: 'product',
          query: {
            type: 'is_new'
          }
        })
      },
      goodProductType() {
        this.$router.push({
          path: 'product',
          query: {
            type: 'is_best'
          }
        })
      },
      videoPlay () {
        let vPlay = document.getElementById('video-play')
        vPlay.setAttribute('webkit-playsinline', 'webkit-playsinline');
        vPlay.setAttribute('playsinline', 'playsinline');
        if(vPlay.paused){
          this.isBtnShow = false
          vPlay.play()
        }else{
          vPlay.pause()
        }
      },
    }
  }

</script>

<style scoped lang="scss">
.home{
  background: #e5e3e3; top: 94px;
  .flexs-item{
    background: #fff; text-align: center; padding: 7px; margin: 7px 0; width: 100%; 
  }
  .list-padding{
    padding: 10px 15px 0 15px;
  }
  .com-list{  
    background-color: #fff;
  }
  .com-list{
    h3{
      display: -webkit-box; max-width: 100%; max-height: 2.5em; margin: 0 auto; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 25px; font-size: 20px; margin-bottom: 15px; padding-bottom: 5px; font-weight: 300; white-space: normal; box-shadow: -1px 1px 0 5px #fff, 1px 1px 0 5px #fff, 0 7px 0 0 #e3e3e3;
    }
  }
  .text-ellipsis{
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .imgs-list{
    a.imgs-info-item{
      padding-bottom: 15px; color: #111;
    }
    .text-right{
      .text-info{
        display: -webkit-box; max-width: 100%; max-height: 2.66667em; margin: 0 auto; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 20px; font-size: 15px; margin-bottom: 5px;
      }
    }
  }
  .shop-price{
    color: #767676; font-size: 15px;
    i{
      font-size: .7em; position: relative; top: -.3em; font-style: normal
    }
  }
  a{
    display: block; font-size: 15px; position: relative;
  }
  .withTopBorder{
    border-top: 1px solid #e3e3e3;
  }
  a.see-more{
    line-height: 43px; position: relative; color: #008296;
    .fa{float: right; line-height: 43px;}
  }
  .imgs-left{
    width: 30%; text-align: center; margin-right: 10px;
    img{
      max-height: 80px; max-width: 100%; border: 1px solid #eee;
    }
  }
  .one-img{
    .one-img-info{
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #111; font-size: 15px;
    }
    .one-img-top{
      padding-bottom: 15px;
      .shop-price{
        color: #767676; margin-left: 20px;
      }
    }
    .one-imgwrap{
      margin: 10px 10px 15px; text-align: center;
    }
    img{
      max-height: 200px;
    }
  }
  .change-img{
    .change-content{
      position: relative;
    }
    .change-img-content{
      text-align: center; position: relative;
      img{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-height: 80%;
        max-width: 80%;
      }
      &:before{
        padding-bottom: 50%;
        display: block;
        content: "";
        height: 0;
      }
    }
    .shop-price{
      float: none; color: #111;
    }
    .change-img-list{
      li{
        width: 25%; position: relative; float: left;vertical-align: middle;
        img{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto; 
          max-height: 90%; 
          max-width: 90%;
        }
      }
      li:before{
        padding-bottom: 100%;
        display: block;
        content: "";
        height: 0;
      }
    }
    
  }
  .simple-img{
    h3{
      box-shadow: none; padding-bottom: 0;
    }
    .simple-big-img{
      padding-bottom: 15px;
    }
  }
  .adv-img{
    a{text-align: center;}
  }
  .column-img{
    h3{
      box-shadow: none; padding-bottom: 0;
    }
    .column-item{
      width: 50%; margin: 0 auto; padding-right: 10px; float: left; margin-bottom: 10px; text-align: center;
      p{
        text-align: center; -webkit-line-clamp: 1; -webkit-box-orient: vertical; display: -webkit-box; overflow: hidden; margin-top: 8px;
      }
      img{ border: 1px solid #eef}
    }
  }
  .video{
    .video-wrap{
      position: relative;
      .video-btn{
        position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: url(../../assets/img/beacon._TTW_.svg);background-position: 2.3% 4.3%; background-size: 314.1% 212.9%; width: 80px; height: 80px;
      }
    }
    h3{
      box-shadow: none; padding: 0 15px; margin-top: 15px;
    }
    .see-more{
      padding: 0 15px;
    }
  }
  .last-img {
    .column-item{
      height: auto; 
      p{
        -webkit-line-clamp: 1; max-height: 20px;
      }
      img{
        width: 100%;
      }
    }
  }
  .finish{
    width: 100%;
    color: #555;
    font-size: 13px;
    overflow: hidden;
    position: relative;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
    padding: .8rem 0;
    span{
      background: #e5e3e3;
      padding: 0 10px;
    }
    &:before{
      border-top: 1px solid #aaa;
      content: "";
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
  }
  .all-department{
    background: #fff; width: 100%;
  }
  .other-shop{
    margin: 20px auto 30px; width: 88%;
  }
}
.fade-enter-active{
  animation: fadeIn .3s;
}
.fade-leave-active{
  animation: fadeOut .3s;
}
</style>