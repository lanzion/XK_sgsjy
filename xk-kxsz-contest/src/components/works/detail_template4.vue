<template>
	<div class="detail-template bgw">
		<dl class="detail-item">
			<video ref="video" :src="getFileUrl(detail.imgAttchList[0].resourceId, { filetype: 'mp4' })" height="500" :width="videoWith" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls"></video>
		</dl>
		<p class="form-tips">
            <span class="form-tips-item">
                <i class="icon-form-tip"></i>
                <a href="javaScript:;" @click="noticeVisible.show = true">请点击查看比赛须知</a>
            </span>
            <span class="form-tips-item">
                <i class="icon-form-tip"></i>
                <a href="javaScript:;" @click="visible.show = true">请点击查看评比标准</a>
            </span>
        </p>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				项目类别：
			</dt>
			<dd class="detail-item-content">{{detail.projectName}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				作品名称：
			</dt>
			<dd class="detail-item-content">{{detail.name}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				申报组别：
			</dt>
			<dd class="detail-item-content">{{detail.declareName || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				作者：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.author || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				指导老师：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.teacherId || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				指导老师联系电话：
			</dt>
			<dd class="detail-item-content">
				<span v-if="ifManage">{{detail.worksTemplate.phone || '暂无'}}</span>
				<span v-else>{{detail.worksTemplate.phone | phoneFormat}}</span>
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				学校全称：
			</dt>
			<dd class="detail-item-content">{{detail.schoolName || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				班级：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.classId || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				需求分析：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.demand || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				功能说明：
			</dt>
			<dd class="detail-item-content">
				{{detail.worksTemplate.functionDescription || '暂无'}}
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				硬件说明：
			</dt>
			<dd class="detail-item-content">
				{{detail.worksTemplate.hardwareDescription || '暂无'}}
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				程序说明：
			</dt>
			<dd class="detail-item-content">
				{{detail.worksTemplate.programDescription || '暂无'}}
			</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				参考资源：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.resourceDescription || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				其他说明：
			</dt>
			<dd class="detail-item-content">{{detail.worksTemplate.otherDescription || '暂无'}}</dd>
		</dl>
		<dl class="detail-item clearfix">
			<dt class="detail-item-label">
				附件：
			</dt>
			<dd class="detail-item-content" v-if="detail.fileAttchList != null && detail.fileAttchList.length">
				<div v-if="ifManage">
					<!-- <a class="" v-for="(file, index) in detail.fileAttchList" :href="downloadUrl(file.resourceId, file.name)" :download="file.name" :title="file.name">{{file.name}}</a> -->
					<a class="" v-for="(file, index) in detail.fileAttchList" href="javascript:;" @click="downloadUrl(file.resourceId, file.name )" :title="file.name">{{file.name}}</a>
				</div>
				<div v-else>
					<p class="" v-for="(file, index) in detail.fileAttchList">{{file.name}}</p>
				</div>
			</dd>
			<dd class="detail-item-content" v-else>
				暂无附件
			</dd>
		</dl>
		<eval-standard :visible.sync="visible"></eval-standard>
		<match-notice :noticeVisible.sync="noticeVisible"></match-notice>
	</div>
</template>

<script>
    import evalStandard from '@/components/enroll_contest/eval_standard.vue'
    import matchNotice from '@/components/enroll_contest/match_notice.vue'

    export default {
        components: { evalStandard, matchNotice },
        data() {
            return {
                visible: {
                    show: false
                },
                noticeVisible: {
                    show: false
                },
                ifManage: false,
                videoHasPaused: true,
                videoSrc: '',
                videoWith: 1170
            }
        },
        props: {
            detail: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        mounted() {
            if (this.$route.path.includes('contest/manage/entry/matchDetail')) {
                this.ifManage = true
                this.videoWith = 930
            } else {
                this.ifManage = false
                this.videoWith = 1170
            }
            this.togglePlay()
        },
        methods: {
            // 视频播放的控制
            play() {
                this.$refs.video.play()
                this.videoHasPaused = !this.videoHasPaused
            },
            togglePlay() {
                const videoEl = this.$refs.video
                if (this.videoHasPaused) {
                    videoEl.play()
                    this.videoHasPaused = false
                    return
                }
                videoEl.pause()
                this.videoHasPaused = true
            },
            videoIsEnded() {
                this.videoHasPaused = true
            },
        },
        filters: {
            phoneFormat(phone) {
                if (phone) {
                    return phone.replace(/(\S{3})\S*(\S{4})/, '$1****$2')
                }
                return 'ta没留下电话'
            },
            idCodeFormat(idCode) {
                if (idCode && idCode.length > 6) {
                    return idCode.replace(/(\S{3})\S*(\S{3})/, '$1************$2')
                } else if (idCode && idCode.length <= 6) {
                    return '*********'
                }
                return '暂无身份证号'
            },
            qqFormat(qq) {
                if (qq && qq.length > 4) {
                    return qq.replace(/(\S{2})\S*(\S{2})/, '$1******$2')
                } else if (qq && qq.length <= 4) {
                    return '****'
                }
                return '暂无微信或qq号'
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/offline_detail.scss';
.form-tips {
    margin-bottom: 20px;
    padding-left: 40px;
    font-size: 14px;
    .form-tips-item {
        margin-right: 10px;
        i {
            vertical-align: top;
        }
        a:hover {
            color: #23b8ff;
        }
    }
}
</style>