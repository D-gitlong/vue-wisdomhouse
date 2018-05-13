<template>
	<div class="reviews">
		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater><strong>So far so good. Dont listen to the negative reviews.</strong>
		</section>
		<div class="reviewer">
			By <a href="javascript:void(0);">Dcoot Mdeel </a><span>on May 16,2017</span>
		</div>
		<section>
			<p>So, I read a lot of the reviews online before I purchased this product. I was a little worried, but I'm glad I bought it regardless. I have only tested it out for an hour or so now, but it keeps the air sealed pretty well. I am a 6'3" male who weighs about 240lbs, so it should give you a sense of its durabilityI don't know what other people were doing to cut their thumbs or run around their back yards for 30 minutes, which I'm sure was pretty comical for their neighbors. So far I had an easy time inflating it and it is pretty darn comfortable. I am excited to test this out this summer at the beach and at festivals. I do admit that you need to run back and forth a few times in order to get enough air in it, but once you do just roll it up really tight, hook the clasp together and that's it. Super simple. There are two inner tubes that you will need to inflate. I just did one at a time. Other people were right, however, and it did not come with instructions.</p>
			<p>Okay, here is the update. The lounger is still extremely comfortable. I took it to a 5 day music festival and it was super handy. I have had it for over a month and a half now I believe and it holds air for about 3 to 4 hours (it depends on how much you fill it up). I use it both as a chair and a lounger. I have taken naps on it and had a couple of people use it at once (I would say don't exceed 350 or else you will find it necessary to fill it up more frequently). The mesh is also handy to soak up any sweat you may experience while in the sun, which also brings me to my next point... the mesh can get pretty dirty. I washed it with a little laundry detergent and a hand brush though and good as new. Lastly, make sure to wait for a good breeze to assist you in filling it up. I found it difficult to run and catch air while in the music festival, because of people. You need a good strip to run up and down on and, as you can imagine, lot's of people can block the air flow making it more difficult to fill up. Find an empty space and wait for a good breeze, run into it and roll it up quickly. I am still super satisfied with my purchase and would definitely recommend this to anyone.</p>
		</section>
		<section class="help clearfix">
			<a href="javascript:void(0);" class="helpful">Helpful</a>
			<a href="javascript:void(0);" class="not-helpful">Not Helpful</a>
			<a href="javascript:void(0);" class="report">Report</a>
		</section>
		<section class="page clearfix">
			<a href="javascript:void(0);" class="fl"><span>←</span>Previous</a>
			<a href="javascript:void(0);" class="fr">Next<span>→</span></a>
		</section>
	</div>
</template>
<script>
import { Rater } from 'vux'
export default{
	name: 'reviews',
	data() {
		return{
			startnum: 4
		}
	},
	components: {
		Rater
	},
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
	}
}
</script>
<style lang="scss" scoped>
.reviews{
	margin-top: 1rem;
	.reviewer{
		font-size: .9rem; margin: .5rem 0; padding: 0 1rem;
		a{
			color: #0066c0;
		}
		span{
			color: #555;
		}
	}
	section{
		padding: 0 1rem;
		strong{
			font-size: .9rem; margin-left: 10px;
		}
		p{
			font-size: .9rem;
		}
		a{
			display: block; float: left; padding: .5rem 0; text-align: center; width: 30%; font-size: .8rem; border: 1px solid #ADB1B8; border-radius: .2rem; margin-right: 3%; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec);
		}
		.report{
			border: 0; background: none;
		}
	}
	.help{
		padding: 1rem;
	}
	.page{
		background: #f3f3f3; padding: 2rem 1rem;
		a{
			margin: 0; width: 45%; padding: .5rem 0; text-align: center;
		}
		a.fl{
			 float: left;
			 span{
				margin-right: 1rem;
			}
		}
		a.fr{
			float: right;
			span{
				margin-left: 1rem;
			}
		}
	}
}	
</style>