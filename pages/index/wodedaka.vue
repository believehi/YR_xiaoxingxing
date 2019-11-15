<template>
	<view class="content">
		<!-- 头部 -->
		<view class="uni-top-content">
			<!-- 头像 -->
			<view class="uni-img">
				<image src="../../static/back.png" mode=""></image>
			</view>
			<!-- 标题按钮 -->
			<view class="uni-content">
				<text>228期r7打卡圈</text>
				<text class="fu-title">86人加入 · 1142篇日记 ·</text>
				<view class="uni-but-list">
					<!-- 管理后台 -->
					<view class="uni-gl-but">
						<uni-icon class="fa fa-cog"></uni-icon>管理后台
					</view>
					<!-- 分享 -->
					<view class="uni-fx-but">
						<uni-icon class="fa fa-share"></uni-icon>分享
					</view>
					<!-- 其他功能 -->
					<view class="uni-but">
						<text></text>
						<text></text>
						<text></text>
					</view>
				</view>
			</view>
		</view>
		<!-- 头部结束 -->
		<!-- 选择显示内容 -->
		<view class="uni-xz-content">
			<!-- 日记 -->
			<view class="">
				<text>日记</text>
			</view>
			<!-- 成员 -->
			<view class="">
				<text>成员</text>
			</view>
			<!-- 筛选 -->
			<view class="">
				<text>筛选</text>
				<uni-icon class="fa fa-filter"></uni-icon>
			</view>
		</view>
		<!-- 选择显示内容结束 -->
		<!-- 内容 -->
		<view class="">
			
		</view>
		<!-- 内容结束 -->
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
			
		}
	}
	
</script>

<style>
	.uni-top-content {
		display: flex;
		align-items: center;
		padding: 5% 2%;
	}

	.uni-img {
		width: 170upx;
		height: 170upx;
		background-color: #333333;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}
	.uni-content{
		margin-left: 20upx;
	}
	.uni-content text {
		display: block;
		font-size: 30upx;
		color: #000000;
	}
	.uni-content .fu-title{
		font-size: 26upx;
		color: #999999;
		margin-top: 8upx;
	}
	.uni-but-list{
		margin-top: 10upx;
		display: flex;
		align-items: center;
	}

	.uni-but-list view {
		background-color: #006666;
		border-radius: 8upx;
		color: #FFFFFF;
		height: 54upx;
		line-height: 54upx;
		display: inline-block;
		margin-right: 15upx;
		font-size: 28upx;
		padding: 0 10upx;
	}
	.uni-but-list uni-icon{
		margin-right: 10upx;
	}

	.uni-but-list view:nth-child(3) {
		display: flex;
		align-items: center;
		width: 50upx;
	}

	.uni-but text {
		display: inline-block;
		width: 10upx;
		height: 10upx;
		border-radius: 50%;
		background: #FFFFFF;
		margin-left: 5upx;
	}
	.uni-xz-content{
		display: flex;
		align-items: center;
		border-top: solid 1upx #e6e6e6;
		border-bottom: solid 1upx #e6e6e6;
		padding: 2% 0;
	}
	.uni-xz-content view{
		width: 33.33333%;
		text-align: center;
		color: #999999;
		font-size: 30upx;
	}
	.uni-xz-content view:nth-child(1){
		text-align: left;
		padding-left: 5%;
	}
	.uni-xz-content view:nth-child(3){
		text-align: right;
		padding-right: 5%;
	}
</style>
