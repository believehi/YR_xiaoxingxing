<template>
	<view class="content">
		<view class="title" v-show="mzList.length == 0">暂无美照</view>
		<view class="uni-img-itme" v-for="(item,index) in mzList" :key="index">
			<image :src='item.Pic' mode="" @tap="clearImg(index, imgList)"></image>
			<text>{{item.Name}}</text>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				mzList:[],
				pxid: '',
				imgList: []
			}
		},
		onLoad(e) {
			this.pxid = e.pxid;
			this.sj(); //获取学员美照
			helper.islogin(true); //判断是否登录
		},
		methods: {
			sj() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getmzlist',
					method: 'POST',
					data: helper.postdata({
						pxid: this.pxid,
						page:1,
						num:10
					}),
					success: res => {
						if (res.data.code == 200) {
							uni.hideLoading();
							this.mzList = res.data.data;
							this.imgList = []
							for (let i = 0; i < this.mzList.length;  i ++) {
								if(this.mzList[i].Pic.indexOf('http') == -1)
								{
									this.mzList[i].Pic=helper.imgurl+this.mzList[i].Pic;
									this.imgList.push(this.mzList[i].Pic)
								}else{
									this.imgList.push(this.mzList[i].Pic)
								}
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.info
							});
							uni.hideLoading();
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
			// 放大图片
			clearImg(ind, imgsrc){
				uni.previewImage({
					current: ind,
					urls: imgsrc
				})
			}
		}
	}
</script>

<style>
	.content {
		display: table;
		margin-top: 30upx;
		width:100%;
	}
	.title {
		font-size:36rpx;
		color:#999;
		text-align:center;
		line-height:100rpx;
	}
	.uni-img-itme{
		width: 33.333%;
		display: inline-block;
		text-align: center;
	}
	.uni-img-itme text{
		display: block;
		color: #676767;
		font-size: 26upx;
		line-height: 50upx;
	}
	.uni-img-itme image{
		display: inline-block;
		width: 200upx;
		height: 200upx;
		text-align: center;
	}
</style>
