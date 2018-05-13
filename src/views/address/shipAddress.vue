<template>
	<div class="shipAddress">
		<div class="ship-header common-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
			Enter a shipping address
		</div>
		<div class="content">
			<h3>Enter a shipping address</h3>
			<ul class="shipList">
				<li class="input-style"><input v-model="name" type="text" placeholder="Full name" /></li>
				<li class="input-style"><input v-model="address1" type="text" placeholder="Address line 1" /></li>
				<li class="input-style"><input v-model="address2" type="text" placeholder="Address line 2" /></li>
				<li class="input-style"><input v-model="city" type="text" placeholder="City" /></li>
				<li class="input-style"><input v-model="state" type="text" placeholder="State/Province/Region" /></li>
				<li class="input-style"><input v-model="zip" type="text" placeholder="ZIP" /></li>
				<li class="input-style"><input v-model="mobile" type="text" placeholder="Phone number" /></li>
			</ul>
			<group class="nation" style="display: none">
	      <x-address title="" value-text-align="left" v-model="regions" placeholder="default" :list="addressData" @click.native="pickerNation" :show.sync="showAddress"></x-address>
	    </group>

    	<div class="address-details">
    		<h3 style="display: none" @click="showBox">Additional Address Details <i class="fa fa-lg" :class="isShow ? 'fa-angle-up' : 'fa-angle-down'"></i></h3>
    		<div class="details" v-show="isShow" style="display: none">
    			<div class="details-text">
    				Preferences are used to plan your delivery. However, shipments can sometimes arrive early or later than planned.
    			</div>
					<a href="#/week" class="weekend">
						<strong>Weekend Edlivery</strong>
						<p>Which days can you receive packages?</p>
						<i class="fa fa-angle-right fa-lg"></i>
					</a>
					<div class="code-input input-style">
						<input type="text" placeholder="Security access code" />
					</div>
    		</div>
    		
				<!-- <div class="same-address">
					<label>
						<input type="checkbox" checked />
						Use same address for billing
					</label>
				</div> -->
				<!-- <a href="#/selectPaymethod" class="continue">Save</a> -->
				<a @click="save" class="continue">Save</a>
    	</div>
    	<div class="finish">
	      <span>or</span>
	    </div>
	    <!-- <a href="#/cart" class="goShop">Cancel and continue shopping</a> -->
		</div>
		
	</div>
</template>

