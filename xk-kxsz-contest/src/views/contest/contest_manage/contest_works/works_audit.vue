<template>
	<div id="works_detail" class="">
		<div class="detail-wrap bgw">
			<!-- 作品标题信息 -->
			<section class="detail-head">
				<h4 class="works-title">{{worksDetail.name || '暂无标题'}}</h4>
				<div class="works-msg">
					<span class="msg-praise">点赞：<b class="c_blue">{{worksDetail.praiseNum || 0}}</b>人</span>
					<span class="msg-browse">浏览：<b class="c_blue">{{worksDetail.browseNum || 0}}</b>人</span>
					<span class="msg-score">评分：<b class="c_blue">{{worksDetail.score}}</b></span>
				</div>
			</section>
			<!-- 作品信息表 -->
			<section class="works-info clearfix">
				<div class="fl info-box bxs_bb" v-for="(info, index) in worksInfo">
					<dl class="clearfix info-item" v-for="(item, index) in info.info">
						<dt class="item-tit fl bxs_bb">{{item.name}}</dt>
						<dl class="item-name fl bxs_bb ellipsis" v-if="item.name === '所属区域'">{{worksDetail.provinceName}}{{worksDetail.cityName}}{{worksDetail.areaName}}</dl>
						<dl class="item-name fl bxs_bb ellipsis" v-else-if="item.name === '参赛人群'">{{actorType[detail.actorType]}}</dl>
						<dl class="item-name fl bxs_bb ellipsis" v-else>{{worksDetail[item.key] || '暂无'}}</dl>
					</dl>
				</div>
			</section>
			<!-- 预留字段信息 -->
			<section class="field-list">
                <h4 class="field-list-tit">其他信息</h4>
                <dl class="field-list-item clearfix" v-for="(item, index) in worksDetail.fieldList" :key="index">
                    <dt class="field-list-item-tit fl">{{item.name}}:</dt>
                    <dd class="field-list-item-content fl">{{item.content}}</dd>
                </dl>
            </section>
			<!-- 作品图片 -->
			<thum-carousel :imgs="worksDetail.worksList"></thum-carousel>
			<!-- <section class="works-pic">
		        <el-carousel height='362px' type="card" :interval="3000">
		            <el-carousel-item v-for='(item, index) in worksDetail.worksList' :key="index">
		                <div class='banner-img' :style='{"background-image": "url(" +getFileUrl(item.resourceId)+ ")"}'></div>
		            </el-carousel-item>
		        </el-carousel>
		    </section> -->
		    <!-- 作品详情 -->
		    <section class="works-detail">
                <article class="detail-content">{{worksDetail.description}}</article>
				<dl class="detail-file clearfix">
					<dt class="fl">附件：</dt>
					<dd class="fl file" v-if="worksDetail.attachmentList != null && worksDetail.attachmentList.length">
						<a class="c_blue" v-for="(file, index) in worksDetail.attachmentList" :key="index" :href="downloadUrl(file.resourceId, file.name)" :download="file.name" :title="file.name">{{file.name}}</a>
					</dd>
					<dd class="fl file" v-else>
						暂无附件
					</dd>
				</dl>
		    </section>
		    <div class="btn-box">
		    	<button class="audit-btn" v-if="worksDetail.auditStatus === 0" @click="visible.show = true">审核</button>
		    	<!-- <button class="audit-btn disabled" v-if="worksDetail.auditStatus === 1" disabled>审核通过</button> -->
                <div class="inlineB" v-if="worksDetail.auditStatus === 1">
                    <el-tooltip class="item" effect="dark" content="【学校已审核】" placement="bottom">
                        <button class="audit-btn disabled">审核通过</button>
                    </el-tooltip>
                </div>
		    	<button class="audit-btn disabled" v-if="worksDetail.auditStatus === 2"  disabled>审核不通过</button>
		    	<button class="back-btn" @click="$router.go(-1)">返回</button>
		    </div>
		    <v-audit :visible.sync="visible" @auditSubmit="audit"></v-audit>
		</div>
	</div>
</template>

