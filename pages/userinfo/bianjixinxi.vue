<template>
	<view class="content">
		<form @submit="formSubmit">
			<view class="uni-data-content">
				<!-- 头像 -->
				<view class="uni-user-img uni-data-item" @click="getImage">
					<text>头像</text>
					<input type="text" name='Studentid' :value="UserId" style="display: none;" />
					<input type="text" name='Headurl' :value="img" style="display: none;" />
					<input type="" value="" />
					<view>
						<image :src="img"></image>
					</view>
				</view>
				<!-- 真实姓名 -->
				<view class="uni-input-item uni-data-item">
					<text>真实姓名</text>
					<view>
						<input type="text" name='Truename' :value="info.TrueName" placeholder="请填写真实的姓名" />
					</view>
				</view>
				<!-- 选择地区 -->
				<view class="uni-input-item uni-data-item">
					<text>选择地区</text>
					<view>
						<input type="text" :value="str" placeholder="选择城市" @click="showMulLinkageThreePicker" disabled="true" />
						<input type="text" name='province' :value="str[0]" style="display: none;" />
						<input type="text" name='city' :value="str[1]" style="display: none;" />
						<input type="text" name='area' :value="str[2]" style="display: none;" />
					</view>
				</view>
				<!-- 填写详细地址 -->
				<view class="uni-input-item uni-data-item">
					<text>填写详细地址</text>
					<view>
						<input type="text" name='Address' :value="info.Address" placeholder="填写详细地址" />
					</view>
				</view>
				<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
				 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
				 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>


			</view>
			<button type="" formType="submit" class="uni-bc-but">保存</button>
			<!-- 			<button type="" class="uni-bc-but" @click="amendbut">保存</button> -->
		</form>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				UserId: '',
				info: '',
				nickname: '',
				array: ['女', '男', ''],
				index: 0,
				mobile: '',
				userdata: "",
				img: '',
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				str: [],
				cs: "",
				loginMark: "",
				token: "",
			};
		},
		onLoad() {
			helper.islogin(true);
			this.userinfo();
			this.UserId = helper.getstate().userid;
			this.loginMark = helper.getloginMark()
			this.token = uni.getStorageSync("token");
		},
		methods: {
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onBackPress() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel();
					return true;
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel();
					return true;
				}
			},
			onUnload() {
				if (this.$refs.mpvuePicker.showPicker) {
					this.$refs.mpvuePicker.pickerCancel()
				}
				if (this.$refs.mpvueCityPicker.showPicker) {
					this.$refs.mpvueCityPicker.pickerCancel()
				}
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e)
				this.cs = e.label;
				this.str = this.cs.split("-");

			},

			// 修改个人信息表单提交
			formSubmit: function(e) {
				this.userdata = e.detail.value
				var _this = this
				uni.request({
					url: helper.websiteUrl + 'user/edituser?',
					method: 'POST',
					data: helper.postdata(_this.userdata),
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '修改成功'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络异常,请稍后重试'
						});
					}

				});
			},
			// 性别选择
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			// 获取个人信息
			userinfo() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'user/getuserinfo',
					method: 'POST',
					data: helper.postdata({

					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.info = res.data.data.baseinfo;
							this.str.push(res.data.data.baseinfo.Sheng + res.data.data.baseinfo.Shi);
							if(this.img.indexOf('http') ==-1){
								this.img = res.data.data.baseinfo.Headimgurl;
							}
							else{
								this.img = helper.imgurl + res.data.data.baseinfo.Headimgurl;
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
			setData: function(obj) {
				let that = this;
				Object.keys(obj).forEach(function(key) {
					that.$set(that.$data, key, obj[key])
				});
			},
			// 获取用户上传头像地址
			getImage: function() {
				var _this = this
				uni.chooseImage({
					success: function(res) {
						uni.uploadFile({
							url: helper.websiteUrl + 'annexes/uploadmultefile', //仅为示例，非真实的接口地址 uploadimg
							filePath: res.tempFilePaths[0],
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								"type": "2",
							}),
							success: function(res) {
								var arr = JSON.parse(res.data);
								var arrs = arr.info;
								var imgurl = arrs;
								if(imgurl.indexOf('http')==-1)
								{
									imgurl = helper.imgurl  +imgurl;
								}
								_this.img = imgurl;
							}
						})
						_this.setData({
							img: res.tempFilePaths[0],
						})
					},
				})
			},
			openphone() {
				uni.navigateTo({
					url: 'zhanghuanquan',
				});
			}
		}
	}
</script>

<style>
	.content {
		height: 1190upx;
		padding-top: 15upx;
	}

	.uni-phone-color {
		color: #C6C6C6;
	}

	.uni-input {
		height: 47upx;
		width: 100%;
		display: inline-block;
		line-height: 44upx !important;
	}

	.uni-data-content {
		width: 700upx;
		background: #FFFFFF;
		margin: 0 auto;
		border-radius: 20upx;
	}

	.uni-data-content .uni-data-item:last-child {
		border-bottom: none;
	}

	.uni-data-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx 0upx 20upx 20upx;
		width: 628upx;
		border-bottom: 1px solid #E6E6E6;
		margin: 0 auto;
		font-size: 32upx;
	}

	.uni-data-item text {
		white-space: nowrap;
	}

	.uni-user-img text {
		font-size: 32upx;
		color: #1A1A1A;
	}

	.uni-data-item view {
		flex-grow: 2;
		text-align: right;
		line-height: 20upx;
	}

	.uni-user-img image {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
		text-align: right;
	}

	.uni-user-img uni-icon {
		margin-left: 31upx !important;
	}

	.uni-data-item input {
		text-align: right;
	}

	.uni-input-item uni-icon {
		margin-left: 11upx;
	}

	.uni-bc-but {
		background-color: #FBB42B;
		border-radius: 20upx;
		font-size: 34upx;
		letter-spacing: 3upx;
		color: #FFFFFF;
		border: none;
		margin-top: 110upx;
		width: 700upx;
		height: 90upx;
	}
</style>
