<template>
    <div id="classSpace" class="classSpace container clearfix">
        <!-- 班级信息 -->
        <div class="about-class bgw clearfix">
            <img class="class-pic fl" title="点击查看原图" @click="visible.show = true" :src="getFileUrl(claszDatail.cover) || listDefault" alt="" width="450" height="250">
            <div class="class-info fl">
                <h3 class="class-name">{{claszDatail?claszDatail.className:''}} —— {{claszDatail?claszDatail.alias:''}}</h3>
                <div class="addr-box clearfix">
                    <p class="school-name fl">{{claszDatail?claszDatail.schoolName:''}}</p>
                    <p class="addr fl">{{claszDatail?claszDatail.provinceName:''}}{{claszDatail?claszDatail.cityName:''}}{{claszDatail?claszDatail.areaName:''}}</p>
                </div>
                <div class="teacher"><i class="icon-i-creator"></i>班主任：{{claszDatail.teacherName || '暂无'}}</div>
                <div class="desc clearfix">
                    <span class="sub-title fl">简介：</span>
                    <p class="desc-content break-word">{{claszDatail.classAbstract != null ? claszDatail.classAbstract : ''}}</p>
                </div>
                <ul class="about-student clearfix">
                    <li class="student-num" v-for="(i, k) in stuMes" :key="k">{{i.name}}：<i>{{ claszDatail ? claszDatail[i.numName] : 0 }}</i></li>
                </ul>
            </div>
            <div class="btn-box" v-if="isAdmin">
                <router-link :to="{path: `${pages.detail.clasz.path}/manage`,query:{ id: $route.query.id }}">班级管理</router-link>
            </div>
        </div>
        <nav class="title_nav">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="index" :to="{ path: item.path, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view :isAdmin="isAdmin" :isMember="isMember"></router-view>
        <img-preview :visible.sync="visible" :imgUrl="claszDatail.cover"></img-preview>
    </div>
</template>

<script>
import { loginInfo, baseInfo, userIdentity } from '@/js/getUserInfo.js'
import { claszDetails } from '@/service/homePage.js'
import { judgeStudentIsAdmin, judgeClaszMember } from '@/service/space_clasz.js'
import { scrollToTop } from '@/js/scrollToTop.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    name: 'classSpace',
    components: {
        'img-preview': imgPreview
    },
    data() {
        return {
            navList: [
                {
                    name: '班级主页',
                    path: '/space/clasz/homePage'
                },
                {
                    name: '班级资源',
                    path: '/space/clasz/resource'
                },
                {
                    name: '班级作品',
                    path: '/space/clasz/works'
                },
                // {
                //     name: '话题吧',
                //     path: '/space/clasz/topic'
                // },
                {
                    name: '班级统计',
                    path: '/space/clasz/statis'
                }
            ],
            stuMes: [
                { name: '学生', numName: 'studentCount' },
                // { name: '学习', numName: 'studyCount' },
                // { name: '实践', numName: 'activityCount' },
                { name: '作品', numName: 'worksCount' },
                { name: '资源', numName: 'resourceCount' },
                { name: '话题', numName: 'topicCount' }
            ],
            claszId: this.$route.query.id || baseInfo[userIdentity].classId,
            claszDatail: {},
            isAdmin: false,
            isMember: true,
            hadJoin: false,
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        if (this.$route.query.id === undefined && loginInfo) {
            const classId = baseInfo[userIdentity].classId
            if (classId) {
                this.$router.replace({ path: this.$route.path, query: { id: classId } })
            } else {
                this.$alert('您尚未加入班级', '温馨提示', {
                    confirmButtonText: '确定',
                    customClass: '__custom-msg-box',
                    callback: () => {
                        window.opener = null
                        window.open('', '_self')
                        window.close()
                    }
                })
            }
        }
        if (loginInfo) {
            const studentId = loginInfo.userInfo.id
            this.hadLogin = true
            judgeStudentIsAdmin({ id: this.claszId, studentId: studentId }).then((res) => {
                if (res.data.code === 200) {
                    this.isAdmin = res.data.entity
                }
            })
            judgeClaszMember({ classId: this.claszId, userId: studentId }).then((res) => {
                if (res.data.code === 200) {
                    this.isMember = res.data.entity
                }
            })
        } else {
            this.isMember = false
        }
        this.detailData()
        scrollToTop()
    },
    mounted() {
    },
    methods: {
        detailData() {
            claszDetails({ classId: this.claszId }).then((res) => {
                if (res.status === 200) {
                    this.claszDatail = res.data.entity
                    if (this.claszDatail.properties === '2') {
                        if (this.hadLogin) {
                            if (this.$ls.get('userIdentity') === 'teacher' && loginInfo.userInfo.id === this.claszDatail.teacherId) {
                                this.isMember = true
                            }
                            if (!this.isMember) {
                                this.$alert('私密班级，非本班级成员不允许访问!', '温馨提示', {
                                    confirmButtonText: '确定',
                                    customClass: '__custom-msg-box',
                                    callback: () => {
                                        this.redirect(this.pages.list.clasz, { type: 6 })
                                        // this.$router.push({name:'clasz'})
                                        // this.$router.go(-1)
                                    }
                                })
                            }
                        } else {
                            this.$alert('私密班级，不允许访问', '温馨提示', {
                                confirmButtonText: '确定',
                                customClass: '__custom-msg-box',
                                callback: () => {
                                    this.redirect(this.pages.list.clasz, { type: 6 })
                                    // this.$router.push({ name: 'clasz' })
                                    // this.$router.go(-1)
                                }
                            })
                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/space_homepage.scss';
@import '~@/assets/css/scss/vars.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .btn-box {
            background-color: $color-value;
        }
    }
}
.classSpace{
    margin-top: 20px;
}
/* 班级信息 */
.about-class{
    padding: 15px;
    position: relative;
    .btn-box{
        position: absolute;
        top:10px;
        right: 15px;
        border-radius: $button-radiu;
        a{
            display: inline-block;
            width: 96px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
            color: #fff;
            &:hover {
                opacity: 0.75;
            }
        }
    }
    .class-info{
        width: 705px;
        margin-left: 15px;
        color: #3e3e3e;
        font-size: 14px;
        .class-name{
            height: 37px;
            line-height: 37px;
            font-size: 22px;
            border-bottom: 1px solid #c9c9c9;
        }
        .addr-box{
            margin: 20px 0;
            .school-name{
                font-size: 20px;
            }
            .addr{
                padding-left:10px;
                font-size: 14px;
                margin-top: 6px;
            }
        }
        .desc{
            margin: 10px 0;
            line-height: 1.5em;
            .sub-title{
            }
            .desc-content{
                max-height: 84px;
                overflow: auto;
                word-wrap: break-word;
            }
        }
        .about-student{
            color: #999;
            padding-top: 6px;
            li{
                float: left;
                height: 15px;
                line-height: 15px;
                padding-right: 10px;
                border-right: 1px solid #999;
                margin-right: 10px;
            }
            li:last-child{
                border-right: 0;
                margin-right: 0;
            }
        }
    }
}
</style>
