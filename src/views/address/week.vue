<template>
	<div class="week">
		<div class="ship-header">
			<span class="ship-cancel" @click="cancel">Cancel</span>
		</div>
		<div class="content">
			<div class="receive-day">
				<p>I can receive packages on</p>
				<p>
					<label>
						<input type="checkbox" v-model="checked1" />
						Saturday
					</label>
				</p>
				<p>
					<label>
						<input type="checkbox" v-model="checked2" />
						Sunday
					</label>
				</p>
				<p v-show="isShow">
					<i class="fa fa-info-circle"></i>
					<span>{{ info }}</span>
				</p>
				<p style="color: #555;">These instructions are used to plan your delivery. Though, shipments may sometimes arrive earlier or later than planned</p>
			</div>
			<a href="javascript:void(0);" class="continue">Save</a>
		</div>
		
	</div>
</template>

<script>
export default {
	name: 'week',
	data() {
		return{
			checked1: true,
			checked2: true,
			isShow: false,
			info: ''
		}
	},
	methods: {
		cancel(){
			this.$router.go(-1)
		}
	},
	watch: {
		checked1: function(newVal, oldVal) {
			if (newVal || (this.checked2 && !newVal)) {
				this.info = 'By unchecking this box, you are opting out of Sunday deliveries'
			}else{
				this.info = 'By unchecking both boxes, you are opting out of weekend deliveries'
			}
		},
		checked2: function(newVal, oldVal) {
			if (newVal || (this.checked1 && !newVal)) {
				this.info = 'By unchecking this box, you are opting out of Saturday deliveries'
			}else{
				this.info = 'By unchecking both boxes, you are opting out of weekend deliveries'
			}
		}
	},
	updated() {
		if (this.checked1 && this.checked2) {
			this.isShow = false
		}else{
			this.isShow = true
		}
	}
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/function";
.week{
	background: #fefefe; height: 100%;
	.ship-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold; text-align: center; color: #fff; line-height: 36px;
		.ship-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.content{
		padding: 1rem; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; -webkit-overflow-scrolling: touch; background: #fefefe;
		.receive-day{
			font-size: 1rem; color: #2b2b2b; padding: 0 1rem; border: 1px solid #ddd; border-radius: .2rem;
			label{
				display: block; line-height: 25px; text-indent: 1em;
			}
			input{
				width: 25px; height: 25px; vertical-align: top; margin-right: 8px;
			}
			p{
				margin: 1rem 0;
				.fa{ color: #35495e; margin-right: .3rem; }
			}
		}
		.continue{
			display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: 1rem; text-align: center; padding: 10px 0; border: 1px solid #b18007; margin: .5rem 0; text-align: center;
		}
	}
}
</style>
