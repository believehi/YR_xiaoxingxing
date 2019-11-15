<template>
	<view class="content">
		<!-- 开营结营照片 -->
		<view class="uni-item1">
			<view class="inif-on" v-show="!mzList.length">暂无照片</view>
			<!-- 结营照片 -->
			<block v-for="(item,index) in mzList" :key="index">
				<block v-if="item.Type=='1'" >
					<image :src='item.Pic' mode="" :style="{display: item.Pic == '' ? 'none' : 'block'}" @tap="clearImg(item.Pic)"></image>
				</block>
			</block>
		</view>
		<view class="uni-item2">
			<!-- 小组照 -->
			<block v-for="(item,index) in mzList" :key="index">
				<view v-if="item.Type=='2'">
					<image :src='item.Pic' mode="" :style="{display: item.Pic == '' ? 'none' : 'block'}" @tap="clearImg(item.Pic)"></image>
				</view>
			</block>
		</view>
		<view class="uni-item2">
			<!-- 单独照 -->
			<block v-for="(item,index) in mzList" :key="index">
				<view v-if="item.Type=='3'">
					<image :src='item.Pic' mode="" :style="{display: item.Pic == '' ? 'none' : 'block'}" @tap="clearImg(item.Pic)"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				imglist: [],
				mzList: [],
				pxid: ''
			}
		},
		onLoad(e) {
			this.pxid = e.pxid;
			this.sj(); //获取结营照片
			helper.islogin(true); //判断是否登录
		},
		methods: {
			//获取结营照片
			sj() {
				uni.showLoading({
					mask: true,
					title: '加载中...'
				});
				uni.request({
					url: helper.websiteUrl + 'signuup/getteamlist',
					method: 'POST',
					data: helper.postdata({
						pxid: this.pxid,
						page: 1,
						num: 10
					}),
					success: res => {
						if (res.data.code == 200) {
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
							uni.hideLoading();
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
			clearImg(ind){
				uni.previewImage({
					current: ind,
					urls: this.imgList
				})
			}
		}
	}
</script>

<style>
	.content {
		padding: 10upx;
		box-sizing: border-box;
		width: 100%;
	}

	.uni-item1 {
		width: 100%;
	}
	
	.uni-item1 image {
		width: 100%;
		height: 400upx;
		margin-bottom: 15upx;
	}
	
	.uni-item2 {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	
	.uni-item2 view {
		width: 49%;
	}
	
	.uni-item2 view image {
		width: 100%;
		height: 200upx;
		margin-bottom: 15upx;
	}
	.inif-on {
		color: #666;
		text-align: center;
		line-height: 100rpx;
	}
</style>
