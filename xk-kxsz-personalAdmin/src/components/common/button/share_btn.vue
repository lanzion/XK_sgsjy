<template>
    <section class="com-panel-group" style="display:inline-block;">
        <el-dialog title="分享" v-model="dialogVisible" class="share-modal" @click="close">
            <el-carousel :autoplay="false" indicator-position="none" arrow="always" height="154px" v-if="activeShare=='interest' && interestList.length">
                <el-carousel-item v-for="index in Math.ceil(interestList.length/interestSharePanelNum)" :key="index">
                    <el-checkbox-group v-model="checkedInterestList" class="head-checked">
                        <el-checkbox v-for="item in interestList.filter((x,i) => i>=(index-1)*interestSharePanelNum && i<(index*interestSharePanelNum))" :label="item.id" :key="item.id" class="checked-group">
                            <figure class="share-head">
                                <img :src="getFileUrl(item.cover) || listDefault" alt="" class="circle">
                            </figure>
                            <span>{{item.name}}</span>
                        </el-checkbox>
                    </el-checkbox-group>
                </el-carousel-item>
            </el-carousel>
            <p class="content-tip">还能输入<em v-text="remainingWordCount" :class="{warning: remainingWordCount<0}"></em>字</p>
            <el-input type="textarea" :rows="4" placeholder="请输入分享内容" v-model="shareContent"></el-input>
            <section class="share-content">
                <p class="share-content-title">{{ title }}</p>
                <p class="share-content-link" :title="shareItemLink" v-text="shareItemLink"></p>
            </section>
            <div class="btn-group">
                <button type="button" class="psn-confirm-btn" @click="shareItem">分享</button>
            </div>
        </el-dialog>

        <el-popover ref="popoverShare" placement="bottom" width="110" trigger="hover" popper-class="popper-dialog share-dialog">
            <span class="share-list-title">分享到</span>
            <ul class="share-list">
                <li class="share-items" v-for="(item, index) in shareItems" v-if="item.isShow==undefined || item.isShow" @click="handleShare(item.type)"><i :class="item.icon"></i>{{item.title}}</li>
            </ul>
        </el-popover>

        <a v-popover:popoverShare title="分享" class="icon-button i-button" style="margin-left:0px;vertical-align: top;font-size: 18px;"><i class="icon-btn-i-share2"></i></a>
        <!-- <span title="收藏" class="icon-button"><i class="icon-btn-collection" :class="{active: isEvent.isCollection}" @click="collectItem()"></i> ({{statistics.collectionCount}})</span>
        <span title="点赞" class="icon-button"><i class="icon-btn-thumbsup" :class="{active: isEvent.isPraise}" @click="praiseItem()"></i> ({{statistics.praiseCount}})</span> -->
    </section>
</template>

<script>
import { loginInfo } from 'Asset/js/getUserInfo.js'
import { mapGetters } from 'vuex'
import { requestMyInterestList } from '@/service/interest.js'
import { shareToSpace, shareToClasz, shareToInterest } from '@/service/common.js'

const model = {
    works: '作品',
    resource: '资源',
    course: '课程',
    project: '项目',
    activity: '活动',
    subject: '课题'
}

