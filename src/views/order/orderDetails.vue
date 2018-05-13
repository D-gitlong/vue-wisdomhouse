<template>
	<div class="order-details">
		<h2>View order details</h2>
		<section class="line">
			<ul class="order-listinfo">
				<li>
					<span class="li-tit">Order date</span><span class="li-content">{{order.created_at | formatDate}}</span>
				</li>
				<li>
					<span class="li-tit">Order number</span><span class="li-content">{{order.sn}}</span>
				</li>
				<li>
					<span class="li-tit">Order amount</span>
					<span class="li-content">${{order.total ||'0' | fmoney}}
						<i v-if="order.goods">({{total_amount || 1}} goods)</i>
					</span>
				</li>
			</ul>
		</section>
		
		<section>
			<h3>Cargo details</h3>
			<div class="line">
				<h4 v-if="order.status == 0">Waiting for the buyer to pay</h4>
				<h4 v-if="order.status == 1">Waiting for the seller to deliver</h4>
				<h4 v-if="order.status == 2">Waiting for the buyer to collect the goods</h4>
				<h4 v-if="order.status == 3">Trade success</h4>
				<h4 v-if="order.status == 4">Trade success</h4>
				<h4 v-if="order.status == 5">Transaction cancellation</h4>
				<div class="date">{{order.created_at | formatDate}}</div>
				<div class="order-item" :key="goods.id" v-for="goods in order.goods">
					<div class="order-img fl">
						<img :src="goods.product.photos[0].large" />
					</div>
					<div class="order-info">
						<div class="order-name">{{goods.product.name}}</div>
						<div class="seller">{{goods.property}}</div>
						<div class="number">
							number: {{goods.total_amount}}
						</div>
					</div>
					<div class="order-price">${{goods.product_price | fmoney}}</div>
				</div>
			</div>
		</section>

		<section style="display: none">
			<h3>Payment information</h3>
			<div class="line">
				<strong>Payment method</strong>
				<p>China Merchants Bank credit card payment</p>
			</div>
		</section>
		
		<section>
			<h3>Distribution address</h3>
			<div class="line">
				<strong v-if="order.consignee">{{order.consignee.name}}</strong>
				<!-- <p>{{order.consignee.regions}}</p> -->
				<p v-if="order.consignee">{{order.consignee.address}}</p>
				<p v-if="order.consignee">{{order.consignee.zip_code}}</p>
				<p v-if="order.consignee">{{order.consignee.mobile || order.consignee.tel}}</p>
			</div>
		</section>

		<section style="display: none">
			<h3>Mr. Lin's ID card information</h3>
			<div class="line">
				<p>ID number: tail number 1231</p>
				<p class="c6">The ID card information has been uploaded</p>
			</div>
		</section>

		<section>
			<h3>Order summary</h3>
			<div class="line">
				<ul class="summary">
					<!-- <li>
						<span class="li-tit">commodity:</span><span class="li-content">$30.50</span>
					</li> -->
					<li>
						<span class="li-tit">Distribution fee:</span><span class="li-content" v-if="order.shipping">${{order.shipping.price | fmoney}}</span>
					</li>
					<li>
						<strong class="li-tit">Order amount</strong><strong class="li-content" v-if="order.shipping">${{order.total | fmoney}}</strong>
					</li>
				</ul>
			</div>
		</section>
		
		<!-- 顾客也购买其他产品 -->
		<section class="customers com-bottom" style="display: none">
			<h3 class="com-tit">Customers who bought this also bought</h3>

			<a :href="item.link" class="pro-item" v-for="item in prolist">
				<div class="pro-img fl">
					<img :src="item.imglink" />
				</div>
				<div class="pro-info">
					<div class="pro-description">{{item.info}}</div>
					<div class="pro-rater com-pro-rater">
						<rater v-model="item.startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
						<span class="rater-num">{{item.rater}}</span>
					</div>
					<div class="customers-pro-price">
						<div class="price-middle"><span class="sup">$</span>{{item.price}}<i></i></div>
					</div>
				</div>
			</a>
		</section>
	</div>
