<template>
	<!--绑定key，切换课程时，避免组件缓存-->
	<div :key="$route.query.id" id="videoPage" class="">
		<div class="bread-crumb-wrapper container">
			<bread-crumb></bread-crumb>
		</div>
		<div class="video-wrapper">
			<div class="container clearfix">
				<div class="video-box fl">
					<div class="wrapper">
						<video id="video" class="video-js" v-if="videoSrcArr[curVideoSrcIndex]" ref="video" :src="getFileUrl(videoSrcArr[curVideoSrcIndex].url, {filetype: 'video'})" @click="togglePlay" @ended="handleEnd" @play="play" @pause="pause" @error="handleError" :key="curVideoSrcIndex" webkit-playsinline="true" x-webkit-airplay="allow" preload="auto" controls="controls" width="892" height="504"></video>
						<transition name="fade">
							<div v-show="videoHasPaused" @click.stop="togglePlay" class="btn-start"></div>
						</transition>
					</div>
					<div class="bottom">
						<el-checkbox v-model="autoPlayIsChecked" class="auto-play-next-one">自动打开下一课时</el-checkbox>
					<!-- 	<a @click="openCourseFailureReport" class="report-error" href="javascript:;">
							<i class="icon-report-error"></i>报故障</a> -->
						<button @click.stop="hasLearned" class="btn-has-learned">学过了</button>
					</div>
					<a @click="foldRightPanel" class="btn-folder" href="javascript:;"></a>
				</div>
				<transition name="fold-panel">
					<aside v-show="!isFolded" class="side-bar fl">
						<nav class="top-nav">
							<a @click="curView = 'outline';curTopIndex = 0" :class="{active: curTopIndex === 0}" class="top-nav-link" href="javascript:;">目录</a>
							<a @click="curView = 'note';curTopIndex = 1" :class="{active: curTopIndex === 1}" class="top-nav-link" href="javascript:;">笔记</a>
						</nav>
						<component :is="curView" :video-el="$refs.video"></component>
					</aside>
				</transition>
			</div>
		</div>
		<div class="container">
			<courseDetail></courseDetail>
		</div>
		<el-dialog title="报故障" class="repair" :visible.sync="isRepairVisible">
			<repair-video @close="closeCourseFailureReport"></repair-video>
		</el-dialog>
	</div>
</template>