<script>
    import audit from '@/components/common/dialog/audit.vue'
    import thumbnailCarousel from '@/components/common/thumbnail_carousel.vue'
    import { requestWorksDetail } from '@/service/works.js'
    import { contestWorksAudit } from '@/service/manage.js'
    import { mapState } from 'vuex'

    export default {
        name: 'works_detail',
        components: {
            'v-audit': audit,
            'thum-carousel': thumbnailCarousel
        },
        data() {
            return {
                visible: {
                    show: false // 审核弹窗控制
                },
                worksInfo: [
                    { info: [
                        { name: '作者', key: 'userName' },
                        { name: '参赛人群', key: 'actorType' },
                        { name: '所属区域', key: '' },
                        { name: '所属学校', key: 'schoolName' },
                        { name: '竞赛分组', key: 'actorGroup' },
                        { name: '组别', key: 'groupDisDetailName' },
                    ] },
                    { info: [
                        { name: '竞赛项目', key: 'projectName' },
                        { name: '竞赛形式', key: 'actorWay' },
                        { name: '团队成员', key: 'teamMembers' },
                        { name: '指导教师', key: 'instructor' },
                        { name: '当前赛程', key: 'phaseName' },
                        { name: '学科', key: 'subjectDisDetailName' },
                    ] }
                ],
                actorType: {
                    1: '学生',
                    2: '教师'
                },
                router: {
                    path: '/'
                },
                worksDetail: {},
            }
        },
        computed: {
            ...mapState('matchDetail', {
                detail(state) {
                    const details = state.detail || {}
                    return details
                }
            })
        },
        mounted() {
            this.getWorksDetail()
        },
        methods: {
            getWorksDetail() {
                requestWorksDetail({ id: this.$route.query.worksId }).then((res) => {
                    if (res.data.code === 200) {
                        this.worksDetail = res.data.entity
                    }
                })
            },
            // 参赛作品审核
            audit(params) {
                const param = {
                    id: this.$route.query.worksId,
                    auditStatus: Number(params.result),
                    auditOpinion: params.explain
                }
                contestWorksAudit(param).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '审核成功')
                        this.worksDetail.auditStatus = Number(params.result)
                        this.visible.show = false
                        this.$router.go(-1)
                    } else {
                        this.showMessage('error', res.data.msg)
                    }
                })
            }
        },
        filters: {
            handleHtmlDesc(txt = '', len = 150, sep = '...') {
                const reg = new RegExp('(.{' + len + '}).+')
                return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
        }
    }
</script>

<style lang='scss'>
	#works_detail {
		.comment-box {
			padding: 15px;
        }
        .inlineB {
            display: inline-block;
        }
	}
</style>

<style lang='scss' scoped>
    $theme-color: #23b8ff;
	$border_c: #dfdfdf;
	.c_blue {
		color: #00a0e9;
	}
	.bxs_bb {
		box-sizing: border-box;
	}
	#works_detail {
		margin-bottom: 40px;
		.detail-wrap {
			margin-bottom: 20px;
			padding: 0px 15px 15px;
			// 作品标题信息
			.detail-head {
				margin-bottom: 25px;
				.works-title,.works-msg {
					text-align: center;
				}
				.works-title {
					line-height: 84px;
					font-size: 22px;
					color: #333;
				}
				.msg-praise,.msg-browse {
					margin-right: 30px;
				}
			}
			// 作品信息表
			.works-info {
				margin-bottom: 40px;
				.info-box {
					font-size: 14px;
					width: 50%;
					border: 1px solid $border_c;
					&:last-child {
						border-left: none;
					}
					.info-item {
						line-height: 40px;
						border-bottom: 1px solid $border_c;
						&:last-child {
							border-bottom: none;
						}
						.item-tit {
							text-align: center;
							background-color: #fbfbfb;
							color: #999;
							width: 39%;
							border-right: 1px solid $border_c;
						}
						.item-name {
							color: #3e3e3e;
							width: 61%;
							padding-left: 50px;
						}
					}
				}
			}
			// 预留字段信息
            .field-list {
                margin-bottom: 40px;
                .field-list-tit {
                    font-size: 18px;
                    margin-bottom: 15px;
                }
                .field-list-item {
                    line-height: 2;
                    font-size: 14px;
                    margin-bottom: 5px;
                    .field-list-item-tit {
                        margin-right: 10px;
                    }
                }
            }
			// 作品详情
			.works-detail {
				margin: 30px 0 15px;
				.detail-content {
					text-indent: 2em;
					line-height: 2em;
					font-size: 14px;
					margin-bottom: 20px;
                    word-wrap:break-word;
                    word-break:break-all;
				}
				.detail-file {
					line-height: 2em;
					font-size: 14px;
					.file {
						width: 95%;
						a {
							display: block;
						}
					}
				}
			}
			// 下面的按钮
			.btn-box {
				font-style: 14px;
				.audit-btn {
					border: none;
					padding: 6px 15px;
					color: #fff;
					background-color: $theme-color;
					margin-right: 10px;
					&:hover {
						opacity: 0.75;
					}
				}
				.disabled {
					cursor: no-drop;
				}
				.back-btn {
					border: 1px solid $theme-color;
					color: $theme-color;
					padding: 5px 14px;
					&:hover {
						background-color: $theme-color;
						color: #fff;
					}
				}
			}
		}
	}
	.el-carousel__item .banner-img {
        height: 100%;
    	background-position: center;
    	background-size: cover;
    }
</style>
