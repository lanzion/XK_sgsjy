<template>
    <div id="activityDetails" class="container detail-content clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'street' })">活动街区</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect(pages.list.activity.url)">活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 左边-活动详情 -->
        <div class="content-left fl">
            <div class="banner-box clearfix">
                <img :src="getFileUrl(activityDetails.cover)" height="220" width="330" class="fl activity-cover" title="点击查看原图" @click="visible.show = true">
                <div class="msg-box fl">
                    <div class="info-title">
                        <h4 class="title" :title="activityDetails.title">{{activityDetails.title | textOverflow(18)}}</h4>
                    </div>
                    <el-row class="info-msg">
                        <el-col :span="12">
                            <span><i class="icon-i-classify"></i>活动分类：</span>
                            <span>{{activityDetails.activityTypeName}}</span>
                        </el-col>
                        <el-col :span="12">
                            <span><i class="icon-i-creator"></i>发布者：</span>
                            <span>{{activityDetails.createName}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="info-msg">
                        <el-col :span="12">
                            <span><i class="icon-i-classify"></i>活动地点：</span>
                            <span>{{activityDetails.site | textOverflow(20)}}</span>
                        </el-col>
                        <el-col :span="12">
                            <span><i class="icon-btn-browse"></i>浏览：</span>
                            <span style="color:#00a0e9;">{{activityDetails.browseNum}}</span>
                        </el-col>
                    </el-row>
                    <div class="info-msg">
                        <span><i class="icon-i-activeTime"></i>活动时间：</span>
                        <span>{{activityDetails.startDate | dateFormat('yyyy-MM-dd')}} 至 {{activityDetails.endDate | dateFormat('yyyy-MM-dd')}}</span>
                    </div>
                    <div class="info-msg">
                        <span><i class="icon-i-time"></i>报名时间：</span>
                        <span>{{activityDetails.beginDate | dateFormat('yyyy-MM-dd')}} 至 {{activityDetails.stopDate | dateFormat('yyyy-MM-dd')}}</span>
                    </div>
                </div>
                <div class="btn-group">
                    <option-btn :title='activityDetails.title' module="activity" :img="activityDetails.cover"></option-btn>
                </div>
                <div class="join-in fl" v-if="!isLogin || activityDetails.createName != userName && identity == 'student'">
                    <el-button type="text" @click.prevent="showDialog" class="join-now" v-if="[0, 3, -2].includes(isApply)">立即参加</el-button>
                    <el-button type="text" class="join-now f" disabled v-else-if="[-5, -1, 1, 2, 4, 5, 6].includes(isApply)">{{applyStatus[isApply]}}</el-button>
                </div>
            </div>
            <div class="router-box bgw">
                <!-- <v-tab :tabs="[
                { name: '活动详情', type: 'info'},
                { name: '活动成员('+activityDetails.currNum+')', type: 'member'},
                { name: '活动成果', type: 'result' },
                { name: '活动评论('+activityDetails.commentNum+')', type: 'comment'}
            ]" :router="router"></v-tab> -->
                <v-tab :tabs="[
                { name: '活动详情', type: 'info'},
                { name: '活动成员('+activityDetails.currNum+')', type: 'member'},
                { name: '活动成果', type: 'result' }
            ]" :router="router"></v-tab>
                <router-view :activityDetails="activityDetails" @commentAdd="commentAdd" :memberList="memberList" :isMember="isMember" :isCreater="activityDetails.createName === userName"></router-view>
            </div>
        </div>
        <!-- 右边-相关活动 -->
        <div class="related-list fr">
            <h4 class="clearfix bgw">
                <span class="title fl">相关活动</span>
                <a @click="redirect(morePath)" class="btn-more fr" target="_blank">更多>></a>
            </h4>
            <ul class="list clearfix" v-if="items.length">
                <li v-for="(item, index) in items" :key="index" class="list_li bgw">
                    <router-link :to="{ path: $route.path, query: { id: item.id} }" target="_blank">
                        <div class="list-item-img__box">
                            <img :src="getFileUrl(item.cover) || listDefault" class="list-item-img__box_img">
                        </div>
                        <div class="list-item-title">
                            <p class="list-title" :title="item.title">{{ item.title | textOverflow(18) }}</p>
                    <!--         <p class="msg">
                                <span><i class="icon-input-user"></i>{{item.browseNum}}人看过</span>
                            </p> -->
                        </div>
                    </router-link>
                </li>
            </ul>
            <div v-else class="isNull-list">暂无数据</div>
        </div>
        <el-dialog title="立即参加" :visible.sync="dialogFormVisible">
            <div class="tips">还可以输入{{inputNum}}字</div>
            <el-form :model="form">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="我来说点..." :maxlength='100' @change="inputChange" v-model="form.content" id="input"></el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <button class="submit-btn" @click="dialogFormVisible = false;submitJoin()">提交</button>
            </div>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="activityDetails.cover"></img-preview>
    </div>
