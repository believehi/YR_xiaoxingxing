<template>
		<view class="content">
			<!-- 当期报名 -->
			<view class="uni-bm-box">
				<image src="../../static/wq_px.jpg" mode=""></image>
			</view>
			<view class="cart" :hidden="iscart">
				<view>暂无数据</view>
			</view>
			<!-- 当期报名结束 -->
			<!-- 报名课程列表 -->
			<view class="uni-kc-list" :hidden="!iscart">
				<view class="uni-kc-item" v-for="(item,index) in kclist" :key="index" @tap="openkc" :data-pxid="item.ID">
					<text class="uni-title">{{item.TrainName}}</text>
					<view class="uni-time">
						<view class="time">
							<text>{{item.BeginTime}}</text>
							至
							<text>{{item.EndTime}}</text>
						</view>
						<text>进入</text>
					</view>
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
					url: helper.websiteUrl + 'SignuUp/GetCurriculumList',
					method: 'POST',
					data: helper.postdata({
						type: "2"
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.kclist = res.data.data;
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
					url: 'wangqi?pxid=' + e.currentTarget.dataset.pxid
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

	.uni-time {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.uni-kc-item {
		padding: 20upx 27upx;
		background-color: #B5E3E3;
		margin-top: 10upx;
	}

	.uni-title {
		font-size: 32upx;
		color: #FFFFFF;
	}

	.uni-time {
		font-size: 24upx;
		color: #FFFFFF;
		margin-top: 12upx;
	}

	.uni-kc-item:nth-of-type(even) {
		background-color: #80D1D2;
	}
</style>
