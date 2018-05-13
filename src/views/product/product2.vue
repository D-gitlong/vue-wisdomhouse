<template>
	<div class="double-row">
		<div class="filter">
			<div class="filter-header">
				<h3 class="filter-before" v-show="!isShowFilter">Explore gift ideas<a href="javascript:void(0);" @click="showFilterBox" class="filter-btn">Filter</a></h3>
				<h3 class="filter-after" v-show="isShowFilter">
					<a href="javascript:void(0);" @click="filterBack" class="filter-back">Cancel</a>
					Filter
					<a href="javascript:void(0);" @click="clearCheck" class="filter-clear">Clear All</a>
				</h3>
				<div class="filter-content" v-show="isShowFilter">
					<div class="filter-item" :class="{on: isOn}">
						<p @click="showFilter">Find the perfect gift for:<i class="fa fa-lg " :class="[isOn ? 'fa-angle-up' : 'fa-angle-down']" aria-hidden="true"></i></p>
						<ul v-show="isOn">
							<li>
								<label>
									<input type="checkbox" value="1" v-model="checked" />
									<span>Adventurers</span>
								</label>
							</li>
							<li>
								<label>
									<input type="checkbox" value="2" v-model="checked" />
									<span>Entertainers</span>
								</label>
							</li>
						</ul>
					</div>
					<div class="filter-item" :class="{on: isOn2}">
						<p @click="showFilter2">Price:<i class="fa fa-lg" :class="[isOn2 ? 'fa-angle-up' : 'fa-angle-down']" aria-hidden="true"></i></p>
						<ul v-show="isOn2">
							<li>
								<label>
									<input type="checkbox" value="3" v-model="checked" />
									<span>Under $25</span>
								</label>
							</li>
							<li>
								<label>
									<input type="checkbox" value="4" v-model="checked" />
									<span>$25 to $50</span>
								</label>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</div>
		<div class="dr-container">

			<flexbox :gutter="20" v-for="wItem in list" :key="wItem.id">
	      <flexbox-item v-for="nItem in wItem.alink" :key="nItem.id">
					<a :href="nItem.ahref" class="dr-column">
						<div class="dr-img">
							<img :src="nItem.imgLink" />
						</div>
						<div class="dr-info">
							<p class="dr-info-tit">{{nItem.tit}}</p>
							<p class="dr-info-price">
								<span>${{nItem.price}}</span>
								<i class="vipicon"></i>
							</p>
							<div class="pro-rater com-pro-rater">
								<rater v-model="nItem.start" disabled :font-size="16" :max="5" active-color="#fad000"></rater>
								<span class="rater-num">{{nItem.commentCount}}</span>
							</div>
						</div>
					</a>
	      </flexbox-item>

	    </flexbox>

	    
    </div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import { Rater, Flexbox, FlexboxItem } from 'vux'
	export default{
		name: 'product2',
		data() {
			return{
				startnum: 5,
				isOn: false,
				isOn2: false,
				checked: [],
				isShowFilter: false,
				n: 1,
				list: [
					{
						alink: [
							{
								ahref: '#/details/3',
								imgLink: 'static/images/light/4.jpg',
								tit: 'Exploding Kittens: A Card Game About Kittens and Explosions and Sometimes Goats',
								price: 25.56,
								start: 3,
								commentCount: 2523,
								imgName: '4.png'
							},
							{
								ahref: '#/details/32',
								imgLink: 'static/images/t2.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523
							}
						]
					},
					{
						alink: [
							{
								ahref: '#/details/5000',
								imgLink: 'static/images/t3.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523
							},
							{
								ahref: '#/details/1',
								imgLink: 'static/images/light/2.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523,
								imgName: '2.png'
							}
						]
					},
					{
						alink: [
							{
								ahref: '#/details/2',
								imgLink: 'static/images/light/3.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523,
								imgName: '3.png'
							},
							{
								ahref: '#/details/55000',
								imgLink: 'static/images/t2.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523
							}
						]
					},
					{
						alink: [
							{
								ahref: '#/details/5000',
								imgLink: 'static/images/t3.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523
							},
							{
								ahref: '#/details/5',
								imgLink: 'static/images/light/6.jpg',
								tit: '',
								price: 25.56,
								start: 3,
								commentCount: 2523,
								imgName: '6.png'
							}
						]
					}
				]
			}
		},
		components:{
			Rater,
			Flexbox,
			FlexboxItem
		},
		methods: {
			showFilter() {
				this.isOn = !this.isOn
			},
			showFilter2() {
				this.isOn2 = !this.isOn2
			},
			clearCheck() {
				this.checked = false
			},
			showFilterBox() {
				this.isShowFilter = true
			},
			filterBack() {
				this.isShowFilter = false
			}
		},
		mounted() {
			this.$store.dispatch('isShowSearch',false)
			this.$store.dispatch('isShowBack',true)
		}
	}
</script>

<style lang="scss">
.double-row{
	padding: 0 15px;
	.dr-column{
		display: block; 
		.dr-img{
			width: 100%;
		}
		.dr-info-tit{
			display: -webkit-box; max-width: 100%; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.4em;height: 38px; margin-top: 5px; font-size: .9rem;
		}
		.dr-info-price{
			color: #B12704; font-size: .8rem; font-weight: bold; margin: 5px 0;
			.vipicon{
				height: 1.4rem; width: 3rem; vertical-align: middle; background: url(../../assets/img/bg/bg1.png) no-repeat; background-size: contain; display: inline-block; margin-left: 5px;
			}
		}
		.rater-num{
			font-size: .8rem;
		}
	}
	.vux-rater-box{
		background: url(../../assets/img/bg/start_none.png) no-repeat; background-size: contain; text-indent: -999999px;
	}
	.vux-rater-box.is-active{
		background: url(../../assets/img/bg/start_all.png) no-repeat; background-size: contain;
	}
	.vux-flex-row{
		margin-bottom: 1rem;
	}
	.filter{
		margin-bottom: 1rem;
		.filter-header{
			h3{
				font-size: 1.2rem; border-bottom: 1px solid #e7e7e7; overflow: hidden; margin: .5rem 0; padding: .5rem .5rem 1rem;
				.filter-btn{
					 font-size: 1rem; padding: .3rem .8rem;color: #111; display: block; text-align: center; float: right; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec);box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; border-radius: 2px; border: 1px solid #ADB1B8;
				}
			}
			.filter-after{
				text-align: center; border-bottom: 0; font-weight: bold; overflow: hidden; margin: .5rem 0 0;
				.filter-back,.filter-clear{
					font-size: .8rem; color: #0066c0; padding: .5rem;
				}
				.filter-back{
					float: left;
				}
				.filter-clear{
					float: right;
				}

			}
		}
		.filter-content{
			border: 1px solid #ddd;
			.filter-item{
				border-bottom: 1px solid #ddd;
				&:last-child{
					border-bottom: 0;
				}
				p{
					font-weight: bold; font-size: 1rem; overflow: hidden; background: #f3f3f3; padding: .5rem 1rem; position: relative;
					.fa{
						position: absolute; right: 1rem; top: 50%; transform: translateY(-50%);
					} 
				}
				ul{
					background: #fff;
					li{
						padding: 1rem; font-size: 1rem; border-bottom: 1px solid #ddd;
						label{
							display: block;
						}
						input{
							width: 1.3rem; height: 1.3rem; vertical-align: middle; margin-right: .5rem; 
						}
						&:last-child{
							border-bottom: 0;
						}
					}
				}
				&.on p{
					background: #e9e9e9;
				}
			}
		}
	}
}
</style>