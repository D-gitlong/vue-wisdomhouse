<template>
	<div class="review-mention">
		<div class="header">
			<div class="h-img">
				<img src="static/images/light/2.jpg" />
			</div>
			<span>Anova Culinary Sous Vide Precision Cooker Bluetooth, Immersion Circulator, 800 Watts, Black</span>
		</div>
		<div class="mention-tit">
			<h3>Cooking</h3>
			<p>1,215 reviews</p>
		</div>

		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
			<span class="verify">Verified Purchase</span>
			<h3>Glad I Finally Purchased One of These! Only wish I'd done it sooner</h3>
			<p>I've been looking into Sous Vide <span class="bgf">cooking</span> for over a year now reading reviews etc. I finally pulled the plug on this model and couldn't be happier with this purchase. We've used it everyday for over a month now.</p>
		</section>

		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
			<span class="verify">Verified Purchase</span>
			<h3>Glad I Finally Purchased One of These! Only wish I'd done it sooner</h3>
			<p>I've been looking into Sous Vide <span class="bgf">cooking</span> for over a year now reading reviews etc. I finally pulled the plug on this model and couldn't be happier with this purchase. We've used it everyday for over a month now.</p>
		</section>

		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
			<span class="verify">Verified Purchase</span>
			<h3>Glad I Finally Purchased One of These! Only wish I'd done it sooner</h3>
			<p>I've been looking into Sous Vide <span class="bgf">cooking</span> for over a year now reading reviews etc. I finally pulled the plug on this model and couldn't be happier with this purchase. We've used it everyday for over a month now.</p>
		</section>

		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
			<span class="verify">Verified Purchase</span>
			<h3>Glad I Finally Purchased One of These! Only wish I'd done it sooner</h3>
			<p>I've been looking into Sous Vide <span class="bgf">cooking</span> for over a year now reading reviews etc. I finally pulled the plug on this model and couldn't be happier with this purchase. We've used it everyday for over a month now.</p>
		</section>

		<section>
			<rater v-model="startnum" disabled :font-size="18" :max="5" active-color="#fad000"></rater>
			<span class="verify">Verified Purchase</span>
			<h3>Glad I Finally Purchased One of These! Only wish I'd done it sooner</h3>
			<p>I've been looking into Sous Vide <span class="bgf">cooking</span> for over a year now reading reviews etc. I finally pulled the plug on this model and couldn't be happier with this purchase. We've used it everyday for over a month now.</p>
		</section>

	</div>
</template>
<script>
import { Rater } from 'vux'
export default {
	name: 'reviewMention',
	data() {
		return{
			startnum: 5
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
<style scoped lang="scss">
.review-mention{
	background: #f3f3f3;
	.header{
		background: #fff; width: 100%; height: 60px; padding: .5rem 1rem; box-shadow: 0 1px 2px 0 rgba(141,141,141,.5); z-index: 800; overflow: hidden;
		span{
			text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: block; padding-left: 10px; color: #000; font-size: .9rem; font-weight: bold; line-height: 40px;
		}
		.h-img{
			width: 12%; float: left;
		}
	}
	.mention-tit{
		padding: 1rem;
		h3{
			font-weight: 700; font-size: 1.2rem; line-height: 1.25;
		}
		p{
			color:#767676; font-size: 1.5em;
		}
	}
	section{
		position: relative; background: #fff; padding: .5rem 1rem; margin-bottom: .5rem; box-shadow: 0 1px 2px 0 rgba(141,141,141,.5); 
		.verify{
			font-size: .95rem; color: #767676; margin-left: 5px;
		}
		h3{
			font-size: .95rem; font-weight: bold; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
		}
		p{
			font-size: .85rem;
			.bgf{background: #FFEBB7; height: 40px;}
		}
	}
}
</style>