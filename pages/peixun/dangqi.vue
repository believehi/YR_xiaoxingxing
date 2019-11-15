<template>
	<view class="content">
		<view class="uni-jy" @tap="jieyingpic">
			<image src="../../static/jy_1.jpg" mode=""></image>
			<!-- <view>{{mytitle}}</view> -->
		</view>
		<view class="uni-cf-box" @tap="cf_but">
			<input type="text" value="" disabled="true" placeholder="查分" />
			<uni-icon class="fa fa-search"></uni-icon>
		</view>
		<view class="uni-dk-box">
			<image src="../../static/dk_1.jpg" mode="" @tap="opendk"></image>
			<image src="../../static/ds_1.jpg" mode="" @tap="openpf"></image>
		</view>
		<view class="uni-dk-box">
			<image src="../../static/xy_1.jpg" mode="" @tap="opensp"></image>
			<image src="../../static/mz_1.jpg" mode="" @tap="openmz"></image>
		</view>
	</view>

</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				mytitle: '',
				indicatorDots: false,
				autoplay: true,
				interval: 3000,
				duration: 500,
				pxid: '',
				mzlist1: {},
				IsCX:0,
				pxname:''
			}
		},
		onLoad(e) {
			this.pxid = e.pxid; //接收课程的id
			this.mytitle = e.mytitle; //接收课程的id
		},
		onShow() {
			this.pxid = this.pxid; //接收课程的id
			helper.islogin(true);
			this.mzlist();
		},
		methods: {
			//加载获取数据
			mzlist() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getnowpxinfo',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						id: this.pxid
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.mzlist1 = res.data.data.mzlist;
							this.IsCX  = res.data.data.IsCX;
							this.pxname = res.data.data.baseinfo.TrainName;
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
			//查分	
			cf_but() {
				uni.navigateTo({
					url:'getscore?pxid='+ this.pxid + '&pxname='+this.pxname
				})
			},
			//打开导师评分
			openpf() {
				if(this.IsCX == 0){
					uni.showToast({
						icon: 'none',
						title: '您暂未参加本次培训！'
					});
					return;
				}
				uni.navigateTo({
					url:'shijuanlist?pxid=' + this.pxid + '&pftype='+ 2
				});
			},
			//学员美照
			openmz(){
				uni.navigateTo({
					url: 'meizhao?pxid=' + this.pxid
				});
			},
			//学员视频
			opensp(){
				uni.navigateTo({
					url: 'peixunsp?pxid=' + this.pxid
				});
			},
			//打开打卡圈
			opendk() {
				uni.navigateTo({
					url: 'daka?id=' + this.pxid
				});
			},
			//图片结营
			jieyingpic(){
				uni.navigateTo({
					url:'jieyingtupian?pxid=' + this.pxid
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		padding: 2%;
		box-sizing: border-box;
	}

	.uni-jy {
		position: relative;
		width: 100%;
		height: 450upx;
	}

	.uni-jy image {
		width: 100%;
		height: 100%;
	}
	
	.uni-jy view {
		position: absolute;
		width: 100%;
		text-align: center;
		left: 0;
		top: 80rpx;
		color: #fff;
		font-weight: 600;
		font-size: 34rpx;
		text-shadow: 4rpx 4rpx #000000;
	}

	.uni-cf-box {
		position: relative;
	}

	.uni-cf-box input {
		width: 85%;
		margin: 30upx auto;
		height: 70upx;
		border: 1upx solid #d1d0d0;
		padding-left: 10%;
		font-size: 30upx;
		color: #d1d0d0;
	}

	.uni-cf-box uni-icon {
		position: absolute;
		top: 25%;
		left: 5%;
		color: #d1d0d0;
	}

	.uni-dk-box {
		width: 100%;
		height: 270upx;
		display: block;
		padding-bottom: 10upx;
	}

	.uni-dk-box image {
		height: 100%;
		width: 49%;
	}

	.uni-dk-box image:nth-child(2) {
		margin-left: 2%;
	}

	.uni-lb-box {
		display: flex;
		align-items: center;
		margin-top: 2.5%;
	}

	.swiper {
		width: 33%;
		height: 250upx;
		margin-right: 2%;
	}

	.swiper:last-child {
		margin-right: 0;
	}

	.uni-lb-box image {
		width: 100%;
		height: 100%;
	}
</style>
