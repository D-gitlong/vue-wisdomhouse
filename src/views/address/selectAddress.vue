<template>
	<div class="selectAddress">
		<div class="ship-header common-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
			Select a shipping address
		</div>
		<div class="content">
			<div class="shipList">
				<div class="shipItem" v-for="(item, index) in shipList" :key="item.id" :class="[item.is_default ? 'on' : '']">
					<div class="shipInfo" @click="defaultAddress(item.id)">
						<span class="selectIcon"></span>
						<ul>
							<li>{{item.name}}</li>
							<li :key="region.id" v-for="region in item.regions">
								{{region.name}}
							</li>
							<li class="phone">Phone: {{item.mobile}}</li>
						</ul>
					</div>
					<div class="shipBottom">
						<a @click="comfirmOrder(item.id)" class="deliver">Deliver to this address</a>
						<div class="shipHandle">
							<a @click="goShipAddress(item)" class="fl">Edit</a>
							<a @click="deleteAddress(item.id,index)" class="fr">Delete</a>
						</div>
					</div>
				</div>
				<div class="shipItem">
					<a href="#/shipAddress" class="addAddress">Add a New Address<i class="fa fa-angle-right fa-lg"></i></a>
				</div>
				<div class="shipItem">
					<a href="javascript:void(0);" class="mulAddress">Ship to multiple addresses<i class="fa fa-angle-right fa-lg"></i></a>
				</div>
			</div>
		</div>

		<div class="finish">
      <span>or</span>
    </div>
    <!-- <a href="#/cart" class="goShop">Cancel and continue shopping</a> -->
	</div>
</template>

<script>
import API from '@/api/api'
export default {
	name: 'selectAddress',
	data() {
		return{
			shipList: [],
			num: 0
		}
	},
	methods: {
		cancel(){
			this.$router.go(-1)
		},
		defaultAddress(id) {
			API.ConsigneeSetDefault({
				consignee: id
			}).then((res)=>{
				if ( res.data.error_code == 0 ) {
					this.shipList.forEach(function(val, index){
						if (val.id == id) {
							val.is_default =  true
						}else{
							val.is_default =  false
						}
					})
					this.$vux.toast.text('Setting success', 'middle')
				}
				else {
					this.$vux.toast.text('Setting failure', 'middle')
				}
			})
		},
		goShipAddress(item) {
			this.$router.push({
				path: '/shipAddress',
				query: {
					consignee: item
				}
			})
		},
		deleteAddress(id,index) {
			API.ConsigneeDelete({
				consignee: id
			}).then((response)=>{
				if (response.data.error_code == 0) {
					this.shipList.splice(index,1)
					this.$vux.toast.text('Delete success', 'middle')
				}
			})
		},
		comfirmOrder(id) {
			if (this.$route.query[0] && this.$route.query[0].goods) {
				let goods = this.$route.query[0].goods
				let goodsIds = []
				for (let i = 0; i < goods.length; ++i) {
					goodsIds.push(goods[i].id);
				}

				API.CartPurchase({
					shop: 1,
					consignee: id ? id : null,
					cart_good_id: goodsIds ? JSON.stringify(goodsIds) : null,
					shipping: 1
				})
				.then((response)=>{
					if (response.data.error_code == 0) {
						this.$router.push({
							name: 'selectPaymethod',
							params: {
								order: response.data.order.id
							}
						})
						this.$store.dispatch('getCartCount', 0)
					}
				})
			}else{
				API.Purchase({
					product: this.$route.query.product,
					property: this.$route.query.property,
					amount: this.$route.query.amount,
					consignee: id,
					shipping: 1
				})
				.then((response)=>{
					if (response.data.error_code == 0) {
						this.$router.push({
							name: 'selectPaymethod',
							params: {
								order: response.data.order.id
							}
						})
					}
				})
			}
			
		}
	},
	mounted() {
		API.Consignee({}).then((response)=>{
			if (response.data.error_code == 0) {
				this.shipList = response.data.consignees
			}
		})
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.selectAddress{
	background: #f6f6f6; height: 100%;
	.ship-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold; text-align: center; color: #fff; line-height: 36px;
		.ship-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.content{
		padding: 1rem; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; -webkit-overflow-scrolling: touch; background: #f6f6f6;
		.shipList{
			width: 100%; border: 1px solid #ccc; border-radius: .2rem; background: #fff;
			.shipItem{
				position: relative; padding: .8rem; border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: 0;
				}
				a{display: block;}
				ul{
					padding-left: 2.2rem;
					li{
						font-size: 1rem; font-weight: 300; line-height: 1.5rem;
						&:first-child{ font-weight: bold;}
					}
					.phone{display: none;}
				}
				.shipInfo{
					position: relative;
					.selectIcon{
						position: absolute; top: 50%; margin-top: -12.5px; width: 23px; height: 23px; background: url(../../assets/img/bg/bg2.png) no-repeat; background-size: contain; display: inline-block;
						
					}
				}
				&.on{
					.selectIcon{
						background: url(../../assets/img/bg/bg2_on.png) no-repeat; background-size: contain;
					}
					.shipBottom, .phone{
						display: block;
					}
				}
				.shipBottom{
					margin-top: 1rem; display: none;
					.shipHandle{
						overflow: hidden;
						a{
							width: 48%; position: relative; text-align: center; border: 1px solid #ADB1B8; padding: .4rem 1rem; display: inline-block; border-radius: .2rem; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; margin: .4rem 0; font-size: .8rem;
						}
					}
				}
				.addAddress, .mulAddress{
					font-size: 1rem; font-weight: bold;
					.fa{right: .8rem; position: absolute; top: 50%; transform: translateY(-50%); }
				}
			}

			.deliver{
				display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: .5rem 0; border: 1px solid #b18007; margin: .5rem 0; text-align: center;
			}
		}
		.input-style{
			padding: .7rem; border-bottom: 1px solid #eee; background: #fff;
			input{
				border: 0; outline: none; font-size: 1rem; width:100%; border-radius: 0;
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
    margin-top: 4rem;
    span{
      background: #f6f6f6;
      padding: 0 10px;
    }
    &:before{
      border-top: 1px solid #ccc;
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
  .goShop{
  	color: #0066c0; font-size: .8rem; text-align: center; display: block; margin-top: .5rem;
  }
}
</style>
