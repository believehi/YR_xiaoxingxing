<template>
	<view class="content">
		<view class="uni-nav-item" @tap="dq_but">
			<image src="../../static/pege_2_1.jpg" mode=""></image>
		</view>
		<view class="uni-nav-item" @tap="wq_but">
			<image src="../../static/page2_2.jpg" mode=""></image>
		</view>
		<view class="uni-nav-item" @tap="zb_but">
			<image src="../../static/page2_3.jpg" mode=""></image>
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
			//打开直播页面
			zb_but() {
				uni.navigateTo({
					url: '../index/zaixianreibo'
				})
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '敬请期待，还在开发中！',
				// 	duration:1500
				// });
			},
			//打开往期培训页面
			wq_but() {
				uni.navigateTo({
					url: 'wangqipeiuxn'
				});
			},
			//打开报名页面
			dq_but() {
				uni.navigateTo({
					url: 'dangqipeixun'
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

	.content {
		height: 100%;
		overflow: hidden;
	}

	.uni-nav-item {
		width: 100%;
		height: 32%;
		margin-top: 1.333%;
	}

	.uni-nav-item image {
		width: 100%;
		height: 100%;
	}
</style>
