<template>
	<div class="login-wrap">
		<div class="login-header common-header">
			<span class="login-cancel" @click="cancel">Cancel</span>
			Wisdom House
		</div>

		<div class="login-content">
			<!-- 提示信息 -->
			<!-- <div class="tips-box">
				<p class="tips-tit">There was a problem</p>
				<div class="tips-content">Your password is incorrect</div>
			</div> -->
			<h3>Welcome</h3>
			<div class="login-box">
				<div class="create">
					<div class="login-tit" @click="showBox(true)" :class="{on: !isOn}">
						<span class="login-icon"></span>
						<strong>Create an account.</strong> New to Wisdom House?
					</div>
					<div class="login-padding" v-show="!isShow">
						<group>
					    <x-input type="text" placeholder="Name" v-model="createUser"></x-input>

					    <div class="mobile-instead">
					    	<p>We'll send you a text verification.</p>
					    	<div class="mobile-box" v-show="isShowBox2">
					    		<a href="javascript:void(0);" class="select-btn">US + 1<i class="fa fa-sort"></i></a>
									<x-input type="number" class="mobile-input" placeholder="Mobile number" v-model="mobile"></x-input>
					    	</div>
					    	<div class="email-box" v-show="!isShowBox2">
					    		<x-input type="email" placeholder="Your email address" v-model="email"></x-input>
					    	</div>
					    	<button class="use-method" @click="showBoxTwo(true)" v-show="isShowBox2">Use your email instead</button>
					    	<button class="use-method" @click="showBoxTwo(false)" v-show="!isShowBox2">Use your mobile number instead</button>
					    </div>
							<div class="pwd-wrap" :class="{showpwd: isShowpwd2}">
								<x-input type="password" class="hidepwd" placeholder="Create a password (6+ characters)" v-model="createPwd"></x-input>

								<x-input v-show="isShowpwd2" type="text" disabled class="showpwd" v-model="createPwd"></x-input>
							</div>
					  </group>

					  <div class="login-row">
							<label>
								<input type="checkbox" @click="showPwdBox()" v-model="checked" />
								Show password
							</label>
						</div>
						<button class="create-account" v-show="!isShowBox2" @click="_create">Create your account</button>
						<button class="create-account" v-show="isShowBox2" @click="_createMobile">Continue</button>
						<div class="login-tips">
							By creating an account, you agree to LifeBulb's <a href="javascript:void(0);">Conditions of Use</a> and <a href="javascript:void(0);">Privacy Notice</a>
						</div>
					</div>
				</div>

				<div class="login">
					<div class="login-tit" @click="showBox(false)" :class="{on: isOn}">
						<span class="login-icon"></span>
						<strong>Login.</strong> Already a customer?
					</div>
					<div class="login-padding" v-show="isShow">
						<group class="login-border">
					    <x-input type="text" placeholder="Email (phone for mobile accounts)" v-model="username"></x-input>

					    <div class="pwd-wrap" :class="{showpwd: isShowpwd}">
								<x-input type="password" class="hidepwd" placeholder="Wisdom House password" v-model="password"></x-input>

								<x-input v-show="isShowpwd" type="text" disabled class="showpwd" v-model="password"></x-input>
							</div>
					  </group>
						<div class="login-row">
							<label>
								<input type="checkbox" @click="showPwdBox()" v-model="checked" />
								Show password
							</label>
							<a href="javascript:void(0);" class="forgot">Forgot password?</a>
						</div>
						<button class="sign-in" @click="_login">Sign in</button>
						<div class="login-tips">
							By signing in you are agreeing to our <a href="javascript:void(0);">Conditions of Use and Sale</a> and our <a href="javascript:void(0);">Privacy Notice</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Group, XInput } from 'vux'
	import { mapActions } from 'vuex'
	import API from '@/api/api'
	import * as _ from '@/util/tool'
	import icon from '@/components/icon.vue'
	export default {
		name: 'login',
		data () {
			return {
				username: 'test',
				password: '123123',
				mobile: '',
				email: '',
				createUser: '',
				createPwd: '',
				isOn: true,
				isShow: true,
				isShowBox2: true,
				isShowpwd: true,
				isShowpwd2: true,
				checked: true
			}
		},
		components: {
			icon,
			Group,
			XInput
		},
		methods: {
			...mapActions(['setToken']),
			// 用户注册
			_create() {
				if (!this.email || !this.createPwd || !this.createUser) {
          this.$vux.toast.text('The filled in information is not standard or incomplete', 'middle')
          return
        }
        if (this.createUser.length < 3) {
        	this.$vux.toast.text('The username is too short', 'middle')
        	return
        }
        if ( this.createUser.length > 25 ) {
          $scope.toast('The username is too long');
          return;
        }

        if ( this.createPwd.length < 6 ) {
          $scope.toast('Please enter the correct password');
          return;
        }

        if ( this.email.length < 5 ) {
          $scope.toast('Please enter the correct mailbox address');
          return;
        }
        let data = {
          username: this.createUser,
          password: this.createPwd,
          email: this.email
        }
        this.$vux.loading.show({
					text: 'Loading'
				})
				API.Signup(data)
          .then(res => {
          	this.$vux.loading.hide()
            if(res.data.error_code == 0) {
            	
            	this.$vux.toast.text('Registration success', 'middle')
            	setTimeout(()=>{
            		this.$router.push('/')
            	},1500)
            }else{
            	this.$vux.toast.text(res.data.error_desc, 'middle')
            }
          })
          .catch(error => {
            console.log(error)
          })
			},
			_createMobile() {

			},
			// 用户登录
      _login() {
        if (!this.username || !this.password) {
          this.$vux.toast.text('The filled in information is not standard or incomplete', 'middle')
          return
        }
        let data = {
          username: this.username,
          password: this.password
        }
        this.$vux.loading.show({
					text: 'Loading'
				})
        API.Login(data)
          .then(res => {
            if(res.data.error_code == 0) {
            	this.$vux.loading.hide()
            	this.setToken(res.data.token)
            	API.setHeader(res.data.token)
            	this.$vux.toast.text('Login success', 'middle')
            	setTimeout(()=>{
            		this.$router.push('/')
            	},1500)
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      showBox(flag) {
      	if (flag) {
      		this.isOn = false
      		this.isShow = false
      	}else{
      		this.isOn = true
      		this.isShow = true
      	}
      	
      },
      showBoxTwo(flag) {
      	if (flag) {
      		this.isShowBox2 = false
      	}else{
      		this.isShowBox2 = true
      	}
      	
      },
      showPwdBox() {
      	this.isShowpwd = !this.isShowpwd
      },
      cancel() {
      	this.$router.go(-1)
      }
		},
		mounted() {
			this.isShowpwd = this.password.length > 0 ? true : false
			this.isShowpwd2 = this.createPwd.length > 0 ? true : false
		},
		watch: {
			password() {
				this.isShowpwd = this.password.length > 0 ? true : false
			},
			createPwd() {
				this.isShowpwd2 = this.createPwd.length > 0 ? true : false
			}
		}
	}
</script>

<style scoped lang="scss">
@import "../../assets/scss/function";
.login-wrap{
	background: #f6f6f6; height: 100%;
	.tips-box{
		border: 1px solid #c40000; border-radius: .3rem; padding: 1rem; margin: 1rem 0 1rem; background: #fff; box-shadow: 0 0 0 0.4rem #fcf4f4 inset;
		.tips-tit{
			color:#c40000; font-weight: bold; font-size: 1rem;
		}
		.tips-content{
			font-size: 1rem;
		}
	}
	.login-header{
		position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: $headerBg; height: 46px; padding: 5px 0; font-size: 1rem; font-weight: bold;  text-align: center; color: #fff; line-height: 36px;
		.login-cancel{
			position: absolute; left: 1rem; top: 5px; font-size: .8rem; font-weight: normal;
		}
	}
	.login-content{
		 padding: .5rem 1rem 0; position: relative; top: 46px; left: 0; right: 0; bottom: 0; overflow-y: scroll; z-index: 900; -webkit-overflow-scrolling : touch;
		h3{
			font-size: 1.5rem; font-weight: bold;
		}
		.login-box{
			border: 1px solid #ddd; border-radius: .3rem; background: #fff; overflow: hidden;
			.login-tit{
				font-size: .6rem; background: #f3f3f3; padding: .2rem 1rem .5rem;
				strong{
					font-size: 1rem;
				}
			}
			.login-tit{
				border-bottom: 1px solid #ddd;
				.login-icon{
					position: relative; top: 6px; width: 25px; height: 25px; background: url(../../assets/img/bg/bg2.png) no-repeat; background-size: contain; display: inline-block;
				}
			}
			.login-tit.on{
				background: #fff; border-bottom: 0;
				.login-icon{
					background: url(../../assets/img/bg/bg2_on.png) no-repeat; background-size: contain;
				}
			}
			.create{
				.login-tit{
					border-bottom: 0;
				}
			}
			.login{
				.login-tit{
					border-top: 1px solid #ddd; border-bottom: 0;
				}
			}
			.login-padding{
				padding: 0 1rem;
			}
			.weui-cell{
				border: 1px solid #a6a6a6; border-radius: .2rem; margin: .5rem 0 1rem;
			}
			.mobile-box{
				overflow: hidden;
				.mobile-input{
					width: auto;
				}
			}
			.select-btn,.use-method{
				position: relative; border: 1px solid #ADB1B8; padding: 13px 50px 13px 15px; display: inline-block; border-radius: .2rem; background: linear-gradient(to bottom,#f7f8fa,#e7e9ec); box-shadow: 0 0.1rem 0 rgba(255,255,255,.6) inset; font-size: .8rem; float: left; margin: .5rem 0; margin-right: 1rem;
				.fa{
					position: absolute; right: .5rem; top: 50%; transform: translateY(-50%);
				}
			}
			.use-method{
				width: 100%; margin-bottom: 1rem; margin-top: 0;
			}
			.login-row{
				overflow: hidden; margin-bottom: .8rem;
				label{
					font-size: .6rem;
					input{
						width: 20px; height: 20px; vertical-align: middle;
					}
				}
				.forgot{
					float: right; color: #0066c0;
				}
			}
			.create-account,.sign-in{
				display: block; width: 100%; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); background: #f4d078; box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; font-size: .8rem; text-align: center; padding: 13px 0; border: 1px solid #b18007; margin: .5rem 0; text-align: center;
			}
			.login-tips{
				font-size: .6rem; padding: 1rem 0;
				a{
					color:#0066c0;
				}
			}
			.pwd-wrap.showpwd{
				position: relative; margin-bottom: .8rem;
				.hidepwd{
					margin: 0; border-bottom: 0; border-bottom-left-radius: 0; border-bottom-right-radius: 0;
				}
				.showpwd{
					margin: 0; border-top: 0; border-top-left-radius: 0; border-top-right-radius: 0; padding: 5px 15px;
				}
			}
		}
	}
}

</style>
<style lang="scss">
.login-box{
	.weui-cells:after,.weui-cells:before,.weui-cell:before{
		border-top: 0; border-bottom: 0;
	}
	.weui-cells{
		margin-top: 0;
	}
	.weui-input{
		font-size: 14px;
	}
}

</style>