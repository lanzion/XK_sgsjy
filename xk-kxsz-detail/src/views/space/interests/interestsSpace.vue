<template>
    <div id="interestsSpace" class="interestsSpace container clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">" class="navigation">
            <el-breadcrumb-item @click.native="redirect(pages.index.url, { path: 'space'})">空间</el-breadcrumb-item>
            <el-breadcrumb-item @click.native="redirect(pages.list.interest.url)">兴趣组列表</el-breadcrumb-item>
            <el-breadcrumb-item>兴趣组详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 班级信息 -->
        <div class="about-interests bgc_w clearfix">
            <img title="点击查看原图" @click="visible.show = true" :src="getFileUrl(interestsDetail.cover) || listDefault" width="450" height="250">
            <div class="interests-info fr">
                <h3 class="interests-name"> {{ interestsDetail ? interestsDetail.name : '' }} </h3>
                <div class="addr">
                    <el-col :span="12">
                        <i class="icon-i-classify"></i>
                        分类: {{ interestsDetail ? interestsDetail.interestTypeFormat : '' }}
                    </el-col>
                    <el-col :span="12">
                        <i class="icon-i-member"></i>
                        成员: <span style="color: #009df3;"> {{ interestsDetail ? interestsDetail.memberCount : 0}}</span>人
                    </el-col>
                    <el-col :span="12">
                        <i class="icon-i-creator"></i>
                        创建人: {{ interestsDetail ? interestsDetail.createName : '' }}
                    </el-col>
                </div>
                <div class="introduction clearfix">
                    <span class="sub-title fl">简介：</span>
                    <p class="desc-content">{{interestsDetail.introduction ? interestsDetail.introduction:''}}</p>
                </div>
                <ul class="interests_ul">
                      <li class="interests_li" v-for="(i, k) in intMes" :key="i.name">{{i.name}}：<i>{{ interestsDetail ? interestsDetail[i.numName] : 0 }}</i></li>
                </ul>
            </div>
            <div class="btn-box clearfix">
                <button class="to-manage fl" v-if="!isMember && !isAdmin && canJoin" @click="showDialog" :disabled="hadJoin">{{joinTxt}}</button>
                <button class="com-btn fl" v-if="isMember && this.userId != interestsDetail.createId" @click="quitInterest">退出兴趣组</button>
                <button class="com-btn fl" v-if="isAdmin" @click="dissolution">解散兴趣组</button>
                <router-link v-if="isAdmin" class="to-manage fl" :to="{path: `${pages.detail.interest.path}/manage/baseInfo`, query:{ id: $route.query.id, interest: interestsDetail.name }}">兴趣组管理</router-link>
            </div>
        </div>
        <nav class="title_nav bgc_w">
            <router-link class="title_nav_link" v-for="(item, index) in navList" :key="item.path" :to="{ path: item.path, query: {id: $route.query.id} }">{{ item.name }}</router-link>
        </nav>
        <router-view :isAdmin="isAdmin" :isMember="isMember" :memberList="memberList" @getMemberList="getMemberList" @getInterestDetail="getInterestDetail"></router-view>
        <!-- 立即加入的弹窗 -->
        <el-dialog title="立即加入" :visible.sync="dialogFormVisible" class="dialog-box">
            <div class="tips">还可以输入{{inputNum}}字</div>
            <el-form :model="form">
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="我来说两句，不超过100字" :maxlength='100' @change="inputChange" v-model="form.content" id="input" resize="none"></el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" class="btn" @click="submitJoin">提交</el-button>
            </div>
        </el-dialog>
        <img-preview :visible.sync="visible" :imgUrl="interestsDetail.cover"></img-preview>
    </div>
</template>

<script>
import {
    requestInterestDetail,
    judgeAdmin,
    judgeMember,
    interestMemberApply,
    dissoluteInterest,
    interestQuit,
    requestInterestMember
} from '@/service/interest.js'
import imgPreview from '@/components/common/img_preview/img_preview.vue'

