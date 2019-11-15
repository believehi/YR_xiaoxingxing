<template>
		<view class="content">
			<view class="cart" :hidden="iscart">
				<view>暂无数据</view>
			</view>
			<!-- 当期报名结束 -->
			<!-- 报名课程列表 -->
			<view class="uni-kc-list" :hidden="!iscart">
				<view class="uni-kc-item" v-for="(item,index) in kclist" :key="index" @tap="openkc" :data-pxid="item.Id">
					<text class="uni-title">{{item.TrainName}}</text>
				</view>
			</view>
			<!-- 报名课程结束 -->
		</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				kclist: {}, //保存课程列表
				iscart: false,
			}
		},
		onShow() {
			helper.islogin(true); //判断是否登录
			this.wqpxlist()
		},
		methods: {
			//请求培训列表接口
			wqpxlist() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'SignuUp/gettrainlist',
					method: 'POST',
					data: helper.postdata({
						page:1,
						Num:10
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.kclist = res.data.data.baseinfo;
							if (this.kclist.length > 0) {
								this.iscart = true;
							} else {
								this.kclist = false;
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
			//打开课程详情
			openkc(e) {
				uni.navigateTo({
					url: 'baominguser?pxid=' + e.currentTarget.dataset.pxid
				});
			}
		}
	}
</script>

<style>
	.cart {
		text-align: center;
		margin-top: 10%;
		font-size: 30upx;
	}

	page {
		width: 96%;
		height: 100%;
		padding: 0 2%;
	}

	.uni-bm-box {
		width: 100%;
		height: 300upx;
	}

	.uni-bm-box image {
		width: 100%;
		height: 100%;
	}


	.uni-kc-item {
		padding: 20upx 27upx;
		background-color: #bfbdd8;
		margin-top: 10upx;
	}

	.uni-title {
		font-size: 32upx;
		color: #FFFFFF;
	}


	.uni-kc-item:nth-of-type(even) {
		background-color: #7f7bb2;
	}
</style>
