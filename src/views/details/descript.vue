<template>
	<div class="description">
		<h2>Description</h2>
		<div class="content">
			<section>
				<strong>Product specification:</strong>
				<p>Fabric 190T water proof fabric coated with PU? Made of accessory PV film + PC adhesive tape? It’s adapted to the advanced coating material. The seamless welding technology makes the material fuse as a whole. It’s more durable and sturdy.</p>
			</section>
			<section>
				<strong>About us:</strong>
				<p>focus on doing outdoor supplies. We supply high quality and affordable outdoor products. If you are unsatisfied with our products, regardless of any time and any reason, we unconditionally refund and replacement. Give us a chance we will give you a surprise.</p>
			</section>
		</div>
	</div>
</template>

<script>
export default {
	name: 'descript',
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
	}
}
</script>

<style scoped lang="scss">
.description{
	padding: 1rem;
	h2{
		font-size: 1.2rem; font-weight: bold;
	}
	section{
		font-size: 1rem;
	}
}
</style>