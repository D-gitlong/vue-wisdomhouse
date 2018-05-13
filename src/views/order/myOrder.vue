<template>
	<div class="order">
		<h2>Your Orders</h2>
		<div class="line"></div>
		<!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
			<a :key="item.id" class="order-item" v-for="(item,index) in orderlist">
				<div v-for="goods in item.goods">
					<div @click="goMyOrder(item.id)" class="clearfix">
						<div class="order-img fl">
							<img :src="goods.product.photos[0].large" />
						</div>
						<div class="order-info">
							<div class="order-name">{{goods.product.name}}</div>
							<div>{{goods.property}}</div>
							<div style="font-weight: bold;">${{goods.product_price ||'0' | fmoney}}</div>
							<div class="date">
								Order date: {{item.created_at | formatDate}}
							</div>
						</div>
					</div>
					
				</div>
				<div class="buy-btn">
					<a class="btn1" @click="Pay(item.id)" v-if="item.status == 0">Payment</a>
					<a class="btn1" @click="Confirm(item.id)" v-if="item.status == 2">Confirmation of receipt</a>
					<a class="btn1" @click="Comment(item.id)" v-if="item.status == 3">Evaluate</a>
					<!-- <a class="btn1" @click="AgainBuy(item)" v-if="item.status == 3 || item.status == 4">Buy again</a> -->
					<a class="btn2" @click="Cancel(item.id,index)" v-if="item.status == 0">Cancellation of order</a>
					<a class="btn2" @click="DelOrder(item.id)" v-if="item.status == 3 || item.status == 4 || item.status == 5">Delete order</a>
					<!-- <a class="btn2" v-if="item.status == 2 || item.status == 3 ||item.status == 4">Look at the logistics</a> -->
				</div>
			</a>
		<!-- </div> -->
		<div class="not-content" v-if="isContent">There is no order</div>
	</div>
