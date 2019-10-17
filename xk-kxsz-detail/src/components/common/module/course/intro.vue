<template>
    <article id="courseIntro" class="courseIntroPanel clearfix">
        <img class="courseIntro-prev" :src="getFileUrl(courseInfo.imgUrl) || listDefault" title="点击查看原图" @click="visible.show = true">
        <div v-if="isAdmin" class="courseIntro-summary">
            <h3 class="courseIntro-header">{{courseInfo.name}}</h3>
            <p class="desc">{{courseInfo.content | textOverflow(50, '......')}}</p>
            <div class="courseIntro-other">
                <span class="">分类：{{courseInfo.courseTypeName}}</span>
                <span class="">级别：{{courseInfo.grade}}</span>
                <span class="">适合学生：{{courseInfo.fit}}</span>
            </div>
            <p class="student">学员：<em>{{courseInfo.total}}</em></p>
        </div>
        <div v-else class="courseIntro-summary">
            <h3 class="courseIntro-header clearfix">
                <span class="courseIntro-title fl ellipsis">{{courseInfo.name}}</span>
                <v-btn-group class="fr" module="course" :title.sync="courseInfo.name" :img="courseInfo.imgUrl"></v-btn-group>
            </h3>
            <div class="course-type">课程类型：<em class="free-or-not">{{courseInfo.isFree}}</em></div>
            <div class="other-info">
                <span class="category ellipsis"><i class="icon-i-classify"></i>分类：{{courseInfo.courseTypeName}}</span>
                <span class="technology ellipsis"><i class="icon-i-technology"></i>相关技术：{{courseInfo.technology}}</span>
                <span class="courseIntro-creator ellipsis">
                    <i class="icon-i-creator"></i>教师：<a class="link" @click="redirect(pages.detail.teacher, { query: { id: courseInfo.orgId, uid: courseInfo.createId } })">{{courseInfo.teacher}}</a>
                </span>
            </div>

            <transition name="fade" v-if="$ls.get('loginInfo') == null || identity=='student' || identity=='teacher'">
                <button v-if="!hasRegistered && loginUId != courseInfo.createId" @click="register" class="btn-b-grassGreen">立即参加</button>
            </transition>
        </div>
        <img-preview :visible.sync="visible" :imgUrl="courseInfo.imgUrl"></img-preview>
    </article>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { joinCourse } from '@/service/course.js'
    import imgPreview from '@/components/common/img_preview/img_preview.vue'
    import btnGroup from './../../button/com_panel_event.vue'

    export default {
        name: 'courseIntro', // 课程介绍
        data() {
            return {
                identity: this.$ls.get('userIdentity'),
                img: '',
                loginUId: '',
                visible: { // 查看大图的控制
                    show: false
                }
            }
        },
        props: {
            hasRegistered: { // 是否已报名
                type: Boolean,
                default: false
            }
        },
        components: {
            'v-btn-group': btnGroup,
            'img-preview': imgPreview
        },
        computed: {
            ...mapState('course', { courseInfo: 'courseDetail' })
        },
        created() {
            const loginUId = this.$ls.get('loginUId')
            this.loginUId = loginUId
            this.requestCourseDetail({ id: this.$route.query.id }).then((res) => {
                // 如果登录用户是课程发布者的话，不用报名参加课程，直接展示所有TAB
                if (res.createId === loginUId) this.$emit('on-be-creator')
            })
        },
        methods: {
            ...mapActions('course', ['requestCourseDetail']),
            async register() { // 报名课程
                // if (!this.loginUId) {
                //     this.$message('您还未登录，请登录之后再报名')
                //     return
                // }
                const res = await joinCourse({ courseId: this.$route.query.id })
                if (res.data.code === 200) {
                    this.$message({
                        message: '成功报名该课程',
                        type: 'success',
                        duration: 1000
                    })
                    this.$emit('on-register-success')
                    return
                }

                this.$message.error(res.data.msg || '报名课程失败，请重试')
            },
            // linkTo() {
            //     const { orgId, createId } = this.courseInfo
            //     this.$router.push({ path: '/teacherSpace', query: { id: orgId, uid: createId } })
            // }
        }
    }
</script>
<style lang='scss'>
    #courseIntro .el-rate {
        display: inline-block;
        margin-right: 12px;
        vertical-align: top;
    }
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data-set {
    .theme-#{$color-key} {
        .btn-b-grassGreen {
            background: nth($color-value, 3);
            &:hover {
                background: nth($color-value, 1);
            }
        }
    }
}
    .courseIntroPanel {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
        padding: 15px;
        background-color: #fff;
        .courseIntro-prev,
        .courseIntro-summary {
            float: left;
            height: 100%;
            box-sizing: border-box;
        }
        .courseIntro-prev {
            width: 48%;
            height: 330px;
        }
        .courseIntro-summary {
            position: relative;
            width: 52%;
            padding-left: 20px;
            .courseIntro-header {
                font-size: 24px;
                line-height: 3;
            }
            .courseIntro-title {
                display: inline-block;
                max-width: 382px;
                overflow: hidden;
            }
            .courseIntro-desc {
                margin-bottom: 1em;
                font-size: 14px;
                line-height: 1.5;
                text-align: justify;
            }
            .other-info {
                span {
                    display: inline-block;
                    box-sizing: border-box;
                    width: 48%;
                    line-height: 2;
                    padding-right: 12px;
                    font-size: 14px;
                    color: #626262;
                }
                [class*=icon-i-] {
                    margin-right: 10px;
                }
                .icon_time, .icon_person {
                    font-size: 14px;
                    vertical-align: text-bottom;
                    margin-right: 4px;
                }
                .link:hover {
                    color: #2bbb61;
                }
            }
            .course-type {
                height: 44px;
                line-height: 44px;
                margin-bottom: 22px;
                background-color: #f9f9f9;
                font-size: 20px;
                text-indent: 10px;
                .free-or-not {
                    color: #5fb41b;
                }
            }
            .btn-b-grassGreen {
                width: 160px;
                height: 46px;
                margin-top: 65px;
                border: none;
                font-size: 16px;
                cursor: pointer;
                color: #fff;
                border-radius: $button-radiu;
                &:hover {
                    opacity: 0.75;
                }
            }
        }
    }

    .is-admin .courseIntroPanel {
        border: 0;
        padding: 15px;
        .courseIntro-prev {
            width: 192px;
            height: 192px;
        }
        .courseIntro-summary {
            width: 70%;
            .courseIntro-header {
                line-height: 2.4;
            }
            .desc {
                font-size: 14px;
                line-height: 1.3;
            }
            .courseIntro-other {
                margin: 34px 0 16px;
                font-size: 14px;
                color: #999;
                span {
                    padding: 0 16px;
                    border-right: 1px solid #999;
                    &:first-child {
                        padding-left: 0;
                    }
                    &:last-child {
                        border-right: 0;
                    }
                }
            }
            .student {
                font-size: 14px;
                em {
                    color: #00a0e9;
                }
            }
        }
    }
</style>
