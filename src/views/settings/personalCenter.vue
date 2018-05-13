<template>
	<div class="center">
		<div class="see-others comclass">
			This is your private view. <a href="javascript:void(0);">See what others see</a>
		</div>
		<div class="edit comclass">
			<div class="edit-bg">
				<a href="javascript:void(0);" class="add-photo"></a>
			</div>
			
			<a href="javascript:void(0);" class="edit-btn">Edit your profile</a>
			<!-- <div class="edit-name" @click="showEdit"> -->
			<div class="edit-name">
				<p><strong>{{getUserData.username}}</strong><i class="fa fa-edit"></i></p>
			</div>
			<div class="edit-box clearfix" v-show="isEdit">
				<input type="text" class="edit-input" />
				<a href="javascript:void(0);" class="cancel" @click="hideEdit">Cancel</a>
				<a href="javascript:void(0);" class="save">Save</a>
			</div>
		</div>
		<div class="about-my comclass" v-if="isIOS()">
			<h3 class="center-tit">Picture <span class="small-font">handle</span></h3>
			<a href="#/editPicture">Edit your picture</a>
		</div>

		<div class="about-my comclass">
			<h3 class="center-tit">About <span class="small-font">Public</span></h3>
			<a href="javascript:void(0);">Add a couple of words about who you are</a>
		</div>

		<div class="insights comclass">
			<h3 class="center-tit">Insights</h3>
			<div class="insights-scroll">
				<a href="javascript:void(0);" class="a-public clearfix">
					<div class="a-num">0</div>
					<div class="a-right">
						<p>helpful votes</p>
						<span class="small-font">Public</span>
					</div>
				</a>
				<a href="javascript:void(0);" class="a-public clearfix">
					<div class="a-num">0</div>
					<div class="a-right">
						<p>reviews</p>
						<span class="small-font">Public</span>
					</div>
				</a>
				<a href="javascript:void(0);" class="a-public clearfix">
					<div class="a-num">0</div>
					<div class="a-right">
						<p>hearts</p>
						<span class="small-font">Public</span>
					</div>
				</a>
				<a href="javascript:void(0);" class="a-public clearfix">
					<div class="a-num">0</div>
					<div class="a-right">
						<p>idea lists</p>
						<span class="small-font">Public</span>
					</div>
				</a>
			</div>
		</div>

		<div class="shopping-wish comclass">
			<h3 class="center-tit">Shopping lists and wish lists</h3>
			<a href="javascript:void(0);">
				<div class="shopping-img">
					<img src="static/images/light/2.png" />
				</div>
				<span>Shopping List <i class="small-font">Private</i></span>
			</a>
		</div>

		<div class="Account comclass">
			<h3 class="center-tit">Account <i class="small-font">Always private</i></h3>
			<p>Check orders,add payments optionsmanage your password and more.</p>
			<a href="javascript:void(0);" class="go-account"><strong>Go to your account</strong></a>
		</div>

		<div class="your-garage comclass">
			<h3 class="center-tit">Your garage <i class="small-font">Private</i></h3>
			<p>Find parts and accessories that fit your vehicle and ask other owners for tips and advice.</p>
			<a href="javascript:void(0);">
				<div class="garage">
					<img src="static/images/news1.jpg" />
				</div>
				<span><strong>Shop parts and accessories from your garage</strong></span>
			</a>
		</div>

		<div class="give-us comclass">
			<a href="javascript:void(0);">Give us feedback to improve Wisdom House profile</a>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'personalCenter',
	data(){
		return{
			isEdit: false
		}
	},
	computed:{
    ...mapGetters(['getUserData'])
  },
	methods: {
		isIOS() {
			let u = navigator.userAgent
			let isCordova = typeof(cordova) == 'undefined' || !typeof(cordova) == 'object'
			return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && !isCordova
		},
		showEdit() {
			this.isEdit = true
		},
		hideEdit() {
			this.isEdit = false
		}
	},
	mounted() {
		this.$store.dispatch('isShowSearch',false)
		this.$store.dispatch('isShowBack',true)
	}
}
</script>
<style scoped lang="scss">
.center{
	.comclass{
		margin-bottom: .4rem; padding: .5rem 1rem; background: #fff;
		a{
			color: #0066c0;
		}
	}
	.center-tit{
		font-size: 1.2rem; margin-bottom: .5rem;
	}
	.small-font{
		font-size: 0.6rem; font-style: italic; color: #808080!important;
	} 
	background: #ddd; font-size: .9rem;
	.see-others{
		margin-bottom: 0;
		a{
			font-weight: bold;
		}
	}
	.insights{
		.insights-scroll{
			position: relative; overflow: hidden; overflow-x: scroll; width: 100%; height: 100%;  white-space: nowrap; -webkit-overflow-scrolling: touch; margin-top: .4rem;
			.a-public{
				position: relative; display: inline-block; border-top: .5rem solid #93e6a7; border-radius: .5rem; background: #f9f7ef; padding: 1rem 1.5rem; margin-right: .3rem; overflow: hidden; min-width: 50%;
				.a-num{
					font-size:2.5rem; float: left; color: #000; margin-right: .5rem;
				}
				.a-right{
					font-size: .8rem; color: #000; float: left; position: relative; transform: translateY(28%);
					span{
						font-size: .6rem; color: #808080; font-style:italic;
					}
				}
			}
		}
	}
	.shopping-wish{
		.shopping-img{
			width: 10%; display: inline-block;
		}
		.small-font{
			margin-left: 5px;
		}
	}
	.your-garage{
		.garage{
			margin: .5rem 0;
		}
	}
	.give-us{
		margin-bottom: 0;
	}
	.edit{
		position: relative; padding-left: 0; padding-right: 0; overflow: hidden; padding-top: 0;
		.edit-bg{
			position: relative; width: 100%; height: 80px; background: url(../../assets/img/bg/bg.jpg) no-repeat; background-size: cover;
		}
		.add-photo{
			display: block; position: absolute; left: 1rem; bottom: -30px; width: 80px; height: 80px; background: #fff url(../../assets/img/bg/icon.png) no-repeat; background-size: contain; border-radius: 100%; border: .1rem solid #fff;
		}
		.edit-btn{
			display: inline-block; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; text-align: center; padding: .5rem 1rem; border: 1px solid #b18007;font-size: .8rem; color: #000; float: right; margin-right:1rem; margin-top: .6rem;
		}
		.edit-name{
			margin: 3rem 0 .5rem 1rem;
			strong{
				font-size: 1rem; margin-right: .5rem; vertical-align: bottom;
			}
		}
		.edit-box{
			padding-bottom: .5rem;
			.edit-input{
				float: left; outline: none; border:1px solid #ADB1B8; border-radius: .2rem; padding: .6rem .6rem; margin-left: 1rem;
			}
			.cancel{
				float: left; position: relative; border: 1px solid #ADB1B8; padding: .5rem 1rem; display: inline-block; border-radius: .2rem; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; font-size: .8rem; margin: 0 .5rem;
			}
			.save{
				float: left; display: inline-block; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; text-align: center; padding: .5rem 1rem; border: 1px solid #b18007;font-size: .8rem; color: #000;
			}
		}
	}
}	
</style>