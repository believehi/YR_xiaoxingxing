<template>
	<view class="content">
		<view class="page-section page-section-gap">
			<map style="width: 100%;height: 1000upx;" :latitude="latitude1" circles=true :longitude="longitude1" :markers="covers"
			 show-location="true" @callouttap="change" id="Map">
			</map>
		</view>
		<view class="uni-ss-box">
			<view class="uni-inout-box">
				<input type="text" value="" />
				<uni-icon class="fa fa-search"></uni-icon>
			</view>
		</view>
		<button class="qd_but" @tap="sc_but">上传</button>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				title: 'map',
				latitude1: "",
				longitude1: "",
				iconPath1: '../../static/b.png',
				covers: []
			}
		},
		onShow() {
			this.chinalist();
			helper.islogin(true);
		},
		methods: {
			chinalist(type) {
				var _this = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						_this.latitude1 = JSON.stringify(res.latitude).substring(0, 12); //纬度
						_this.longitude1 = JSON.stringify(res.longitude).substring(0, 12); //经度
						uni.showLoading({
							mask: true,
							title: '加载中...'
						});
						uni.request({
							url: helper.websiteUrl + 'hotlive/chinalist',
							method: 'POST',
							data: helper.postdata({
								Lat: _this.latitude1,
								lng: _this.longitude1
							}),
							success: res => {
								if (res.data.code == 200) {
									uni.hideLoading();
									for (var i = 0; i < res.data.data.baseinfo.length; i++) {
										var wzarr = {
											latitude: res.data.data.baseinfo[i].lat,
											longitude: res.data.data.baseinfo[i].lng,
											id:res.data.data.baseinfo[i].Id,
											iconPath: '../../static/wz.png',
											callout: {
												content:res.data.data.baseinfo[i].contents.substring(0, 10),
												padding: 5,
												display: 'ALWAYS',
												textAlign: 'center',
												borderRadius:'5'
												// borderRadius: 10,
												// borderColor:'#ff0000',
												// borderWidth: 2,
											}
										}
										_this.covers.push(wzarr)

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
					fail: function(res) {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					}
				})
			},
			sc_but() {
				uni.navigateTo({
					url: 'shangchuang'
				});
			},
			change(e){
				uni.navigateTo({
					url: 'Chinadetails?id=' + e.mp.markerId
				});
			}
		}
	}
</script>

<style>
	page,
		{
		width: 100%;
		height: 100%;
		position: relative;
	}

	.uni-ss-box {
		position: absolute;
		top: 5%;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.uni-ss-box input {
		background: #FFFFFF;
		width: 534upx;
		height: 75upx;
		font-size: 30upx;
		padding-left: 80upx;
	}

	.uni-inout-box {
		position: relative;
		width: 614upx;
		color: #666666;
	}

	.uni-ss-box uni-icon {
		position: absolute;
		top: 20upx;
		left: 20upx;
	}

	.qd_but {
		margin-top: 50upx;
		width: 314upx;
		height: 68upx;
		color: #FFFFFF;
		background-color: #006666;
		border-radius: 5px;
		letter-spacing: 35upx;
		text-indent: 35upx;
		box-shadow: 0rem 5upx #006666;
		font-size: 30upx;
	}
</style>
