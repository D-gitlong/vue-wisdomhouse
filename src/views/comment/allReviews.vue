<template>
	<div class="all-reviews">
		<h2>Customer reviews</h2>
		<div class="reviews-num" style="display: none">
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater><span>{{commentCount}}</span>
		</div>
		<div class="reviews-text" style="display: none">
			<span>3.7 out of 5 stars</span>
			<a href="javascript:void(0);" class="write-btn">Write a review</a>
		</div>
		<section class="process" style="display: none">
			<div class="process-item" :key="item.id" v-for="item in progress">
				<span class="percent-text">{{item.starText}}</span>
				<x-progress :percent="item.percent" :show-cancel="false"></x-progress>
				<span class="percent-num">{{item.percent}}%</span>
			</div>
		</section>
		
		<a href="javascript:void(0);" class="customer-img" style="display: none">
			<h3>Customer images</h3>
			<ul>
				<i class="fa fa-angle-right"></i>
				<li><img src="static/images/light/1.png" /></li>
				<li><img src="static/images/light/2.png" /></li>
				<li><img src="static/images/light/4.png" /></li>
				<li><img src="static/images/light/5.png" /></li>
			</ul>
		</a>
		<!-- <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"> -->
			<section class="reviews-list" v-for="comment in comments">
				<rater v-model="comment.grade" disabled :font-size="16" :max="5" active-color="#fad000"></rater><strong></strong>
			
				<div class="reviewer">
					By <a href="javascript:void(0);" v-if="comment && comment.author">{{comment.is_anonymous ? '匿名用户' : comment.author.nickname || comment.author.username}} </a><span>on {{comment.created_at | formatDate}}</span>
				</div>
				<p>{{comment.content}}</p>
				<div class="reviews-line" style="display: none">
					<span><i class="fa fa-lg fa-thumbs-o-up"></i>{{comment.id}} helpful votes</span>
					<i class="line">|</i>
					<a href="javascript:void(0);" class="report">Report</a>
				</div>
			</section>
		<!-- </div>	 -->
		<div class="not-content" v-if="isContent">There is no comment</div>
	</div>
</template>
<script>
import API from '@/api/api'
import {formatDate} from '@/util/tool'
import { Rater, XProgress } from 'vux'
export default {
	name: 'allReviews',
	data() {
		return{
			comments: [],
			commentCount: 0,
			busy: false,
			page: 1,
			per_page: 10,
			startnum: 4,
			isContent: false,
			progress: [
				{
					starText: '5 star',
					percent: 48
				},
				{
					starText: '4 star',
					percent: 15
				},
				{
					starText: '3 star',
					percent: 7
				},
				{
					starText: '2 star',
					percent: 7
				},
				{
					starText: '1 star',
					percent: 23
				}
			]
		}
	},
	filters: {
    formatDate(time) {
      var date = new Date(time*1000);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
	components: {
		Rater,
		XProgress
	},
	methods: {
		loadMore: function() {
      this.busy = true
      this.$vux.loading.show({
				text: 'Loading'
			})
      setTimeout(() => {
        this.page++
        this.getComment(true)
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
		getComment(flag) {
			API.ProductComment({
				product: this.$route.params.id,
        grade: 0,
        page: this.page,
        per_page: this.per_page
			}).then((response)=>{
				if (flag) {
					this.comments = this.comments.concat(response.data.reviews)
	    		if(response.data.paged && response.data.paged.more == 0){
            this.busy = true
            this.isContent = true
          }else{
            this.busy = false
          }
				}else{
					this.comments = response.data.reviews
	    		this.busy = false
	    		this.$vux.loading.hide()
				}
				this.commentCount = response.data.paged.total
			})
		}
	},
	beforeRouteEnter (to, from, next) {
    next(vm=>{
    	window.addEventListener('scroll', this.infiniteScroll, true)
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
		this.getComment(false)
	}
}
</script>
<style scoped lang="scss">
.all-reviews{
	padding: .56em 1rem;
	h2{
		font-size: 1.3rem; font-weight: bold;
	}
	.reviews-num{
		font-size: 1rem; font-weight: bold;
		span{
			margin-left: 8px;
		}
	}
	.not-content{
		text-align: center; font-size: 1rem; color: #111; margin: 1rem 0 1.5rem;
	}
	.reviews-text{
		font-size: .85rem; position: relative; color: #0066c0; overflow: hidden;
		.write-btn{
			float: right; color: #0066c0;
		}
	}
	.customer-img{
		position: relative; display: block; border: 1px solid #ddd; padding: .5rem 1rem 1rem; border-radius: .2rem; margin: 1.5rem 0;
		h3{
			font-weight: bold; font-size: 1.1rem;
		}
		ul{
			position: relative; overflow: hidden;
			.fa{
				position: absolute; right: 0; top: 50%; font-size: 2.5em; transform: translateY(-50%);
			}
			li{
				float: left;width: 20%; margin-right: 1.5%;
			}
		}
	}
	.reviews-list{
		margin-bottom: 1rem;
		.reviewer{
			font-size: .9rem; margin: .5rem 0; 
			a{
				color: #0066c0;
			}
			span{
				color: #555;
			}
		}
		p{
			font-size: .9rem;
		}
		strong{
			font-size: .9rem; margin-left: 10px;
		}
		.reviews-line{
			margin: .5rem 0;
			span{
				color: #555; font-size: .9rem;
				.fa{
					margin-right: .7rem;
				}
			}
			.report{
				color: #555;
			}
			.line{margin: 0 .5rem;}
		}
	}
	
}
</style>
<style lang="scss">
.all-reviews{
	.process{
		margin-top: .5rem;
		.process-item{
			position: relative; clear: both;
			span{
				position: absolute; top: 0; display: inline-block; font-size: .85rem; color: #0066c0; display: block; height:1.8rem; line-height: 1.8rem;
			}
			.percent-text{
				left: 0;
			}
			.percent-num{
				right: 0;
			}
			.weui-progress{
				display: inline-block; width: 90%; padding-left: 3rem; overflow: hidden; border-radius: .2rem;
				.weui-progress__bar{
					height: 1.8rem;background: linear-gradient(to bottom,#eee,#f6f6f6); background-color: #f3f3f3; border-radius: .2rem; box-shadow: inset 0 0.1rem 0.2rem rgba(0,0,0,.2), inset 0 0 0 0.1rem rgba(0,0,0,.1);
				}
				.weui-progress__inner-bar{
					background: linear-gradient(to bottom,#ffce00,#ffa700); background-color: #ffce00;box-shadow: inset 0 0 0 0.1rem rgba(0,0,0,.15); border-radius: .2rem; transition: width .5s ease;
				}
			}
		}
	}
}

</style>