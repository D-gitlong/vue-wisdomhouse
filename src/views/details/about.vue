<template>
	<div class="about">
		<h2>About this item</h2>
		<section>
			<strong>Features</strong>
			<ul>
				<li><span>Longer Time and Good Sealing：Relaxing and stays inflated for 4-8 hours. Our company's air lounger bed uses PC strip compared to other sellers’ PPT strip; the elastic of PC strip is better, which make sure it is not easy to leak.</span></li>
				<li><span>Ergonomic and Portable Design: Made of high quality with polyester cloth and Nylon fabric, it is durable and soft, so it can fit your any postures when you lie on it. And it only weighs 0.8kg, very portable to carry.</span></li>
				<li><span>Fast Filling: Take it out and open the bag and run fast. Against the wind about 20 feet. Then it will fill with air. It does not need any inflator tools.</span></li>
			</ul>
		</section>
		<section>
			<strong>Product information</strong>
			<table class="table">
				<tr>
					<th class="a-span3">Package Dimensions</th>
					<td class="a-span9">14 x 8 x 6 inches</td>
				</tr>
				<tr>
					<th class="a-span3">Item Weight</th>
					<td class="a-span9">1.9 pounds</td>
				</tr>
				<tr>
					<th class="a-span3">Package Dimensions</th>
					<td class="a-span9">14 x 8 x 6 inches</td>
				</tr>
				<tr>
					<th class="a-span3">Item Weight</th>
					<td class="a-span9">1.9 pounds</td>
				</tr>
				<tr>
					<th class="a-span3">Package Dimensions</th>
					<td class="a-span9">14 x 8 x 6 inches</td>
				</tr>
				<tr>
					<th class="a-span3">Item Weight</th>
					<td class="a-span9">1.9 pounds</td>
				</tr>
			</table>
		</section>
	</div>
</template>
<script>
export default {
	name: 'about',
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
	}
}
</script>
<style scoped lang="scss">
.about{
	padding: 1rem;
	h2{
		font-size: 1.5rem; font-weight: bold;
	}
	section{
		margin-bottom: 1rem;
		strong{
			font-size: 1rem;
		}
		ul{
			margin-left: 1rem; color: #949494;
			li{
				list-style: disc;
				span{
					color: #111; font-size: .9rem;
				}
			}
		}
	}
	.table{
		width: 100%;
		th, td{
			border-top: 1px solid #e7e7e7; padding: 1.3rem 1.7rem 1.2rem 1.7rem;
		}
		th{
			background-color: #f3f3f3; color: #111; font-weight: 400; font-size: .9rem;
		}
		td{
			font-size: .8rem;
		}
		.a-span3{
			width: 35%;
		}
		.a-span9{
			width: 65%;
		}
		tr:last-child td, tr:last-child tr{
			border-bottom: 1px solid #e7e7e7;
		}
	}
}
</style>