<template>
	<div class="selectPay">
		<div class="ship-header common-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
			Select Shipping Options
		</div>
		<div class="content">
			<div class="shipment">
				<div class="shiptit">Shipment 1 of 1</div>
				<ul>
					<li>Apple iPhone X,Fully Unlocked 5.8, 256 GB - Space Gray</li>
				</ul>
			</div>
			<h3>Choose a delivery option:</h3>
			<div class="shipList">
				<div class="shipItem" @click="selectAdd(index)" v-for="(item, index) in shipList" :key="item.id" :class="[num == index ? 'on' : '']">
					<div class="shipInfo">
						<span class="selectIcon"></span>
						<div class="expedited">Expedited Shipping <span>—— get it Tuesday, Dec. 26 - Thursday, Dec. 28</span></div>
					</div>
				</div>
				
			</div>

			<a href="#/viewOrder/1" class="continue">Continue</a>
		</div>

		<div class="finish">
      <span>or</span>
    </div>
    <a href="#/cart" class="goShop">Cancel and continue shopping</a>
	</div>
</template>

<script>
export default {
	name: 'selectOption',
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
			num: 0,
		}
	},
	methods: {
		cancel(){
			this.$router.go(-1)
		},
		selectAdd(index) {
			this.num = index
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.selectPay{
	background: #f6f6f6; height: 100%;
	.ship-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold; text-align: center; color: #fff; line-height: 36px;
		.ship-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.content{
		padding: 1rem; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; -webkit-overflow-scrolling: touch; background: #f6f6f6;
		.shipment{
			margin-bottom: 1rem;
			.shiptit{
				color: #111; font-size: 1.2rem;
			}
			ul{
				padding-left: 1rem; margin: .5rem 0;
				li{
					color: #111; font-size: .9rem; list-style: disc;
				}
			}
		}
		h3{
			font-size: 1.1rem; font-weight: bold;
		}
		.continue{
			display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#feb800); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: .5rem 0; border: 1px solid #b18007; margin: .5rem 0; text-align: center;
		}
		.shipList{
			width: 100%; border: 1px solid #ccc; border-radius: .2rem; background: #fff; margin: .5rem 0 1rem;
			.shipItem{
				position: relative; padding: .8rem; border-bottom: 1px solid #ccc;
				&:last-child{
					border-bottom: 0;
				}
				a{display: block;}
				.expedited{
					padding-left: 2.2rem; font-size: 1rem; font-weight: 300; line-height: 1.5rem; font-weight: bold;
					span{
						color: #0a7a11; font-size: .9rem;
					}
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
