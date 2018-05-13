<template>
	<div class="write-review">
		<div class="review-header">
			<div class="tit">Your comments</div>
			<p class="buy-name"><a href="javascript:void(0);">Wisdom House buyer</a> is your public name</p>
		</div>
		<div class="write-list">
			<div class="write-item" :key="item.id" v-for="(item, index) in writeList.goods">
				<div class="shop-info clearfix">
					<div class="fl">
						<div class="shop-img">
							<img :src="item.product.photos[0].large" />
						</div>
					</div>
					<div class="shop-right fl">
						<div v-show="!isShowSuccess[index]">
							<div class="descript">{{item.product.name}}</div>
							<div class="name">{{item.property}}</div>
						</div>
						<div v-show="isShowSuccess[index]">
							<div class="descript2">Thank you for your comments {{item.tit}}</div>
							<div class="name">We are reviewing this review</div>
						</div>
						<div class="set-grade" @click="getGrade(index,item)">
							<rater v-model="startnum[index]" :disabled="isDisabled[index]" :font-size="35" :max="5" active-color="#fad000"></rater>
						</div>
					</div>
				</div>
				<div class="write-bottom">
					<div class="write-row clearfix">
						<a href="javascript:void(0);" @click="showWrite(index)" class="write-btn fl"><i class="fa" :class="isShowWrite[index] ? 'fa-angle-double-up' : 'fa-angle-double-down'"></i>Write a Review</a>
						<span class="fr">
							<icon icon-style="iconx" icon-class="dagou1"></icon>
							Rating has been published
						</span>
					</div>
					<div class="write-box" v-show="isShowWrite[index]">
						<textarea rows="4" v-model="commentInput[index]" placeholder="Please write your comments here"></textarea>
					</div>
				</div>
			</div>
			<div class="write-box">
				<input style="display: none" type="text" placeholder="Your review title" class="title" />
				<a href="javascript:void(0);" style="display: none" class="add-pictures">
					<i class="fa fa-camera" aria-hidden="true"></i>
					Add pictures / videos
				</a>
				<a href="javascript:void(0);" @click="send()" class="submit">Submit</a>
			</div>
		</div>
		
	</div>
</template>
<script>
import API from '@/api/api'
import icon from '@/components/icon.vue'
import { Rater, XProgress } from 'vux'
export default {
	name: 'writeReview',
	data() {
		return{
			startnum: [],
			num: 0,
			isShowWrite: [],
			isShowSuccess: [],
			isDisabled: [],
			writeList: [],
			commentInput: [],
			index: 0
		}
	},
	components: {
		Rater,
		icon
	},
	methods: {
		getGrade(index,goods) {
			if (!goods.review) {
				goods.review = {}
			}
			if (!goods.review.content) {
				goods.review.content = ''
			}
			this.$nextTick(function(){
				this.index = index
				goods.review.goods = goods.id
				goods.review.grade = this.startnum[index]
			})
			
		},
		showWrite(index) {
			this.$set(this.isShowWrite, index, this.isShowWrite[index])
			this.isShowWrite[index] = !this.isShowWrite[index]
		},
		send() {
			let review = [];
			for (var i = 0; i < this.writeList.goods.length; i++) {
				var good = this.writeList.goods[i];
				if (good.review) {

					if (!good.review.grade) {
						this.$vux.toast.text('Please choose evaluation', 'middle')
						return;
					}
					good.review.content = this.commentInput[i]?this.commentInput[i]:''
					review.push(good.review);
				}
			}
			
			if (review.length < this.writeList.goods.length) {
				this.$vux.toast.text('Please evaluate all the goods', 'middle')
				return;
			}
			this.$set(this.isShowSuccess, this.index, true)
			this.$set(this.isDisabled, this.index, true)
			var params = {}
			params.order = this.$route.params.order
			params.review = JSON.stringify(review)
			params.is_anonymous = 0

			API.ReviewtOrder(params).then((response)=>{
				if (response.data.error_code == 0) {
					this.$router.push({
						name: 'myOrder'
					})
				}
			})
		}
	},
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
		API.GetCommentOrder({
			order: this.$route.params.order
		}).then((response)=>{
			if (response.data.error_code == 0) {
				this.writeList = response.data.order
				for(let i in response.data.order.goods){
					this.isShowWrite[i] = true
				}
			}
		})
	}
}
</script>
<style scoped lang="scss">
.write-review{
	.review-header{
		border-bottom: 1px solid #ddd; padding: .5rem 1rem;
		.tit{
			font-size: 1.5rem; font-weight: bold;
		}
		.buy-name{
			font-size: 1rem;
			a{ color: #0066c0; }
		}
	}
	.write-list{
		padding: 0 1rem 1rem;
		.write-item{
			border-bottom: 1px solid #ddd; padding: 1rem 0;
			&:last-child{
				border-bottom: 0;
			}
			.shop-info{
				margin-bottom: 1rem;
				.fl{
					width: 25%; margin-right: 3%;
				}
				.shop-right{
					width: 68%;
					.descript{
						font-size: .9rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-weight: 500;
					}
					.descript2{
						font-size: .9rem;
					}
					.name{
						font-size: .8rem;
					}
					.set-grade{margin-top: .5rem;}
				}
			}
		}
	}
	.write-bottom{
		.write-row{
			font-size: .9rem; line-height: 2.5rem;
			.iconx{ position: relative; top: .3rem;}
			.write-btn{
				color: #0066c0;
				.fa{ margin-right: 5px; color: #ee2a2a; }
			}
		}
	}
	.write-box{
		textarea, input{
			display: block; width: 100%; border: 1px solid #ddd; border-radius: .2rem; font-size: 1.1rem; padding: .8rem; margin-bottom: .8rem; -webkit-appearance: none;
		}
		.add-pictures{
			position: relative; display: block; border: 1px solid #ADB1B8; padding: .5rem 1rem; border-radius: .2rem; margin: 1rem 0; background: linear-gradient(to bottom, #f7f8fa, #e7e9ec); box-shadow: 0 0.1rem 0 rgba(255, 255, 255, 0.6) inset; font-size: 1rem; text-align: center;
			.fa{
				margin-right: 5px; color: #5e5f61;
			}
		}
		.submit{
			display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#feb800); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: .5rem 0; border: 1px solid #b18007; text-align: center;
		}
	}
}
</style>
