<template>
	<view class="content">
		<view class="main-title" v-show="subjectlist.length == 0">
			暂无试卷
		</view>
		<!-- 试卷标题 -->
		<view class="uni-title">
			{{bt.ShiJuanName}}
		</view>
		<!-- 试卷标题结束-->
		<view class="uni-fu-title">
			{{bt.Explain}}
		</view>
		<!-- 试卷题目 -->
		<view class="uni-tm-content">
			<view class="uni-tm-itme" v-for="(item,index) in subjectlist" :key="index">
				<view :style="{display:timuindex != index ? 'none':'inline-block'}">
					<view class="uni-tm-title">
						{{item.TiMuName}}
					</view>
					<!-- 题目选项 -->
					<view class="uni-iput-box" v-for="(item1,index1) in Selectlist" :key="index1">
						<!-- {{index1+1}}{{item1[0].XuanXiangName}}{{subjectlist[index].Id}} -->
						<view v-for="(item2,index2) in item1" :key="index2" v-if="subjectlist[index].Id==item2.TiMuId">
							<view class="uni-title1">
								{{item2.XuanXiangName}}
							</view>
							<!-- 分数 -->
							<view v-if="item2.Score>0">
								<input v-model="item2.Answer" name="" type="number">
							</view>
							<!-- 文本 -->
							<view v-if="item2.Score == 0">
								<input v-model="item2.Answer" name="" type="text">
							</view>
						</view>
						<!-- <view class="uni-item-box">
							<text>性别：</text>
							<input type="text" name='' />
						</view> -->
					</view>
					<button :style="{display:timuindex == sublength?'none':'block'}" @tap="TheNext_but" class="uni-bc-but">下一题</button>
				</view>
				<!-- 题目结束 -->
			</view>
			<button :style="{display: timuindex == sublength? 'block':'none'}" type="" @tap="baocun_but" class="uni-bc-but">提交</button>
		</view>
	</view>
</template>
<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				sjlist: {}, //保存课程列表
				bt: {},
				subjectlist: [],
				Selectlist: [],
				choosedaylist: ['1', '2', '3', '4', '5'], //性别数组
				fs: [],
				index: '',
				sjid: '',
				timuindex: 0,
				sublength: 0
			}
		},
		onLoad(e) {
			this.sjid = e.sjid;
			this.sj();
			helper.islogin(true); //判断是否登录
		},
		methods: {
			//下一题
			TheNext_but() {
				var Selectlist = this.Selectlist;
				for (var i = this.timuindex; i <= this.timuindex; i++) {
					for (var j = 0; j < Selectlist[i].length; j++) {
						if (Selectlist[i][j].Score > 0) { //判断他是否为填分数的
							if (Selectlist[i][j].Answer == null || Selectlist[i][j].Answer =='') {
								uni.showToast({
									icon: 'none',
									title: '请查看答案是否为空!'
								});
								return;
							} else {
								if (Selectlist[i][j].Answer > 5) {
									uni.showToast({
										icon: 'none',
										title: '请查看答案是否符合规则!'
									});
									return;
								}
							}
						} else {
							if (Selectlist[i][j].Answer == "" || Selectlist[i][j].Answer == 'null') {
								uni.showToast({
									icon: 'none',
									title: '综合评价及建议不能为空!'
								});
								return;
							}
						}
					}
				}
				this.timuindex++;
			},
			//提交试卷
			baocun_but() {
				var listarry = [];
				var Selectlist = this.Selectlist; //题目下数组
				var sjid = this.bt.ID; //试卷ID
				var studentid = helper.getstate().userid; //学生Id
				var score = 0; //总分
				console.log(Selectlist)
				for (var i = 0; i < Selectlist.length; i++) { //计算总分并且获取评分详情
					for (var j = 0; j < Selectlist[i].length; j++) {
						if (Selectlist[i][j].Score > 0) { //判断他是否为填分数的
							if (Selectlist[i][j].Answer == null || Selectlist[i][j].Answer =='') {
								uni.showToast({
									icon: 'none',
									title: '请查看答案是否为空!'
								});
								return;
							} else {
								if (Selectlist[i][j].Answer > 5) {
									uni.showToast({
										icon: 'none',
										title: '请查看答案是否符合规则!'
									});
									return;
								}
							}
							score += Number(Selectlist[i][j].Answer)
						} else {
							if (Selectlist[i][j].Answer == "" || Selectlist[i][j].Answer == 'null') {
								uni.showToast({
									icon: 'none',
									title: '综合评价及建议不能为空!'
								});
								return;
							}
						}
						console.log(score)
						var list = {};
						list.TiMuId = Selectlist[i][j].TiMuId;
						list.Answer = Selectlist[i][j].Answer;
						list.SelectId = Selectlist[i][j].Id;
						listarry.push(list);
					}
				}
				uni.request({
					url: helper.websiteUrl + 'signuup/savepaper',
					method: 'POST',
					data: helper.postdata({
						sjid: sjid,
						studentid: studentid,
						score: score,
						dlist: listarry
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: '提交成功'
							});
							uni.navigateBack({
								url: 'wangqipeiuxn'
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
			// 获取试卷
			sj() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getpaper',
					method: 'POST',
					data: helper.postdata({
						id: this.sjid
					}),
					success: res => {
						if (res.data.code == 200) {
							this.bt = res.data.data.baseinfo;
							this.subjectlist = res.data.data.subjectlist; //题目数组
							this.sublength = this.subjectlist.length - 1;
							for (let i = 0; i < this.subjectlist.length; i++) {
								this.Selectlist.push(res.data.data.subjectlist[i].Selectlist)
							}
							uni.hideLoading();
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
			// 性别选择
			bindPickerChange: function(e) {
				var index = e.target.value;
				this.fs[index] = parseInt(index) + 1;
			},
			df() {
				this.arr.push(this.fs)
			}

		}
	}
</script>

<style>
	page {
		width: 90%;
		height: 100%;
		padding: 0 5%;
	}

	.main-title {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 100upx;
	}

	.uni-title {
		font-size: 34upx;
		color: #000000;
		font-weight: bold;
		padding: 3% 5%;
		text-align: center;
	}

	.uni-fu-title {
		font-size: 28upx;
		color: #676767;
	}

	.uni-tm-content {
		margin-top: 6%;
	}

	.uni-tm-title {
		line-height: 27upx;
	}

	.uni-tm-title,
	.uni-title1 {
		font-size: 30upx;
		color: #000000;
		line-height: 45upx;
	}

	.uni-tm-itme text {
		font-size: 24upx;
		margin-left: 4%;
		color: #676767;
		line-height: 55upx;
		display: block;
	}

	.uni-iput-box .uni-title1 {
		margin-left: 4%;
	}

	.uni-iput-box {
		margin-bottom: 20upx;
	}

	.uni-iput-box input {
		border: 1upx solid #e6e6e6;
		height: 60upx;
		margin-top: 5upx;
		font-size: 28upx;
		padding-left: 15upx;
	}

	.uni-bc-but {
		background-color: #009899;
		border-radius: 20upx;
		font-size: 34upx;
		letter-spacing: 3upx;
		color: #FFFFFF;
		border: none;
		height: 90upx;
		margin: 40upx 0 50upx;
	}
</style>