<script>
import API from '@/api/api'
import rg from './address.js'
import { Group, XAddress } from 'vux'
export default {
	name: 'shipAddress',
	data() {
		return{
			regions: [],
			addressData: [],
			showAddress: false,
			isShow: false,
			name: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zip: '',
			mobile: '',
			allowSave: true
		}
	},
	components: {
		Group,
		XAddress
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
		pickerNation() {
			this.addressData = rg.regions
		},

		save() {
			let name = this.name
			let mobile = this.mobile
			let address1 = this.address1
			let address2 = this.address2
			let city = this.city
			let state = this.state
			let zip = this.zip
			let regions = this.regions

			let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/; 

			if (!name || name.length < 2) {
				this.$vux.toast.text('Please enter the name', 'middle')
				return;
			}

			// if (!mobile || !phoneReg.test(mobile)) {  
			if (!mobile) {  
		    this.$vux.toast.text('Please enter a valid cell phone number', 'middle')
		    return;  
			} 

			// if (!regions || !regions.length) {
			// 	this.$vux.toast.text('Please select the area', 'middle')
			// 	return;
			// }

			// var lastRegion = regions[regions.length - 1];
			// if (!lastRegion) {
			// 	this.$vux.toast.text('Please select the area', 'middle')
			// 	return;
			// }

			if (!address1 || address1.length < 1) {
				this.$vux.toast.text('Please enter the address', 'middle')
				return;
			}

			// 防止多次的保存
			if ( this.allowSave ) {
				this.allowSave = false;
			} else {
				return;
			}
			if (!this.$route.query.consignee) {
				API.ConsigneeAdd({
					name: name,
					region: 502,
					mobile: mobile, 
					tel: '',
					cityname: city,
					countryname: '',
					provincename: state,
					zip_code: zip,
					address: address1,
					address2: address2
				}).then((res)=>{
					this.allowSave = true;
					if (res.data.error_code == 0) {
						this.$vux.toast.text('Save success', 'middle')
						this.$router.push('/myAddress')
					} else {
						this.$vux.toast.text('Please confirm that the information is correct', 'middle')
					}
				})
			}else{
				API.ConsigneeUpdate({
					consignee: this.$route.query.consignee.id,
					name: name,
					region: 502,
					mobile: mobile, 
					tel: '',
					cityname: city,
					countryname: '',
					provincename: state,
					zip_code: zip,
					address: address1,
					address2: address2
				}).then((res)=>{
					this.allowSave = true;
					if (res.data.error_code == 0) {
						this.$vux.toast.text('Save success', 'middle')
						this.$router.push('/myAddress')
					} else {
						this.$vux.toast.text('Please confirm that the information is correct', 'middle')
					}
				})
			}
		}
	},
	mounted() {
		if (this.$route.query.consignee && this.$route.query.consignee.id) {
			this.name = this.$route.query.consignee.name
			this.address1 = this.$route.query.consignee.address
			this.address2 = this.$route.query.consignee.address2
			this.zip = this.$route.query.consignee.zip_code
			this.city = this.$route.query.consignee.cityname
			this.state = this.$route.query.consignee.provincename
			this.mobile = this.$route.query.consignee.mobile
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.shipAddress{
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
			font-size: 1.2rem; font-weight: bold; margin-bottom: .5rem;
		}
		.shipList{
			width: 100%; border: 1px solid #ccc; border-radius: .2rem; background: #fff;
			.input-style:last-child{
				border-bottom: 0;
			}
		}
		.input-style{
			padding: .7rem; border-bottom: 1px solid #eee; background: #fff;
			input{
				border: 0; outline: none; font-size: 1rem; width:100%; border-radius: 0;
			}
		}
		.address-details{
			margin-top: .8rem;
			h3{
				font-size:1rem; position: relative;
				.fa{
					position: absolute; right: 0; top: 50%; transform: translateY(-50%);
				}
			}
			.details{
				.details-text{
					font-size: .9rem;
				}
				.weekend{
					position: relative; width: 100%; border: 1px solid #ADB1B8; padding: .5rem 1rem; display: block; border-radius: .2rem; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; margin: .5rem 0; font-size: .8rem;
					.fa{
						position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
					}
				}
				
				
			}
			.code-input{
					border: 1px solid #ccc; padding: .5rem .7rem; margin-bottom: .5rem; border-radius: .2rem;
				}
			.same-address{
					font-size: 1rem; margin: .8rem 0;
					label{
						display: block; line-height: 20px;
					}
					input{
						width: 20px; height: 20px; vertical-align: top; margin-right: 8px;
					}
				}
				.continue{
					display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#feb800); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: 10px 0; border: 1px solid #b18007; margin: .8rem 0 .5rem; text-align: center;
				}
		}
	}
	.finish{
    width: 100%; color: #555; font-size: 13px; overflow: hidden; position: relative;
    text-align: center; text-overflow: ellipsis; white-space: nowrap; z-index: 1;
    margin-top: 2rem;
    span{
      background: #f6f6f6; padding: 0 10px;
    }
    &:before{
      border-top: 1px solid #ccc; content: ""; margin: 0 auto; position: absolute;
	    top: 50%; left: 0; right: 0; bottom: 0; z-index: -1;
    }
  }
  .goShop{
  	color: #0066c0; font-size: .8rem; text-align: center; display: block; margin-top: .5rem;
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
.v-transfer-dom .vux-popup-header-right{
	color: #828282;
}
</style>