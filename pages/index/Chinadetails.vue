<template>
	<view class="content">
		<view class="uni-info">
			<view class="uni-img">
				<image :src="baseinfo.HeadUrl" mode=""></image>
			</view>
			<text>{{baseinfo.TrueName}}</text>
			<button class="uni-icon" open-type="share" @tap="onShareAppMessage">
				<uni-icon class="fa fa-share-square-o"></uni-icon>
			</button>
		</view>
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 @change="swiperChange">
						<swiper-item v-for="(item,index) in pics" :key="index">
							<image :src="item" mode=""></image>
						</swiper-item>
					</swiper>
					<!-- 轮播图圆点 -->
					<view class="dots">
						<block v-for="(item,index) in pics" :key="index">
							<view :class="index == swiperCurrent ? ' active' : 'dot'"></view>
						</block>
					</view>
					<!-- 轮播图圆点结束 -->
				</view>
			</view>
		</view>
		<!-- 轮播图结束 -->
		<view class="uni-content">
		{{baseinfo.contents}}
		</view>
		<view class="uni-wz-box">
			<uni-icon class="fa fa-location-arrow"></uni-icon>
			<text>{{baseinfo.position}}</text>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				id: '',
				baseinfo: '',
				pics: [],
				indicatorDots: false, //是否需要轮播圆点
				autoplay: true, //是否自动轮播
				interval: 3000, //轮播图间隔时间
				duration: 500, //轮播图滚动时间
				current: 0, //轮播图下标圆点初始值
				swiperCurrent: 0
			}
		},
		onLoad(e) {
			this.id = e.id; //接收课程的id
			this.xz_list();
			helper.islogin(true);
		},
		methods: {
			// 获取轮播时图片的下表按
			swiperChange: function(e) {
				this.swiperCurrent = e.detail.current;
			},
			//分享
			onShareAppMessage() {
				return {
					title: '资源分享',
					path: ''
				}
			},
			//下载资源包
			xz_list() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'hotlive/gettopic',
					method: 'POST',
					data: helper.postdata({
						postid: this.id,
						page: '1',
						num: '1',
					}),
					success: res => {
						if (res.data.code == 200) {
							this.baseinfo = res.data.data.baseinfo;
							if(this.baseinfo.HeadUrl.indexOf('http') == -1)
							{
								this.baseinfo.HeadUrl = helper.imgurl + this.baseinfo.HeadUrl;
							}
							this.pics = this.baseinfo.pics.split(";");
							if(this.pics){
								for(var i = 0;i<this.pics.length;i++){
									this.pics[i] = helper.updurl(this.pics[i]);
								}
							}
							uni.hideLoading();
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
	}
	.uni-info{
		padding: 15upx 0;
		display: flex;
		align-items: center;
		font-size: 30upx;
		color: #000000;
	}
	.uni-info text{
		margin-left: 15upx;
	}

	.uni-padding-wrap {
		height: 60%;
	}

	.page-section-spacing {
		height: 100%;
	}

	.swiper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.swiper image {
		width: 100%;
		height: 100%;
	}

	button::after {
		border: none;
	}

	.uni-img {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		overflow: hidden;
	}

	.uni-img image {
		width: 100%;
		height: 100%;
	}

	button {
		line-height: 35upx !important;
		background: #FFFFFF;
	}

	.dots {
		position: absolute;
		right: 15upx;
		bottom: 15upx;
		display: flex;
		justify-content: center;
	}

	.uni-icon {
		color: #999999;
		width: 13%;
		text-align: center;
		font-size: 45upx;
		position: absolute;
		right: 0;
		top: 30upx;
	}

	.uni-icon text {
		width: 100%;
		display: block;
		font-size: 30upx;
	}


	.dots view {
		margin: 0 8upx;
		width: 16upx;
		height: 16upx;
		border: 1upx solid #FFFFFF;
		border-radius: 50%;
		transition: all .6s;
	}

	.active {
		background: #FFFFFF;
	}
	.uni-content{
		padding: 30upx 20upx;
		font-size: 28upx;
		color: #000000;
		word-break:break-all; 
	}
	.uni-wz-box{
		display: flex;
		align-items: center;
		border-top: 1upx solid #e6e6e6;
		border-bottom: 1upx solid #e6e6e6;
		color: #999999;
	}
	.uni-wz-box text{
		font-size: 26upx;
		color: #999999;
		padding: 25upx 0;
		margin-left: 15upx;
	}
</style>
