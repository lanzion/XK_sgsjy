<template>
	<div id="admin_works_details">
		<!-- 作品信息 -->
		<div class="works-msg backend-content__middle">
			<div class="works-title clearfix">
				<h4 class="title fl">{{worksDetails.workName}}</h4>
				<option-btn :title='title' module='works' :title.sync="worksDetails.workName" :img="worksDetails.resourceId"></option-btn>
			</div>
			<div class="works-classify">分类：<span>{{worksDetails.workType}}</span></div>
			<div class="works-technology">技术：<span>{{worksDetails.technology}}</span></div>
			<div class="others">浏览：<span>{{worksDetails.browseNum === null ? 0 : worksDetails.browseNum}}</span> &nbsp;&nbsp;|&nbsp;&nbsp; 上传时间：<span>{{worksDetails.createTime | dateFormat('yyyy.MM.dd')}}</span></div>
			<div class="works-introduction">
				作品简介：<span>{{worksDetails.introduction}}</span>
			</div>
		</div>
		<!-- 作品图片 -->
		<div class="works-img backend-content__middle">
			<header class="header">
				<h4>作品图片</h4>
			</header>
			<section class="img-box">
				<el-carousel height='380px' type="card">
		            <el-carousel-item v-for='(item, index) in imgSrc' :key="index">
		                <div class='banner-img' :style='{"background-image": "url(" + getFileUrl(item) + ")"}'></div>
		            </el-carousel-item>
		        </el-carousel>
			</section>
		</div>
		<!-- 作品视频 -->
		<div class="works-video backend-content__middle">
			<header class="header">
				<h4>作品视频</h4>
			</header>
			<div class="wrapper">
	            <video ref="video" :src="videoSrc" height="380" width="906" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls"></video>
	            <transition name="fade">
	              	<div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
	            </transition>
          	</div>
		</div>
		<!-- 评论部分 -->
		<div class="works-comment backend-content__middle" v-if="!detailData.isStudent">
			<header class="header">
				<h4>评论</h4>
			</header>
			<v-comment :commentData="commentData"></v-comment>
		</div>
	</div>
</template>

<script>
	import optionBtn from '../../../common/button/com_panel_event.vue'
	import comment from '../../../common/comment.vue'
	import imgUrl from '../../../../asset/img/moment/works_banner_01.png'

	import { requestWorksDetails } from '@/service/works.js'
	export default {
		name: 'admin_works_details',
		components:{
			'option-btn':optionBtn,
			'v-comment':comment
		},
		props:[ 'detailData' ],
		data () {
			return {
				title:'作品',
				imgSrc: [],
				videoSrc: 'http://www.zhangxinxu.com/study/media/cat.mp4',
        		videoHasPaused: true,
        		worksDetails:{},
        		commentData:{
        			reportApi:'maker/work/comment/report/add',
        			type:'works',
        			replyKey:'workId'
        		}
			}
		},
		created () {
			this.getWorksDetails();
		},
		methods:{
			// 视频播放的控制
			play () {
	        	this.$refs.video.play()
	        	this.videoHasPaused = !this.videoHasPaused
	      	},
	      	togglePlay () {
	        	let videoEl = this.$refs.video
	        	if (this.videoHasPaused) {
	          		videoEl.play()
	          		this.videoHasPaused = false
	          		return
	        	}
	        	videoEl.pause()
	        	// videoEl.currentTime = 10
	        	this.videoHasPaused = true
	      	},
	      	videoIsEnded () {
	        	if (!this.autoPlayChecked) {
	          	this.videoHasPaused = true
	        	}
	      	},
	      	// 获取作品详情
	      	getWorksDetails () {
	      		let data = { id:this.worksId };
	      		requestWorksDetails(data).then((res) => {
	      			this.worksDetails = res.data.entity;
	      			let workResource = res.data.entity.workResource;
	      			let len = workResource.length;
	      			for(let i = 0; i<len; i++ ){
	      				if(workResource[i].resourceType === 1){
	      					this.imgSrc.push(workResource[i].resourceId);
	      				}else if(workResource[i].resourceType === 2){
	      					this.videoSrc = workResource[i].resourceId;
	      				}
	      			}
	      		})
	      	}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		box-sizing: border-box;
	}
	#admin_works_details{
		width: 100%;
		.works-msg{
			width: 100%;
			padding: 20px;
			margin-bottom: 20px;
			line-height: 25px;
			font-size: 15px;
			background-color: #fff;
			.works-title{
				margin-bottom: 20px;
				.title{
					font-size: 22px;
					color: #00b5f0;
					margin-right: 35px;
				}
			}
			.works-introduction{
				margin-bottom: 20px;
			}
			.others{
				color: #999;
			}
		}
		.works-img{
			background-color: #fff;
		}
		.works-video{
			background-color: #fff;
		}
		.works-comment{
			background-color: #fff;
		}
	}
	.header{
		width: 100%;
		border-bottom: 1px solid #ccc;
		margin-bottom: 20px;
		height: 38px;
		h4{
			display: inline-block;
			height: 38px;
			font-size: 16px;
			padding: 10px;
			border-bottom: 2px solid #d00;
		}
	}
	// 轮播图
	.banner-img{
		height: 100%;
	}
	// 视频播放
	.wrapper {
        position: relative;
    }
    video {
        width: 100%;
        cursor: pointer;
    }
    .btn-start {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 96px;
        height: 96px;
        transform: translate(-50%, -50%) scale(1);
        // background: url("../../../asset/img/course/btn_start.png") no-repeat;
        border-radius: 50%;
        cursor: pointer;
        &.fade-enter-active, &.fade-leave-active {
          	transition: all .5s ease;
        }
        &.fade-enter, &.fade-leave-to {
          	opacity: 0;
          	transform: translate(-50%, -50%) scale(0.1);
        }
    }
</style>