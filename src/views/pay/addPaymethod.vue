<template>
	<div class="pay-method">
		<div class="ship-header common-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
			Select a Payment Method
		</div>
		<div class="content">
			<div class="show-cardbox" @click="showBox">
				<i class="fa fa-lg" :class="!isShow ? 'fa-angle-right' : 'fa-angle-down'"></i>
				Add a credit or debit card
			</div>
			<div v-show="isShow">
				<div class="same">
					<label>
						<input type="checkbox" checked />
						Use name on account
					</label>
				</div>
				<ul class="shipList">
					<li class="input-style"><input type="text" placeholder="Name on card" /></li>
					<li class="input-style"><input type="number" placeholder="Card number" /></li>
				</ul>

				<h3 class="tit">Expiration date</h3>
				<group class="select-date">
		      <datetime
		        v-model="dateVal"
		        @on-change="change"
		        @on-cancel="log('cancel')"
		        @on-confirm="log('confirm')"
		        @on-hide="log('hide', $event)"
		        confirm-text="Done"
		        cancel-text="Cancel"
		        :min-year="year"
		        format="YYYY-MM"></datetime>
		    </group>
				
				<a href="#/myOrder/1" class="add-btn">Add your card</a>
			</div>
			
			
			<div class="show-cardbox" @click="showBox2">
				<i class="fa fa-lg" :class="!isShow2 ? 'fa-angle-right' : 'fa-angle-down'"></i>
				Add a bank account
			</div>
			
			<div v-show="isShow2">
				<h3 class="tit">Enter your checking account information</h3>
				<ul class="shipList">
					<li class="input-style"><input type="text" placeholder="Name on Account" /></li>
					<li class="input-style"><input type="number" placeholder="Bank Routing Number" /></li>
					<li class="input-style"><input type="number" placeholder="Checking Account Number" /></li>
					<li class="input-style"><input type="number" placeholder="Re-enter Checking Account Number" /></li>
					<li class="input-style"><input type="number" placeholder="Driver's License Number" /></li>
				</ul>

				<group class="nation">
		      <x-address title="" value-text-align="left" v-model="value" placeholder="AK" :list="addressData" :show.sync="showAddress"></x-address>
		    </group>
				
				<a href="#/myOrder/1" class="add-btn">Add this checking account</a>
			</div>
		</div>	
	</div>
</template>

<script>
import { Datetime, Group, XAddress } from 'vux'
export default {
	name: 'addPaymethod',
	data() {
		return{
			dateVal: '2017-12',
			value: [],
			year: 2017,
			showAddress: false,
			isShow: true,
			isShow2: false,
			addressData: [
				{
		        name: "AK",
		        value: "1"
		    },
		    {
		        name: "AR",
		        value: "2"
		    },
		    {
		        name: "AL",
		        value: "3"
		    },
		    {
		        name: "AZ",
		        value: "4"
		    },
			],
		}
	},
	components: {
		Datetime,
		Group,
		XAddress
	},
	mounted() {
		let initDate = new Date().getFullYear()
		this.year = initDate
	},
	updated() {
		document.querySelector('.vux-popup-header-left').innerHTML = 'Cancel'
		document.querySelector('.vux-popup-header-right').innerHTML = 'Done'
	},
	methods: {
		cancel(){
			this.$router.go(-1)
		},
		showBox() {
			this.isShow = !this.isShow
		},
		showBox2() {
			this.isShow2 = !this.isShow2
		},
		change() {

		},
		log (str1, str2 = '') {
      console.log(str1, str2)
    },
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.pay-method{
	background: #f6f6f6; height: 100%;
	.ship-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold; text-align: center; color: #fff; line-height: 36px;
		.ship-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.content{
		padding: 1rem; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; -webkit-overflow-scrolling: touch; background: #f6f6f6;
		h3{
			font-size: 1rem; font-weight: bold; margin: .5rem 0;
		}
		.show-cardbox{
			font-size: 1.2rem; color: #0066c0;
		}
		.add-btn{
			display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: 10px 0; border: 1px solid #b18007; margin: 1rem 0; text-align: center;
		}
		.shipList{
			width: 100%; border: 1px solid #ccc; border-radius: .2rem; background: #fff; margin-bottom: 1rem;
			.input-style:last-child{
				border-bottom: 0;
			}
		}
		.same{
			font-size: 1rem; margin: .8rem 0;
			label{
				display: block; line-height: 22px;
			}
			input{
				width: 22px; height: 22px; vertical-align: top; margin-right: 8px;
			}
		}
		.input-style{
			padding: .7rem; border-bottom: 1px solid #eee; background: #fff;
			input{
				border: 0; outline: none; font-size: 1rem; width:100%; border-radius: 0;
			}
		}
	}
}
</style>
<style lang="scss">
.nation{
	.vux-cell-box:before,.weui-cells:before,.weui-cells:after{
		border: 0;
	}
	.weui-cells{
		border: 1px solid #ccc; border-radius: .2rem;
	}
	.vux-cell-box{
		background: linear-gradient(to bottom, #f7f8fa, #e7e9ec);    box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.6) inset;
	}
	.vux-cell-value,.vux-cell-placeholder{
		color: #111;
	}
	.weui-cell_access .weui-cell__ft:after{
		border-color: #777;
	}
}
.select-date{
	.weui-cells{
		background: linear-gradient(to bottom, #f7f8fa, #e7e9ec);    box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.6) inset; border: 1px solid #ccc; border-radius: .2rem; margin-top: .5rem;
	}
	.weui-cells:before{
		border: 0;
	}
	.weui-cells:after{
		border: 0;
	}
	.vux-cell-value{
		color: #111;
	}
	.weui-cell_access .weui-cell__ft:after{
		border-color: #777;
	}
	.vux-cell-value{
		float: left;
	}

}
.dp-container .dp-header .dp-item.dp-right,.v-transfer-dom .vux-popup-header-right{
	color: #828282;
}
</style>