<template>
	<div class="order">
		<div class="order-subtotal" v-if="!isEmpty">
			<h3>Cart subtotal (<span class="order-num">{{totalCount}}</span> items): <span class="amount">${{totalMoney>0?totalMoney:'0' | fmoney}}</span>
			</h3>
			<div class="order-tips">
				<icon icon-style="iconx" icon-class="dagou1"></icon>
				<div class="text-tips"><span>Your order qualifies for FREE Shipping</span> Choose this option at checkout.</div>
			</div>
		</div>
		
		<div v-if="!isEmpty" :class="isFixed ? 'proceed-fixed' :''" class="proceedBtn">
			<a @click="submit()" class="proceed-checkout">Proceed to checkout</a>
		</div>
		<div v-if="!isEmpty" class="cartList">
			<div class="order-item" :key="item.id" v-for="item in cartList">
				<div :key="childItem.goods_id" v-for="(childItem, index) in item.goods">
					<a :href="'#/details/'+childItem.goods_id" class="order-link">
						<div class="order-img">
							<img :src="childItem.product.default_photo.thumb" />
						</div>

						<div class="order-right">
							<h4 class="tit">{{childItem.product.name}}</h4>
							<p class="price">${{childItem.total_price | fmoney}}</p>
							<p>{{childItem.property}}</p>
							<p class="in-stock">In Stock</p>
							<p class="free-shipping">Eligible for FREE Shipping</p>
						</div>
					</a>
					<div class="order-handle">
						<a href="javascript:void(0);" v-show="!(isPassNum[index]?isPassNum[index]:false)" @click="showSelect(childItem,index)" class="order-update">{{dataCount[index]?dataCount[index]:1}}<i class="fa fa-sort"></i></a>

						<span v-show="isPassNum[index]?isPassNum[index]:false" @click="updateNum($event,childItem,index)" class="order-update-input"><input type="number" class="numberInput" ref="input" :value="dataCount[index]?dataCount[index]:1" /></span>

						<a href="javascript:void(0);" @click="deleteBtn(childItem.id,index)" class="order-delete">Delete</a>
						<!-- <a href="javascript:void(0);" class="order-save">Save for later</a> -->
					</div>
				</div>
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
					<li v-for="val in selectNum"><a @click="changeVal(val,$event)" :class="{active: val == (num || 1)}" href="javascript:void(0);">{{val}}</a></li>
				</ul>
			</div>
		</div>

		<div class="layer" :class="isShowLayer? 'layerOn' : ''" @click="hideBox"></div>

		<div class="empty-item" v-if="isEmpty">
      <img class="item-logo" src="../../assets/img/icon-cart-empty.png"/>
      <div class="item-text">Your shopping cart is empty</div>
      <div class="item-button" @click="goHome()">Look around</div>
    </div>
	</div>
</template>