</template>
<script>
import API from '@/api/api'
import '@/util/directive'
import {formatDate} from '@/util/tool'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
	name: 'myOrder',
	data () {
		return{
			orderlist: [],
			page: 1,
			busy: false,
			isContent: false
		}
	},
	filters: {
    formatDate(time) {
      var date = new Date(time*1000);
      return formatDate(date, "yyyy-MM-dd h:m:s");
    }
  },
	methods: {
		loadMore: function() {
      this.busy = true
      this.$vux.loading.show({
				text: 'Loading'
			})
      setTimeout(() => {
        this.page++
        this.getOrderList(true)
        this.$vux.loading.hide()
      }, 1000)
    },
    infiniteScroll() {
    	let sTop = document.documentElement.scrollTop || document.body.scrollTop
    	if(sTop + window.innerHeight >= document.querySelector('.main').clientHeight) {
        if (!this.busy) {
        	this.loadMore()
        }
      }
    },
    getOrderList(flag) {
    	API.MyOrder({
				page: this.page,
				per_page: 10
			}).then((response)=>{
				if (response.data.error_code == 0) {
		    	if (flag) {
		    		this.orderlist = this.orderlist.concat(response.data.orders)
		    		if(response.data.paged && response.data.paged.more == 0){
              this.busy = true
              this.isContent = true
            }else{
              this.busy = false;
            }
		    	}else{
		    		this.orderlist = response.data.orders
		    		this.busy = false;
		    		this.$vux.loading.hide()
		    	}
	    	}
			})	
    },
    goMyOrder(orderId) {
    	this.$router.push({
				path: '/orderDetails',
				query: {
					order: orderId
				}
			})
    },
    Pay(orderId) {
    	this.$router.push({
				name: 'selectPaymethod',
				params: {
					order: orderId
				}
			})
    },
    Confirm(orderId) {
    	API.Confirm({
				order: orderId,
			}).then((response)=>{
				if (response.data.error_code == 0) {
		    	this.$router.push({
						path: '/orderDetails',
						query: {
							order: orderId
						}
					})
	    	}
			})	
    },
    Cancel(orderId,index) {
    	let that = this
    	this.$vux.confirm.show({
        title: 'Confirmation of cancellation',
        content: 'Whether to cancel the order or not',
        confirmText: 'confirm',
        cancelText: 'cancel',
        onCancel () {},
        onConfirm () {
          API.CancelOrder({
						order: Number(orderId),
						reason: 1
					}).then((response)=>{
						if (response.data.error_code == 0) {
				    	that.orderlist.splice(index,1)
							that.$vux.toast.text('Cancel success', 'middle')
			    	}else{
			    		that.$vux.toast.text('Cancel fail', 'middle')
			    	}
					})
        }
      })
    },
    Comment(orderId) {
    	this.$router.push({
				name: 'writeReview',
				params: {
					order: orderId
				}
			})
    },
    DelOrder(orderId) {
    	API.DeleteOrder({
				order: Number(orderId),
			}).then((response)=>{
				if (response.data.error_code == 0) {
		    	this.orderlist.splice(index,1)
					this.$vux.toast.text('Delete success', 'middle')
	    	}
			})
    },
    AgainBuy(order) {
    	let goods = order.goods;
      let attrs = goods[0].propertyId.split(',')
      let amount = goods[0].total_amount;
      if (goods.length == 1) {
      	API.AddCart({
      		product: goods[0].id, 
      		property: JSON.stringify(attrs), 
      		amount: amount
      	})
				.then((response)=>{
					if(response.data.error_code == 0){
	 					this.$vux.toast.text('Added to cart', 'middle')
	 					this.$router.push({
	 						path: '/cart'
	 					})
	 				}
				})
      }else if(goods.length > 1){
      	goods.map((el,index)=>{ 
      		attrs = el.propertyId.split(',')
      		API.AddCart({
      			product: el.id, 
      			property: JSON.stringify(attrs), 
      			amount: el.total_amount
      		})
					.then((response)=>{
						if(response.data.error_code == 0){
		 					this.$vux.toast.text('Added to cart', 'middle')
		 					this.$router.push({
		 						path: '/cart'
		 					})
		 				}
					})
      	})
      }
    	/*let attrs = [].concat(this.currentAttrs).concat(this.optionalAttrs);
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
			})*/
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
	mounted() {
		window.addEventListener('scroll', this.infiniteScroll, true)
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
		this.getOrderList(false)
		
	}
}
</script>
<style scoped lang="scss">
.order{
	background: #fff;
	h2{
		padding: 15px; font-size: 20px; line-height: 30px;
	}
	.line{
		border-bottom: 1px solid #e3e3e3; margin: 0 15px;
	}
	.not-content{
		text-align: center; font-size: 1rem; color: #111; margin: 1rem 0 1.5rem;
	}
	.buy-btn{
		text-align: right;
		margin-top: .8rem;
		a{
			margin: 0 .2rem;
		}
		.btn1{
			display: inline-block;
			background: -webkit-gradient(linear, left top, left bottom, from(#f7dfa5), to(#feb800));
	    background: linear-gradient(to bottom, #f7dfa5, #feb800);
	    -webkit-box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.4) inset;
	    box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.4) inset;
	    border-radius: .2rem;
	    font-size: .8rem;
	    text-align: center;
	    padding: .4rem .8rem;
	    border: 1px solid #b18007;
		}
		.btn2{
			display: inline-block;
			border: 1px solid #ADB1B8;
	    padding: .4rem .8rem;
	    display: inline-block;
	    border-radius: .2rem;
	    background: -webkit-gradient(linear, left top, left bottom, from(#f7f8fa), to(#e7e9ec));
	    background: linear-gradient(to bottom, #f7f8fa, #e7e9ec);
	    -webkit-box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.6) inset;
	    box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.6) inset;
	    font-size: .8rem;
		}
	}
	.order-item{
		display: block; position: relative; padding: 15px; overflow: hidden; border-bottom: 1px solid #e3e3e3;
		&:last-child{
			border-bottom: 0;
		}
		.order-img{
			width: 25%; text-align: center; margin-right: 15px;
			img{
				max-width: 100%; max-height: 90px;
			}
		}
		.order-info{
			position: relative; top: 50%; left: 0; overflow: hidden; font-size: .9rem; color: #000;
			.order-name{
				color: #111; font-size: 1rem; font-weight: bold; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;
			}
			.date{
				color: #666; font-size: .9rem; margin-top: .2rem;
			}
		}
	}
}
</style>
