<template>
	<div class="details">
		<div class="getheight pad15">
			<div class="mapwrap" v-show="isShowMap">
				<!-- 地图 -->
				<div class="mapinner">
					<div id="map" style="width: 100%; height: 300px;"></div>
				</div>
				<!-- <i class="icon"></i> -->
			</div>

			<div class="pro-name"><a href="javascript:void(0);" v-if="product" v-text="product.name"></a></div>
			<h2 class="title" v-text="proTit"></h2>
			<div class="pro-rater">
				<rater v-if="product" v-model="product.good_rand" disabled :max="5" :font-size="20" active-color="#fad000"></rater>
				<span class="rater-num" v-if="commentCount">({{commentCount}})</span>
			</div>
			<swiper class="slides" v-if="product && product.photos.length" dots-position="center" height="200px">
	      <swiper-item  v-for="(item, index) in product.photos" :key="index">
	      	<img :src="item.large">
	      </swiper-item>
	    </swiper>
			<div class="set-meal" @click="showSetbox" v-if="product && product.properties && product.properties.length && product.good_stock">
				<div class="meal-wrap">
					<x-icon type="ios-arrow-right" class="meal-arrow" size="20"></x-icon>
					<div class="meal-info">
						{{configureName}}:
						<br />
						<strong class="dimension-label">{{configure}}</strong>
					</div>
				</div>
			</div>

			<div class="pro-price" v-if="price">
				<div class="money">
					<span>$</span>{{ price|numHandle }}<i>{{ price|numHandle2 }}</i>
				</div>
				<div class="view-room" @click="getPicture(product.id)">
	      View in <br /> My House
		      <span class="lt pro-border"></span>
		      <span class="lb pro-border"></span>
		      <span class="rt pro-border"></span>
		      <span class="rb pro-border"></span>
		  	</div>
			</div>
			
			<div class="in-stock">
				<h3 v-if="good_stock>0">In Stock</h3>
				<h3 v-if="good_stock<=0">No Stock</h3>
				<p>This item does not ship to <b>China</b>. Please check other sellers who may ship internationally.</p>
			</div>

			<div class="add-order">
				<div class="address" style="display: none">
					<span><icon icon-style="iconx" icon-class="address-copy"></icon></span>Ship to: <a href="">China</a>
				</div>
				<div class="order-select" v-show="!isShowPass" @click="showSelect">
					Qty:<span>{{num}}</span><i class="fa fa-angle-down"></i>
				</div>

				<span v-show="isShowPass" class="order-update-input"><input type="number" v-model="num" /></span>

				<x-button class="add-cart" @click.native="addToCar()">Add to Cart</x-button>
				<x-button class="buy-now" @click.native="purchase()">Buy Now</x-button>
			</div>

			<div class="rebate-estimation" v-if="product && product.rebate_show">
				<h3>Rebate Amount</h3>
				<div class="zip-code">
					<span class="rebate-tit">ZIP CODE:</span>
					<input type="number" @click="updateInput($event)" v-model="zipcode" class="code-input" />
					<span @click="showMap" v-if="isIOS()"><icon icon-style="iconx" icon-class="address-copy"></icon></span>
				</div>

				<div class="utility">
					<span class="rebate-tit" @click="showUtility">UTILITY<i class="fa fa-angle-down"></i></span>
					<p class="rebate-val">{{utility}}</p>
				</div>

				<div class="type">
					<span class="rebate-tit" @click="showType">TYPE<i class="fa fa-angle-down"></i></span>
					<p class="rebate-val">{{type}}</p>
				</div>

				<div class="rebate-amount">
					<span class="rebate-tit">Rebate Amount Per Unit Estimated:</span>
					<p class="rebate-val" v-if="product">${{product.market_price>0?product.market_price:'0' |fmoney}}</p>
				</div>
				<input type="hidden" id="latitude" value="" ref="latitude">
				<input type="hidden" id="longitude" value="" ref="longitude">

				
			</div>

			<div class="add-to-list" style="display: none">
				<a href="">ADD TO LIST</a>
			</div>

			<div class="other-info" style="display: none">
				<a href="">USED & NEW (48) FROM <span>$1,122.00</span> + $5.88 Shipping</a>
				<a href="">TRADE IN FOR UP TO <span>$890.00</span></a>
				<a href="">SELL ON WISDOM HOUSE</a>
			</div>

			<div class="share com-bottom" style="display: none">
				<a href="">
					<i class="fa fa-share-alt fa-lg"></i>
					SHARE
				</a>
			</div>
			
			<!-- 配套商品 -->
			<div class="frequently com-bottom" style="display: none">
				<h3 class="com-tit">Frequently bought together</h3>	
				<div class="a-box-group">
					<div class="a-box" style="height: 100px;">
						<div class="a-box-inner">
							<ul>
								<li v-show="items[0].state"><img src="static/images/light/1.png"></li>
								<li v-show="items[1].state"><img src="static/images/light/2.png"></li>
								<li v-show="items[2].state"><img src="static/images/light/5.png"></li>
							</ul>
						</div>
					</div>
					<div class="a-box expander-content" v-if="isShowExpander">
						<ul>
							<li v-for="(check,index) in items">
								<a href="javascript:void(0);">
									<div class="expander-row">
										<div class="checkbox-div" @click="alocked(check,index)">
											<input type="checkbox" v-model="check.state" />
										</div>
										<div class="textbox-div">
											<div class="textbox-tit">
												<strong>This item:</strong>All-New Fire 7 Kids Edition Tablet, 7" Display, 16 GB, Blue Kidw Fire 7 Kids Edition Tablet, 7" Display, 16 GB, Blue Kid
											</div>
											<div class="textbox-price">
												<span>$9.58</span>
												<!-- <i class="icon"></i> -->
											</div>
										</div>
									</div>
									<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
								</a>
							</li>
						</ul>
						<div class="total-price">
							Total price: <span>$10.64</span>
						</div>
						<div class="add-to-cart">
							<x-button class="add-cart">Add to Cart</x-button>
						</div>
					</div>
					<div class="a-box expander-heading" v-if="!isShowExpander" @click="showExpander">
						<a href="javascript:void(0)">
							<span>Buy all three: <i class="expander-num">$50.63</i></span>
							<i class="fa fa-angle-down fa-lg"></i>
						</a>
					</div>
				</div>
				
			</div>
			
			<!-- 商品参数 -->
			<div class="compare" style="display: none"></div>
			
			<div class="have-question com-bottom" style="display: none">
				<h3 class="com-tit">Have a question?</h3>
				<p class="spacing-small">Find answers in product info, Q&As, reviews</p>
				<div class="text-wrapper">
					<i class="fa fa-search fa-3x"></i>
					<input class="search-input" type="text" />
				</div>
			</div>

			<div class="about-item com-bottom">
				<h3 class="com-tit">About this item</h3>
				<div class="box-group">
					<a class="a-box feature">
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
						<h3>Description</h3>
						<div class="item-description" v-if="product" v-html="product.goods_desc"></div>
					</a>
					<a href="#/details/1/about" class="a-box feature" style="display: none">
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
						<h3>Features & details</h3>
						<ul>
							<li><span>Up to $129 in savings on Fire 7 tablet, 1 year of Wisdom House FreeTime Unlimited, and a Kid-Proof Case, plus a 2-year worry-free guarantee</span></li>
							<li><span>Up to $129 in savings on Fire 7 tablet, 1 year of Wisdom House FreeTime Unlimited, and a Kid-Proof Case, plus a 2-year worry-free guarantee</span></li>
							<li><span>Up to $129 in savings on Fire 7 tablet, 1 year of Wisdom House FreeTime Unlimited, and a Kid-Proof Case, plus a 2-year worry-free guarantee</span></li>
						</ul>
					</a>
				</div>
			</div>
			
			<!-- 顾客也购买其他产品 -->
			<div class="customers com-bottom" style="display: none">
				<h3 class="com-tit">Customers who bought this also bought</h3>

				<a :href="'#/details/'+item.id" :key="item.id" class="pro-item" v-for="item in prolist">
					<div class="pro-img fl">
						<img :src="item.default_photo.large" />
					</div>
					<div class="pro-info">
						<div class="pro-description">{{item.name}}</div>
						<div class="pro-rater com-pro-rater">
							<rater v-model="item.startnum" disabled :font-size="20" :max="5" active-color="#fad000"></rater>
							<span class="rater-num">{{item.rater}}</span>
						</div>
						<div class="customers-pro-price">
							<div class="price-middle"><span class="sup">$</span>{{item.shop_price||'0' | fmoney}}
								<i></i>
							</div>
						</div>
					</div>
				</a>
				
				<div class="customers-more">
					<a  @click="recentlyProductType()">
						Show all <span>34</span> items
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
					</a>
				</div>
			</div>
			
			<!-- 相关产品 -->
			<div class="related"></div>
			
			<!-- 顾客常见问题 -->
			<div class="customer-questions"></div>

			<!-- 顾客评论 -->
			<div class="customer-reviews com-pro-rater">
				<a :href="'#/comment/'+goodsId+'/allReviews'" style="display: none">
					<h3 class="com-tit">Customer reviews</h3>
					<div class="reviews a-box">
						<h4>{{commentCount}} customer reviews</h4>
						<div>
							<rater v-model="startnum" disabled :font-size="22" :max="5" active-color="#fad000"></rater><span>4.3 out of 5 starts</span>
						</div>
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
					</div>
				</a>

				<div class="customer-images a-box" style="display: none">
					<a href="#/comment/1/customerImg">
						<h4>Customer images</h4>
						<div class="show-img">
							<img src="static/images/light/1.png" />
							<img src="static/images/light/2.png" />
							<img src="static/images/light/4.png" />
							<img src="static/images/light/5.png" />
						</div>
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
					</a>
				</div>

				<div class="read-reviews a-box" style="display: none">
					<h4>Read reviews that mention</h4>
					<div class="read-wrap clearfix">
						<a href="#/comment/1/reviewMention" class="read-btn">tablet</a>
						<a href="#/comment/1/reviewMention" class="read-btn">apps</a>
						<a href="#/comment/1/reviewMention" class="read-btn">games</a>
						<a href="#/comment/1/reviewMention" class="read-btn">kid</a>
						<a href="#/comment/1/reviewMention" class="read-btn">fire</a>
						<a href="#/comment/1/reviewMention" class="read-btn">child</a>
						<a href="#/comment/1/reviewMention" class="read-btn">kindle</a>
					</div>
					<a href="javascript:void(0);" class="see-more">SEE MORE</a>
				</div>

				<div class="top-reviews a-box">
					<h4>Top reviews</h4>
					<div class="section-reviews" :key="comment.id" v-for="comment in comments">
						<a href="javascript:void(0);">
							<div class="star">
								<rater v-model="comment.grade" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
							</div>
							<div class="reviewText">{{comment.content}}</div>
							<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
						</a>
						<a class="reviewer" v-if="comment && comment.author">By <span>{{comment.is_anonymous ? '匿名用户' : comment.author.nickname || comment.author.username}}</span></a>
					</div>
				</div>

				<div class="customers-more all-reviews a-box">
					<a :href="'#/comment/'+goodsId+'/allReviews'">
						See all {{commentCount}} reviews
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
					</a>
				</div>

				<div class="customers-more write-reviews" @click="goReview()">
					<a href="javascript:void(0);">
						Write a review
						<x-icon type="ios-arrow-right" class="com-arrow" size="20"></x-icon>
					</a>
				</div>
			</div>
			
			<!-- 选择数量 -->
			<div class="select-num" v-show="isShowSelect" :style="{marginTop: marginT}">
				<div class="popover-header">
					<h4>Qty:</h4>
					<div @click="hideBox">
						<icon icon-style="iconx popver-close" icon-class="guanbi2"></icon>
					</div>
				</div>
				<div class="popover-scroll":style="{maxHeight: realH}">
					<ul>
						<li v-for="i in selectNum"><a @click="changeVal(i)" :class="{active: i === num}" href="javascript:void(0);">{{i}}</a></li>
					</ul>
				</div>
			</div>

			<!-- 下方弹出 -->
			<div class="meal-layer" :class="{show: isShowMeal}" v-if="product && product.properties && product.properties.length && product.good_stock">
				<a href="javascript:void(0);" @click="done" class="meal-sure">DONE</a>
				<div class="meal-content">
					<div class="meal-scroll" v-for="property in product.properties">
						<p>{{property.name}}</p>
						<!-- <p>Color: <span>{{configure}}</span></p> -->
						<div class="scroll-main clearfix">
							<a href="javascript:void(0);" @click="touchAttr(c,property)" :class="{active: isAttrSelected(c)}" v-for="(c, i) in property.attrs">
								<!-- <div class="scroll-img">
									<img :src="c.imgLink">
								</div> -->
								<label class="text-normal">{{c.attr_name}}</label>
								<div class="scroll-pp">
									<div class="money" v-if="c.attr_price > 0">
										<span>$</span>{{ c.attr_price || '0' | numHandle }}<i>{{ c.attr_price || '0' | numHandle2 }}</i>
									</div>
									<div class="in-stock">In Stock</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			
			<!-- 联系提示框 -->
			<div class="link-box" v-show="linkBox">
				<div class="linkinner">
					<p>
						<icon icon-style="iconx icon2x" icon-class="msnui-service-call"></icon>
						<span>BO ( CA ) : <a href="tel:+19095518282" style="color: #072efa; text-decoration: underline;">+1 909 5518 282</a></span>
					</p>
					<p class="clearfix">
						<icon style="float: left;transform: translateY(45%);" icon-style="iconx icon2x" icon-class="youxiang"></icon>
						<span style="float: left">
							Mail：Sales@ilumonllc.com
							<i>We will reply you within 24 hours</i>
						</span>
						
					</p>
				</div>
			</div>

			<down-list-box @getListMsg="change" :to-object="toObject" :com-list="comList"></down-list-box>

			<div class="layer" :class="isShowLayer? 'layerOn' : ''" @click="hideBox"></div>
		</div>
	</div>
