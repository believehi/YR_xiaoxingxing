<template>
	<view class="content">
		<textarea value="" v-model="content" placeholder="这一刻的想法....." />
		<view class="uni-xz-zp">
			<view class="uni-img" v-for="(item,index) in imageList" :key="index">
				<image :src="item" mode="" @tap="previewImage(index)"></image>
				<image src="../../static/gb.png" mode="" class="uni-delete" @tap="deleteImage(index)"></image>
			</view>
			<view class="uni-tj" @tap="chooseImage">
				<uni-icon class="fa fa-plus"></uni-icon>
			</view>
		</view>
		<view class="uni-wz-box" @tap="onChangeAddress">
			<uni-icon class="fa fa-location-arrow"></uni-icon>
			<text>{{address}}</text>
		</view>
		<button class="qd_but" @tap="upload_in">上传</button>
	</view>
	
</template>

<script>
	import helper from '../../common/helper.js';
	var util = require('../../common/util.js');
	var formatLocation = util.formatLocation;
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	var xspic = [];
	export default {
		data() {
			return {
				address:'请选择位置',
				latitude:'',
				longitude:'',
				content:'',
				imageList: [],  //上传图片
				sourceTypeIndex: 2,
				sizeTypeIndex: 2,
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				xspics: [],
			}
		},
		onShow() {
			helper.islogin(true); //判断是否登录
		},
		methods: {
			// 上传接口
			upload_in() {
				var _this = this;
				_this.xspics = xspic;
				var listpic ="";
				for(var i = 0;i<_this.xspics.length;i++){
					if(i == _this.xspics.length-1) {
						listpic += _this.xspics[i];
					} else {
						listpic += _this.xspics[i] + ";" ;
					}
				};
				if(_this.content == '') {
					uni.showToast({
						icon: 'none',
						title: '请填入内容！'
					})
					return;
				};
				if(_this.xspics.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传图片！'
					})
					return;
				}
				if(_this.address == '' || _this.address == '请选择位置') {
					uni.showToast({
						icon: 'none',
						title: '请选择地址！'
					})
					return;
				}
				uni.showLoading({
					mask: true,
					title: '上传中...'
				});
				uni.request({
					url: helper.websiteUrl + 'hotlive/addhotlive',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						ctype: 3,
						rtype: 0,
						content: _this.content,
						video: '',
						Issue: true,
						pics: listpic,
						position: _this.address,
						Lat: _this.latitude,
						lng: _this.longitude
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							uni.showToast({
								icon: "none",
								title: "上传成功"
							});
							wx.navigateBack({ 
								delta: 1
							});
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
			// 上传图片
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						uni.showToast({
							icon: 'none',
							title: "最多上传9张图片哦！"
						});
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						var lengthcount  = this.imageList.length;
						uni.showLoading({
							mask: true,
							title: '上传中...'
						});
						for(var i = 0; i < lengthcount; i ++) {
							uni.uploadFile({
								url: helper.websiteUrl + 'annexes/uploadmultefile',
								filePath: res.tempFilePaths[i],
								fileType: "uploadFile",
								name: 'upload',
								formData: helper.postdata({
									"type": "2",
								}),
								success: function(res) {
									var data = JSON.parse(res.data);
									if (data.code=="200") {
										xspic.push(data.info)
										if(lengthcount == xspic.length){
											uni.hideLoading();
										}
									} else {
										uni.hideLoading();
										uni.showToast({
											icon: 'none',
											title: '网络异常,请重试！'
										});
									};
								},
								fail: () => {
									uni.hideLoading();
									// uni.showToast({ 
									// 	icon: 'none',
									// 	title: '网络异常,请重试！'
									// });
								}
							})
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					}
				})
			},
			// 上传限制提示
			isFullImg: function() {
				return new Promise((res) => {
					uni.showToast({
						icon: 'none',
						title: "最多上传9张图片!"
					})
				})
			},
			// 图片预览
			previewImage: function(ind) {
				uni.previewImage({
					current: ind,
					urls: this.imageList
				})
			},
			// 删除图片
			deleteImage: function(index){
				this.imageList.splice(index,1);
				xspic.splice(index,1);
			},
			// 获取地址，经纬度
			onChangeAddress(){
				var _this = this;
				uni.chooseLocation({
				    success: function (res) {
						_this.address=res.address;
						_this.latitude=res.latitude;
						_this.longitude=res.longitude;
				    }
				});
			},	
		}
	}
</script>

<style>
	page{
		width: 100%;
		padding: 2% 3%;
	}
	.content{
		width: 94%;
	}
	textarea{
		width:100%;
		min-height: 20%;
		color: #999999;
		font-size: 30upx;
		padding: 2%;
	}
	.uni-xz-zp view{
		width: 210upx;
		height: 210upx;
		background-color: #efefef;
		position: relative;
		border-radius: 10upx;
		overflow: hidden;
	}
	.uni-img {
		display: inline-block;
		margin: 0 20upx 20upx 0;
	}
	
	.uni-xz-zp image{
		width: 100%;
		height: 100%;
		/* background-color: #efefef; */
	}
	
	.uni-xz-zp .uni-delete {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 0;
		top: 0;
	}
	.uni-tj{
		text-align: center;
		line-height: 240upx;
	}
	.fa-plus{
		font-size: 80upx;
		color: #c9caca;
	}
	.uni-wz-box{
		display: flex;
		align-items: center;
		border-top: 1upx solid #e6e6e6;
		border-bottom: 1upx solid #e6e6e6;
		color: #999999;
		margin-top: 50upx;
	}
	.uni-wz-box text{
		font-size: 26upx;
		color: #999999;
		padding: 25upx 0;
		margin-left: 15upx;
	}
	.qd_but {
		margin-top: 50upx;
		width: 314upx;
		height: 68upx;
		color: #FFFFFF;
		background-color: #006666 !important;
		border-radius: 5px;
		letter-spacing: 35upx;
		text-indent: 35upx;
		box-shadow: 0rem 5upx #006666;
		font-size: 30upx;
		line-height: 68upx;
	}
</style>
