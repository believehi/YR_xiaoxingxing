<template>
	<view class="main">
		<view class="title">
			<image src="../../static/lun.jpg" mode=""></image>
		</view>
		<view class="nav">
			<view class="nav-icon"></view>
			<text>新闻公告</text>
			<view class="nav-info" @tap="newsIndex()">
				<image src="../../static/icon_03.png" mode=""></image>
				<text>返回首页</text>
			</view>
		</view>
		<view class="content">
			<block v-for="(item, index) in baseinfo" :key="index">
				<view class="list" @tap="newDetails(item.Id)">
					<view class="list-content">
						<text>{{item.Title}}</text>
						<!-- <view>{{item.Contents}}</view> -->
						<text>{{dataTime[index][0]}}</text>
					</view>
					<view class="list-img">
						<image :src="item.Thumbnail" mode=""></image>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				num: 10,
				baseinfo: '',
				dataTime: []
			}
		},
		onLoad() {
			this.xw()
		},
		// 下拉刷新
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
			this.qz();
		},
		//触底事件
		onReachBottom() {
			var tas1 = new String('5'); //触底加载5条数据
			this.num = Number(this.num) + Number(tas1);
			this.qz();
		},
		methods: {
			xw() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getnewslist',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						page: 1,
						num: this.num
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo;
							
								
							if(this.baseinfo){
								for(var i= 0;i<this.baseinfo.length;i++){
									this.baseinfo[i].Thumbnail = helper.updurl(this.baseinfo[i].Thumbnail);
								}
							}
							console.log(this.baseinfo[0].Thumbnail)
							console.log(this.baseinfo);
							let listTime = this.baseinfo.length;
							for (let i = 0; i < listTime; i++) {
								this.dataTime.push(this.baseinfo[i].CreateTime.split(' '));
							}
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
			newDetails(mid) {
				uni.navigateTo({
					url: 'news?Id=' + mid
				});
			},
			newsIndex() {
				uni.switchTab({
					url: 'index'
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

	.main {
		height: 100%;
		color: #333;
	}

	.title {
		width: 100%;
		height: 30%;
	}

	.title image {
		width: 100%;
		height: 100%;
	}

	.nav {
		display: flex;
		align-items: center;
		line-height: 100upx;
		font-size: 36upx;
		font-weight: 900;
		border-bottom: 1upx solid #E6E6E6;
		position: relative;
	}

	.nav .nav-icon {
		width: 5upx;
		height: 40upx;
		background-color: #f40;
		margin: 0 20upx;
	}

	.nav-info {
		position: absolute;
		right: 25upx;
		top: 0;
		display: flex;
		align-items: center;
	}

	.nav-info image {
		width: 25upx;
		height: 25upx;
		margin-right: 10upx;
	}

	.nav-info text {
		color: #3385FF;
		font-size: 30upx;
		font-weight: 600;
		text-decoration: underline;
	}

	.list {
		padding: 20upx;
		display: flex;
		align-items: center;
	}

	.list-content {
		flex: 1;
	}

	.list-content text:nth-of-type(1) {
		display: inline-block;
		font-size: 32upx;
		width: 450upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list-content view {
		width: 100%;
		font-size: 28upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.list-content text:nth-last-of-type(1) {
		display: block;
		font-size: 24upx;
		color: #999;
	}

	.list-img {
		width: 160upx;
		height: 120upx;
		margin-left: 20upx;
		border-radius: 10upx;
		position: relative;
		overflow: hidden;
	}

	.list-img image {
		width: 100%;
		height: 100%;
	}
</style>