</template>

<script>
import API from '@/api/api'
import qs from 'qs'
import { mapState, mapGetters, mapActions } from 'vuex'
import { XButton, CheckIcon, Rater, Swiper, SwiperItem } from 'vux'
import icon from '@/components/icon.vue'
import downListBox from '@/components/downListBox'
import * as _ from '@/util/tool'
import '@/util/directive'

// import MapView from '@/components/map.vue'

export default{
	name: 'detail',
	data () {
		return{
			goodsId: this.$route.params.id,
			proTit: '',
			price: 0,
			isShowPass: false,
			checkedNames: [],
			zipcode: 91765,
			ip: '',
			utilityList: [
				{
					Utility:'Alameda Municipal Power'
				},
				{
					Utility:'Anaheim Public Utilities'
				},
				{
					Utility:'Bear Valley Electric'
				},
				{
					Utility:'Bonneville Power Administration'
				},
				{
					Utility:'Burbank Water and Power'
				}
			],
			typeList: [
				{
					Utility:'Residential'
				},
				{
					Utility:'Commercial'
				},
				{
					Utility:'Business'
				},
				{
					Utility:'Residential'
				}
			],
			items: [
				{
	        state: true
	      },
	      {
	        state: true
	      },
	      {
	        state: true
	      }
      ],
			colorList:[
				{
					imgLink:'static/images/c1.jpg',
					price: [24,99],
					color: 'Blue'
				},
				{
					imgLink:'static/images/c2.jpg',
					price: [66,99],
					color: 'Pink'
				},
				{
					imgLink:'static/images/c3.jpg',
					price: [35,99],
					color: 'Yellow'
				}
			],
			startnum: 4,
			isActive: true,
			isShowExpander: false,
			prolist: [],
			realH: 0,
			marginT: 0,
			isShowSelect: false,
			isShowLayer: false,
			toObject: {
				isShowRebate: false,
				disabled: true
			},
			num: 1,
			configureName: '',
			isActive: false,
			selectNum:[1,2,3,4,5,6,7,8,9,'10+'],
			isShowMeal: false,
			configure: 'Blue',
			utility: 'Alameda Municipal Power',
			type: '',
			comList: [],
			isShowMap: false,
			giveData:{ 
        height:200,
        longitude:116.404,
        latitude:39.915
      },
      equal: '',
      watts: '',
      categoryID: '',
      categoryIDS: '',
      categories: [],
      cartAmount: 0,
      MAX_COMMENTS: 3,
      comments: [],
      commentCount: 0,
      currentAttrs: [],
      currentStock: null,
      product: null,
      optionalAttrs: [],
      good_stock: 0,
      linkBox: false
		}
	},
	components: {
		//MapView,
		XButton,
		CheckIcon,
		Rater,
		Swiper,
		SwiperItem,
		icon,
		downListBox
	},
	methods: {
		addToCar() {
			if (!window.localStorage.getItem('token')) {
				this.$vux.toast.text('You have not logged in', 'middle')
				this.$router.push('/login')
				return false;
			}

			if (this.good_stock <= 0) {
				this.$vux.toast.text('No stock', 'middle')
				return false
			}
			
			let attrs = [].concat(this.currentAttrs).concat(this.optionalAttrs);
      let amount = Number(this.num)
 			let data={
 				product: this.$route.params.id,
				property: JSON.stringify(attrs),
				amount: amount
			}

			API.AddCart(data)
			.then((response)=>{
				if(response.data.error_code == 0){
 					this.$vux.toast.text('Added to cart', 'middle')
 					this.getCartAmount()
 					this.$store.dispatch('getCartCount', this.num+parseInt(this.cartAmount))
 				}
			})
		},
		purchase() {
			this.linkBox = true
			this.isShowLayer = true
			/*if (!window.localStorage.getItem('token')) {
				this.$vux.toast.text('You have not logged in', 'middle')
				this.$router.push('/login')
				return false;
			}
			if (this.good_stock <= 0) {
				this.$vux.toast.text('No stock', 'middle')
				return false
			}

			let attrs = [].concat(this.currentAttrs).concat(this.optionalAttrs);
      let amount = Number(this.num)
			let data={
 				product: this.$route.params.id,
				property: JSON.stringify(attrs),
				amount: amount
			}
			this.$router.push({
				path: '/selectAddress',
				query: data
			})*/
		},
		goReview() {
			this.$router.push({
				name: 'writeReview2',
				params: {
					goods: this.product
				}
			})
		},
		alocked(item,index) {
		},
		isIOS() {
			let u = navigator.userAgent
			let isCordova = typeof(cordova) == 'undefined' || !typeof(cordova) == 'object'
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && !isCordova
		},
		showExpander() {
			this.isShowExpander = true
		},
		getHeight() {
			let winH = document.documentElement.clientHeight - 46
			let headerH = document.querySelector('#header-fixed').offsetHeight
			let allH = document.querySelector('.select-num').offsetHeight
			let realH = winH-headerH
			this.realH = ((realH + 59) * .6) + "px"
			let result = this.$store.getters.isShowSearch ? -(allH/2-48) : -(allH/2)
			this.marginT = result + "px"
		},
		hideBox(e) {
			this.isShowSelect = false
			this.isShowLayer = false
			this.isShowMeal = false
			this.toObject.isShowRebate = false
			this.isShowMap = false
			this.linkBox = false
		},
		showSelect() {
			this.isShowSelect = true
			this.isShowLayer = true
		},
		changeVal(val) {
			if (val <= 9) {
				this.isShowPass = false
				this.num = val
			}else{
				this.isShowPass = true
			}
			
			this.isShowSelect = false
			this.isShowLayer = false
		},
		showSetbox() {
			this.isShowLayer = true
			this.isShowMeal = true
		},
		done() {
			this.isShowLayer = false
			this.isShowMeal = false
		},
		refreshPrice() {
			let attrs = [].concat(this.currentAttrs).concat(this.optionalAttrs)
      this.price = parseFloat(this.product.shop_price)

      for ( let i = 0; i < this.product.properties.length; ++i ) {
        let property = this.product.properties[i];
        for ( let j in property.attrs ) {              
          let index = attrs.indexOf( property.attrs[j].id )
          if ( -1 != index && property.attrs[j].attr_price)  {
          	this.configure = property.attrs[j].attr_name
          	this.price += parseFloat(property.attrs[j].attr_price)
          }              
        }
      }
		},
		isAttrSelected(attr) {
			if ( attr.is_multiselect ) {
        return this.optionalAttrs.indexOf(attr.id) == -1 ? false : true;
      } else {
        return this.currentAttrs.indexOf(attr.id) == -1 ? false : true;
      }
		},
		touchAttr(attr,property) {
			if (!this.product) return false
			let product = this.product
			if ( attr.is_multiselect ) {
        var attrs = [].concat( this.optionalAttrs );
        var index = attrs.indexOf( attr.id );
        if ( -1 == index ) {
          attrs.push( attr.id );
        } else {
          attrs.splice( index, 1 );
        }
        this.optionalAttrs = attrs;

        this.refreshPrice();
      } 
      else {
        let stock = null;
        let attrs = [].concat( this.currentAttrs );
        let index = attrs.indexOf( attr.id );
        attrs.push( attr.id );
        for ( let i in property.attrs ) {
          if ( property.attrs[i].id != attr.id ) {
            let index = attrs.indexOf( property.attrs[i].id );
            if ( -1 != index ) {
              attrs.splice( index, 1 );
            }
          }
        }
        
        attrs = attrs.filter(function( attr, index, self ){
          return self.indexOf(attr) === index;
        });
        attrs.sort(function(a, b){
          return a - b;
        })
        if ( attrs.length ) {
          let key = attrs.join('|');
          for ( let i = 0; i < product.stock.length; ++i ) {
            let goods_attr = product.stock[i].goods_attr;
            let goods_attr_array =  goods_attr.split("|");

            goods_attr_array.sort(function(a, b){
              return a - b;
            })
            let goods_attr_str = goods_attr_array.join('|');
            if ( goods_attr_str == key ) {
              stock = product.stock[i];
              break;
            }
          }
        }
        
        this.currentAttrs = attrs;
        this.currentStock = stock;
        // this.canPurchase = _checkCanPurchase();
        this.refreshPrice();
      }
		},
		getPicture(imgId) {
			if (this.$store.state.user.token) {
				testPlugin(imgId,this.$store.state.user.token)
			}else{
				this.$vux.toast.text('Please login', 'middle')
				let that = this
				setTimeout(function(){
					that.$router.push('/login')
				},2000)
			}
		},
		showUtility() {
			this.comList = this.utilityList
			this.toObject.disabled = true
			this.isShowLayer = !this.isShowLayer
			this.toObject.isShowRebate = true
		},
		showType(val) {
			this.comList = this.typeList
			this.toObject.disabled = false
			this.isShowLayer = !this.isShowLayer
			this.toObject.isShowRebate = true
		},
		getComment() {
			API.ProductComment({
				product: this.$route.params.id,
        grade: 0,
        page:1,
        per_page: this.MAX_COMMENTS
			}).then((response)=>{
				this.comments = response.data.reviews
				this.commentCount = response.data.paged.total 
			})
		},
		getData() {
			API.ProductDetails({
				product: this.$route.params.id
			})
			.then((response)=>{
				if (response.data.error_code == 0) {
		    	this.price = response.data.product.shop_price
		    	// 补贴值
		    	this.good_stock = response.data.product.good_stock
		    	this.product = response.data.product
		    	this.configureName = this.product.properties.length>0 ? `${this.product.properties[0].attrs.length} ${this.product.properties[0].name}` : ''

		    	this.product.properties.sort(function(a, b){
            return a.is_multiselect - b.is_multiselect;
          })
		    	let defaultAttrIds = [];
          let defaultAttrStock = null;
          
          for ( let i = 0; i < this.product.properties.length; ++i ) {
            let property = this.product.properties[i];
             
            if ( !property.is_multiselect ) {
              defaultAttrIds.push( property.attrs[0].id );
            }
          }

          defaultAttrIds.sort(function(a, b){
            return a - b;
          })

          if ( defaultAttrIds.length ) {
            let stockSelector = defaultAttrIds.join('|');
            for ( let i = 0; i < this.product.stock.length; ++i ) {

              let goods_attr = this.product.stock[i].goods_attr;
              let goods_attr_array =  goods_attr.split("|");

              goods_attr_array.sort(function(a, b){
                return a - b;
              })
              
             let goods_attr_str = goods_attr_array.join('|');
              if ( goods_attr_str == stockSelector ) {
                defaultAttrStock = this.product.stock[i]
                break;
              }
            }
          }
          
          this.currentAttrs = defaultAttrIds
          this.currentStock = defaultAttrStock
		    	// this.equal = response.product.equal
		    	// this.watts = response.product.watts
		    	// if (response.product.CategoryID > 1) {
		    	// 	this.categoryIDS = response.product.CategoryID&&response.product.CategoryID.toString()
		    	// }else{
		    	// 	this.categoryID = response.product.CategoryID&&response.product.CategoryID.toString()
		    	// }
		    	// this.categories = response.product.Categories
	    	}
	    	this.refreshPrice()
	    	this.getComment()
			})

			// 获取邮编
			this.$http.get('http://archipelago.uhutech.cn/api400/api/ip').then((response)=>{
				if (response.status == 200) {
					let zipcode = response.data.data.zipcode
					this.ip = response.data.data.ip
					this.zipcode = zipcode ? zipcode : this.zipcode
				}
			})

			// 获取公司名称
			/*let data = qs.stringify({
				IP: this.ip,
				ZIP: this.zipcode
			})
			this.$http.post('http://120.27.132.40:8085/archipelagoRebateUtilityCompanyByIp/',data).then((response) => {
				if (response.status == 200) {
					if(response.data.Company.length != 0){
						//console.log(response.data.Company)
						this.totalAmount = response.data.Company[0].Amount
						this.utility = response.data.Company[0].Utility
						this.comList = response.data.Company
						this.utilityList = response.data.Company
					}
				}
			})*/

		},
		updateInput(e) {
			/*let that = this
			e.target.onblur = function() {
				that.getData()
			}*/
		},
		change(val) {
			//console.log(val.UtilityID)
			this.toObject.disabled ? this.utility = val.Utility : this.type = val.Utility
			this.isShowLayer = false
			this.toObject.isShowRebate = false
			/*let data2 = qs.stringify({
				IP:this.ip,
				CategoryID: this.categoryID,
				CategoryIDS: this.categoryIDS,
				Att_Categories_1: this.categories[0],
				Att_Categories_2: this.categories[1],
				Att_Categories_3: this.categories[2],
				Att_WATTS: this.watts,
				Att_Equal: this.equal,
				Att_CRI: '',
				Att_years: '',
				Att_StandardQualified: '',
				Apply_Customer_Type: this.type,
				Apply_Replacement_Fixture: '',
				Apply_Replacement_Fixture_type: '',
				Apply_Efficacy: '',
				Apply_Efficacy_unit: '',
				UtilityID: val.UtilityID,
				ZIP: this.zipcode
			})
			if (!this.totalAmount) {
				this.$http.post('http://120.27.132.40:8085/archipelagoMorePlatformRebateByCompany/',data2).then((response) => {
					// console.log(response)
					if (response.status == 200) {
						this.$vux.toast.text('Edit success', 'middle')
						this.totalAmount = response.data.totalAmount
					}
				})
			}*/
			
		},
		getMap() {
			var longitude = document.getElementById('longitude')
			var latitude = document.getElementById('latitude')
			document.addEventListener('deviceready', onDeviceReady, false)
			function onDeviceReady(){
				navigator.geolocation.getCurrentPosition(function(position){
			   // longitude.value = position.coords.longitude;
			   // latitude.value = position.coords.latitude;
			  	var ggPoint = new BMap.Point(position.coords.longitude,position.coords.latitude);

					// //地图初始化
			    var bm = new BMap.Map("map");
			    bm.centerAndZoom(ggPoint, 18);
			    bm.addControl(new BMap.NavigationControl());
			    bm.setZoom(18);
	        var convertor = new BMap.Convertor();
	        var pointArr = [];
	        pointArr.push(ggPoint);
	        convertor.translate(pointArr, 1, 5, function (data){
			      if(data.status === 0) {
			        var marker = new BMap.Marker(data.points[0]);
			        bm.addOverlay(marker);
			        bm.setCenter(data.points[0]);
			      }
			    })
				}, function(){});
			}
		},
		showMap() {
			this.isShowMap = !this.isShowMap
			this.isShowLayer = true
			this.getMap()
		},
		getCartAmount() {
			API.Cart()
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
		getOther() {
			API.ProductIndex({})
      .then((response)=>{
        if (response.data.error_code == 0) {
          this.prolist = response.data.hot_products ? response.data.hot_products.slice(0,3) : ''
        }
      })
		},
		recentlyProductType() {
      this.$router.push({
        path: '/product',
        query: {
          type: 'is_new'
        }
      })
    }
	},
	watch: {
    isShowLayer(newVal, oldVal) {
      if (newVal == true) {
        document.querySelector('.main').style.overflowY = "hidden";
      } else {
        document.querySelector('.main').style.overflowY = "auto";
      }
    },
    // '$route'() {
    // 	// this.getData()
    // 	document.querySelector('.main').scrollTop=0
    // }
  },
	mounted() {
		this.getData()
		this.getMap()
		this.type = this.typeList[0].Utility
		this.getHeight()
    this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
		
		this.getCartAmount()
		this.getOther()

		// document.documentElement.scrollTop = 0
	},
	updated() {
		this.getHeight()
	}
}
// 传图片名称的方法
function testPlugin(imgId,token){
	cordova.exec(testSuccess,testFailed,"testPlugin","testWithTitle",[imgId,token]);
}
function testSuccess() {}
function testFailed() {}
</script>
<style type="text/css" lang="scss">
.details .item-description{
	width: 100%; max-width: 100%; overflow: hidden; overflow-x: auto;
	img{
		max-height: 100%!important; max-width: 100%!important; width: 100%!important; height: 100%!important;
	}
	table, tr, td{
		width: 100%!important; height: 100%!important; max-height: 100%!important; max-width: 100%!important;
	}
}
</style>
<style scoped lang="scss">
.pad15{
	padding: 10px 15px 0;
}
.details{
	.rebate-box{
		background: #fff; padding: .5rem 0;
		ul{
			position: relative; padding: 0 .5rem; max-height: 180px; overflow: hidden; overflow-y: scroll;
			li{
				padding: .5rem 0; border-bottom: 1px solid #efefef; font-size: 1rem;
				&:last-child{
					border-bottom: 0;
				}
			}
		}
	}
	.com-bottom{
		margin-bottom: 2rem;
	}
	
	.mapwrap, .link-box{
			position: fixed; left: 50%; top: 50%; margin-left: -45%; transform: translate(0, -50%); width: 90%; z-index: 10;
			.mapinner, .linkinner{
				width: 100%; height: 100%; position: relative; overflow: hidden; border-radius: .3rem; background: #fff; padding: .6rem; border: 2px solid #ddd; z-index: 800;
			}
			.icon{
				position: absolute; left: 50%; top: -10px; margin-left: 13px;
				width:0; height:0; border-left:10px solid transparent; border-right:10px solid transparent; border-bottom:10px solid #ddd;
			}
		}
	.link-box{
		p{
			margin: .5rem 0;
			.comIcon{
				vertical-align: middle;
			}
			span{
				font-size: .9rem; margin-left: .5rem;
				i{
					display: block;
				}
			}
		}
	}
	.rebate-estimation{ 
		padding: 1.2rem 0 .5rem; border-bottom: 1px solid #e7e7e7; font-size: .8rem;
		
		h3{
			color: #008a00; font-size: 1.2rem; font-weight: 300;
		}
		.rebate-tit{
			font-size: .9rem; font-weight: bold; display: block;
			.fa{
				margin-left: 10px;
			}
		}
		.rebate-val{
			text-indent: 1em; padding: .5rem; font-size: .9rem;
		}
		.zip-code{
			margin: .5rem 0;
			.code-input{
				margin-left: 10px; width: 50%; outline: none; border: 0; border-bottom: 1px solid #879596; padding: .5rem; border-radius: 0; font-size: .9rem;
			}
			.iconx{
				position: relative; top: 3px;
			}
		}
		.utility{
			margin: .5rem 0;
			.rebate-tit{
				display: inline-block;
			}
		}
		.type{
			margin: .5rem 0;
			.rebate-tit{
				display: inline-block;
			}
		}
		.rebate-amount{
			margin: .5rem 0;
			.rebate-val{
				font-size: 1.2rem; color: #008a00;
			}
		}
	}
	
	.pro-name{
		text-overflow: ellipsis; overflow: hidden; white-space: nowrap;  
		a{
			color: #008296; font-size: .9rem;
		} 
	}
	h2.title{
		font-size: 1.1rem; font-weight: 400; text-rendering: optimizeLegibility; margin-bottom: .2rem; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;  display: -webkit-box;
	}
	.set-meal{
		position: relative; width: 100%; border-radius: .2rem; border: 2px solid #aab7b8; padding: .6rem .8rem; background: #eee;
		.meal-arrow{
			position: absolute; right: .5rem; top: 50%; margin-top: -.65rem;
		}
		.meal-info{
			width: 75%; color: #002F36; font-size: 1rem; line-height: 1.3rem;
			strong{
				font-size: .8rem
			} 
		}
	}
	.pro-price{
		position: relative; margin: .3rem 0;
		.money{
			font-size: 2rem; font-weight: 400;
			span{
				font-size: 1rem; vertical-align: .8rem;
			}
			i{
				font-size: 1rem; vertical-align: .8rem;
			}
		}
		.view-room{
			position: absolute;
			right: 2px;
			bottom: -20px;
			width: 70px;
			height: 46px;
			color: #012f03;
			text-align: center;
			font-size: 10px;
			padding: 4px 0px;
			cursor: pointer;
		}
		.pro-border{
			position: absolute;
			font-size: 18px;
			width: 14px;
			height: 14px;
		}
		.lt{
			top: 0px;
			left: 0px;
			border-left: 2px solid #31640c;
			border-top: 2px solid #31640c;
		}
		.lb{
			bottom: 0px;
			left: 0px;
			border-left: 2px solid #31640c;
			border-bottom: 2px solid #31640c;
		}
		.rt{
			right: 0px;top: 0px;
			border-right: 2px solid #31640c;
			border-top: 2px solid #31640c;
		}
		.rb{
			bottom: 0px;
			right: 0px;
			border-right: 2px solid #31640c;
			border-bottom: 2px solid #31640c;
		}
	}
	.in-stock{
		h3{
			color: #008a00; font-size: 1.2rem; font-weight: 300;
		}
		p{
			font-size: .8rem;
		}
	}
	.add-to-list{
		font-size: .8rem; line-height: 4rem; border-bottom: 1px solid #e7e7e7;
		a{
			color: #008296;
		}
	}
	.other-info{
		margin: 1rem 0;
		a{
			display: block; font-size: .8rem; line-height: 2.5rem; color: #008296;
		}
	}
	.share{
		border-top: 1px solid #e7e7e7; border-bottom: 1px solid #e7e7e7;
		a{
			display: block; font-size: .8rem; line-height: 4rem; color: #008296;
			.fa{
				margin-right: .4rem;
			}
		}
	}
	.add-order{
		.address{
			font-size: .8rem;
			span{
				position: relative; top: 4px;
			}
			a{
				color: #008296;
			}
		}
		.order-select{
			position: relative; border: 1px solid #ADB1B8; padding: .2rem 2rem .2rem 1.2rem; display: inline-block; font-size: 1rem; border-radius: .2rem; margin: 1rem 0; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset;
			.fa-angle-down{
				position: absolute; right: .6rem; top: 50%; transform: translateY(-50%);
			}
		}
		.order-update-input{
			border: 1px solid #ADB1B8; border-radius: .2rem; margin: 1rem 0; display: inline-block;
			input{
				padding: .5rem 1rem; border: 0; outline: none; background: transparent; width: 5.5rem; font-size: 1rem;
			}
		}
		.add-cart{
			background: #FAD000;
		}
		.buy-now{
			background: #f57124;
		}
		.view-room{
			position: relative; display: block; margin-left: auto; margin-right: auto; padding-left: 14px; padding-right: 14px; font-size: 18px; text-align: center; line-height: 2.33333333; border-radius: 5px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); overflow: hidden;margin-top: 15px;color: #000000; background: rgba(45,196,251,.53);
		}
	}
	.com-tit{
		font-weight: 400; font-size: 1.4rem; line-height: 2rem; margin-bottom: 1rem;
	}
	
	.a-box{
		border: 1px #EAEDED solid;
	}
	.com-arrow{
		position: absolute; right: .5rem; top: 50%; transform: translateY(-50%);
	}
	.frequently{
		margin-bottom: 1.5rem; position: relative;
		.a-box{
			display: block; background-color: #fff;
			.a-box-inner{
				position: relative; padding: 1rem;
				ul{
					display: table; height: 100%; margin:  auto;
					li{
						display: table-cell; vertical-align: middle;
						img{
							width: 70px; height: 70px;
						}
						&:after{
							content: "+"; margin: 0 10px 0 10px; font-weight: 700; color: #A5A3A3;
						}
						&:last-child:after{
							content: ""; margin: 0;
						}
					}
				}
			}
		}
		.expander-heading{
			margin-top: -1px; padding: .6rem .8rem; font-weight: 700; text-align: center; font-weight: 700; color: #002F36; font-size: 1.1rem; line-height: 1.8rem;
			a{
				display: block; position: relative;
			}
			i.expander-num{
				color: #CC1C39;
			}
			.fa{
				position: absolute; right: .5rem; top: 50%; transform: translateY(-50%);
			}
		}
		.expander-content{
			margin-top: -1px; position: relative;
			ul{
				color: #002F36;
				li{
					border-bottom: 1px solid #DDD;
					a{
						display: block; position: relative;
					}
					.expander-row{
						display: table-cell; width: 100%; border-radius: 0; padding-right: 33px;
						.checkbox-div{
							display: table-cell; min-width: 48px; position: relative;
							input{
								width: 50%; height: 100%; display: block; position: absolute; top: 0; left: 0; right: 0; margin: 0 auto;
							}
						}
						.textbox-div{
							display: table-cell; position: relative; color: #111; text-decoration: none; height: 100%; width: 100%; cursor: auto; border-left: 1px solid #DDD; padding: 9px 0 9px 17px;
							.textbox-tit{
								font-size: 1rem; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; max-height: 3.4em;

							}
							.textbox-price{
								color: #CC1C39; font-size:.9rem;
								.icon{
									height: 1.6rem; width: 4rem; vertical-align: middle; background: url(../../assets/img/bg/bg1.png) no-repeat; background-size: contain; display: inline-block;
								}
							}
						}
					}
				}
			}
			.total-price{
				text-align: center; padding: 13px 0; color: #6C7778; font-size:1rem;
				span{
					color: #CC1C39; white-space: nowrap; padding-left: 10px;
				}
			}
			.add-to-cart{
				.add-cart{
					width: 90%; margin-bottom: 13px; font-size: 1rem;
				}
			}
		}
	}
	.have-question{
		.text-wrapper{
			border: 1px solid #879596; position: relative; padding: 0; background-color: #fff; outline: none; padding: .5rem 1rem; margin-top:.5rem;
			.search-input{
				outline: none; border: 0; background: transparent; height: 100%; display: inline-block; font-size: 1.2rem; line-height: 25px; margin-left: 15px; width: 80%;
			}
			.fa{
				opacity: .3; font-size:2.5em;
			}
		}
	}
	.about-item{
		position: relative; margin-top: 1.2rem;
		.feature{
			display: block; position: relative; padding: .8rem; color: #002F36; font-size: 1rem;
			.fa{position: absolute; right: .5rem; top: 0;}
			h3{
				font-weight: 700; font-size: 1.3rem; line-height: 2.5rem;
			}
			.com-arrow{
				top: 0; transform: translateY(100%)
			}
			ul{
				margin: 0 0 .5rem 1.2rem;
			}
			li{
				list-style: disc; color: #949494;
				span{
					color: #002F36; 
				}
			}
		}
	}
	.pro-item{
		display: block; position: relative; padding: 5px 15px; overflow: hidden;
		.pro-img{
			width: 40%; text-align: center; margin-right: 15px;
			img{
				max-width: 100%; max-height: 200px;
			}
		}
		.pro-info{
			margin-top: 5px; overflow: hidden;
			.pro-description{
				display: -webkit-box; max-width: 100%; max-height: 6.66667em; margin: 0 auto; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 25px; font-size: 15px; color: #008296; font-size: 15px;
			}
			.pro-rater{
				color: #767676; font-size: 13px; line-height: 35px; position: relative;
				span{
					vertical-align: top;
				}
			}
			.customers-pro-price{
				color: #111; font-size: 20px; 
				.price-middle{
					font-size: 1rem; color: #CC1C39;
					.sup{
						font-size: .7em; position: relative; top: -.3em;
					}
					i{
						height: 1.6rem; width: 4rem; vertical-align: middle; background: url(../../assets/img/bg/bg1.png) no-repeat; background-size: contain; display: inline-block; margin-left: 5px;
					}
				}
			}
		}
	}
	.customers-more{
		a{
			display: block;
		}
		position: relative; padding: 1rem 1.5rem; color: #002F36; border: 1px #EAEDED solid; font-size: 1rem;
	}
	.customer-reviews{
		position: relative;
		.a-box{
			margin-top: -1px; padding: .8rem; position: relative;
			.com-arrow{
				 top: 0; transform: translateY(100%);
			}
			h4{
				color: #002F36; font-weight: 600; font-size: 1.2rem;
			}
		}
		.reviews{
			position: relative;
			span{
				font-size: .8rem; color: #002F36; margin-left: 10px;
			}
		}
		.customer-images{
			.show-img{
				font-size: 0;
				img{
					width: 20%; margin-right: 2.5%;
				}
			}
		}
		.read-reviews{
			.read-btn{
				display: block; float: left; background-color: #D7E8EA; padding: 0px 14px; line-height: 40px; margin: 0px 10px 13px 0px; border-bottom: solid 1px #969696; font-size: 16px; color: #111111;
			}
			.see-more{
				display: block; font-size: 15px; color: #008296; margin: .8rem 0 0 0; font-weight: bold;
			}
		}
		.top-reviews{
			h4{
				margin-bottom: 1rem;
			}
			.reviewText{
				font-size: 1rem; 
			}
			.reviewer{
				font-size: .8rem;
				span{
					color: #008296;
				}
			}
			.section-reviews{
				margin: .8rem 0;
				a{
					position: relative; display: block; padding-right: 2rem;
					.com-arrow{
						right: 0; transform: translateY(0);
					}
				}
			}
		}
		.all-reviews{
			font-weight: 300;
		}
		.write-reviews{
			margin: 1rem 0 2rem; background: #EAEDED;border-color: #AAB7B8; border-radius: .2rem;
		}
	}
	.select-num{
		position: fixed; min-width: 50%; max-width: 75%; margin: 0 auto; border-radius: .3rem; background: #fff; z-index: 10; top: 50%; left: 50%; transform: translateX(-50%); box-shadow: 0 0.4rem 0.6rem rgba(0,0,0,.25); overflow: hidden;
		.popover-header{
			position: relative; padding: 1rem; background: #f0f0f0; border: 1px solid #cdcdcd; border-radius: .3rem .3rem 0 0;
			h4{
				font-weight:bold; font-size: 1rem;
			}
			.popver-close{
				position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
			}
		}
		.popover-scroll{
			position: relative; text-align: left; overflow-y: auto; 
			li{
				border-bottom: 1px solid #e7e7e7;
				a{
					padding: 1rem; display: block; white-space: normal; outline: 0; -webkit-touch-callout: none; font-size: .8rem;
				}
				a.active{
					background-color: #f6f6f6; border-left: .3rem solid #e77600;
				}
				&:last-child{
					border-bottom: 0;
				}

			}
		}
	}
	.layer{
		position: fixed; top: 0; left: 0; height: 0; width: 100%; background: #000; opacity: 0; z-index: 5; transition: opacity .1s;
	}
	.layerOn{
		opacity: .6; height: 100%;
	}
	.meal-layer, .rebate-box{
		position: fixed; right: 0; left: 0; bottom: 0; z-index: 10; width: 100%; transition-duration: .3s; transition-property: all; transition-timing-function: ease-out; transform: translateY(100%); opacity: 0;
		&.show{
			transform: translateY(0); opacity: 1;
		}
		.meal-sure{
			font-weight: bold; font-size: .8rem; float: right; z-index: 15; padding: 1rem 0; color: #fff; display: block; padding-right: 2rem;
		}
		.meal-content{
			background: #fff; overflow: auto; width: 100%;
			p{
				font-size: 1rem; font-weight: 300; color: #111; padding: .3rem .5rem;
				span{
					color: #767676;
				}
			}
			a{
				display: inline-block; border-radius: 2px; border: 1px solid #bfbfbf; padding: .5rem; margin-left: .6rem; background: #fff; 
				&:last-child{
					margin-right: .6rem;
				}
			}
			a.active{
				border: 1px solid #ffa633; background: #fff5e8;
			}
		}
		.meal-scroll{
			height: 100%; padding-top: .3rem;
		}
		.scroll-main{
			position: relative; overflow: hidden; overflow-x: scroll; width: 100%; white-space: nowrap; -webkit-overflow-scrolling: touch; padding: .3rem 0 1rem;
			.scroll-img{
				width: 110px; margin-bottom: .6rem;
			}
			.text-normal{
				font-size: .9rem;
			}
			.scroll-pp{
				position: relative;
				.money{
					font-size: 1.5rem; font-weight: 400;
					span{
						font-size: .4rem; vertical-align: .8rem;
					}
					i{
						font-size: .4rem; vertical-align: .8rem;
					}
				}
				.in-stock{
					color: #008a00;
				}
			}
			
		}
	}
}
</style>
<style lang="scss">
#map{
	img{
		max-height: none!important; max-width: none!important;
	}
	.anchorBL{display: none;}
}
.com-pro-rater{
	.vux-rater-box{
		background: url(../../assets/img/bg/start_none.png) no-repeat; background-size: contain; text-indent: -999999px;
	}
	.vux-rater-box.is-active{
		background: url(../../assets/img/bg/start_all.png) no-repeat; background-size: contain;
	}
}
.details{
	.slides{
		text-align: center; overflow: visible; margin: .5rem 0 2rem;
		&.vux-slider > .vux-indicator{
			bottom: -25px;	
		}
		.vux-indicator .vux-icon-dot.active{
			background-color: #6c7778;
		}
	}
	.pro-rater{
		color: #008296; font-size: .9rem; line-height: 30px; position: relative;
		span{
			vertical-align: top;
		}
	}
}
</style>