<script>
	import { addCourseStudyingRecord } from '@/service/course.js'
	import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
	import { Message } from 'element-ui'
	import breadCrumb from 'components/common/breadcrumb.vue'
	import repairVideo from '@/components/course/video/repairVideo.vue'
	import courseDetail from '../../../../components/video/videoCourseDetail.vue'
	import outline from '../../../../components/video/outline.vue'
	import note from '../../../../components/video/note.vue'

	export default {
		name: 'videoPage', // 课程视频学习页面
		data () {
			return {
				autoPlayIsChecked: true,
				curView: 'outline',
				curTopIndex: 0,
				errMessageBox: null,
				isError: false,
				isFolded: false,
				videoHasPaused: true,
				isRepairVisible: false
			}
		},
		computed: {
			...mapGetters('course', ['videoSrcArr']),
			...mapState('course', ['videoPageIsSwitching']),
			curVideoSrcIndex () { // 当前播放视频的序号
				return this.videoSrcArr.findIndex(item => item.sectionId === this.$route.query.sectionId) || 0
			}
		},
		components: {
			courseDetail,
			outline,
			note,
			breadCrumb,
			repairVideo
		},
		beforeRouteLeave (to, from, next) {
			// 离开页面时，如果视频正在播放，添加播放记录
			!this.videoHasPaused && this.addCourseStudyingRecord()
			this.errMessageBox && this.errMessageBox.close()
			next()
		},
		beforeRouteUpdate (to, from, next) { // 路由更新时，重置状态
			const { query: toQuery, path: toPath } = to
			const { path: fromPath } = from
			this.isError = false

			// 在当前页面切换课程，重置数据
			if (toPath === fromPath && this.videoPageIsSwitching) {
				this.id = toQuery.id
				this.initData()
				window.scroll(0, 0)
			}

			next()
		},
		mounted () {
			this.loginUId = this.$ls.get('loginUId')
			this.id = this.$route.query.id
			this.initData()
			!this.loginUId && this.$store.commit('toggleLoginModal', true)
		},
		methods: {
			...mapActions('course', ['requestOutline', 'queryStudyingProgress']),

			...mapMutations('course', ['toggleSwitching']),

			// 进入页面和路由更新时，重新获取数据
			initData () {
				this.requestOutline({ courseId: this.id, userId: this.loginUId })
				this.loginUId && this.queryStudyingProgress({ courseId: this.id })

			},

			addCourseStudyingRecord () { // 添加视频学习进度
				let videoEl = this.$refs.video
				let videoCurTime = videoEl ? +(videoEl.currentTime / 60).toFixed(2) : 0 // 视频当前播放时间点
				let sum = videoEl ? +(videoEl.duration / 60).toFixed(2) : 0
				addCourseStudyingRecord({
					courseId: this.id,
					sectionId: this.$route.query.sectionId,
					learnLen: videoCurTime,
					sum
				}).then(res => {
					if (res.status === 200 && res.data.code === 200) {
						this.queryStudyingProgress({ courseId: this.id })
						this.requestOutline({ courseId: this.id, userId: this.loginUId })
					}
				})
			},

			openCourseFailureReport () {	// 添加视频故障
				this.isRepairVisible = true
			},
			closeCourseFailureReport () {	// 关闭视频故障报修
				this.isRepairVisible = false
			},

			foldRightPanel () { // 折叠面板
				this.isFolded = !this.isFolded
			},
			handleEnd () { // 视频播放结束，是否自动播放下一视频
				if (this.autoPlayIsChecked) {
					let isLast = this.playNextOne()
					if (isLast) {
						this.videoHasPaused = true
						return
					}
				}
				this.videoHasPaused = true
			},
			handleError () { // 处理视频加载失败
				this.isError = true
				this.errMessageBox = this.$message({
					type: 'error',
					message: '加载视频出错，请重试',
					duration: 2000
				})
			},
			hasLearned () { // 点击学过了
				let isLast = this.playNextOne()
				if (isLast) {
					let videoEl = this.$refs.video
					this.videoHasPaused = true
					videoEl && videoEl.pause()
				}
			},
			pause () { // 暂停视频
				this.videoHasPaused = true
				this.addCourseStudyingRecord()
			},
			play () { // 播放视频
				if (this.isError) {
					this.handleError()
					return
				}
				this.videoHasPaused && (this.videoHasPaused = false)
			},
			playNextOne () { // 播放下一视频
				let curSrcIndex = this.curVideoSrcIndex
				if (++curSrcIndex < this.videoSrcArr.length) {
					this.$router.replace({ path: '', query: { id: this.id, sectionId: this.videoSrcArr[curSrcIndex].sectionId } })
					this.$nextTick(() => this.$refs.video.play())
					return false
				}
				return true // 返回是否是最后一个视频
			},
			togglePlay () { // 暂停/播放视频
				let videoEl = this.$refs.video
				if (this.isError || !videoEl) {
					this.handleError()
					return
				}
				if (this.videoHasPaused) {
					videoEl.play()
					this.videoHasPaused = false
					return
				}
				videoEl.pause()
				this.videoHasPaused = true
			}
		},
		watch: {
			// '$route' (val, old) {
			// 	console.log(val)
			// 	if (val.path === old.path) {
			// 	 	this.router.query = val.query
			// 	}
			// },
			// 切换课程时，获取到新的课程视频列表时，重置路由的sectionId
			videoSrcArr (val) {
				const { id, sectionId } = this.$route.query
				const [{ sectionId: firstSrcSectionId } = {}] = val

				if (!sectionId && firstSrcSectionId) {
					this.toggleSwitching({ isSwitching: false })
					this.errMessageBox && this.errMessageBox.close()
					this.$router.push({ path: '', query: { id, sectionId: firstSrcSectionId } })
				}
			}
		}
	}
