<template>
	<div class="double-row">
		<h3>Edit your picture</h3>
		<div class="dr-container clearfix">
			<div class="items clearfix" v-for="(nItem,index) in list">
				<div class="dr-column">
					<div class="dr-img">
						<img v-lazy="nItem.image" />
					</div>
					<div class="dr-info">
						<a href="javascript:void(0);" @click="editPicture(nItem.id)" class="edit-btn">Edit</a>
						<a href="javascript:void(0);" @click="deletePicture(nItem.id,index)" class="delete-btn">Delete</a>
					</div>
				</div>
			</div>
    </div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import * as _ from '@/util/tool'
	export default{
		name: 'editPicture',
		data() {
			return{
				list: []
			}
		},
		methods: {
			editPicture(id) {
				goNewEditVC(id,this.$store.state.user.token)
			},
			deletePicture(id,index) {
				this.$http.post('http://archipelago.uhutech.cn/api400/api/arimages/delete',{
					id: id
				}).then((response)=>{
					//console.log(response)
					if (response.status == 200) {
						if(response.data.status == 1){
							this.$vux.toast.text('Delete success', 'middle')
							this.list.splice(index,1)
						}else{
							this.$vux.toast.text('Delete failure', 'middle')
						}
					}
				})
			}
		},
		mounted() {
			this.$store.dispatch('isShowSearch',false)
			this.$store.dispatch('isShowBack',true)
			this.$vux.loading.show({
				text: 'Loading'
			})
			this.$http.get('http://archipelago.uhutech.cn/api400/api/arimages/list').then((response)=>{
				//console.log(response)
				if(response.status == 200){
		      this.$vux.loading.hide()
					this.list = response.data.data
				}
			})
		}
	}
	// 调用cordova里面的方法，编辑图片的功能
  function goNewEditVC(id,token){
		cordova.exec(alertSuccess,alertFail,"testPlugin","goEditImageVC",[id,token]);
	}
  function alertSuccess(msg) {}
  function alertFail(msg) {}
</script>

<style lang="scss">
.double-row{
	padding: 0 15px;
	h3{
		font-size: 1.2rem; border-bottom: 1px solid #e7e7e7; overflow: hidden; margin: .5rem 0; padding: .5rem .5rem 1rem;
	}
	.dr-container{
		margin: 1rem 0 2rem;
	}
	.vux-flex-row{
		margin-bottom: 1.5rem;
	}
	.items{
		width: 50%; padding: 0 1.5% 5%; float: left; min-height: 355px;
	}
	.dr-column{
		.dr-img{
			width: 100%;
		}
		.dr-info{
			overflow: hidden; margin: .5rem 0 0;
			a{
				display: inline-block; background: linear-gradient(to bottom,#f7dfa5,#f0c14b); background: #f4d078; box-shadow: 0 0.1rem 0 rgba(255,255,255,.4) inset; border-radius: .2rem; text-align: center; padding: .5rem 0; border: 1px solid #b18007; font-size: .8rem; color: #000; width: 40%;
			}
			.edit-btn{
				float: left;
			}
			.delete-btn{
				float: right; background: linear-gradient(to bottom, #f7f8fa, #e7e9ec); border: 1px solid #ADB1B8;
			}
		}
	}
}
</style>