<template>
    <div class="study_wrap">
    	<!-- banner图 -->
    	<v-banner :banners="banners" :height="400"></v-banner>
    	<!-- 分类列表 -->
    	<div class="container list-box">
            <!-- 活动培训 -->
            <section class="list-group list-group__actiTrain">
                <header class="list-group__header clearfix">
                    <h3 class="title fl"><span class="tit-txt">活动培训</span></h3>
                    <a class="more fr" @click="redirect(pages.list.actiTrain, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="actiTrain.length">
                    <el-col :span="8" v-for="(item, index) in actiTrain" :key="item.id">
                        <div class="list-group__item" @click="redirect(pages.detail.actiTrain, { query: { id: item.id }})">
                            <div class="item-info clearfix">
                                <div class="date-box fl">
                                    <p class="date day">{{item.startTime | dateFormat('dd')}}</p>
                                    <p class="date year-month">{{item.startTime | dateFormat('yyyy.MM')}}</p>
                                </div>
                                <div class="info-box fl">
                                    <h4 class="info-tit ellipsis" :title="item.theme">{{item.theme}}</h4>
                                    <p class="info-item address ellipsis" :title="item.place">培训地点: {{item.place}}</p>
                                    <p class="info-item time">
                                        培训时间: {{item.startTime | dateFormat('yyyy.MM.dd HH:mm')}} - {{item.endTime | dateFormat('yyyy.MM.dd HH:mm')}}
                                    </p>
                                </div>
                            </div>
                            <article class="item-content">{{item.content | handleContent(280)}}</article>
                            <div class="btn-box">
                                <button class="apply-btn" type="button">立即报名</button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="empty-block" v-else>暂无数据</div>
            </section>
    		<!-- 热门课程 -->
    		<section class="list-group list-group__course">
	            <header class="list-group__header clearfix">
	                <h3 class="title fl"><span class="tit-txt">热门课程</span></h3>
	                <a class="more fr" @click="redirect(pages.list.course, { type: 6 })">更多>></a>
	            </header>
	            <el-row class="list-group__main" :gutter="20" v-if="course.length">
	                <el-col class="w-p-20" v-for="(item, index) in course" :key="item.id">
	                    <div class="list-group__item" @click="redirect(pages.detail.course, { query: { id: item.id }})">
	                        <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
	                        <div class="info">
	                            <h6 class="item-title c_333 ellipsis">{{ item.name }}</h6>
	                            <div class="other-info clearfix">
	                                <span class="price">免费</span>
	                                <span class="fr c_bbb">{{ item.num }}人学习</span>
	                            </div>
	                        </div>
	                    </div>
	                </el-col>
	            </el-row>
	            <div class="empty-block" v-else>暂无数据</div>
	        </section>
	        <!-- 热门项目 -->
            <section class="list-group list-group__project">
                <header class="list-group__header clearfix">
                    <h3 class="title fl"><span class="tit-txt">热门项目</span></h3>
                    <a class="more fr" @click="redirect(pages.list.project, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="project.length">
                    <el-col :span="6" v-for="(item, index) in project" :key="item.id">
                        <div class="list-group__item" @click="redirect(pages.detail.project, { query: { id: item.id }})">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.imgUrl)})` }"></a>
                            <div class="info">
                                <h6 class="item-title c_333 ellipsis">{{ item.name }}</h6>
                                <div class="statis c_bbb clearfix">
                                    <span class="fl item-date">
                                        <i class="icon-i-time"></i>
                                        {{item.startDate | dateFormat('yyyy-MM-dd')}}
                                    </span>
                                    <p class="fr item-type">
                                    	<span class="school-type primary" v-if="item.applyScopeId.includes('primarySchool')">小学</span>
                                    	<span class="school-type junior" v-if="item.applyScopeId.includes('middleSchool')">初中</span>
                                    	<span class="school-type senior" v-if="item.applyScopeId.includes('highSchool')">高中</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="empty-block" v-else>暂无数据</div>
            </section>
            <!-- 热门实训 -->
            <section class="list-group list-group__train">
                <header class="list-group__header clearfix">
                    <h3 class="title fl"><span class="tit-txt">热门实训</span></h3>
                    <a class="more fr" @click="redirect(pages.list.train, { type: 6 })">更多>></a>
                </header>
                <el-row class="list-group__main" :gutter="20" v-if="train.length">
                    <el-col :span="8" v-for="(item, index) in train" :key="item.id">
                        <div class="list-group__item" @click="redirect(pages.detail.train, { query: { id: item.id }})">
                            <a class="pic bg-img__wrap" :style="{ 'background-image': `url(${getFileUrl(item.cover)})` }"></a>
                            <div class="info">
                                <h6 class="item-title clearfix">
                                    <p class="fl name c_333 ellipsis">{{ item.name }}</p>
                                    <p class="fr"><span class="score"> {{ item.score }} </span>分</p>
                                </h6>
                                <div class="other-info clearfix">
                                    <span class="price">免费</span>
                                    <span class="fr c_bbb">{{ item.memberNum }}人在玩</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <div class="empty-block" v-else>暂无数据</div>
            </section>
    	</div>
    </div>
</template>

<script>
    import banner from '@/components/common/banner.vue'
    import { requestBanner } from '@/service/common.js'
    // import { requestCourseList } from '@/service/index.js'
    import { requestCourseList, requestProjectList, requestTrainList, requestActivityTrain } from '@/service/study.js'

    export default {
        name: 'study',
        components: {
            'v-banner': banner
        },
        data() {
            return {
                banners: [],
                course: [],   // 课程数据
                project: [],  // 项目数据
                train: [],    // 实训数据
                actiTrain: []  // 活动培训
            }
        },
        mounted() {
            this.getBanners()
            this.getCourse()
            this.getProject()
            this.getTrain()
            this.getActivityTrain()
        },
        methods: {
            getBanners() {
                requestBanner({ bannerType: 4 }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.appendInfo || {}
                        this.banners = _data.list || []
                    }
                })
            },
            getCourse() {
                requestCourseList({ pageSize: 10, pageNum: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.course = _data.resultData || []
                    }
                })
            },
            getProject() {
                requestProjectList({ pageSize: 8, pageNum: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.project = _data.resultData || []
                    }
                })
            },
            getTrain() {
                requestTrainList({ pageSize: 6, pageNum: 1 }).then((res) => {
                    if (res.data.code === 200) {
                        const _data = res.data.entity || {}
                        this.train = _data.resultData || []
                    }
                })
            },
            // 获取活动培训数据
            getActivityTrain() {
                requestActivityTrain({}, { pageSize: 6, pageNum: 1 }).then((res) => {
                    const _data = res.data.entity || {}
                    this.actiTrain = _data.resultData || []
                })
            }
        },
        filters: {
            // 处理内容字段，字段包括HTML标签内容
            handleContent(txt = '', len = 260, sep = '...') {
                const reg = new RegExp('(.{' + len + '}).+')
                return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~@/assets/css/scss/vars.scss';
$box-radiu: 5px;
$face-size: 24px;
    .c_333 {
        color: #333;
    }
    .c_bbb {
        color: #bbb;
    }
	.study_wrap {
		width: 100%;
	}

	.list-box {
		margin-bottom: 95px;
	}

	.list-group {
	    margin-top: 31px;

	    .list-group__header {
	        margin-bottom: 25px;
	        line-height: 40px;
	        text-align: center;

	        .title {
	            font-size: 30px;
	            width: 1140px;
	            box-sizing: border-box;
	            padding-left: 60px;
	            .tit-txt {
	            	position: relative;
	            	&:before {
	            		content: '';
	            		display: inline-block;
	            		width: 50px;
	            		height: 2px;
	            		background-color: #8a8a8a;
	            		position: absolute;
	            		top: 20px;
	            		left: -63px;
	            	}
	            	&:after {
	            		content: '';
	            		display: inline-block;
	            		width: 50px;
	            		height: 2px;
	            		background-color: #8a8a8a;
	            		position: absolute;
	            		top: 20px;
	            		right: -63px;
	            	}
	            }
	        }
	        .more {
	        	width: 60px;
	            font-size: 14px;
	            color: #999;
	            &:hover {
	                color: nth($default-color, 1);
	            }
	        }
	    }

	    .list-group__main {
	        .list-group__item {
	            margin-bottom: $box-item-margin;
	            border-radius: $box-radiu;
	            background-color: #fff;
	            transition: box-shadow .2s;
	            overflow: hidden;
                cursor: pointer;

	            &:hover {
	                box-shadow: $index-box-shadow;
	            }

	            .item-title {
	                &:hover {
	                    color: nth($default-color, 1);
	                    cursor: pointer;
	                }
	            }
	        }
	        .pic {
	            display: block;
	        }
	    }
	}

    .list-group__course {
        margin-top: 52px;
        .w-p-20 {
            width: 20%;
        }
        .list-group__item {
            .pic {
                height: 124px;
            }
            .info {
                padding: 2px 15px;
                border-bottom: 1px solid #f5f5f5;
                box-sizing: border-box;
                line-height: 2;
                .item-title {
                    font-size: 14px;
                }
                .price {
                    color: #5fb41b;
                }
                .other-info {
                    font-size: 14px;
                }
            }
        }
    }

    .list-group__project {
        .list-group__item {
            .pic {
                height: 176px;
            }
            .info {
                padding: 15px;
                border-bottom: 3px solid #e4e4e4;
                box-sizing: border-box;
                .item-title {
                    font-size: 14px;
                    margin-bottom: 15px;
                }
                .statis {
                	line-height: 15px;
                	.item-date {
                		width: 85px;
                		i {
                			vertical-align: middle;
                		}
                	}
                	.item-type {
                		width: 168px;
                		text-align: right;
                		.school-type {
                			border-radius: 13px;
                			padding: 0px 4px;
                			margin-left: 5px;
                			color: #fff;
                		}
                		.primary {
                			background-color: #80c269
                		}
                		.junior {
                			background-color: #ffa900;
                		}
                		.senior {
                			background-color: #367dd5;
                		}
                	}
                }
            }
            &:hover {
            	.info {
            		border-color: nth($default-color, 1);
            	}
            }
            .author-info {
                padding: 1em;
                box-sizing: border-box;
                line-height: $face-size;
            }
        }
    }

    .list-group__train {
        .list-group__item {
            .pic {
                height: 196px;
            }
            .info {
                padding: 8px 15px 10px;
                border-bottom: 1px solid #f5f5f5;
                box-sizing: border-box;
                line-height: 2;
                .item-title {
                    font-size: 14px;
                    line-height: 2em;
                    .name {
                    	width: 300px;
                    }
                    .score {
                    	width: 40px;
                    	text-align: right;
                    	font-size: 20px;
                    	color: #ffa900;
                    }
                }
                .price {
                    color: #5fb41b;
                }
                .other-info {
                    font-size: 14px;
                }
            }
        }
    }

    .list-group__actiTrain {
        .list-group__item {
            position: relative;
            padding: 15px;
            height: 494px;
            box-sizing: border-box;
            border-radius: 0px!important;
            .item-info {
                margin-bottom: 20px;
                .date-box {
                    width: 84px;
                    height: 88px;
                    border: 1px solid $theme-color;
                    .date {
                        width: 84px;
                        height: 44px;
                        line-height: 44px;
                        text-align: center;
                        font-size: 16px;
                        color: $theme-color;
                    }
                    .year-month {
                        color: #fff;
                        background-color: $theme-color;
                    }
                }

                .info-box {
                    width: 260px;
                    padding-left: 10px;
                    .info-tit {
                        font-size: 20px;
                        color: #000;
                        line-height: 1.2;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }
                    .info-item {
                        font-size: 16px;
                        line-height: 1.5;
                        color: #bfbfbf;
                    }
                }
            }

            .item-content {
                height: 290px;
                overflow: hidden;
                font-size: 16px;
                line-height: 1.4;
                text-indent: 2em;
                color: #333333;
            }

            .btn-box {
                position: absolute;
                bottom: 15px;
                left: 0;
                right: 0;
                text-align: center;
                .apply-btn {
                    width: 140px;
                    height: 40px;
                    color: $theme-color;
                    border: 1px solid $theme-color;
                    border-radius: 10px;
                    font-size: 18px;
                    &:hover {
                        background-color: $theme-color;
                        color: #fff;
                    }
                }
            }

            &:hover {
                .info-box .info-tit {
                    color: $theme-color;
                }
            }
        }
    }
</style>