export default {
    name: 'comPanelEvent',
    data() {
        return {
            loginInfo: loginInfo,
            interestSharePanelNum: 8,
            checkedInterestList: [],
            interestList: [],
            statistics: {
                shareCount: 0,
                collectionCount: 0,
                praiseCount: 0
            },
            isEvent: {
                isShare: false,
                isCollection: false,
                isPraise: false
            },
            shareContent: '',
            shareItemLink: location.href,
            totalWordCount: 100,
            shareItems: [
                { type: 'space', title: '空间', icon: 'icon-i-space' },
                { type: 'clasz', title: '班级', icon: 'icon-i-clasz', isShow: this.$ls.get('userIdentity') ? this.$ls.get('userIdentity') === 'student' : false },
                { type: 'interest', title: '兴趣组', icon: 'icon-i-circle' }
            ],
            // 收藏类型
            collectType: {
                works: 1,       // 作品
                resource: 2,    // 资源
                course: 3,      // 课程
                project: 4,     // 项目
                activity: 5,    // 活动
                subject: 6      // 课题
            },
            // 分享类型(分享到空间)
            spaceShareType: {
                activity: 1,    // 活动
                works: 2,       // 作品
                course: 4,      // 课程
                subject: 5,     // 课题
                resource: 6,    // 资源
                project: 7      // 项目
            },
            // 分享类型(分享到班级)
            claszShareType: {
                works: 7,       // 作品
                resource: 8,    // 资源
                course: 9,      // 课程
                project: 10,    // 项目
                activity: 11    // 活动
            },
            // 分享类型(分享到兴趣组)
            interestShareType: {
                course: 6,      // 课程
                project: 7,     // 项目
                activity: 8,    // 活动
                resource: 9,    // 资源
                works: 10       // 作品
            },
            activeShare: '',
            dialogVisible: false,
            loginStatus: true
        }
    },
    props: [
        'title',
        'module',
        'id'
    ],
    watch: {
        ...mapGetters({
            loginInfo: 'loginInfo',
        }),
    },
    computed: {
        remainingWordCount: function () {
            return this.totalWordCount - this.shareContent.trim().length
        }
    },
    created() {
        if (loginInfo !== null) {
            this.$set(this.$data, 'loginInfo', loginInfo)
        }
        if (this.loginInfo !== null) {
            this.isStatistics()
        }
        this.getStatistics()
    },
    methods: {
        ifLogin() {
            if (!loginInfo) {
                this.loginStatus = false
                this.$store.commit('toggleLoginModal', true)
                return false
            }
            return true
        },
        handleShare(type) {
            this.shareModel = type
            this.ifLogin()
            switch (type) {
                case 'interest':
                    if (!this.interestList.length) {
                        this.getMyInterests()
                    } else {
                        this.poperShare(type)
                    }
                    break
                case 'space':
                case 'clasz':
                    this.poperShare(type)
                    break
            }
        },
        poperShare(type) {
            if (this.loginStatus) {
                this.dialogVisible = !this.dialogVisible
                this.activeShare = type === undefined ? '' : type
            }
        },
        /*
         * 获取我参与的兴趣组列表
         */
        getMyInterests() {
            requestMyInterestList({ userId: loginInfo.userInfo.id, auditStatus: 1 }, { pageNum: 1, pageSize: 9999 }).then((response) => {
                if (response.data.code === 200) {
                    const _data = response.data.entity || {}
                    this.interestList = _data.resultData || []
                    if (this.interestList.length) {
                        this.poperShare('interest')
                    } else {
                        this.showMessage('您尚未加入兴趣组', 'info')
                    }
                }
            })
        },
        /*
         * 验证该用户是否评论/收藏/分享
         * busId: id
         */
        isStatistics() {
            this.$http.post('common/statistics/single',
                { busId: this.$route.query.id, userId: this.loginInfo.userInfo.id }
            ).then((response) => {
                this.isEvent = response.data.appendInfo
            })
        },
        /*
         * 评论/收藏/分享数量统计
         * busId: id
         */
        getStatistics() {
            this.$http.post('common/statistics',
                { busId: this.id }
            ).then((response) => {
                this.statistics = response.data.appendInfo
            })
        },
        /*
         * 发布分享内容
         */
        shareItem() {
            let handler
            let params
            if (this.shareContent.trim().length === 0) {
                this.showMessage('分享内容不能为空')
                return
            }
            if (this.remainingWordCount < 0) {
                this.showMessage('分享内容超出字数，请重新输入')
                return
            }
            switch (this.shareModel) {
                case 'space':
                    handler = shareToSpace
                    params = {
                        busId: this.id,
                        url: this.shareItemLink,
                        title: `分享了${model[this.module]}`,
                        userId: this.loginInfo.userInfo.id,
                        dynamicType: this[`${this.shareModel}ShareType`][this.module],
                        content: `「${this.title}」${this.shareContent}`
                    }
                    break
                case 'clasz':
                    handler = shareToClasz
                    params = {
                        busId: this.id,
                        url: this.shareItemLink,
                        title: `「${this.title}」${this.shareContent}`,
                        userId: this.loginInfo.userInfo.id,
                        dynamicType: this[`${this.shareModel}ShareType`][this.module],
                        classId: this.$ls.get('baseInfo')[this.$ls.get('userIdentity')].classId
                    }
                    break
                case 'interest':
                    if (this.checkedInterestList.length === 0) {
                        this.showMessage('请选择群组')
                        return
                    }
                    handler = shareToInterest
                    params = []
                    this.checkedInterestList.forEach((x) => {
                        params.push({
                            busId: this.id,
                            interestsId: x,
                            url: this.shareItemLink,
                            title: `「${this.title}」${this.shareContent}`,
                            createId: this.loginInfo.userInfo.id,
                            dynamicType: this[`${this.shareModel}ShareType`][this.module]
                        })
                    })
                    break
            }
            handler(params).then((response) => {
                if (response.data.code === 200) {
                    this.$set(this.statistics, 'shareCount', ++this.statistics.shareCount)
                    this.showMessage('分享成功', 'success')
                    this.shareContent = ''
                    this.dialogVisible = false
                    this.checkedInterestList = []
                } else {
                    this.showMessage(response.data.msg)
                }
            })
        },
        /*
         * 收藏业务
         * busId: 业务Id
         * userId: 用户Id
         * url: 跳转url
         * collectType: 收藏类型(1-作品, 2-资源, 3-课程, 4-项目, 5-活动, 6-课题)
         */
        collectItem() {
            this.ifLogin()
            if (this.loginStatus) {
                const url = this.isEvent.isCollection ? 'maker/common/collection/cancel' : 'maker/common/collection/do'
                this.$http.post(url,
                    {
                        busId: this.id,
                        userId: this.loginInfo.userInfo.id,
                        url: this.shareItemLink,
                        collectType: this.collectType[this.module]
                    }
                ).then((response) => {
                    if (response.data.code === 200) {
                        this.isEvent.isCollection = !this.isEvent.isCollection
                        if (this.isEvent.isCollection) {
                            this.$set(this.statistics, 'collectionCount', ++this.statistics.collectionCount)
                            this.showMessage('收藏成功', 'success')
                        } else {
                            this.$set(this.statistics, 'collectionCount', --this.statistics.collectionCount)
                            this.showMessage('取消收藏', 'info')
                        }
                    }
                })
            }
        },
        /*
         * 点赞项目
         */
        praiseItem() {
            this.ifLogin()
            if (this.loginStatus) {
                const url = this.isEvent.isPraise ? 'maker/praise/cancel' : 'maker/praise/do'
                this.$http.post(url,
                    {
                        busId: this.id,
                        userId: this.loginInfo.userInfo.id,
                        url: this.shareItemLink,
                        collectType: this.collectType[this.module]
                    }
                ).then(() => {
                    this.isEvent.isPraise = !this.isEvent.isPraise
                    if (this.isEvent.isPraise) {
                        this.$set(this.statistics, 'praiseCount', ++this.statistics.praiseCount)
                        this.showMessage('点赞成功', 'success')
                    } else {
                        this.$set(this.statistics, 'praiseCount', --this.statistics.praiseCount)
                        this.showMessage('取消点赞', 'info')
                    }
                })
            }
        },
        /*
         * 错误提示信息
         */
        showMessage(msg, type) {
            type = type === undefined ? 'error' : type
            this.$message({
                message: msg,
                type: type
            })
        },
        /*
        *关闭弹窗
         */
        close() {
            this.shareContent = ''
            this.dialogVisible = false
        }
    }
}
</script>
<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
.share-dialog.el-popover[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #f6f6f6;
}
.head-checked {
    .el-checkbox__input {
        display: none;
        position: absolute;
        right: 8px;
        top: 28px;
        &.is-checked {
            display: block;
            .el-checkbox__inner {
                border-radius: 50%;
                background-color: #59d380 !important;
                &::after {
                    border-color: #fff;
                }
            }
        }
    }
    .el-checkbox__label {
        padding: 0;
    }
}
.share-modal {
    .el-dialog {
        width: 78px * 4 + 120;
    }
    .el-carousel {
        margin: 0 -20px;
        .el-carousel__item {
            padding: 0 40px;
            box-sizing: border-box;
        }
    }
    .el-checkbox {
        &,
        & + .el-checkbox {
            margin: 0 8px;
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.head-checked {
    $head-size: 40px;

    .checked-group {
        position: relative;
        width: 5em;
        line-height: 1.5;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .share-head {
        display: block;
        margin: 0 auto;
        width: $head-size;
        height: $head-size;

        img {
            width: inherit;
            height: inherit;
        }
    }
}
.share-list-title {
    display: block;
    text-indent: 10px;
    line-height: 3;
    background-color: #f6f6f6;
}
.share-list {
    padding: 6px 4px;
    overflow: hidden;

    .share-items {
        padding: 0 1.5em;
        line-height: 2.5;
        cursor: pointer;

        &:hover {
            background-color: #f3f3f3;
        }

        [class^="icon-"],
        [class*=" icon-"] {
            margin-right: .5em;
            font-size: 16px;
        }
    }
}
.com-panel-group {
    .icon-button {
        margin-left: 10px;
        color: #999;
        font-size: 16px;
    }

    [class^="icon-"],
    [class*=" icon-"] {
        color: #818181;
    }
}
.share-modal {
    .content-tip {
        color: #999;
        text-align: right;
        line-height: 2;
        em {
            font-size: 16px;
            &.warning {
                color: $theme_color;
            }
        }
    }
    .share-content {
        margin-top: 20px;
        line-height: 1.5;

        .share-content-link {
            font-size: 12px;
            color: #00a0e9;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .btn-group {
        margin-top: 20px;
        text-align: right;

        button {
            padding: .5em 2em;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}
</style>