</template>

<script>
import optionBtn from 'Common/button/com_panel_event.vue'
import tab from 'Common/tabs.vue'
import list from 'Common/list.vue'
import imgPreview from '@/components/common/img_preview/img_preview.vue'
import { scrollToTop } from '@/js/scrollToTop.js'
import {
    requestActivityDetails,
    activityApply,
    requestAuditedMember,
    checkHasAppliedOrNot,
    checkIsSigned,
    requestRelatedActivity
} from '@/service/activity.js'

export default {
    components: {
        'v-tab': tab,
        'v-list': list,
        'option-btn': optionBtn,
        'img-preview': imgPreview
    },
    data() {
        return {
            form: {
                content: ''
            },
            title: '活动',
            inputNum: 100,
            router: {
                path: this.pages.detail.activity.path
            },
            applyStatus: {
                '-5': '报名未开始',
                '-1': '活动未开始',
                0: '立即参加',        // 未报名
                1: '待审核',          // 已报名
                2: '已报名',          // 报名通过
                3: '立即参加',        // 报名未通过
                4: '人数已满',
                5: '报名截止',
                6: '活动结束'
            },
            isApply: 0,
            isSigned: false,
            sysTime: new Date(),
            dialogFormVisible: false,
            activityDetails: {
                currNum: 0,
                commentNum: 0
            },
            activityId: '',
            nowTime: new Date().getTime(),
            userName: '',
            identity: '',
            isLogin: false,
            listData: {
                col: 1,
                pathUrl: this.pages.detail.activity.path,
                params: {
                    names: 'id',
                    val: 'id'
                }
            },
            items: [],
            morePath: this.pages.list.activity.url,
            memberList: [],              // 活动成员数据
            // userId: '',               // 当前登录用户id
            isMember: false,             // 是不是活动成员
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        scrollToTop()
        if (localStorage.getItem('loginInfo')) {
            this.userName = JSON.parse(localStorage.getItem('loginInfo')).userInfo.userName
            this.identity = localStorage.getItem('userIdentity')
            this.isLogin = true
            this.userId = this.$ls.get('loginInfo').userInfo.id
        }
        this.router.query = this.$route.query
    },
    mounted() {
        this.getActivityDetails()
        this.getRelatedActivity()
        this.checkIsApply()
        this.checkIsSigned()
        if (this.$route.path.includes('member')) {
            this.getMemberList()
        }
    },
    watch: {
        '$route.query.id'() {
            scrollToTop()
            this.router.query = this.$route.query
            this.getActivityDetails()
            this.getRelatedActivity()
            this.checkIsApply()
            this.checkIsSigned()
            this.getMemberList()
        },
        '$route.path': {
            handler: function (val) {
                if (val.includes('member')) {
                    this.getMemberList()
                }
            },
            deep: true
        }
    },
    methods: {
        /*
         * 还可以输入字数提示的改变
         */
        inputChange() {
            this.inputNum = 100
            this.inputNum = this.inputNum - this.form.content.length
        },
        /*
         * 打开弹窗，改变activityId
         */
        showDialog() {
            if (this.isSigned >= this.activityDetails.beginDate && this.isSigned <= this.activityDetails.stopDate) {
                this.showMessage('warning', '不在报名时间范围内')
            } else if (this.isLogin) {
                this.dialogFormVisible = true
                this.inputNum = 100
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        /*
         * 判断是否参与活动及活动状态
         * activityId: 活动id
         */
        checkIsApply() {
            if (this.isLogin) {
                checkHasAppliedOrNot({ activityId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.isApply = res.data.appendInfo.isApply
                    }
                })
            }
        },
        /*
         * 判断是否报名成功
         * activityId: 活动id
         */
        checkIsSigned() {
            if (this.isLogin) {
                checkIsSigned({ activityId: this.$route.query.id }).then((res) => {
                    if (res.data.code === 200) {
                        this.isSigned = res.data.appendInfo.isAudited
                        this.sysTime = res.data.appendInfo.nowTime
                    }
                })
            }
        },
        /*
         * 获取活动详情
         * id: 活动id
         */
        getActivityDetails() {
            requestActivityDetails({ id: this.$route.query.id }).then((res) => {
                this.activityDetails = res.data.entity
                if (!this.isLogin) {
                    if (this.activityDetails.num <= this.activityDetails.currNum) {
                        this.isApply = 4
                    } else if (new Date(this.activityDetails.stopDate).getTime() < this.nowTime) {
                        this.isApply = 5
                    } else if (new Date(this.activityDetails.endDate).getTime() < this.nowTime) {
                        this.isApply = 6
                    } else if (new Date(this.activityDetails.beginDate).getTime() > this.nowTime) {
                        this.isApply = -5
                    }
                }
            })
        },
        /*
         * 立即参加提交
         */
        submitJoin() {
            const data = {
                activityId: this.$route.query.id,
                applyContent: this.form.content
            }
            activityApply(data).then((res) => {
                if (res.data.code === 200) {
                    this.isApply = this.activityDetails.audit === 0 ? 2 : 1
                    this.showMessage('success', '申请已提交')
                    if (this.activityDetails.audit === 0 && this.$route.path.includes('member')) {
                        this.getMemberList()
                    }
                } else {
                    this.showMessage('warning', res.data.msg)
                }
                this.form.content = ''
            })
        },
        // 获取相关活动
        async getRelatedActivity() {
            const res = await requestRelatedActivity({ activityId: this.$route.query.id }, { pageSize: 5, pageNum: 1 })
            if (res.data.code === 200) {
                this.items = res.data.entity.resultData
            }
        },
        /*
        *获取活动成员
        *activityId:活动Id
        */
        getMemberList() {
            requestAuditedMember({ activityId: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.memberList = res.data.entity.resultData
                    for (const i in this.memberList) {
                        if (this.memberList[i].createName === this.userName) {
                            this.isMember = true
                            return
                        }
                    }
                }
            })
        },
        // 评论数加1
        commentAdd() {
            this.activityDetails.commentNum++
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/related_list.scss';
@import '~@/assets/css/scss/vars.scss';
#activityDetails {
    .content-left {
        width: 906px;
        .banner-box{
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            background-color: #fff;
            margin-bottom: 20px;
            position: relative;
            .img-box {
                width: 280px;
                height: 180px;
            }
            .activity-cover {
                cursor: pointer;
            }
            .msg-box {
                width: 533px;
                margin-left: 12px;
                font-weight: lighter;
                .info-title {
                    .title {
                        cursor: default;
                        height: 42px;
                        line-height: 42px;
                        font-size: 22px;
                        font-weight: lighter;
                        margin-bottom: 5px;
                        color: #333;
                    }
                }
                .info-msg {
                    color: #626262;
                    font-size: 14px;
                    line-height: 1.8em;
                    i{
                        margin-right: 10px;
                    }
                }
            }
            .btn-group {
                position: absolute;
                top: 15px;
                right: 15px;
            }
        }
    }
    .join-in {
        margin-left: 12px;
        margin-top: 15px;
        .join-now {
            padding: 8px;
            width: 96px;
            height: 32px;
            border-radius: $button-radiu;
            text-align: center;
            border: 1px solid nth($default-color, 1);
            color: nth($default-color, 1) !important;
            &:hover {
                background-color: nth($default-color, 1) !important;
            }
        }
        .btn {
            border-radius: $button-radiu;
            background-color: nth($default-color, 1) !important;
            color: #fff;
            &:hover {
                background-color: nth($default-color, 2) !important;
            }
        }
        &:hover {
            .join-now {
                background-color: $theme-color;
                color: #fff!important;
            }
        }
    }
    .tips {
        text-align: right;
        width: 100%;
        line-height: 15px;
        font-size: 12px;
        margin-bottom: 5px;
    }
    .list {
        font-size: 14px;
        .list_li {
            box-sizing: border-box;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            margin-bottom: 10px;
            .list-item-img__box {
                .list-item-img__box_img {
                    height: 198px;
                    width: 100%;
                }
            }
            .list-title {
                font-size: 14px;
                padding: 15px;
            }
            &:hover {
                box-shadow: 3px 3px 8px #ccc;
                .list-title {
                    color: $theme-color;
                }
            }
        }
    }
    .submit-btn {
        padding: 6px 12px;
        border-radius: $button-radiu;
        color: #fff;
        background-color: $theme-color;
        &:hover {
            opacity: 0.75;
        }
    }
}
</style>

<style lang="scss">
@import '~@/assets/css/scss/form.scss';
@import '~@/assets/css/scss/vars.scss';
    #activityDetails{
        .list{
            .list-item__box {
                border-top: 1px solid #ddd !important;
                margin-bottom: 0;
                &:hover{
                    .list-title{
                        color: $theme-color;
                    }
                }
            }
        }
        .el-dialog{
            width: 476px;
        }
    }
</style>

