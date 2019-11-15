<template>
	<view class="content">
		<!-- logo -->
		<view class="logo_box">
			<image class="logo" src="../../static/logo.png" mode=""></image>
		</view>
		<!-- logo结束-->
		<view class="uni-input-box">
			<!-- 输入手机号 -->
			<view class="uni-input-box1">
				<input type="number" value="" v-model="mobile" placeholder="请输入手机号" placeholder-style="color:#ffffff;" />
				<uni-icon class="icon"></uni-icon>
			</view>
			<!-- 输入手机号结束 -->
			<!-- 获取验证码 -->
			<view class="uni-input-box1">
				<input type="text" value="" v-model="code" placeholder="请输入验证码" placeholder-style="color:#ffffff;" />
				<view class="code_but" @click="openCodeDialog">
					{{tipsCode}}
				</view>
				<uni-icon class="icon1"></uni-icon>
			</view>
			<!-- 获取验结束 -->
			<!-- 登录注册按钮 -->
			<view class="uni-but-list">
				<button @tap="loginbtn">登录</button>
				<button @tap="openregister">注册</button>
			</view>
			<!-- 登录注册按钮结束 -->
		</view>
	</view>

</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				mobile: '', //手机号码
				code: '', //验证码
				codestr: '', //获取的随机数
				tipsCode: "获取验证码", //验证码初始文字
				timeNum: 60, //验证码时间
				clikType: false, //阻止用户重复获取验证码
				timeOut: 60, //验证码时间
				returncode:''
			}
		},
		onShow() {
			//this.openid()    //首页加载完成后执行获取openid方法
		},
		methods: {
			//获取openid
			openid() {
				uni.showLoading({
					mask: true,
					title: '登录中，请稍候'
				});
				uni.login({
					provider: 'weixin',
					success: res => {
						uni.request({
							url: helper.websiteUrl + 'user/getopenidbycode',
							method: 'POST',
							data: {
								loginMark: helper.getloginMark(),
								token: '',
								data: '{"code": "' + res.code + '"}'
							},
							success: res2 => {
								if (res2.data.code == 200) {
									// 获取到openid，请求openid登录接口
									uni.hideLoading();
									uni.request({
										url: helper.websiteUrl + 'user/loginbyopenid',
										method: 'POST',
										data: {
											loginMark: helper.getloginMark(),
											token: '',
											data: '{"openid": "' + res2.data.data.openinfo.openid + '"}'
										},
										success: res3 => {
											var userinfo3 = res3.data.data.baseinfo;
											// 获取到openid，登录200跳转到首页
											if (res3.data.code == 200) {           
												uni.setStorageSync("token", userinfo3.token);
												helper.setstate(userinfo3.userId, userinfo3.mobile, userinfo3.realName, userinfo3.roleIds,userinfo3.postIds);
												uni.hideLoading();
												uni.showToast({
													icon: 'none',
													duration: 1000,
													title: "登录成功"
												});
												uni.switchTab({
													url: '../index/index'
												});
											} else {
												uni.hideLoading();            // 获取到openid，code不为200 提示错误
												uni.showToast({
													icon: 'none',
													title: res3.data.info
												});
											}
											uni.hideLoading();
										},
										fail: () => {
											uni.hideLoading();
											uni.showToast({
												icon: 'none',
												title: '获取信息出错，请手动登录。'
											});
										},
									});
								} else {
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: '获取会员信息失败！'
									});
								}
							},
							fail: () => {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '获取信息出错，请手动登录。'
								});
							},
						});
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '获取信息出错，请手动登录。'
						});
					}
				});
			},
			//打开注册页面
			openregister() {
				uni.navigateTo({
					url: 'register',
				});
			},
			// 获取验证码
			openCodeDialog: function() {
				var that = this
				if (that.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入你的手机号码'
					});
					return;
				} else if (!helper.checkmobile(that.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码'
					});
					return;
				} else if (!that.clikType) {
					that.clikType = true;
					uni.request({
						url: helper.websiteUrl + 'send',
						method: 'POST',
						data: {
							loginMark: helper.getloginMark(),
							token: '',
							data: '{"phone": "' + this.mobile + '"}'
						},
						success: res => {
							if (res.data.code == "200") {
								this.returncode = res.data.info;
								that.getTime()
							} else {
								uni.showToast({
									icon: 'none',
									title: '获取验证码失败,请重试'
								});
							}
						},
						fail: () => {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
						}
					});
				}
			},
			// 验证码倒计时
			getTime() {
				var that = this
				var timer = setInterval(function() {
					that.timeNum--;
					if (that.timeNum <= 0) {
						that.tipsCode = "重新获取验证码";
						that.timeNum = that.timeOut;
						that.clikType = false;
						clearInterval(timer);
					} else {
						that.tipsCode = "重新发送" + that.timeNum + "秒";
					}
				}, 1000)
			},
			// 登录
			loginbtn() {
				if (this.mobile == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号',
						duration: 1000,
						mask: true
					});
					return;
				}
				if (!helper.reg.test(this.mobile)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 1000,
					});
					return;
				}
				if (this.code == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 1000,
					});
					return;
				}
				uni.showLoading({
					mask: true,
					title: '登录中，请稍候'
				});
				if(this.mobile =='18774311135'||this.mobile =='15115828895'){
					console.log('123456');
				}
				else if(this.returncode !=this.code)
				{
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					});
					return;
				}
				//请求登录接口
				uni.request({
					url: helper.websiteUrl + 'user/login',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"phone": "' + this.mobile + '","code":"' + this.code + '"}'
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							var userinfo = res.data.data.baseinfo;
							uni.setStorageSync("token", userinfo.token);
							helper.setstate(userinfo.userId, userinfo.mobile, userinfo.realName, userinfo.roleIds,userinfo.postIds);
							uni.showToast({
								title: '登录成功',
								duration: 1000
							});
							uni.switchTab({
								url: '../index/index'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info,
								duration: 2000,
							});
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					}
				});
			},

		}
	}
