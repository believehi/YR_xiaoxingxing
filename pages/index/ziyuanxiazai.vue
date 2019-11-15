<template>
	<view class="content">
		<view class="uni-zy-box">
			<view class="uni-wj">
				<text>{{kclist.TrainName}}</text>
			</view>
			<button class="uni-icon" open-type="share">
				<uni-icon class="fa fa-share-square-o"></uni-icon>
				<text>分享</text>
			</button>
		</view>
		<!-- 下载按钮 -->
		<view class="uni-jd">
			{{jd}}
		</view>
		<view class="uni-xz-box" @tap="zyxz_but">
			<view class="icon-box">
				<uni-icon class="icon2"></uni-icon>
			</view>
			<view class="text-box">
				参训资料包下载
			</view>
		</view>

		<!-- 下载按钮结束-->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				kclist: {}, //保存课程列表
				kcid: '',
				jd: '',
				wz: '下载中'
			}
		},
		onLoad(e) {
			this.kcid = e.kcid; //接收课程的id
			helper.islogin(true);
			this.xz_but();
		},
		methods: {
			//下载资源包
			xz_but() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getfilesbyid',
					method: 'POST',
					data: helper.postdata({
						id: this.kcid
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.kclist = res.data.data.baseinfo;
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
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！',
							duration: 1500
						});
					},
				});
			},
			zyxz_but() {
				if (this.kclist.Files == '') {
					uni.showToast({
						icon: 'none',
						title: '暂未开通权限！'
					});
					return;
				}
				const downloadTask = uni.downloadFile({
					url: this.kclist.Files,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: function(res) {
									var savedFilePath = res.savedFilePath;

									// 查看下载的文件列表
									uni.getSavedFileList({
										success: function(res) {}
									})
									// 打开文档

									uni.openDocument({
										filePath: savedFilePath,
										success: function(res) {}
									});

								}
							})
						} else {
							uni.showToast({
								title: '下载失败，请重试',
								duration: 1500
							});
						}
					}
				});
				downloadTask.onProgressUpdate((res) => {
					uni.showLoading({
						title: '下载中' + res.progress + '%',
					});
					if (res.progress == "100") {
						uni.hideLoading()
						uni.showToast({
							title: '下载完成',
							duration: 1500
						});
					}
				});
			}
		},
		//分享
		onShareAppMessage() {

		}
	}
</script>

<style>
	button::after {
		border: none;
	}

	button {
		line-height: 35upx !important;
		background: #FFFFFF;
	}

	page {
		width: 100%;
		height: 100%;
		position: relative;
		padding: 2%;
	}

	.uni-zy-box {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.uni-wj {
		width: 76%;
		height: 140upx;
		background-color: #e5004f;
		color: #FFFFFF;
		line-height: 140upx;
		padding: 0 2%;
		font-size: 32upx;
	}

	.uni-icon {
		color: #999999;
		width: 20%;
		text-align: center;
		font-size: 45upx;
		background: #fff;
	}

	.uni-icon text {
		width: 100%;
		display: block;
		font-size: 30upx;
	}

	.uni-xz-box {
		width: 45%;
		height: 72upx;
		background-color: #b6174e;
		border-radius: 8upx;
		position: absolute;
		bottom: 10%;
		left: 27.5%;
		display: flex;
		box-shadow: 0rem 5upx #c11a53;
	}

	.icon-box {
		width: 20%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 2upx solid #FFFFFF;
	}

	.text-box {
		text-align: center;
		line-height: 72upx;
		width: 80%;
		color: #FFFFFF;
		font-size: 32upx;
		font-weight: bold;
		letter-spacing: 1upx;
	}
</style>
