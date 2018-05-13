<template>
	<div class="viewOrder">
		<section class="view-pro">
			<a :href="viewOrder.link" class="order-item">
				<div class="order-img fl">
					<img :src="viewOrder.imglink" />
				</div>
				<div class="order-info">
					<div class="order-name">{{viewOrder.name}}</div>
					<div class="date">
						Order date: {{viewOrder.date}}
					</div>
				</div>
			</a>
			<a href="javascript:void(0);" class="again-buy">
				Buy again<i class="fa fa-lg fa-angle-right"></i>
			</a>
		</section>

		<section class="other-info">
			<a href="#/writeReview" class="write-review">
				Writing reviews<i class="fa fa-lg fa-angle-right"></i>
			</a>
			<a href="#/orderDetails/1" class="order-details">
				View order details<i class="fa fa-lg fa-angle-right"></i>
			</a>
		</section>

		<!-- 顾客也购买其他产品 -->
		<section class="customers com-bottom">
			<h3 class="com-tit">Customers who bought this also bought</h3>

			<a href="javascript:void(0);" class="pro-item" v-for="item in prolist">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { Rater } from 'vux'
export default {
	name: 'viewOrder',
	data() {
		return{
			viewOrder: {
				link: '#',
				imglink: './static/images/light/2.png',
				name: 'Britax Pioneer Combination Harness-2-Booster Car Seat - Domino',
				date: 'October 1, 2017'
			},
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
			]
		}
	},
	components: {
		Rater
	}
}
</script>
<style scoped lang="scss">
.viewOrder{
	padding: .5rem 1rem 1rem;
	.view-pro{
		border: 1px solid #eaeded; border-radius: .2rem;
		.again-buy{
			padding: .5rem .8rem; display: block; position: relative; font-size: .9rem; color: #111;
			.fa{
				position: absolute; top: 50%; right: 1rem; transform: translateY(-50%);
			}
		}
	}
	.other-info{
		border: 1px solid #eaeded; border-radius: .2rem; margin: .5rem 0 1rem;
		a{
			display: block; padding: .5rem .8rem; position: relative; font-size: .9rem;
			.fa{
				position: absolute; top: 50%; right: 1rem; transform: translateY(-50%);
			}
		}
		.write-review{
			border-bottom: 1px solid #eaeded; 
		}
	}
	.order-item{
		display: block; position: relative; padding: .8rem; overflow: hidden; border-bottom: 1px solid #eaeded;
		.order-img{
			width: 25%; text-align: center; margin-right: 15px;
			img{
				max-width: 100%; max-height: 90px;
			}
		}
		.order-info{
			position: relative; top: 50%; left: 0; transform: translateY(5%); overflow: hidden;
			.order-name{
				color: #111; font-size: 1rem; font-weight: bold; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; height: 3rem;
			}
			.date{
				color: #666; font-size: .9rem; margin-top: .2rem;
			}
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
}
</style>