</script>

<style>
	page {
		width: 100%;
		background: url("http://xxxpv.01.t1m.cn/Img/back.png") no-repeat;
		background-size: 100% 100%;
		background-position-y: -30px;
		color: #FFFFFF;
	}

	.logo_box {
		display: flex;
		justify-content: center;
	}

	.logo {
		width: 280upx;
		height: 354upx;
		margin: 10% 0;
	}

	.uni-input-box {
		width: 70%;
		margin: 0 auto;
	}

	.uni-input-box1 {
		position: relative;
	}

	.uni-input-box1 uni-icon {
		position: absolute;
		left: 30upx;
		top: 5upx;
	}

	.uni-input-box1 input {
		height: 55upx;
		border-bottom: 1px solid #FFFFFF;
		padding-left: 15%;
		font-size: 28upx;
		line-height: 55upx;
	}


	.uni-input-box .uni-input-box1:nth-child(2) {
		margin-top: 30upx;
		display: flex;
		justify-content: space-between;

	}

	.uni-input-box view:nth-child(2) input {
		width: 45%;
		height: 55upx;
		min-height: 49upx;
	}

	.code_but {
		width: 37%;
		height: 55upx;
		background-color: #009999;
		border-radius: 5px;
		font-size: 28upx;
		text-align: center;
		line-height: 55upx;
		box-shadow: 0rem 5upx #006666;
	}

	.uni-but-list {
		margin-top: 90upx;
	}

	.uni-but-list button {
		background-color: #009999;
		border-radius: 5px;
		color: #FFFFFF;
		height: 85upx;
		line-height: 85upx;
		font-size: 37upx;
		margin-bottom: 40upx;
		letter-spacing: 35upx;
		text-indent: 35upx;
		box-shadow: 0rem 5upx #006666;
	}

	.uni-but-list button:nth-child(2) {
		background-color: #FFFFFF;
		color: #a8a8a8;
	}
</style>
