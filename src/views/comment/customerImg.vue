<template>
	<div>
		<div class="customerImg clearfix">
			<img src="static/images/light/1.png" />
			<img src="static/images/light/2.png" />
			<img src="static/images/light/4.png" />
			<img src="static/images/light/5.png" />
			<img src="static/images/light/3.png" />
			<img src="static/images/light/6.png" />
		</div>
	</div>
</template>
<script>
export default {
	name: 'customerImg',
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
	}
}
</script>
<style scoped lang="scss">
.customerImg{
	width: 100%; background: #fff; margin-top: .5rem;
	img{
		display: block; width: 30%; margin: 1.5%; float: left;
	}
}
</style>