<script>
	import API from '@/api/api'
	import icon from '@/components/icon.vue'
	import '@/util/directive.js'
	export default {
		name: 'cart',
		data() {
			return{
				cartList:[],
				isFixed: false,
				top: 44,
				realH: 0,
				marginT: 0,
				num: 1,
				dataCount: [],
				n: 0,
				id: '',
				isPassNum: [],
				selectNum:[1,2,3,4,5,6,7,8,9,'10+'],
				isShowSelect: false,
				isShowLayer: false,
				focusState: false,
				totalMoney: 0,
  			totalCount: 0,
  			isEmpty: false
			}
		},
		components: {
			icon
		},
		mounted() {
			this.$store.dispatch('isShowSearch',false)
			this.$store.dispatch('isShowBack',true)
			this.getHeight()
			this.$vux.loading.show({
				text: 'Loading'
			})
			this.getCartList()
		},
		watch: {
	    isShowLayer(newVal, oldVal) {
	      if (newVal == true) {
	        document.querySelector('.main').style.overflowY = "hidden";
	      } else {
	        document.querySelector('.main').style.overflowY = "auto";
	      }
	    },
	    isPassNum(newVal, oldVal){
	    	if (newVal) {
	    		let that = this
	    		setTimeout(function() {
	    			API.Cart()
	    			.then((response)=>{
	    				if (response.data.error_code == 0) {
	    					that.cartList = response.data.goods_groups
	    				}
	    			})
	    		},500)
	    	}
	    }
	  },
		methods: {
			getAllMoney() {
				this.totalMoney=0
  			this.totalCount=0
  			if (this.cartList.length > 0) {
  				// 计算汇总金额和数量
		  		this.cartList.forEach((el)=>{
		  			if (el.goods.length > 0) {
		  				el.goods.forEach((el)=>{
				  			this.totalCount += parseInt(el.amount)
				  			this.totalMoney = this.totalMoney+(parseFloat(el.price) * parseInt(el.amount))
				  			this.$store.dispatch('getCartCount', this.totalCount)
				  		})
		  			}else{
		  				this.isEmpty = true;
		  				this.$store.dispatch('getCartCount', 0)
		  			}
		  		})
  			}else{
  				this.isEmpty = true;
  			}
			},
			getCartList() {
				API.Cart()
				.then((response)=>{
					if (response.data.error_code == 0) {
						this.$vux.loading.hide()
						let that = this
		    		this.cartList = response.data.goods_groups
		    		this.cartList.forEach((el)=>{
		    			el.goods.forEach((el,i)=>{
			    			this.dataCount[i] = el.amount
			    			this.isPassNum[i] = el.amount > 9 ? true : false
			    		})
		    		})
		    		this.getAllMoney()
					}
				})
			},
			deleteBtn(id,index) {
				API.Delete({
					good: Number(id)
				})
				.then((response)=>{
					if (response.data.error_code == 0) {
						this.$vux.toast.text('Delete success', 'middle')
						this.cartList.forEach((el,index)=>{
							el.goods.splice(index,1)
		    		})
						this.getAllMoney()
					}else{
						this.$vux.toast.text('Delete failure', 'middle')
					}
					this.cartList.forEach((el)=>{
	    			el.goods.forEach((el,i)=>{
		    			this.dataCount[i] = el.amount
		    			this.isPassNum[i] = el.amount > 9 ? true : false
		    		})
	    		})
				})

			},
	    getHeight() {
				let winH = document.documentElement.clientHeight - 46
				let headerH = document.querySelector('#header-fixed').offsetHeight
				let allH = document.querySelector('.select-num').offsetHeight
				let realH = winH-headerH
				this.realH = ((realH + 59) * .6) + "px"
				let result = this.$store.getters.isShowSearch ? -(allH/2-44) : -(allH/2)
				this.marginT = result + "px"
			},
			hideBox() {
				this.isShowSelect = false
				this.isShowLayer = false
			},
			updateNum(e,item,index) {
				let that = this
				e.target.onblur = function(){
					API.UpdateCar({
						good: item.id,
						amount: this.value
					})
					.then((res)=>{
						if (res.data.error_code == 0) {
							that.$vux.toast.text('Edit success', 'middle')
							that.$set(that.dataCount, index, this.value)
							if (this.value > 9) {
								that.$set(that.isPassNum, index, true)
							}else{
								that.$set(that.isPassNum, index, false)
							}
							setTimeout(function(){
								that.getAllMoney()
							},800)
						}else{
							that.$vux.toast.text('Edit failure', 'middle')
						}
					})
				}
			},
			changeVal(val,e) {
				let that = this
				if (val <= 9) {
					this.$set(this.isPassNum, this.n, false)
					this.num = val
					this.dataCount[this.n] = val
					API.UpdateCar({
						good: this.id,
						amount: val
					})
					.then((res)=>{
						if (res.data.error_code == 0) {
							this.$vux.toast.text('Edit success', 'middle')
							this.dataCount[this.n] = val
						}else{
							this.$vux.toast.text('Edit failure', 'middle')
						}
					})
					setTimeout(function(){
						that.getAllMoney()
					},800)
				}else{
					this.$set(this.isPassNum, this.n, true)
					this.$refs.input.forEach((el,i)=>{
            document.querySelectorAll('.numberInput')[that.n].focus()
            document.querySelectorAll('.numberInput')[that.n].click()
     			});
				}
				this.isShowSelect = false
				this.isShowLayer = false
				
			},
			showSelect(item,index) {
				this.id = item.id
				this.n = index
				this.num = this.dataCount[index]
				this.isShowSelect = true
				this.isShowLayer = true
			},
			submit() {
				this.$router.push({
					path: '/selectAddress',
					query: this.cartList
				})
			}
		},
		beforeUpdate() {
			this.num = this.dataCount[this.n]
		},
		updated() {
			this.getHeight()
		}
	}