</template>
<script>
import API from '@/api/api'
import '@/util/directive'
import {formatDate} from '@/util/tool'
import { mapState, mapGetters, mapActions } from 'vuex'
import { Rater } from 'vux'
export default {
	name: 'orderDetails',
	data() {
		return{
			prolist: [
				{
					link: '#/details/5',
					imglink: './static/images/light/6.png',
					info: 'NuPro Zipper Sleeve for Fire Kids Edition Tablets, Navy/Blue',
					startnum: 4,
					rater: '23,154',
					price: 19.99,
					imgName: '6.png'
				},
				{
					link: '#/details/2',
					imglink: './static/images/light/3.png',
					info: 'NuPro Zipper Sleeve for Fire Kids Edition Tablets, Navy/Blue',
					startnum: 4,
					rater: '23,154',
					price: 19.99,
					imgName: '3.png'
				},
				{
					link: '#/details/4',
					imglink: './static/images/light/5.png',
					info: 'NuPro Zipper Sleeve for Fire Kids Edition Tablets, Navy/Blue',
					startnum: 4,
					rater: '23,154',
					price: 19.99,
					imgName: '5.png'
				}
			],
			order: {},
			total_amount: 0
		}
	},
	components: {
		Rater
	},
	filters: {
    formatDate(time) {
      var date = new Date(time*1000);
      return formatDate(date, "yyyy-MM-dd h:m:s");
    }
  },
	mounted() {
		let orderId = this.$route.query.order
		API.OrderDetails({
			order: orderId
		}).then((res)=>{
			if (res.data.error_code == 0) {
				this.order = res.data.order
				this.order.goods.forEach((val,index)=>{
					this.total_amount += parseInt(val.total_amount)
				})
			}
			
		})
	}
}
</script>
<style scoped lang="scss">
.order-details{
	padding: .5rem 1rem;
	h2{
		font-size: 1.3rem; font-weight: bold; margin-bottom: .2rem;
	}
	.line{
		border: 1px solid #eaeded; border-radius: .2rem; padding: .8rem;
	}
	.c6{color:#666;}
	section{
		font-size: .9rem;
		h3, h4{
			font-size: 1.1rem; font-weight: bold; margin: .5rem 0;
		}
		h4{
			font-size: 1rem; margin: 0;
		}
		.date{
			font-size: .8rem; font-weight: bold; color: #008a00;
		}
		.order-listinfo{
			li{
				display: -webkit-flex; display: flex;
				span{
					display: block; font-size: .9rem; color: #000; flex: 2;
				}
				.li-tit{
					color: #555; flex: 1.5;
				}

			}
		}
	}
	.order-item{
		position: relative; overflow: hidden; margin-top: .5rem; display: -webkit-flex; display: flex;
		.order-img{
			width: 28%; text-align: center;
			img{
				max-width: 100%; max-height: 100px;
			}
		}
		.order-info{
			position: relative; overflow: hidden; flex: 4; margin: 0 10px;
			.order-name{
				color: #111; font-size: .9rem; font-weight: bold; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; height: 3.5rem; line-height: 1.2rem;
			}
			.number, .seller{
				color: #666; font-size: .7rem;
			}
		}
		.order-price{
			flex: 1; font-size: .9rem; font-weight: bold;
		}
	}
	.com-tit{
		font-weight: 400; font-size: 1.2rem; margin-bottom: .5rem;
	}
	.pro-item{
		display: block; position: relative; padding: 10px 15px; overflow: hidden;
		.pro-img{
			width: 30%; text-align: center; margin-right: 15px;
			img{
				max-width: 100%; max-height: 200px;
			}
		}
		.pro-info{
			overflow: hidden;
			.pro-description{
				display: -webkit-box; max-width: 100%; margin: 0 auto; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; font-size: 15px; color: #008296; font-size: 15px;
			}
			.pro-rater{
				color: #767676; font-size: 13px; margin-top: 5px; position: relative;
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
						height: 1rem; width: 3rem; vertical-align: middle; background: url(../../assets/img/bg/bg1.png) no-repeat; background-size: contain; display: inline-block; margin-left: 5px;
					}
				}
			}
		}
	}
	.summary{
		li{
			display: -webkit-flex; display: flex;
			.li-tit, .li-content{
				flex: 1;
			}
			.li-content{text-align: right}
			strong.li-content{color: #CC1C39;}
		}
	}
}	
</style>