export default {
    name: 'interestsSpace',
    components: {
        'img-preview': imgPreview
    },
    data() {
        return {
            form: {
                content: ''
            },
            inputNum: 100,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            navList: [
                {
                    name: '主页',
                    path: `${this.pages.detail.interest.path}/homepage`
                },
                {
                    name: '作品',
                    path: `${this.pages.detail.interest.path}/works`
                },
                // {
                //     name: '话题',
                //     path: `${this.pages.detail.interest.path}/topic`
                // },
                {
                    name: '文章',
                    path: `${this.pages.detail.interest.path}/article`
                },
                {
                    name: '成员',
                    path: `${this.pages.detail.interest.path}/member`
                },
                {
                    name: '资源',
                    path: `${this.pages.detail.interest.path}/resource`
                }
            ],
            intMes: [
                { name: '资源', numName: 'resourceCount' },
                { name: '话题', numName: 'topicCount' },
                { name: '文章', numName: 'articleCount' }
            ],
            interestsDetail: {
                cover: ''
            },
            userId: '',
            interestId: '',
            isAdmin: false,
            isMember: true,
            hadLogin: false,
            joinTxt: '立即加入',
            hadJoin: false,
            canJoin: true,                     // 是否可以参加
            memberList: [],                     // 兴趣组成员列表
            visible: { // 查看大图的控制
                show: false
            }
        }
    },
    created() {
        this.interestId = this.$route.query.id
        if (this.$ls.get('loginInfo')) {
            this.userId = this.$ls.get('loginInfo').userInfo.id
            this.hadLogin = true
            const identity = this.$ls.get('userIdentity')
            if (identity === 'enterprise' || identity === 'investOrg' || identity === 'investor' || identity === 'mult') {
                this.canJoin = false
            } else {
                this.canJoin = true
            }
            this.judgeUser()
        } else {
            this.isMember = false
        }
        this.getInterestDetail()
    },
    mounted() {
        if (this.$route.path.includes('member')) {
            this.getMemberList()
        }
    },
    watch: {
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
        // 判断是否为管理员和兴趣组成员
        judgeUser() {
            judgeAdmin({ interestId: this.interestId, userId: this.userId }).then((res) => {
                if (res.data.code === 200) {
                    this.isAdmin = res.data.entity
                }
            })
            judgeMember({ interestId: this.interestId, userId: this.userId }).then((res) => {
                if (res.data.code === 200) {
                    this.isMember = res.data.entity
                }
            })
        },
        // 兴趣组详情
        getInterestDetail() {
            const params = {
                id: this.interestId
            }
            requestInterestDetail(params).then((res) => {
                if (res.data.code === 200) {
                    this.interestsDetail = res.data.entity
                    if (this.interestsDetail !== null && this.interestsDetail.status === 0) {
                        this.$alert('该兴趣组已解散', '温馨提示', {
                            confirmButtonText: '确定',
                            customClass: '__custom-msg-box',
                            callback: () => {
                                // window.location.href = `${location.protocol}//${location.host}/${this.pages.list.interest}`
                                this.redirect(this.pages.list.interest, { type: 6 })
                            }
                        })
                    } else if (this.interestsDetail !== null && this.interestsDetail.property === 'private') {
                        if (this.hadLogin) {
                            if (!this.isMember) {
                                this.$alert('私密兴趣组，非本兴趣组成员不允许访问!', '温馨提示', {
                                    confirmButtonText: '确定',
                                    customClass: '__custom-msg-box',
                                    callback: () => {
                                        this.redirect(this.pages.list.interest, { type: 6 })
                                    }
                                })
                            }
                        } else {
                            this.$alert('私密兴趣组，不允许访问', '温馨提示', {
                                confirmButtonText: '确定',
                                customClass: '__custom-msg-box',
                                callback: () => {
                                    this.redirect(this.pages.list.interest, { type: 6 })
                                }
                            })
                        }
                    }
                }
            })
        },
        /*
         * 还可以输入字数提示的改变
         */
        inputChange() {
            this.inputNum = 100
            this.inputNum = this.inputNum - this.form.content.length
        },
        /*
         * 打开弹窗
         */
        showDialog() {
            // const evt = window.event || event
            if (this.hadLogin) {
                this.dialogFormVisible = true
                this.inputNum = 100
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        // 立即参加表单提交
        submitJoin() {
            if (this.form.content !== '') {
                const params = {
                    interestId: this.interestId,
                    applyContent: this.form.content,
                    applyId: this.userId
                }
                interestMemberApply(params).then((res) => {
                    if (res.data.code === 200) {
                        if (this.interestsDetail.audit === 0) {
                            this.showMessage('success', '成功加入该兴趣组')
                            this.isMember = true
                            this.form.content = ''
                            this.dialogFormVisible = false
                            this.getMemberList()
                            this.interestsDetail.memberCount++
                        } else {
                            this.showMessage('success', '申请已提交')
                            this.joinTxt = '已申请加入'
                            this.hadJoin = true
                            this.form.content = ''
                            this.dialogFormVisible = false
                        }
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            } else {
                this.showMessage('warning', '请按要求输入完整的信息')
            }
        },
        /*
        *解散兴趣组
        *id:兴趣组id
        *userId：当前用户id
         */
        dissolution() {
            this.$confirm('此操作将解散该兴趣组，是否继续？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            }).then(() => {
                const params = {
                    id: this.interestId,
                    userId: this.userId
                }
                dissoluteInterest(params).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '该兴趣组已解散')
                        const _this = this
                        window.setTimeout(function () {
                            _this.redirect(_this.pages.list.interest, { type: 6 })
                        }, 1000)
                    }
                })
            }).catch(() => {
                this.showMessage('info', '已取消解散')
            })
        },
        // 退出兴趣组
        quitInterest() {
            this.$confirm('确定要退出该兴趣组吗?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                customClass: '__custom-msg-box'
            }).then(() => {
                const params = {
                    interestId: this.interestId,
                    userId: this.userId
                }
                interestQuit(params).then((res) => {
                    if (res.data.code === 200) {
                        if (this.interestsDetail.property === 'private') {
                            this.showMessage('success', '退出成功')
                            const _this = this
                            window.setTimeout(function () {
                                _this.redirect(_this.pages.list.interest, { type: 6 })
                            }, 1000)
                        } else {
                            this.isMember = false
                            this.interestsDetail.memberCount--
                            this.getMemberList()
                        }
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                }, () => {
                    this.showMessage('error', '退出失败，请重试')
                })
            }).catch(() => {
                this.showMessage('info', '已取消退出')
            })
        },
        /*
         * 获取成员列表
         * interestId: 兴趣组id
         * userId: 当前登录人id
         */
        getMemberList() {
            const params = {
                interestId: this.$route.query.id,
                userId: this.userId,
            }
            requestInterestMember(params).then((res) => {
                if (res.data.code === 200 && res.data.entity !== null) {
                    this.memberList = res.data.entity
                } else {
                    this.memberList = []
                }
            })
        }

    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/space_homepage.scss';
@import '~@/assets/css/scss/vars.scss';
.btn-box {
    .to-manage {
        background-color: nth($default-color, 1);
    }
    .com-btn {
        border: 1px solid nth($default-color, 1);
        color: nth($default-color, 1);
        &:hover {
            background-color: nth($default-color, 1);
        }
    }
}
.btn {
    background-color: nth($default-color, 1);
}
/* 班级信息 */
.about-interests{
    padding: 20px;
    font-size: 14px;
    position: relative;
    .btn-box{
        position: absolute;
        top:20px;
        right: 10px;
        .com-btn, .to-manage{
            display: block;
            width: 96px;
            margin-right: 10px;
            text-align: center;
            font-size: 14px;
            height: 32px;
            line-height: 29px;
            border-radius: 3px;
        }
        .com-btn:hover {
            color: #fff;
        }
        .to-manage{
            color: #fff;
        }
        .to-manage:hover{
            opacity: 0.75;
        }
        .dissolute-btn{
            display:block;
            padding: 0 13px;
            text-align: center;
            font-size: 14px;
            line-height: 29px;
            height: 32px;
            background-color: #999;
            border:none;
            color: #fff;
            border-radius: 3px;
        }
    }
    .interests-info{
        position: relative;
        width: 692px;
        height: 250px;
        color: #3e3e3e;
        .interests-name{
            line-height: 44px;
            height: 44px;
            font-size: 24px;
            border-bottom: 1px solid #dfdfdf;
        }
        .introduction {
            margin: 10px 0;
            line-height: 1.5em;
            .sub-title{
            }
            .desc-content{
                max-height: 65px;
                overflow: auto;
            }
        }
        .addr {
            height: 90px;
            padding: 20px 0;
            box-sizing: border-box;
            line-height: 2.5;
        }
        .interests_ul{
            position: absolute;
            bottom: 2px;
            margin-top: 10px;
            .interests_li {
                display: inline-block;
                padding-right: 10px;
                border-right: 1px solid #999;
                margin-right: 10px;
                color: #999;
            }
            li:last-child{
                border-right: 0;
                margin-right: 0;
            }
        }
    }
}
.dialog-box{
    border-top: 2px solid #d00!important;
    .tips{
        text-align: right;
        width: 100%;
        line-height: 15px;
        font-size: 12px;
        margin-bottom: 5px;
    }
}
</style>
