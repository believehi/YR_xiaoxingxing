<template>
	<view class="">
		<!-- 我的提问 -->
		<view class="content">
			<view class="title">我的提问</view>
			<view class="de-date">{{ReplyTime}}</view>
			<view class="details">{{question}}</view>
		</view>
		<!--  -->
		<view class="content">
			<view class="title">回复内容</view>
			<view class="details">
				<view class="title-info" v-show="Examine == 1">请耐心等待暂无回复！</view>
				<view class="title-info" v-show="Examine == 2">正在审核！</view>
				<view class="title-info" v-show="Examine == 3">审核失败！</view>
				{{Answer}}
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				ReplyTime: '',
				question: '',
				Answer: '',
				Examine: ''
			}
		},
		onLoad(e) {
			helper.islogin(true);
			this.ReplyTime = e.ReplyTime;
			this.question = e.question;
			this.Answer = e.Answer == 'null' ? '' : e.Answer;
			this.Examine = e.Examine;
		},
		methods: {

		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #eee;
		padding: 15px 2%;
		box-sizing: border-box;
	}
	
	.title-info {
		font-size: 36upx;
		color: #999;
		text-align: center;
		line-height: 200upx;
	}

	.content {
		width: 100%;
		background: #fff;
		min-height: 300upx;
		color: #333;
		border-radius: 10upx;
		margin-bottom: 20upx;
	}

	.title {
		font-size: 36upx;
		font-weight: 600;
		line-height: 90upx;
		padding: 0 20upx;
		border-bottom: 1upx solid #E6E6E6;
	}

	.de-date {
		padding: 0 20upx;
		font-size: 30upx;
		line-height: 80upx;
		color: #646464;
	}

	.details {
		min-height: 100upx;
		font-size: 34upx;
		line-height: 60upx;
		padding: 0upx 20upx 15upx;
	}
</style>
