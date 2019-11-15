<template>
	<view class="content">
		<video id="Videoid" class="videocss" :src="videosrc" @error="videoErrorCallback" direction="90"></video>
	</view>

</template>

<script>
	import helper from '../../common/helper.js';
	export default {
		data() {
			return {
				videosrc: ""
			}
		},
		onLoad(e) {
			helper.islogin(true);
			this.videosrc = e.videosrc;
		    var videoContext = uni.createVideoContext('Videoid', this);
		    videoContext.requestFullScreen(); //执行全屏方法
		},
		methods: {
			videoErrorCallback: function(e) {
				uni.showModal({
					content: e.target.errMsg,
					showCancel: false
				})
			}
		}
	}
</script>

<style>
	.videocss{
		width: 100%;
		height: 500upx;
	}
</style>
