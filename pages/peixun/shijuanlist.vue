<template>
	<view class="content">
		<view class="cart" :hidden="iscart">
			<view>暂无数据</view>
		</view>
		<!-- 当期报名结束 -->
		<!-- 报名课程列表 -->
		<view class="uni-kc-list" :hidden="!iscart">
			<view class="uni-kc-item" v-for="(item,index) in kclist" :key="index" @tap="openkc" :data-sjid="item.ID" :data-ispg="item.ispg">
				<view class="uni-time">
					<view class="time">
						{{item.ShiJuanName}}
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
				pxid: '',
				pftype: 0 //1首页进入 2培训进入
			}
		},
		onLoad(e) {
			helper.islogin(true); //判断是否登录
			this.pftype = e.pftype;
			if (e.pftype == 2) {
				this.pxid = e.pxid;
			}
			this.wqpxlist()
		},
		onShow() {
			this.wqpxlist()
		},
		methods: {
			//请求培训列表接口
			wqpxlist() {
				var leturl, datadata;
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				//首页进来的
				if (this.pftype == 1) {
					leturl = 'SignuUp/getsyplist';
					datadata = helper.postdata({
						userid: helper.getstate().userid,
						page: 1,
						num: 10
					})
				} else if (this.pftype == 2) {
					//培训进来的
					leturl = 'SignuUp/getpaperlist'
					datadata = helper.postdata({
						userid: helper.getstate().userid,
						id: this.pxid
					})
				}
				uni.request({
					url: helper.websiteUrl + leturl,
					method: 'POST',
					data: datadata,
					success: res => {
						if (res.data.code == 200) {
							console.log(datadata)
							console.log(res.data.data)
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
							if (res.data.info == "未找到登录信息") {
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
				if (e.currentTarget.dataset.ispg == 0) {
					uni.navigateTo({
						url: 'pingfen?sjid=' + e.currentTarget.dataset.sjid
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '已进行评分,无法再次评分!'
					})
				}
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

	.cart {
		text-align: center;
		font-size: 36upx;
		line-height: 100upx;
		color: #888;
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

	.time {
		font-size: 34upx;
	}

	.uni-time text {
		font-size: 32upx;
	}

	.uni-kc-item {
		padding: 0 30upx;
		background-color: #bfbdd8;
		margin-top: 10upx;
		line-height: 120upx;
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
		background-color: #7f7bb2;
	}
</style>
