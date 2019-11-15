<template>
	<view class="content">
		<view class="uni-zt-text">
			<!-- 内容 -->
			<textarea placeholder-style="color:#ddd" placeholder="这一刻的想法..." v-model="Content" />
			<!-- 图片 -->
			<view class="uni-content">
				<view  v-for="(image,index) in imageList"  :key="index">
					<image class="uni-uploader_img" :src="image" :data-src="image" @tap="previewImage"></image>
					<image class="uni-uploader_icon" src="../../static/gb.png" mode="" @tap="deleteImage(index)"></image>
				</view>
				<!-- 视频 -->
				<view :style="{display: video == '' ? 'none': 'inline-block'}">
					<video :src="video" class="video" controls=false></video>
					<image class="uni-uploader_icon" src="../../static/gb.png" mode="" @tap="deleteVideo()"></image>
				</view>
			</view>
			<!-- 录音 -->
			<view class="uni-audio" :style="{display: audioMusic == 0 ? 'none': 'block'}">
				<view class="audio-ly" :style="{display: audioIndex == 0 ? 'blcok' : 'none'}">
					<view class="audio-ly-gb" @tap="teleteRecord"></view>
					<view class="audio-ly-sj">{{formatedRecordTime}}</view>
					<view class="audio-ly-kj">
						<image src="../../static/bofan_02.png" :style="{display: audioInit == 0 ? 'block' : 'none'}" mode="" @tap="suspendRecord"></image>
						<image src="../../static/bofan_01.png" :style="{display: audioInit == 1 ? 'block' : 'none'}" mode="" @tap="resumeRecord"></image>
					</view>
					<view class="audio-ly-ok" @tap="wcRecord">完成</view>
				</view>
				<view class="audio-bf" :style="{display: audioIndex == 1 ? 'blcok' : 'none'}">
					<view class="audio-bf-img">
						<image src="../../static/bofan_03.png" :style="{display: audioLy == 0 ? 'block' : 'none'}" mode="" @tap="bfRecord"></image>
						<image src="../../static/bofan_04.png" :style="{display: audioLy == 1 ? 'block' : 'none'}" mode="" @tap="ztRecord"></image>
					</view>
					<view class="audio-bf-yp">录音音频</view>
					<text>上传</text>
					<image class="audio-bf-delete" src="../../static/gb.png" mode="" @tap="teleteRecord"></image>
				</view>
				<!-- <audio :src="Music" class="audio"></audio> -->
			</view>
		</view>
		<view class="uni-tb">
			<view>  <!-- 点击录制事件 -->
				<image src="../../static/ly.png" mode="" @tap="startRecord"></image>
			</view>
			<view>
				<image src="../../static/sp.png" mode="" @tap="chooseVideo"></image>
			</view>
			<view>
				<image src="../../static/tp.png" mode="" @tap="chooseImage"></image>
			</view>
		</view>
		<view class="uni-wz" @tap="chooseLocation">
			<view><image src="../../static/dz.png" mode=""></image></view>
			<text>{{locationAddress == '' ? '所在位置': locationAddress}}</text>
		</view>
		<view class="uni-but">
			<button @tap="upload_in()">发 表</button>	
		</view>
		<view class="uni-wt">
			<text class="uni-wt-icon"></text>
			<text>问题反馈</text>
			<text class="uni-wt-icon"></text>
		</view>
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
	var xspic=[]; //图片数组
	// 录音
	var playTimeInterval = null,
			recordTimeInterval = null,
			recorderManager = null,
			music = null,
			audioNum = false;
	export default {
		data() {
			return {
				Categoryid: '', //圈子Id
				Content: '', //文本内容
				isok: true, //
				Issue: true, 
				Type: true,
				video: '',  //视频地址
				Music: '',
				Pics: '',
				Lat: '',
				lng: '',
				hasLocation: false,
				location: {},   // 获取经纬度
				locationAddress: '',// 获取地址
				// 上传图片参数
				imageList: [],  //上传图片
				sourceTypeIndex: 2,
				sizeTypeIndex: 2,
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				srcVideo: '',
				xspics:[],
				// 录音
				audioIndex: 0, //控制两个录音页面
				audioMusic: 0,
				audioInit: 0,
				audioLy: 0,
				// audioStart: '00:00',
				recording: false, //录音中
				playing: false, //播放中
				hasRecord: false, //是否有了一个
				tempFilePath: '',
				recordTime: 0,
				playTime: 0,
				formatedRecordTime: '00:00:00', //录音的总时间
				formatedPlayTime: '00:00:00' //播放录音的当前时间
			}
		},
		onLoad(e) {
			helper.islogin(true);
			this.Categoryid = e.Id; ///圈子Id
			// 图片
			this.imageList = [],
			this.sourceTypeIndex = 2,
			this.sizeTypeIndex = 2,
			this.countIndex = 8;
			xspic = [];
			this.xspics = [];
			// 录音函数
			music = uni.createInnerAudioContext();
			music.onEnded(() => {
				uni.hideLoading();
				uni.showToast({
					icon: "none",
					title: "已播放完！",
					duration: 2000
				})
				clearInterval(playTimeInterval)
				var playTime = 0;
				this.audioLy = 0;
				this.playing = false;
				this.formatedPlayTime = util.formatTime(playTime);
				this.playTime = playTime;
			});
			recorderManager = uni.getRecorderManager();
			recorderManager.onStart(() => {
			});
			recorderManager.onStop((res) => {
				this.hasRecord = true;
				this.recording = false;
				music.src = res.tempFilePath;
			});
		},
		methods: {
			// 上传接口
			upload_in() {
				if(this.Content == '') {
					uni.showToast({
						icon: 'none',
						title: '请填入内容！'
					})
					return;
				};
				if(this.locationAddress == '') {
					uni.showToast({
						icon: 'none',
						title: '请添加地址！'
					})
					return;
				};
				this.xspics = xspic;
				this.Lat = this.location.latitude[0] + '.' + this.location.latitude[1];
				this.lng = this.location.longitude[0] + '.' + this.location.longitude[1]
				var listpic ="";
				for(var i = 0;i<this.xspics.length;i++){
					if(i == this.xspics.length-1) {
						listpic +=  this.xspics[i];
					} else {
						listpic +=  this.xspics[i] + ";" ;
					}
				};
				uni.request({
					url: helper.websiteUrl + 'circle/addpost',
					method: 'POST',
					data: helper.postdata({
						userid: helper.getstate().userid,
						Categoryid: this.Categoryid,
						title: '',
						suvtitle: '',
						Hits: 0,
						Replay: 0,
						contents: this.Content,
						isok: this.isok,
						Issue: this.Issue,
						Type: this.Type,
						video: this.video,
						Music: this.Music,
						Pics: listpic,
						position: this.locationAddress,
						Lat: this.Lat,
						lng: this.lng
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							wx.navigateBack({ 
								delta: 1, 
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
			// 获取地址
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true;
						this.location = formatLocation(res.longitude, res.latitude);
						this.locationAddress = res.address;
					}
				})
			},
			clear: function () {
				this.hasLocation = false
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
										uni.showLoading({
											mask: true,
											title: '上传中...'
										});
										if(lengthcount == xspic.length){
											uni.hideLoading();
										}
									} else {
										uni.showToast({
											icon: 'none',
											title: '网络异常,请重试！'
										});
									}
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
					}
				})
			},
			// 上传图片限制提示
			isFullImg: function() {
				return new Promise((res) => {
					uni.showToast({
						icon: 'none',
						title: "最多上传9张图片!"
					})
				})
			},
			// 图片放大预览
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			// 删除图片
			deleteImage: function(index){
				this.imageList.splice(index,1);
				xspic.splice(index,1);
			},
			// 视频上传
			chooseVideo: function() {
				var _this= this;
				if(_this.video != '') {
					uni.showToast({
						icon: 'none',
						title: '已经上传视频了！'
					});
					return;
				}
				uni.chooseVideo({
					maxDuration: 10,
					count: 1,
					sourceType: ['camera', 'album'],
					compressed: true,
					success: (res) => {
						this.srcVideo = res.tempFilePath + '';
						uni.showLoading({
							mask: true,
							title: '上传中...'
						});
						uni.uploadFile({
							url: helper.websiteUrl + 'annexes/uploadmultefile',
							filePath: this.srcVideo,
							fileType: "uploadFile",
							name: 'upload',
							formData: helper.postdata({
								"type": 1
							}),
							success: function(res) {
								var dataVideo = JSON.parse(res.data)
								if (dataVideo.code==200) {
									_this.video = dataVideo.info;
									uni.hideLoading();
								} 
								else{
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: '网络异常,请重试！'
									});
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
					fail: (e) => {
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '网络异常,请重试！'
						});
					}
				})
			},
			// 删除视频
			deleteVideo: function() {
				this.video = '';
			},
			// 录音
			// 开始录音
			startRecord: function() {
				this.audioMusic = 1;
				if(audioNum) {
					if (this.Music != '') {
						uni.showToast({
							icon: "none",
							title: "录音已完成"
						})
						return;
					}
					uni.showToast({
						icon: "none",
						title: "正在录音"
					})
					return;
				}
				audioNum = true;
				this.recording = true;
				recordTimeInterval = setInterval(() => {
					this.recordTime += 1;
					this.formatedRecordTime = util.formatTime(this.recordTime);
				}, 1000)
				recorderManager.start({
					format: 'mp3',
					duration: 60000
				});
			},
			// 暂停
			suspendRecord: function() {
				this.audioInit = 1;
				clearInterval(recordTimeInterval);
				recorderManager.onPause();
			},
			// 继续录音
			resumeRecord: function() {
				this.audioInit = 0;
				recorderManager.resume();
				recordTimeInterval = setInterval(() => {
					this.recordTime += 1;
					this.formatedRecordTime = util.formatTime(this.recordTime);
				}, 1000)
			},
			// 完成录音 / 上传录音
			wcRecord: function() {
				let _this = this;
				_this.audioInit = 0;
				_this.audioIndex = 1;
				recorderManager.stop();
				clearInterval(recordTimeInterval);
				setTimeout(function() {
					uni.showLoading({
						mask: true,
						title: '上传中...'
					});
					uni.uploadFile({
						url: helper.websiteUrl + 'annexes/uploadmultefile',
						filePath: music.src,
						fileType: "uploadFile",
						name: 'upload',
						formData: helper.postdata({
							"type": 3,
						}),
						success: function(res) {
							var data = JSON.parse(res.data);
							if (data.code=="200") {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '录音上传成功！',
									duration: 2000
								});
								music.src = _this.Music = data.info;
							} else {
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '录音失败,请重试！',
									duration: 2000
								});
								_this.teleteRecord();
							}
						},
						fail: () => {
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '录音失败,请重试！',
								duration: 2000
							});
							_this.teleteRecord();
						}
					})
				}, 500);
			},
			// 播放完成的音频
			bfRecord: function() {
				this.audioLy = 1;
				music.play();
				uni.showLoading({
					icon: "none",
					title: "加载中..."
				})
				music.onPlay(() => {
					uni.showLoading({
						icon: "none",
						title: "播放中..."
					})
				});
			},
			// 暂停完成的音频
			ztRecord: function() {
				this.audioLy = 0;
				music.pause();
				uni.showToast({
					icon: "none",
					title: "已暂停"
				})
			},
			// 取消录音
			teleteRecord: function() {
				clearInterval(recordTimeInterval)
				audioNum = false;
				this.formatedRecordTime = '00:00:00';
				this.formatedPlayTime = '00:00:00';
				this.audioIndex = 0;
				this.audioMusic = 0;
				this.audioInit = 0;
				this.audioLy = 0;
				this.recordTime = 0;
				this.playTime = 0;
				this.hasRecord = false;
				this.recording = false;
				this.playing = false;
				this.Music = '';
				music.src = '';
			}
		}
	}
