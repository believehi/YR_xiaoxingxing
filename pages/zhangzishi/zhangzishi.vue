<template>
	<view class="content">
		<view class="uni-nav-item">
			<image src="../../static/rebo_1.jpg" @tap="rb_bot"></image>
		</view>
		<view class="uni-nav-item" @tap="zg_but">
			<image src="../../static/dianlian_1.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			helper.islogin(true);
		},
		methods: {
			rb_bot(){
				uni.navigateTo({
					url: 'dangqireibo'
				});
			},
			zg_but(){
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '敬请期待',
				// 	duration: 2000
				// });
				uni.navigateTo({
					url: '../index/LightChina'
				});
			}
		}
	}
</script>

<style>
	page {
		width: 96%;
		height: 100%;
		padding: 0 2%;
	}
	.content{
		height: 100%;
		overflow: hidden;
	}
	.uni-nav-item{
		width: 100%;
		height: 32%;
		margin-top:1.333% ;
	}
	.uni-nav-item image{
		width: 100%;
		height: 100%;
	}
</style>