</script>

<style scoped lang="scss">
.order{
	.empty-item{
		position: absolute;
		left: 50%;
		top: 50%;
		width: 80%;
		transform: translate(-50%, -50%);
		text-align: center;
		font-size: 1.2rem;
    color: #111;
		.item-logo{
			width: 40%;
		}
		.item-button{
			margin: 1rem auto;
	    padding: .5rem 0;
	    text-align: center;
	    font-size: 1rem;
	    border: 1px solid #ADB1B8;
	    border-radius: .2rem;
	    background: -webkit-gradient(linear, left top, left bottom, from(#f7f8fa), to(#e7e9ec));
	    background: linear-gradient(to bottom, #f7f8fa, #e7e9ec);
		}
	}
	.proceed-checkout{
		display: block; background: linear-gradient(to bottom,#f7dfa5,#feb800); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: .8rem 0; border: 1px solid #b18007; margin: 1rem;
	}
	.order-subtotal{
		padding: 0 1rem; margin-top: 1rem;
		h3{
			font-size: 1.2rem; color: #111;
			.amount{
				color: #B12704; font-weight: bold;
			}
		}
		.order-tips{
			position: relative; padding-left: 25px;
			.comIcon{
				position: absolute; left: 0; top: 0; 
			}
			.text-tips{
				font-size: .9rem; color: #555;
				span{
					color: #007600;
				}
				.see-details{
					color: #0066c0;
				}
			}
		}
		
	}
	.cartList{
		padding: 0 1rem; border-top: 1px solid #ddd; padding: 0 1rem;
		.order-item{
			&:last-child{
				border-bottom: 0;
			}
			padding: .8rem 0; border-bottom: 1px solid #ddd; overflow: hidden;
			.order-link{
				display: block; overflow: hidden;
				.order-img{
					width: 30%; float: left; margin-right: 3%;
				}
				.order-right{
					width: 67%; float: left;
					h4.tit{
						font-weight: 700; font-size: 1rem; 
					}
					.price{
						font-size: .9rem; color: #B12704;
					}
					.in-stock{
						color: #008a00; font-size: .8rem;
					}
					.free-shipping{
						font-size: .8rem;
					}
				}
			}
			.order-handle{
				clear: left;
				a{
					position: relative; border: 1px solid #ADB1B8; padding: .5rem 1rem; display: inline-block; border-radius: .2rem; margin: 1rem 0; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; margin-right: .8rem; font-size: .8rem;
				}
				.order-update{
					padding: .5rem 3.5rem .5rem 1.2rem;
				}
				.order-update-input{
					border: 1px solid #ADB1B8; border-radius: .2rem; margin-right: .8rem; font-size: .8rem; display: inline-block;
					input{
						padding: .6rem 1rem; border: 0; outline: none; background: transparent; width: 5rem; font-size: .9rem;
					}
				}
				.fa-sort{
					position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); opacity: .8;
				}
			}
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
}
</style>