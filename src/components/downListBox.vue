<template>
	<div class="rebate-box" :class="{show: toObject.isShowRebate}">
		<ul class="rebate-list">
			<li @click="upMsg(item)" v-for="item in comList">{{item.Utility}}</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'downListBox',
		props: {
      comList: Array,
      toObject: Object
    },
		methods: {
			upMsg(val) {
				this.$emit('getListMsg',val)
			}
		}
	}
</script>

<style scoped lang="scss">
.rebate-box{
		background: #fff; padding: .5rem 0;
		ul{
			position: relative; padding: 0 .5rem; max-height: 180px; overflow: hidden; overflow-y: scroll;
			li{
				padding: .5rem 0; border-bottom: 1px solid #efefef; font-size: 1rem;
				&:last-child{
					border-bottom: 0;
				}
			}
		}
	}
</style>