<template>
	<view class="content">
		<!-- 姓名 -->
		<view class="uni-name uni-input uni-lx1">
			<text>姓名</text>
			<input v-model="Name" type="text" value="" placeholder="请输入真实姓名" />
			<uni-icon class="fa fa-user-o fz50"></uni-icon>
		</view>
		<!-- 姓名结束 -->
		<!-- 输入手机号码 -->
		<view class="uni-name uni-input uni-lx1">
			<text>输入手机号码</text>
			<input v-model="phone" type="text" value="" placeholder="请输入手机号" />
			<uni-icon class="fa fa-mobile-phone phone"></uni-icon>
		</view>
		<!-- 输入手机号码结束 -->
		<!-- 校区 -->
		<view class="uni-name uni-input">
			<text>校区</text>
			<input v-model="School" type="text" :value="midVal" placeholder="请输入所在的校区" id="" @blur="loseFunc()" @focus="focusFunc()"
			 @input="inputFunc(School)" />
			<view class="ss_xq" v-show="flag">
				<view class="" v-for="(item, index) in baseinfo" :key="index" @tap="ss_input(item.Name)">{{item.Name}}</view>
			</view>
		</view>
		<!-- 校区结束 -->
		<!-- 校长姓名 -->
		<!-- <view class="uni-name uni-input">
			<text>校长姓名</text>
			<input v-model="principal" type="text" value="" placeholder="请输入所在校区的校长姓名" />
		</view> -->
		<!-- 校长姓名结束 -->
		<!-- 验证码 -->
		<view class="uni-name uni-input">
			<text>验证码</text>
			<input v-model="code" type="text" value="" placeholder="请输入验证码" />
			<view class="uni-code" @click="openCodeDialog">{{tipsCode}}</view>
		</view>
		<!-- 验证码结束 -->
		<!-- 用户注册协议 -->
		<view class="uni-user-xy">
			<checkbox-group @change="checkboxChange">
				<checkbox value="1" /> <text>请阅读以下《用户注册协议》</text>
			</checkbox-group>

		</view>
		<!-- 用户注册协议结束 -->
		<!-- 注册按钮 -->
		<button class="qd_but" @tap="qdbtn">确定</button>
		<!-- 注册按钮结束 -->
	</view>

</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				midVal: '',
				baseinfo: '',
				flag: false,
				phone: '', //手机号码
				Name: '', //真实姓名
				Type: '2', // 如果注册名称和校长名称相同请传1否2
				School: '', //校区
				principal: '', //校长姓名	
				check: '0', //判断是否勾选用户注册协议
				code: '', //验证码
				codestr: '', //获取的随机数
				tipsCode: "获取验证码", //验证码初始文字
				timeNum: 60, //验证码时间
				clikType: false, //阻止用户重复获取验证码
				timeOut: 60, //验证码时间
				returncode:''
			}
		},
		methods: {
			ss_input(mid){
				this.flag = false;
				this.School = this.midVal = mid;
			},
			inputFunc(val) {
				uni.request({
					url: helper.websiteUrl + 'user/getbyschool',
					method: 'POST',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{schoolname: "' + val + '", page: 1, num: 40}'
					},
					success: res => {
						if (res.data.code == "200") {
							this.baseinfo = res.data.data.baseinfo;
							// console.log(this.baseinfo)
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
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
			loseFunc() {
				// this.flag = false;
			},
			focusFunc() {
				this.flag = true;
			},
			//勾选用户注册协议
			checkboxChange: function(e) {
				if (e.detail.value == '') {
					this.check = 0;
				} else {
					this.check = 1;
				}
			},
			// 获取验证码
			openCodeDialog: function() {
				var that = this
				if (that.phone == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入你的手机号码'
					});
					return;
				} else if (!helper.checkmobile(that.phone)) {
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
							data: '{"phone": "' + this.phone + '"}'
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

			//注册
			qdbtn() {
				if (this.Name == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入真实姓名',
						duration: 1000
					});
					return;
				}
				if (this.phone == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号',
						duration: 1000,
						mask: true
					});
					return;
				}
				if (!helper.reg.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号',
						duration: 1000
					});
					return;
				}
				if (this.School == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入所在校区',
						duration: 1000
					});
					return;
				}

				// if (this.principal == '') {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入所在校区的校长姓名',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				if (this.code == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 1000
					});
					return;
				}
				if (this.check == '0') {
					uni.showToast({
						icon: 'none',
						title: '请勾选用户注册协议',
						duration: 1000
					});
					return;
				}
				// if (this.Name == this.principal) {
				// 	this.Type = 1;
				// } else {
				// 	this.Type = 2;
				// }
				uni.showLoading({
					mask: true,
					title: '注册中，请稍候',
				});
				if(this.returncode !=this.code)
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
					url: helper.websiteUrl + 'user/regist',
					data: {
						loginMark: helper.getloginMark(),
						token: '',
						data: '{"phone": "' + this.phone + '","code":"' + this.code + '","principal":"' + this.principal +
							'","School":"' + this.School + '","Name":"' + this.Name + '","Type":"' + this.Type + '"}'
					},
					method: 'POST',
					dataType: 'json',
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.navigateTo({
								url: '../login/login'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info,
								duration: 1000
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
		color: #000000;
		font-family: "SourceHanSansCN-Medium";
	}

	.content {
		padding: 0 5%;
	}

	.uni-input {
		margin-top: 25upx;
		position: relative;
	}

	.ss_xq {
		position: absolute;
		z-index: 999999;
		top: 139rpx;
		left: 0;
		width: 100%;
		max-height: 300rpx;
		background-color: #eee;
		border-radius: 8rpx;
		overflow: auto;
		color: #333;
		font-size: 34rpx;
	}

	.ss_xq view {
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx;
		overflow: hidden;    
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 60rpx;
	}
	
	.ss_xq view:nth-of-type(1) {
		margin-top: 10rpx;
	}
	
	.ss_xq view:nth-last-of-type(1) {
		margin-bottom: 10rpx;
	}

	.phone {
		font-size: 75upx;
		top: 65upx !important;
		left: 25upx !important;
	}

	.uni-input input {
		border-radius: 10upx;
		border: solid 1upx #dcdcdc;
		height: 75upx;
		margin-top: 10upx;
		font-size: 30upx;
		padding-left: 15upx;
	}

	.uni-lx1 input {
		padding-left: 85upx !important;
	}

	.uni-input uni-icon {
		position: absolute;
		left: 20upx;
		top: 76upx;
		color: #a0a0a0;
	}

	.uni-input text {
		font-size: 34upx;
	}

	.uni-code {
		position: absolute;
		z-index: 9999;
		right: 15upx;
		top: 74upx;
		font-size: 26upx;
		width: 207upx;
		height: 54upx;
		background-color: #009999;
		border-radius: 5px;
		text-align: center;
		line-height: 54upx;
		color: #FFFFFF;
	}

	checkbox .uni-checkbox-input {
		border-radius: 50%;
	}

	.uni-user-xy {
		margin-top: 35upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.uni-user-xy text {
		margin-left: 15upx;
	}

	.qd_but {
		margin-top: 100upx;
		width: 530upx;
		height: 85upx;
		line-height: 85upx;
		color: #FFFFFF;
		background-color: #006666;
		border-radius: 10upx;
		letter-spacing: 35upx;
		text-indent: 35upx;
		box-shadow: 0rem 5upx #006666;
	}
</style>
