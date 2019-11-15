<template>
	<view class="content">
		<!-- 下载按钮 -->
		<view class="uni-xz-box" @tap="xz_but">
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
				kcid:''
			}
		},
		onLoad(e) {
			this.kcid = e.kcid; //接收课程的id
			helper.islogin(true);
		},
		methods: {
			//下载资源包
			xz_but() {
				uni.navigateTo({
					url: 'ziyuanxiazai?kcid=' + this.kcid
				});
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: url('http://xxxpv.01.t1m.cn/Img/page3_1.jpg') no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.uni-xz-box {
		width: 45%;
		height: 72upx;
		background-color: #b6174e;
		border-radius: 8upx;
		position: absolute;
		top: 65%;
		left: 27.5%;
		display: flex;
		box-shadow: 0rem 5upx #c11a53;
	}
	.icon-box{
		width: 20%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 2upx solid #FFFFFF;
	}
	.text-box{
		text-align: center;
		line-height: 72upx;
		width: 80%;
		color: #FFFFFF;
		font-size: 32upx;
		font-weight: bold;
		letter-spacing: 1upx;
	}
</style>
