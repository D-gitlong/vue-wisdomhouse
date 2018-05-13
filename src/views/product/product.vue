<template>
	<div>
		<div class="product">
			<h2>Try Wisdom House Prime today and get unlimited fast, FREE shipping</h2>
			<div class="line"></div>
			<!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
			<!-- <div v-scroll="loadMore"> -->
				<router-link :to="{ name: 'details', params: { id: item.id } }" :key="item.id" class="pro-item" v-for="item in prolist">
					<div class="pro-img fl">
						<img src="../../assets/img/error.png" v-if="!item.default_photo" />
						<img v-if="item.default_photo" v-lazy="item.default_photo.thumb" />
					</div>
					<div class="pro-info">
						<div class="pro-name">{{item.name}}</div>
						<div class="pro-description">{{item.short_description}}</div>
						<div class="pro-rater com-pro-rater">
							<rater v-model="item.good_rand" disabled :font-size="20" :max="5" active-color="#fad000"></rater>
							<span class="rater-num">{{item.comment_count}}</span>
						</div>
						<div class="pro-price">
							<div class="price-middle"><span class="sup">$</span>{{item.shop_price|fmoney}}<i v-if="isMember"></i></div>
						</div>
					</div>
				</router-link>
			<!-- </div> -->
			<div class="not-content" v-if="isContent">There is no product</div>
		</div>
	</div>
</template>

<script>
	import API from '@/api/api'
	import { Rater, Loading } from 'vux'
	import { mapState, mapGetters, mapActions } from 'vuex'
	import '@/util/directive.js'

	export default {
		name: 'product',
		data () {
			return{
				prolist: [],
				isMember: false,
				busy: false,
				page: 1,
				per_page: 10,
				isContent: false
			}
		},
		components: {
			Rater,
			Loading
		},
		methods: {
			getProList(flag) {
				if (this.$route.query.type) {
					API.ProductIndexType({
	          type: this.$route.query.type
	        })
	        .then((response)=>{
	          if (response.data.error_code == 0) {
				    	if (flag) {
				    		this.prolist = this.prolist.concat(response.data.products)
				    		if(response.data.paged && response.data.paged.more == 0){
	                this.busy = true;
	                this.isContent = true
	              }else{
	                this.busy = false;
	              }
				    	}else{
				    		this.prolist = response.data.products
				    		this.busy = false;
				    		this.$vux.loading.hide()
				    	}
			    	}
					})
				}else{
					let currentSortKey = this.$route.query.sortKey ? this.$route.query.sortKey : 0
					let currentSortValue = this.$route.query.sortValue ? this.$route.query.sortValue : 0
					let currentKeyword = this.$route.query.keyword ? this.$route.query.keyword : 0
					let navTitle = this.$route.query.navTitle
					let navStyle = this.$route.query.navStyle ? this.$route.query.navStyle : 'default'
					let currentCategory = this.$route.query.category

					let params = {}
					if (currentCategory) {
						params.category = currentCategory
					}
					if (currentKeyword) {
						params.keyword = currentKeyword
					}
					params.sort_key = currentSortKey;
	        params.sort_value = currentSortValue;
	        params.page = this.page;
	        params.per_page = this.per_page;

					API.ProductList(params)
					.then((response)=>{
						if (response.data.error_code == 0) {
				    	if (flag) {
				    		this.prolist = this.prolist.concat(response.data.products)
				    		if(response.data.products.length == 0){
	                this.busy = true
	                this.isContent = true
	              }else{
	                this.busy = false
	              }
				    	}else{
				    		this.prolist = response.data.products
				    		this.busy = false
				    		this.$vux.loading.hide()
				    	}
			    	}
					})
				}
			},
			loadMore() {
				this.busy = true
      	this.$vux.loading.show({
					text: 'Loading'
				})
	      setTimeout(() => {
	        this.page++
	        this.getProList(true)
	        this.$vux.loading.hide()
	        
	      }, 1000)
	    },
	    infiniteScroll() {
	    	let sTop = document.documentElement.scrollTop || document.body.scrollTop || document.querySelector('.main').scrollTop
	    	if(sTop + window.innerHeight >= document.querySelector('.product').clientHeight) {
          if (!this.busy) {
          	this.loadMore()
          }
        }
	    }
		},
		beforeRouteEnter (to, from, next) {
	    next(vm=>{
	    	window.addEventListener('scroll', vm.infiniteScroll, true)
	    })
	  },
		beforeRouteLeave (to, from, next) {
	    window.removeEventListener('scroll', this.infiniteScroll, true)
	    next()
	  },
		watch: {
			'$route' (to, from) {
				if ( (to.query.category && from.query.category) && to.query.category != from.query.category || this.$route.query.type) {
					document.documentElement.scrollTop = 0
					document.body.scrollTop = 0
					this.page = 1
					this.getProList(false)
					this.$vux.loading.show({
						text: 'Loading'
					})
				}	    
		  }
		},
		mounted() {
			window.addEventListener('scroll', this.infiniteScroll, true)
			this.$store.dispatch('isShowSearch',false)
			this.$store.dispatch('isShowBack',true)
			this.$vux.loading.show({
				text: 'Loading'
			})
			this.getProList(false)
		}
	}
</script>

<style scoped lang="scss">
.main{ position: relative; }
.product{
	background: #fff;
	h2{
		padding: 15px; font-size: 20px; line-height: 30px;
	}
	.line{
		border-bottom: 1px solid #e3e3e3; margin: 0 15px 5px;
	}
	.not-content{
		text-align: center; font-size: 1rem; color: #111; margin: 1rem 0 1.5rem;
	}
	.pro-item{
		display: block; position: relative; padding: 15px; overflow: hidden;
		&:after{
			display: block; content: "."; padding: 10px 15px 0 15px; border-bottom: 1px solid #e3e3e3; clear: both;
		}
		&:last-child:after{
			border-bottom: 0;
		}
		.pro-img{
			width: 40%; text-align: center; margin-right: 15px;
			img{
				max-width: 100%; max-height: 200px;
			}
		}
		.pro-info{
			margin-top: 5px; overflow: hidden;
			.pro-name{
				color: #767676; font-size: 15px; line-height: 30px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
			}
			.pro-description{
				display: -webkit-box; max-width: 100%; margin: 0 auto; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 25px; font-size: 15px; color: #111; font-size: 15px;
			}
			.pro-rater{
				color: #767676; font-size: 13px; line-height: 30px; position: relative;
				span{
					vertical-align: top;
				}
			}
			.pro-price{
				color: #111; font-size: 20px; margin-top: 5px; line-height: 30px;
				.price-middle{
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
}
</style>
<style lang="scss" type="text/css">
.com-pro-rater{
	.vux-rater-box{
		background: url(../../assets/img/bg/start_none.png) no-repeat; background-size: contain; text-indent: -999999px;
	}
	.vux-rater-box.is-active{
		background: url(../../assets/img/bg/start_all.png) no-repeat; background-size: contain;
	}
}

</style>