</script>

<style>
	.video-wrapper .bottom .el-checkbox__inner {
		background-color: transparent;
		border: 1px solid #2bbb61;
	}

	.video-wrapper .bottom .el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: transparent;
	}
</style>
<style lang="scss">
	.video-wrapper {
		background-color: #222;
		.container {
			overflow: hidden;
			background-color: #000203;
		}
		.video-box {
			position: relative;
			box-sizing: border-box;
			width: 76%;
			height: 570px;
			padding-right: 20px;
			.wrapper {
				position: relative;
				width: 892px;
				height: 504px;
			}
			video {
				object-fit: contain;
			}
			.operate {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				.progress-bar {
					position: relative;
					height: 3px;
					background-color: #3e3637;
					overflow: hidden;
					.progress-bar-inner {
						position: absolute;
						left: 0;
						height: 100%;
						background-color: #1b9c39;
					}
				}
				.operate-bar {
					height: 27px;
					background-color: rgba(0, 0, 0, .5);
				}
			}
			.bottom {
				position: relative;
				height: 64px;
				box-sizing: border-box;
				color: #fff;
				font-size: 14px;
				padding: 20px 10px;
				.auto-play-next-one {
					margin-right: 22px;
					color: #fff;
				}
				.report-error {
					color: #fff;
				}
				.icon-report-error {
					display: inline-block;
					width: 15px;
					height: 16px;
					vertical-align: middle;
					margin-right: 6px;
					background: url("../../../../asset/img/course/icon_error.png") no-repeat;
				}
				.btn-has-learned {
					position: absolute;
					right: 0;
					top: 12px;
					width: 90px;
					height: 40px;
					line-height: 40px;
					box-sizing: border-box;
					text-align: center;
					color: #fff;
					border: 1px solid #2bbb61;
				}
			}
			.btn-start {
				position: absolute;
				left: 50%;
				top: 50%;
				width: 96px;
				height: 96px;
				transform: translate(-50%, -50%) scale(1);
				background: url("../../../../asset/img/course/btn_start.png") no-repeat;
				border-radius: 50%;
				cursor: pointer;
				&.fade-enter-active,
				&.fade-leave-active {
					transition: all .5s ease;
				}
				&.fade-enter,
				&.fade-leave-to {
					opacity: 0;
					transform: translate(-50%, -50%) scale(0.1);
				}
			}
			.btn-folder {
				position: absolute;
				right: 7px;
				top: 50%;
				width: 13px;
				height: 50px;
				-webkit-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				transform: translateY(-50%);
				background: url("../../../../asset/img/course/btn_folder.png") no-repeat;
				&:hover {
					opacity: .75;
				}
			}
		}
		.side-bar {
			width: 24%;
			min-height: 511px;
			font-size: 12px;
			color: #999;
			&.fold-panel-enter-active,
			&.fold-panel-leave-active {
				transition: all .5s ease;
			}
			&.fold-panel-enter,
			&.fold-panel-leave-to {
				transform: translateX(100%);
			}
			.top-nav {
				padding-top: 8px;
				border-bottom: 1px solid #999;
			}
			.top-nav-link {
				display: inline-block;
				margin-right: 2px;
				padding: 10px 3px;
				color: #999;
				&.active {
					color: #2bbb61;
				}
			}
		}
	}
	.repair {
	    .el-dialog {
	        width: 600px;
	    }
	}
</style>
<style>
	.auto-play-next-one .el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #2bbb61;
		border-color: #2bbb61;
	}

	.auto-play-next-one .el-checkbox__inner:hover {
		border-color: #2bbb61;
	}
</style>