</script>

<style>
	.content {
		color: #999;
	}
	.uni-zt-text {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		border-bottom: 1upx solid #e6e6e6;
	}
	.uni-zt-text textarea {
		width: 100%;
		height: auto;
		font-size: 36upx;
		line-height: 50upx;
		min-height: 200upx;
		padding-bottom: 20upx;
	}
	
	.uni-content view {
		position: relative;
		display: inline-block;
		margin: 0 20upx 20upx 0;
	}
	
	.video,
	.uni-uploader_img {
		width:180upx;
		height:180upx;
		border-radius: 20upx;
		overflow: hidden;
	}
	
	.uni-uploader_icon {
		position: absolute;
		top: 0;
		right: 0;
		width: 45upx;
		height: 45upx;
	}
	
	.uni-audio {
		width: 100%;
		height: 120upx;
		border-radius: 10upx;
		border: 1upx solid #e6e6e6;
	}
	
	.audio-bf,
	.audio-ly {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
	
	.audio-ly-gb {
		padding: 0 20upx;
		border-right: 1upx solid #CCCCCC;
		width: 50upx;
		height: 40upx;
		position: relative;
	}
	
	.audio-ly-gb::before,
	.audio-ly-gb::after {
		position: absolute;
		content: '';
		top: 20upx;
		left: 30upx;
		width: 30upx;
		border: 1upx solid;
	}

	.audio-ly-gb::before {
		transform: rotate(45deg);
	}
	
	.audio-ly-gb::after {
		transform: rotate(-45deg);
	}
	
	.audio-ly-sj {
		margin-left: 50upx;
		color: #f40;
		font-size: 36upx;
		line-height: 35upx;
		position: relative;
		flex: 1;
	}
	
	.audio-ly-sj::after {
		content: '';
		position: absolute;
		left: -20upx;
		top: 12upx;
		width: 12upx;
		height: 12upx;
		border-radius: 50%;
		background-color: #f40;
	}
	
	.audio-ly-kj {
		width: 45upx;
		height: 45upx;
		margin-right: 30upx;
	}
	
	.audio-bf-img image,
	.audio-ly-kj image{
		width: 100%;
		height: 100%;
	}
	
	.audio-ly-ok {
		color: #009899;
		font-size: 36upx;
		padding: 0 30upx;
	}
	
	.audio-bf {
		background-color: #B3D6D5;
		position: relative;
	}
	
	.audio-bf-img {
		width: 70upx;
		height: 70upx;
		margin: 0 25upx;
	}
	
	.audio-bf-yp {
		flex: 1;
		margin-left: 30upx;
		font-size: 32upx;
		color: #fff;
	}
	
	.audio-bf-delete {
		position: absolute;
		width: 35upx;
		height: 35upx;
		top: 0;
		right: 0;
	}
	
	.audio-bf text {
		display: none;
		font-size: 36upx;
		margin-right: 20upx;
		color: #f40;
	}
	
	.uni-tb {
		width: 100%;
		padding: 40upx 0;
		display: flex;
		justify-content: space-around;
	}
	
	.uni-tb view {
		width: 33.333%;
		height: 50upx;
		text-align: center;
		border-left: 1upx solid #E6E6E6;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.uni-tb view:nth-of-type(1) {
		border: 0;
	}
	
	.uni-tb view image {
		width: 80upx;
		height: 80upx;
	}
	
	.uni-tb view:nth-of-type(2) image {
		width: 120upx;
		height: 120upx;
	}
	
	.uni-tb view:nth-of-type(3) image {
		width: 70upx;
		height: 70upx;
	}
	
	.uni-wz {
		padding: 0 80upx 50upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}
	
	.uni-wz image {
		width: 35upx;
		height: 30upx;
	}
	
	.uni-wz text {
		margin-left: 10upx;
	}
	
	.uni-but {
		text-align: center;
	}
	
	.uni-but button {
		width: 300upx;
		height: 70upx;
		background-color: #009899;
		color: #fff;
		line-height: 70upx;
		font-size: 30upx;
		box-shadow: 0 5upx #1B6D6C;
		border-radius: 10upx;
	}
	
	button:after {
		border: none;
	}
	
	.uni-wt {
		display: flex;
		font-size: 28upx;
		justify-content: center;
		align-items: center;
		margin: 50upx 0;
	}
	
	.uni-wt-icon {
		height: 5upx;
		width: 150upx;
		margin: 0 40upx;
		background-color: #E6E6E6;
	}
</style>
