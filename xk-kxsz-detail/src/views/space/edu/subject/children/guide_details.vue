<template>
    <div id="subjectGuideDetails" class="subjectGuideDetails">
        <el-breadcrumb class="breadcrumbs" separator=">">
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject`, query: { id: $route.query.id } }">课题</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/space/${type}/subject/guide`, query: { id: $route.query.id } }">申报指南</el-breadcrumb-item>
          <el-breadcrumb-item>指南详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content clearfix">
            <div class="content-left fl">
                <section class="guide-msg bgw">
                    <div class="msg-title clearfix">
                        <h4 class="fl">{{guidDetail.title}}</h4>
                        <!-- <a class="status fr">{{status[guidDetail.status]}}</a> -->
                    </div>
                    <div class="level">课题级别：{{subjectLevel[guidDetail.subjectLevel]}}</div>
                    <div class="unit">发布单位：{{guidDetail.jobName}}</div>
                    <div class="time">申报时间：{{guidDetail.startDate | dateFormat('yyyy.MM.dd')}} 至 {{guidDetail.endDate | dateFormat('yyyy.MM.dd')}}</div>
                    <button class="reply-btn" v-if="showApplyBtn" @click="$router.push({path:applyPath,query:{id:$route.query.id,guideId:$route.query.guideId}})">立即申报</button>
                </section>
                <section class="guide-details bgw">
                    <div class="independentDetail">
                        <h1 class="title">{{guidDetail.title}}</h1>
                        <time class="date">发布时间：{{guidDetail.createDate | dateFormat('yyyy.MM.dd')}}</time>
                        <div class="guid-content" v-html='guidDetail.content'></div>
                        <dl class="file clearfix">
                            <dt class="fl">附件：</dt>
                            <dd v-if="guidDetail.attList.length > 0">
                                <!-- <a v-for="(item,index) in guidDetail.attList" :href="downloadUrl(item.fileId, item.name)" :download="item.name">{{item.name}}</a> -->
                                <a v-for="(item,index) in guidDetail.attList" @click="downloadUrl(item.fileId, item.name)">{{item.name}}</a>
                            </dd>
                            <dd v-else>暂无附件</dd>
                        </dl>
                      </div>
                </section>
            </div>
            <div class="content-right fr">
                <v-member :title="'指导专家'" :isBackend="false" :memberList="guidDetail.memberList"></v-member>
                <related-resource :resourceList="guidDetail.resourceList"></related-resource>
            </div>
        </div>
    </div>
</template>

<script>
import member from 'Common/module/subject/subject_member.vue'
import relatedResource from 'Common/module/subject/related_resource.vue'
import breadcrumb from 'Common/breadcrumb.vue'
import { requesrSubjectGuidDetail } from '@/service/subject.js'

export default {
    name: 'subjectGuideDetails',
    components: {
        'v-breadcrumb': breadcrumb,
        'v-member': member,
        'related-resource': relatedResource
    },
    data() {
        return {
            status: {
                1: '发布',
                2: '草稿',
                0: '禁用'
            },
            subjectLevel: {
                1: '国家级',
                2: '省级',
                3: '市级',
                4: '区县级',
                5: '学校级',
            },
            guidDetail: {
                attList: []
            },
            applyPath: '',
            showApplyBtn: false,                // 判断是否显示申报按钮
            isSchool: false,                // 判断是不是学校空间
            id: '',                            // 学校或教育局id
            type: this.$route.path.split('/')[2]                        // 空间类型
        }
    },
    created() {
        this.id = this.$route.query.id
        if (this.$route.path.includes('school')) {
            this.isSchool = true
        }
    },
    mounted() {
        if (this.$route.path.includes('edu')) {
            this.applyPath = '/space/edu/subject/guide/apply'
        } else {
            this.applyPath = '/space/school/subject/guide/apply'
        }
        this.getGuidDetail()
        this.judgeTeacher()
    },
    methods: {
        getGuidDetail() {
            requesrSubjectGuidDetail({ id: this.$route.query.guideId }).then((res) => {
                if (res.data.code === 200) {
                    this.guidDetail = res.data.entity
                }
            })
        },
        // 判断登录人是不是本校或本教育局的老师
        judgeTeacher() {
            if (this.$ls.get('baseInfo') && this.$ls.get('userIdentity') === 'teacher') {
                const schoolInfo = this.$ls.get('baseInfo').school
                if (this.isSchool) {
                    const schoolId = schoolInfo.id
                    this.showApplyBtn = schoolId === this.id
                } else {
                    const eduProvinceId = schoolInfo.eduProvinceId
                    const eduCityId = schoolInfo.eduCityId
                    const eduAreaId = schoolInfo.eduAreaId
                    this.showApplyBtn = eduAreaId === this.id || eduCityId === this.id || eduProvinceId === this.id
                }
            } else {
                this.showApplyBtn = false
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.content{
    width: 100%;
    .content-left{
        width: 906px;
        box-sizing:border-box;
        .guide-msg{
            padding: 20px;
            line-height: 25px;
            position: relative;
            margin-bottom: 20px;
            .msg-title{
                font-size: 22px;
                color: $theme-color;
                margin-bottom: 20px;
                .status{
                    color: $theme-color;
                    font-size: 16px;
                }
            }
            .level,.unit,.time{
                font-size: 14px;
                line-height: 25px;
            }
            .reply-btn{
                height: 32px;
                width: 92px;
                line-height: 32px;
                border-radius: $button-radiu;
                text-align: center;
                color: #fff;
                background-color: $theme-color;
                position: absolute;
                top: 69px;
                right: 20px;
            }
            .reply-btn:hover{
                opacity: 0.75;
                filter:alpha(opacity=0.75);
            }
        }
        .guide-details{
            .file{
                font-size: 14px;
                margin-top: 20px;
                dt{
                    line-height: 1.5em;
                }
                dd{
                    width: 100%;
                    min-height: 20px;
                    line-height: 1.5em;
                    padding-left: 48px;
                    text-align: left;
                    box-sizing:border-box;
                    a{
                        display: block;
                        color: $theme-color;
                    }
                }
            }
            .content-box {
                text-align: justify;
                line-height: 2;
                font-size: 14px;
            }
        }
    }
    .content-right{
        width: 274px;
    }
}
</style>

<style lang='scss' >
@import '~@/assets/css/scss/datails.scss';
#subjectGuideDetails{
    .independentDetail{
        padding: 20px;
    }
}
.guid-content{
    p{
        text-align: left;
        // text-indent: 2em;
        font-size: 14px;
        line-height: 2em;
        word-wrap: break-word;
        img{
            margin: 20px 0;
            max-width: 100%;
        }
    }
}
</style>