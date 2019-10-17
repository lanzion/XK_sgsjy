<template>
  <div id="resourcesDetails">
    <section class="preview-box backend-content__middle">
    	<doc-reader v-if="detailsData.documentId" v-bind="{docId: detailsData.documentId, width: 900}"></doc-reader>
        <div class="wrapper" v-else-if="detailsData.fileType == '2'">
            <video ref="video" :src="getFileUrl(detailsData.fileId,{filetype: 'video'})" height="550" @click="togglePlay" @ended="videoIsEnded" @play="videoHasPaused = false" @pause="videoHasPaused = true" webkit-playsinline="" x-webkit-airplay="allow" preload="auto" controls="controls">您的浏览器不支持video标签</video>
            <transition name="fade">
                <div class="btn-start" v-show="videoHasPaused" @click.stop="play"><i class=""></i></div>
            </transition>
        </div>
        <div v-else class="preview-img" :style="{backgroundImage: `url(${getFileUrl(detailsData.fileId) || listDefault})`}"></div>
    </section>
    <div class="preview-msg backend-content__middle">
    	<section class="resource-msg">
            <div class="resource-content">资源名称1：{{detailsData.name}}</div>
        		<div class="resource-content">资源简介：{{detailsData.introduction}}</div>
        		<div class="resource-classify">分类：{{detailsData.resourceTypeName}}</div>
        		<div class="resource-technology">技术：{{detailsData.technologyName}}</div>
        		<div class="resource-technology">来源：{{sourceType[detailsData.source]}}</div>
            <div class="resource-technology">共享类型：{{shareType[detailsData.shareType]}}</div>
    	</section>
        <div class="btn-box">
            <button class="bs-search-button i-form-button is-plain" @click.prevent="$router.go(-1)">返回</button>
            <button class="bs-search-button i-form-button" @click.prevent="popupAudit">审核记录</button>
        </div>
    </div>
    <el-dialog class="audit-record" :visible.sync="auditVisible" title="审核记录">
        <v-audit-record :auditData.sync="auditData" :close="close"></v-audit-record>
    </el-dialog>
  </div>
</template>

<script>
    let color = {
        red: ['#f85959', '#fee0e0'],
        grassGreen: ['#2cbb61', '#e2fbde']
    };
    import { mapState, mapMutations, mapActions } from 'Vuex'
    import dataTranslation from '@/js/dataTranslation.js'
    import { loginInfo } from '@/js/getUserInfo.js'
    import { fileBaseUrl } from '@/js/common-config.js'
    import { requestResourceDetails } from '@/service/resource.js'
    import { requestResourcesAuditDetail } from '@/service/admin_space.js'  // 审核记录数据接口
    import docReader from 'components/resource/doc_reader.vue'
    import audit_record from 'Common/popupWindow/audit_record.vue' //审核记录弹窗
    export default {
        name: 'resourcesDetails',
        components: {
            docReader,
            'v-audit-record': audit_record
        },
        data() {
      	 return {
            fileBaseUrl,
            id:'',
            detailsData:'',
            isFront:'',//根据路由判断是否是后台，控制面包屑的显示。
            isPraise:false,
            shareType:{
                '1':'私有',
                '2':'个人共享',
                '3':'本校共享',
                '4':'本区县共享',
                '5':'本市共享',
                '6':'本省共享',
                '7':'所有共享'
            },
            sourceType:{
                '1':'原创',
                '2':'转载'
            },
            auditVisible:false,         // 审核记录弹窗是否可见
            auditData: [],               // 审核记录数据
            videoHasPaused: true
      	}
    },
    created() {
        this.id = this.$route.query.id;
        // this.checkStatistics();
        // 设置返回的路由
        let router = this.$route.path.split('/');
        this.isFront = router[1];
    },
    watch: {
    },
    computed: {
    },
    mounted() {
        this.getResourceDetails();
    },
    methods:{
        ...mapActions({
            'getDictComb': 'dictionaryCommon/getDictComb'
        }),
        /*
        *获取资源详情
        *id:资源id
        */
        getResourceDetails(){
            let data = { id: this.id };
            requestResourceDetails(data).then((res) => {
                this.detailsData = res.data.entity;
            });
        },
        // 关闭弹框
        close() {
            this.auditVisible = false
        },
        //获取审核记录
        popupAudit(){
            requestResourcesAuditDetail({resourceId:this.$route.query.id}).then((res) => {
                if(res.data.code === 200){
                    this.auditData = res.data.appendInfo.list
                }
            });
            this.auditVisible = true;
        },
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
            this.videoHasPaused = true
        }
    }
}
</script>

<style lang='scss' scoped>
#resourcesDetails{
	width: 100%;
	overflow: hidden;
	margin: 0 auto;
  // 资源详情部分
	.preview-img{
        width: 100%;
        height: 360px;
        box-sizing: border-box;
        background-position: center;
        background-size: cover;
        img{
            width: 100%;
        }
	}
	.preview-msg{
		width: 100%;
        box-sizing: border-box;
		overflow: hidden;
		padding: 15px 35px;
		margin: 0 auto;
		.resource-msg{
			width: 100%;
			overflow: hidden;
			position: relative;
			.resource-title{
                height: 20px;
                width: 80%;
                margin-bottom: 15px;
				h5{
                    font-size: 16px;
                    color: #00a0e9;
                    line-height: 20px;
                    padding-right: 50px;
                }
			}
			.resource-content,.resource-classify,.resource-technology,.other-msg{
				font-size: 14px;
				line-height: 25px;
                width: 80%;
                margin-bottom: 15px;
			}
            .resource-content{
                margin-bottom: 15px;
            }
			.other-msg{
				color: #999;
			}
			a{
                display: inline-block;
				position: absolute;
				top: 0;
				right: 0;
				width: 60px;
				height: 25px;
                text-align: center;
				line-height: 25px;
				border: 1px solid #d00;
				color:#d00;
			}
			a:hover{
				background-color: #d00;
				color: #fff;
			}
		}
	}
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
