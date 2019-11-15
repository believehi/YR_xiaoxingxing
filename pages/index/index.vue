<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
					 @change="swiperChange">
						<swiper-item v-for="(item,index) in baseinfo" :key="index">
							<image :src="item.Thumbnail" mode="" @tap="newsdetails(item.Id)"></image>
						</swiper-item>
					</swiper>
					<!-- 轮播图圆点 -->
					<view class="dots">
						<block v-for="(item,index) in baseinfo" :key="index">
							<view :class="index == swiperCurrent ? ' active' : 'dot'"></view>
						</block>
					</view>
					<!-- 轮播图圆点结束 -->
				</view>
			</view>
		</view>
		<!-- 轮播图结束 -->
		<!-- 轮播下导航 -->
		<view class="uni-nav-list">
			<!-- 报名 -->
			<view class="uni-nav-item" @tap="openbaoming">
				<image src="../../static/baoming.jpg" mode=""></image>
			</view>
			<!-- 心得打卡 -->
			<view class="uni-nav-item" @tap="daka_but">
				<image src="../../static/daka.jpg" mode=""></image>
			</view>
			<!-- 导师评分 -->
			<view class="uni-nav-item" @tap="Teacher_but">
				<image src="../../static/pinfen.jpg" mode=""></image>
			</view>
		</view>
		<view class="uni-nav-bot">
			<!-- 在线热播 -->
			<view class="uni-bot-list" @tap="rb_buthot">
				<image src="../../static/reibo.jpg" mode=""></image>
			</view>
			<view class="uni-bot-list1">
				<!-- 当前热播 -->
				<view class="uni-nav1">
					<image src="../../static/reibo2.jpg" mode="" @tap="rb_butnow"></image>
				</view>
				<!-- 点亮中国图 -->
				<view class="uni-nav1" @tap="zg_but">
					<image src="../../static/dianliang.jpg" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 轮播下导航结束 -->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				baseinfo: [                        //轮播图数组
					'../../static/lun.jpg',
					'../../static/lun.jpg',
					'../../static/lun.jpg'
				],
				indicatorDots: false,     //是否需要轮播圆点
				autoplay: true,       //是否自动轮播
				interval: 3000,     //轮播图间隔时间
				duration: 500,      //轮播图滚动时间
				current: 0,        //轮播图下标圆点初始值
				swiperCurrent: 0
			}
		},
		onLoad() {
			helper.islogin(true);
			this.xw();
		},
		methods: {
			// 获取轮播时图片的下表按
			swiperChange: function(e) {
				this.swiperCurrent = e.detail.current;
			},
			// 获取轮播图列表
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
						istop: 1,
						num: 3
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.baseinfo = res.data.data.baseinfo
							if(this.baseinfo.length>0 ){
								for(var j = 0; j<this.baseinfo.length ;j++){
									// console.log(this.baseinfo[j].Thumbnail.indexOf('http') != -1)
									if(this.baseinfo[j].Thumbnail.indexOf('http') == -1){
										this.baseinfo[j].Thumbnail = helper.imgurl +  this.baseinfo[j].Thumbnail ;
									}
								}
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
			// 跳转新闻详情
			newsdetails(mid){
				uni.navigateTo({
					url: 'news?Id=' + mid
				});
			},
			// 打开报名页面
			openbaoming() {
				uni.navigateTo({
					url: 'baoming',
				});
			},
			//打开心得打卡页面
			daka_but(){
				uni.navigateTo({
					url: 'mydaka',
				});
			},
			//打开导师评分页面
			Teacher_but(){
				uni.navigateTo({
					url: '../peixun/shijuanlist?pftype='+ 1,
				});
			},
			//打开热播
			rb_buthot(){
				uni.navigateTo({
					url: 'zaixianreibo',
				});
			},
			//打开当期热播
			rb_butnow(){
				uni.navigateTo({
					url: '../zhangzishi/dangqireibo',
				});
			},
			//点亮中国图
			zg_but(){
				uni.navigateTo({
					url: 'LightChina',
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
	.uni-padding-wrap{
		height: 30%;
	}
	.page-section-spacing{
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

	.dots {
		position: absolute;
		right: 15upx;
		bottom: 15upx;
		display: flex;
		justify-content: center;
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
	
	.uni-nav-list{
		display: flex;
		height:23% ;
	}
	
	.uni-nav-item{
		width: 33.5%;
		height: 100%;
		margin-top: 1%;
		margin-left: 1%;
	}
	.uni-nav-item:first-child{
		margin-left: 0;
	}
	.uni-nav-item image,.uni-bot-list image,.uni-nav1 image{
		width: 100%;
		height: 100%;
	}
	.uni-bot-list:first-child{
		width: 66.5%;
		height: 100%;
	
	}
	
	.uni-nav-bot{
		height: 45%;
		margin-top: 2%;
		display: flex;
	}
	.uni-bot-list1{
		width: 33%;
		height: 100%;
		margin-left: 1%;
	}
	.uni-nav1{
		height: 49.5%;
	}
	
	.uni-nav1:nth-child(2){
		margin-top: 2.3%;
	}
</style>
