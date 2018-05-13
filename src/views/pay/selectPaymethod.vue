<template>
	<div class="selectPay">
		<div class="ship-header common-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
			Select a shipping address
		</div>
		<div class="content">
			<a @click="goMyOrder()" v-show="isShowBtn" class="continue">Continue</a>

			<div class="shipList" style="display: none">
				<div class="shipItem" @click="selectAdd(index)" v-for="(item, index) in shipList" :key="item.id" :class="[num == index ? 'on' : '']">
					<div class="shipInfo">
						<span class="selectIcon"></span>
						<ul>
							<li>MasterCard ****1414</li>
							<li>n0426</li>
							<li>Expires 07/2018</li>
						</ul>
						<div class="ending" v-show="(num == index)">
							<input type="number" placeholder="ending in 1414" />
						</div>
					</div>
					<a href="javascript:void(0);" v-show="(num == index)" class="continue">Confirm Card</a>
				</div>
				
			</div>

			<div class="shipList">
				<div class="shipItem" @click="selectAdd2(index)" v-for="(item, index) in shipList2" :key="item.id" :class="[num2 == index ? 'on' : '']">
					<div class="shipInfo">
						<span class="selectIcon"></span>
						<div class="payname">{{item.name}}</div>
					</div>
				</div>
				<div class="shipItem">
					<a href="#/addPaymethod" class="addAddress">Add a New payment method<i class="fa fa-angle-right fa-lg"></i></a>
				</div>
			</div>

			<a @click="goMyOrder()" v-show="isShowBtn" class="continue">Continue</a>
		</div>

		<div class="finish">
      <span>or</span>
    </div>
    <a href="#/cart" class="goShop">Cancel and continue shopping</a>
	</div>
</template>

<script>
export default {
	name: 'selectPaymethod',
	data() {
		return{
			shipList: [
				{
					id: 1
				},
				{
					id: 2
				}
			],
			shipList2: [
				{
					id: 1,
					name: 'PayPal'
				},
				{
					id: 2,
					name: 'PayPal Credit'
				},
				{
					id: 3,
					name: 'Visa'
				},
				{
					id: 4,
					name: 'MasterCard'
				},
				{
					id: 5,
					name: 'Amazon'
				},
				{
					id: 6,
					name: 'Discover'
				},
				{
					id: 7,
					name: 'AmericanExpress'
				}
			],
			num: null,
			num2: null,
			isShowBtn: true
		}
	},
	methods: {
		cancel(){
			this.$router.go(-1)
		},
		selectAdd(index) {
			this.num = index
			this.num2 = null,
			this.isShowBtn = false
		},
		selectAdd2(index) {
			this.num2 = index
			this.num = null
			this.isShowBtn = true
		},
		goMyOrder() {
			let orderId = this.$route.params.order
			this.$router.push({
				path: '/orderDetails',
				query: {
					order: orderId
				}
			})
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.selectPay{
	background: #f6f6f6;
	.ship-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold; text-align: center; color: #fff; line-height: 36px;
		.ship-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.content{
		padding: 1rem; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; -webkit-overflow-scrolling: touch; background: #f6f6f6;
		.continue{
			display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#feb800); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: .5rem 0; border: 1px solid #b18007; margin: .5rem 0; text-align: center;
		}
		.shipList{
			width: 100%; border: 1px solid #ccc; border-radius: .2rem; background: #fff; margin: 1rem 0;
			.shipItem{
				position: relative; padding: .8rem; border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: 0;
				}
				a{display: block;}
				ul{
					padding-left: 2.2rem; margin-bottom: .5rem;
					li{
						font-size: 1rem; font-weight: 300; line-height: 1.5rem;
						&:first-child{ font-weight: bold;}
					}
				}
				.continue{
					margin-top: 1rem;
				}
				.payname, .ending{
					padding-left: 2.2rem; font-size: 1rem; font-weight: 300; line-height: 1.5rem; font-weight: bold;
				}
				.ending{
					input{ border-radius: .2rem; font-size: 1rem; border: 1px solid #ADB1B8; outline: none; padding: .8rem; width: 100%;}
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
				}
				
				.addAddress{
					font-size: 1rem; font-weight: bold;
					.fa{right: .8rem; position: absolute; top: 50%; transform: translateY(-50%); }
				}
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
    margin-top: 3rem;
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
  	color: #0066c0; font-size: .8rem; text-align: center; display: block; padding: .5rem 0 1rem;
  }
}
</style>
