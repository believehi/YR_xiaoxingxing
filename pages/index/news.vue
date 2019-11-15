<template>
	<view class="main">
		<view class="title">
			{{baseinfo.Title}}
		</view>
		<view class="uni-date">
			<text class="uni-date-in">发布时间：</text>{{dataTime[0]}}
			<view class="news-gd" @tap="newslist()">
				<image src="../../static/icon_03.png" mode=""></image>
				<text>更多新闻</text>
			</view>
		</view>
		<!-- <view class="uni-img">
			<image :src="baseinfo.Thumbnail" mode=""></image>
		</view> -->
		<view class="content">
			<rich-text :nodes="baseinfo.Contents"></rich-text>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				xwid: '',
				baseinfo: '',
				dataTime: ''
			}
		},
		onLoad(e) {
			this.xwid = e.Id;
			this.xw();
		},
		methods: {
			xw() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getnews',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						id: this.xwid
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
							let	listTime = this.baseinfo.CreateTime;
							this.dataTime = listTime.split(' ');
						} else {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							if(res.data.info == "未找到登录信息") {
								uni.reLaunch({
									url: '/pages/login/login'
								});
							}
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					},
				});
			},
			newslist() {
				uni.navigateTo({
					url: 'newslist',
				});
			}
		}
	}
</script>
<style>
	.main {
		height: 100%;
		color: #333;
	}

	.title {
		padding: 30upx 30upx 0;
		font-weight: 900;
		line-height: 60upx;
	}

	.uni-date {
		position: relative;
		padding: 0 30upx;
		font-size: 30upx;
		color: #999;
		line-height: 100upx;
	}
	
	.uni-date-in {
		color: #666;
	}

	.news-gd {
		position: absolute;
		right: 45upx;
		top: 0;
		display: flex;
		align-items: center;
	}

	.news-gd image {
		width: 30upx;
		height: 30upx;
		margin-right: 5upx;
	}

	.news-gd text {
		color: #3385FF;
		font-weight: 600;
		text-decoration: underline;
	}

	.uni-img {
		width: 100%;
	}

	.uni-img image {
		width: 100%;
	}

	.content {
		padding: 20upx 36upx!important;
		font-size: 32upx!important;
		line-height: 60upx!important;
	}

</style>
