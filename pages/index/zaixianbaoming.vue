<template>
	<view class="content">
		<!-- 在线报名 -->
		<view class="uni-bm-box">
			<block>
				<view class="uni-item" v-for="(item,index) in bmArray" :key="index" @tap="delList" :data-index="index">
					<view class="uni-item-box">
						<text>姓名：</text>
						<input type="text" :value="item.Name" disabled="disabled" />
					</view>
					<view class="uni-item-box">
						<text>性别：</text>
						<input type="text" :value="item.Sex> 1 ? '女' : '男'" disabled="disabled" />
					</view>
					<view class="uni-item-box">
						<text>电话：</text>
						<input type="text" :value="item.Phone" disabled="disabled" />
					</view>
					<view class="uni-item-box">
						<text>身份证：</text>
						<input type="text" :value="item.IdCard" disabled="disabled" />
					</view>
					<view class="uni-item-box">
						<text>邮箱：</text>
						<input type="text" :value="item.Mailbox" disabled="disabled" />
					</view>
					<view class="uni-item-box uni-icon">
						<uni-icon class="fa fa-trash-o fa-lg" @tap="sc_but"></uni-icon>
					</view>
				</view>
			</block>
		</view>
		<!-- 在线报名结束 -->
		<!-- 填写表单-->
		<view class="uni-bm-box">
			<block>
				<view class="uni-item">
					<view class="uni-item-box">
						<text>姓名：</text>
						<input type="text" :value="inputValue" @input="name" />
					</view>
					<view class="uni-item-box">
						<text>性别：</text>
						<picker @change="bindPickerChange" :id="index" :range="choosedaylist" class="picker">
							<input type="text" name='plans' :value="choosedaylist[index]" disabled="disabled" @input="Sex" />
						</picker>
					</view>
					<view class="uni-item-box">
						<text>电话：</text>
						<input type="number" :value="inputValue" @input="Phone" />
					</view>
					<view class="uni-item-box">
						<text>身份证：</text>
						<input type="text" :value="inputValue" @input="IdCard" />
					</view>
					<view class="uni-item-box">
						<text>邮箱：</text>
						<input type="text" :value="inputValue" @input="Mailbox" />
					</view>
					<view class="uni-item-box uni-icon">
						<uni-icon class="fa fa-trash-o fa-lg"></uni-icon>
					</view>
				</view>
			</block>
			<!-- 提交按钮 -->
			<view class="uni-but-list">
				<button @tap="sz_but">新增</button>
				<button @tap="tj_but">提交</button>
			</view>
			<!-- 提交按钮结束-->
		</view>
		<!-- 填写表单结束 -->
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				bmArray: [],
				bmArray2: [],
				Name1: '', //姓名
				Sex1: '', //性别
				Phone1: '', //手机号
				Mailbox1: '', //邮箱
				IdCard1: '', //身份证
				length: '', //保存要删除的学员index下标
				choosedaylist: ['男', '女'], //性别数组
				plans: '', //选择的平台
				index: '', //选择男女 1为男 2为女
				kcid: '', //保存课程id
				inputValue: null
			}
		},
		onLoad(e) {
			this.kcid = e.kcid; //接收课程的id
			helper.islogin(true);
		},
		methods: {
			// 性别选择
			bindPickerChange: function(e) {
				this.index = e.target.value;
				this.Sex1 = parseInt(this.index) + 1;
			},
			// 姓名
			name(e) {
				this.Name1 = e.detail.value;
			},
			// 电话
			Phone(e) {
				this.Phone1 = e.detail.value;
			},
			// 身份证
			IdCard(e) {
				this.IdCard1 = e.detail.value;
			},
			// 邮箱
			Mailbox(e) {
				this.Mailbox1 = e.detail.value;
			},
			//新增表单 保存当前表单的数据
			sz_but() {
				if (this.Name1 == "") {
					uni.showToast({
						icon: 'none',
						title: '请填写姓名',
						duration: 1500
					});
				} else if (!helper.checkmobile(this.Phone1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的电话',
						duration: 1500
					});
				} else if (!helper.checkcard(this.IdCard1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确身份证',
						duration: 1500
					});
				} else if (!helper.checkEmail(this.Mailbox1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确邮箱',
						duration: 1500
					});
				} else {
					var data = {
						"Name": this.Name1,
						"Phone": this.Phone1,
						"Mailbox": this.Mailbox1,
						"IdCard": this.IdCard1,
						"Sex": this.Sex1,
						"CurriculumId": this.kcid
					};
					this.bmArray.push(data);
					this.bmArray2.push(data);
					this.inputValue = "";
				}
			},
			//提交表单
			tj_but() {
				var _this = this;
				if (_this.Name1 == "") {
					uni.showToast({
						icon: 'none',
						title: '请填写姓名',
						duration: 1500
					});
				} else if (!helper.checkmobile(_this.Phone1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确电话',
						duration: 1500
					});
				} else if (!helper.checkcard(_this.IdCard1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确身份证',
						duration: 1500
					});
				} else if (!helper.checkEmail(_this.Mailbox1)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确邮箱',
						duration: 1500
					});
				} else {
					uni.showModal({
						title: '提示',
						content: '确定提交？',
						success: function(res) {
							if (res.confirm) {
								uni.showLoading({
									mask: true,
									title: '提交中...'
								});
								var data = {
									"Name": _this.Name1,
									"Phone": _this.Phone1,
									"Mailbox": _this.Mailbox1,
									"IdCard": _this.IdCard1,
									"Sex": _this.Sex1,
									"CurriculumId": _this.kcid
								};
								_this.bmArray2.push(data);
								uni.request({
									url: helper.websiteUrl + 'SignuUp/AddSignUp',
									method: 'POST',
									data: {
										loginMark: helper.getloginMark(),
										token: helper.gettoken(),
										data: _this.bmArray2,
									},
									success: res => {
										if (res.data.code == 200) {
											uni.navigateTo({
												url: 'dangqibaoming?kcid=' + _this.kcid
											});
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
					});
				}

			},
			//获取要删除的index下标
			delList(e) {
				this.length = e.currentTarget.dataset.index;
				// this.bmArray.pop(this.length);
			},
			//删除对应的表单
			sc_but() {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '确定删除？',
					success: function(res) {
						if (res.confirm) {
							_this.bmArray.pop(_this.length);
							uni.showToast({
								icon: 'none',
								title: '删除成功',
								duration: 1500
							});
						}
					}
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
		margin-top: 10upx;
	}


	.uni-item {
		border: 1upx solid #e2e2e2;
		font-size: 24upx;
		margin-bottom: 20upx;
	}

	.uni-item-box {
		display: flex;
		align-items: center;
		padding-left: 10upx;
		border-bottom: 1upx solid #e2e2e2;
		padding: 10upx 0;
	}

	.uni-item-box text {
		width: 15%;
		text-align: right;
	}

	.uni-but-list {
		display: flex;
		margin: 30upx 0;
	}

	.uni-but-list button {
		width: 40%;
		font-size: 28upx;
		color: #FFFFFF;
		letter-spacing: 35upx;
		text-indent: 35upx;
		box-shadow: 0rem 5upx #006666;
		background: #009999;
	}

	.uni-but-list button:nth-child(1) {
		background: #2af455;
		box-shadow: 0rem 5upx #3be75f;
	}

	.uni-icon {
		display: flex;
		justify-content: center;
		padding: 15upx 0;
		font-size: 30upx;
		color: #da3558;
	}
</style>
