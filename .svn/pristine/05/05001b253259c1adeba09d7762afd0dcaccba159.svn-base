<template>
    <div class="comment-box">
            <!-- 发表评论输入框 -->
        <div class="publish">
            <div class="commment-item-publishbox publish-comment">
                <textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="content" style="resize:none" v-on:focus="inputFocus" v-on:keyup.enter="addEvaluation()"></textarea>
                <div class="btn-box">
                    <button @click="addEvaluation()">发表评论</button>
                </div>
            </div>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list">
            <div class="empty-block" v-if="commentList.length === 0">暂无评价</div>
            <!-- <ul class="list-box" v-else> -->
            <transition-group class="list-box" name="comment-item" mode="out-in" tag="ul">
                <li class="comment-item-detail clearfix" v-for="(comment,index) in commentList" :key="index">
                    <div class="comment-item-avatar ">
                        <img :src="getFileUrl(comment.url) || faceDefault" width="41" height="41">
                    </div>
                    <div class="comment-item-content">
                        <div class="content-wrap">
                            <p class="clearfix user-box">
                                <span class="name c-blue fl">{{comment.userName}}</span>
                                <span class="date fl"> {{comment.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span>
                                <span class="report fr">
                                    <v-report v-if="!comment.report && comment.createId !== userId" :report-data="{'url': commentProps.reportApi, params: {'commentId': comment.id, status:'1'}}"></v-report>
                                </span>
                            </p>
                            <p class="content">{{comment.content}}</p>
                            <div class="like-reply">
                                <div class="option">
                                    <span class="like" title="点赞" @click="praiseItem(commentList,index)"><i class="icon-btn-thumbsup" :class="{'active':comment.praise}"></i> ({{comment.praisCount ? comment.praisCount : 0}}) </span>
                                    <span v-on:click="showPublish([index,null])" title="回复" class="reply"> <i class="icon-i-reply"></i>回复 ({{comment.replyNum ? comment.replyNum : 0}})</span>
                                </div>
                                <div class="publish" v-if="show[0] == index && show[1] == null">
                                    <div class="commment-item-publishbox">
                                        <textarea placeholder="我来说两句(最多500字)" :maxlength="500" v-model="replyContent" v-on:keyup.enter="replyComment(index,comment.id,comment.id)" style="resize:none"></textarea>
                                        <div class="btn-box">
                                            <button @click.prevent="replyComment(index,comment.id,comment.id)">发表</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 回复部分 -->
                        <div class="comment-item-reply" v-if="comment[commentProps.replyKey] && comment[commentProps.replyKey].resultData.length > 0">
                            <ul>
                                <li class="comment-item-detail reply-item clearfix" v-for="(reply,i) in comment[commentProps.replyKey].resultData" :key="i">
                                    <div class="comment-item-avatar">
                                        <img :src="getFileUrl(reply.url) || faceDefault" width="41" height="41">
                                    </div>
                                    <div class="comment-item-content reply-item-content">
                                        <section class="clearfix user-box">
                                            <div class="name fl">
                                                <span class="c-blue">{{reply.userName}}</span>
                                                <span v-if="reply.replyUserName != null">回复</span>
                                                <span class="c-blue">{{reply.replyUserName}}</span>
                                            </div>
                                            <div class="date fl"> {{reply.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</div>
                                            <span class="reply-report fr">
                                                <v-report v-if="!reply.report && reply.createId !== userId" :report-data="{'url': commentProps.reportApi, params: {'commentId': comment.id, status:'1'}}"></v-report>
                                            </span>
                                        </section>
                                        <article class="content">{{reply.content}}</article>
                                        <div class="like-reply">
                                            <div class="option">
                                                <span class="like" title="点赞" @click="praiseItem(comment[commentProps.replyKey].resultData,i)"><i class="icon-btn-thumbsup" :class="{'active':reply.praise}"></i> ({{reply.praisCount}}) </span>
                                                <span v-on:click="showPublish([index,i])" title="回复" class="reply"> <i class="icon-i-reply"></i>回复</span>
                                            </div>
                                            <div class="publish" v-if="show[0] == index && show[1] == i">
                                                <div class="commment-item-publishbox">
                                                    <textarea placeholder="我来说两句" :maxlength="500" v-model="replyContent" v-on:keyup.enter="replyComment(index,comment.id,reply.id,reply.userName)" style="resize:none"></textarea>
                                                    <div class="btn-box">
                                                        <button @click.prevent="replyComment(index,comment.id,reply.id,reply.userName)">发表</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <div class="open-all" v-if="comment.comments.totalNum > comment.comments.resultData.length" @click="replyPageNum++;getAllReplyList(index,comment.id)">展开更多回复>></div>
                                <div class="open-all" v-if="comment.comments.resultData.length > 10" @click="replyPageNum = 1;getAllReplyList(index,comment.id)">&#8593;收起更多回复</div>
                            </ul>
                        </div>
                    </div>
                </li>
            </transition-group>
            <!-- </ul> -->
        </div>

        <div class="load-more" v-if="totalEvalu > commentList.length" @click="pageParam.pageNum++;getEvaluateList()">
            <i class="icon-btn-refresh"></i> 加载更多
        </div>
    </div>
</template>

<script>
    import { loginInfo } from 'Asset/js/getUserInfo.js'
    import report from 'Common/report.vue'
    // import { worksEvaluationAdd, requestWorksCommentList } from '@/service/works.js'
    // import { requestActivityEvaluationList, addEvaluation } from '@/service/activity.js'
    // import { requestStoryCommentList, addStoryComment } from '@/service/story.js'
    // import {
    //     requestAchievementCommentList,
    //     addAchievementComment,
    //     requestFeatureCommentList,
    //     addFeatureComment,
    // } from '@/service/model_school.js'

    export default {
        name: 'comment',
        components: {
            'v-report': report
        },
        data() {
            return {
                userId: '',        // 登录用户id
                userName: '',      // 登录用户名
                face: '',          // 登录用户头像
                commentList: [],
                  // id:'',
                  replyPage: 1,
                  totalEvalu: 0,
                  content: '',             // 发表评论的内容
                  replyContent: '',        // 回复内容
                  pageParam: {
                      pageSize: 10,
                      pageNum: 1
                  },
                  userInfo: '',
                  form: {
                      content: ''
                  },
                  show: [null, null],
                  replyPageNum: 1,
            }
        },
        props: {
            commentProps: {
                type: Object,
                default() {
                    return {
                        parmasKey: 'activityId',                                         // 请求参数名
                        replyKey: 'comments',                                            // 获取评论中的回复列表的字段
                        reportApi: 'maker/activity/comment/report/add',                  // 举报api
                        addApi: 'maker/activity/comment/add',                            // 添加评论api
                        getListApi: 'maker/activity/comment/selectPager',                // 获取评论列表api
                        addPraiseApi: 'maker/activity/comment/praise/add',               // 点赞api
                        cancelPraiseApi: 'maker/activity/comment/praise/cancelPraise'    // 取消点赞api
                    }
                }
            }
        },
        created() {
            this.init()
        },
        watch: {
            id() {
                this.init()
            }
        },
        computed: {
            remainingWordCount: function () {
                return this.totalWordCount - this.shareContent.trim().length
            },
            // id: function () {
            //     return this.$route.query.id
            // }
        },
        methods: {
            init() {
                if (loginInfo) {
                    this.userInfo = loginInfo.userInfo
                    this.userId = loginInfo.userInfo.id
                    this.userName = loginInfo.userInfo.userName
                    this.face = loginInfo.userInfo.face
                }
                this.commentList = []
                this.pageParam.pageNum = 1
                // this.totalEvalu = 0
                this.id = this.$route.query.id
                this.getEvaluateList()
            },
            /* 控制回复输入框的显示 */
            showPublish(arr) {
                if (this.$ls.get('loginInfo')) {
                    if (
                        this.show[0] !== null && this.show[1] === null && arr[0] === this.show[0] && arr[1] === null ||
                        this.show[0] !== null && this.show[1] !== null && arr[0] === this.show[0] && arr[1] === this.show[1]
                    ) {
                        this.show = [null, null]
                    } else {
                        this.show = arr
                    }
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            /*
            *回复评论
             */
            async replyComment(index, pId, replyCommentId, replyUserName = null) {
                if (this.$ls.get('loginInfo')) {
                    if (this.replyContent.trim() === '') {
                        this.showMessage('warning', '请输入评论内容')
                    } else if (this.replyContent.trim().length > 500) {
                        this.showMessage('warning', '输入的内容不能超过500字')
                    } else {
                        const params = {
                            [this.commentProps.parmasKey]: this.id,
                            content: this.replyContent,
                            status: 1,
                            pId: pId,
                            replyCommentId: replyCommentId
                        }
                        const res = await this.$http.post(this.commentProps.addApi, params)
                        if (res.data.code === 200) {
                            this.showMessage('success', '回复成功')
                            const data = res.data.entity
                            const _data = {}
                            this.$set(_data, 'id', data.id)
                            this.$set(_data, 'userName', this.userName)
                            this.$set(_data, 'createId', this.userId)
                            this.$set(_data, 'replyUserName', replyUserName)
                            this.$set(_data, 'content', data.content)
                            this.$set(_data, 'createDate', data.createDate)
                            this.$set(_data, 'praise', false)
                            this.$set(_data, 'praisCount', 0)
                            this.$set(_data, 'replyNum', 0)
                            this.$set(_data, 'url', this.face)
                            this.commentList[index].replyNum++
                            this.commentList[index].comments.resultData.unshift(_data)
                            // this.getEvaluateList()
                            this.replyContent = ''
                            this.show = [null, null]
                        } else {
                            this.showMessage('warning', res.data.msg)
                        }
                    }
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            /*
            *发表评论
             */
            async addEvaluation() {
                if (this.$ls.get('loginInfo')) {
                    if (this.content.trim() === '') {
                        this.showMessage('warning', '请输入评论内容')
                    } else if (this.content.trim().length > 500) {
                        this.showMessage('warning', '输入的内容不能超过500字')
                    } else {
                        const params = {
                            [this.commentProps.parmasKey]: this.id,
                            content: this.content,
                            status: 1,
                            pId: -1
                        }
                        const res = await this.$http.post(this.commentProps.addApi, params)
                        if (res.data.code === 200) {
                            this.showMessage('success', '评论成功')
                            this.$emit('addComment')
                            const data = res.data.entity
                            const _data = {}
                            const comments = {
                                nextPageNum: 0,
                                pageNum: 1,
                                pageSize: 10,
                                prePageNum: 1,
                                resultData: [],
                                start: 0,
                                totalNum: 0,
                                totalPageNum: 0
                            }
                            this.$set(_data, 'id', data.id)
                            this.$set(_data, 'userName', this.userName)
                            this.$set(_data, 'createId', this.userId)
                            this.$set(_data, 'content', data.content)
                            this.$set(_data, 'createDate', data.createDate)
                            this.$set(_data, 'praise', false)
                            this.$set(_data, 'praisCount', 0)
                            this.$set(_data, 'replyNum', 0)
                            this.$set(_data, 'url', this.face)
                            this.$set(_data, 'comments', comments)
                            this.commentList.unshift(_data)
                            // this.getEvaluateList();
                            this.content = ''
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    }
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            /*
            *获取评论列表
            *workId:作品Id
            *status:状态
            *
            * activityId:活动Id
            */
            async getEvaluateList() {
                const url = `${this.commentProps.getListApi}?pageSize=${this.pageParam.pageSize}&pageNum=${this.pageParam.pageNum}`
                const res = await this.$http.post(url, { [this.commentProps.parmasKey]: this.id, pId: -1, status: 1 })
                if (res.data.code === 200) {
                    this.totalEvalu = res.data.entity.totalNum
                    if (this.pageParam.pageNum === 1) {
                        this.commentList = res.data.entity === null ? [] : res.data.entity.resultData
                    } else {
                        if (res.data.entity.resultData.length) {
                            this.commentList.push(...res.data.entity.resultData)
                            return
                        }
                        this.showMessage('info', '没有更多数据了')
                    }
                }
            },
            /*
            *根据评论id回复获取所有的回复
            */
            async getAllReplyList(index, pId) {
                const url = `${this.commentProps.getListApi}?pageSize=10&pageNum=${this.replyPageNum}`
                const res = await this.$http.post(url, { [this.commentProps.parmasKey]: this.id, pId: pId, status: 1 })
                if (res.data.code === 200) {
                    if (this.replyPageNum > 1) {
                        this.commentList[index].comments.resultData = res.data.entity.resultData.reduce((coll, item) => {
                            coll.push(item)
                            return coll
                        }, this.commentList[index].comments.resultData)
                    } else {
                        this.commentList[index].comments.resultData = res.data.entity.resultData
                    }
                }
            },
            /*
            *点赞/取消点赞
            *commentId：评论id
            *status：状态(1:启用0:禁用)
             */
            praiseItem(items, index) {
                if (localStorage.getItem('loginInfo')) {
                    const item = items[index]
                    let url
                    let param
                    if (item.praise) {
                        url = this.commentProps.cancelPraiseApi
                        param = { commentId: item.id, status: 0 }
                    } else {
                        url = this.commentProps.addPraiseApi
                        param = { commentId: item.id, status: 1 }
                    }
                    this.$http.post(url, param).then((res) => {
                        if (res.data.code === 200) {
                            item.praise = !item.praise
                            if (item.praise) {
                                this.$set(item, 'praisCount', ++item.praisCount)
                                this.showMessage('success', '点赞成功')
                            } else {
                                this.$set(item, 'praisCount', --item.praisCount)
                                this.showMessage('info', '取消点赞')
                            }
                        } else {
                            this.showMessage('error', res.data.msg)
                        }
                    })
                } else {
                    this.$store.commit('toggleLoginModal', true)
                }
            },
            inputFocus() {
                if (!this.$ls.get('loginInfo')) {
                    this.$store.commit('toggleLoginModal', true)
                }
            }
        }
    }
</script>

<style lang='scss'>
    .content-wrap {
        .report {
            .i-button {
                display: none;
            }
        }
        &:hover {
            .report {
                .i-button {
                    display: block;
                }
            }
        }
    }
    .reply-item-content {
        .reply-report {
            .i-button {
                display: none;
            }
        }
        &:hover {
            .reply-report {
                .i-button {
                    display: block;
                }
            }
        }
    }
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
*{
    box-sizing: border-box;
}

.c-blue{
    color: #00a0e9;
}

.comment-box{
    width: 100%;
    overflow: hidden;
    margin-bottom: 20px;
}
.comment-item-detail{
    transition: opacity .5s, transform .5s;
}
.comment-item-enter,
.comment-item-leave-active {
    opacity: 0;
    transform: translateY(-30px);
}
.comment-item-leave-active {
    position: absolute;
}
/*发表*/
.publish{
    overflow: hidden;
    .publish-comment{
        border-bottom: 1px solid #dfdfdf;
        textarea{
            height: 128px!important;
        }
    }
    .commment-item-publishbox{
        overflow: hidden;
        textarea{
            width: 100%;
            height: 80px;
            border: 1px solid #dfdfdf;
            padding: 10px;
        }
        .btn-box{
            text-align: right;
            padding: 12px;
            padding-right: 0px;
            button{
                color: #fff;
                vertical-align: top;
                border: none;
                font-size: 14px;
                padding: 7px 19px;
                border-radius: 3px;
            }
            button:hover{
                opacity: .75;
            }
        }
    }
}

// 点赞回复
.option{
    color: #929292;
    text-align: right;
    span{
        cursor: pointer;
    }
    .like{
        margin-right: 10px;
    }
    i:hover{
        color: $theme_color;
    }
}
/*评论列表*/
.comment-list{
    width: 100%;
    overflow: hidden;
    .list-box{
        width: 100%;
        overflow: hidden;
    }
}
.comment-item-detail{
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #dfdfdf;
    padding: 15px 0;
    .comment-item-avatar{
        width: 41px;
        height: 41px;
        float: left;
        margin-right: 10px;
        img{
            border-radius: 1000px;
        }
    }
    .comment-item-content{
        padding-left: 51px;
        .user-box{
            width: 100%;
            margin-bottom: 10px;
            font-size: 14px;
            height: 15px;
            line-height: 15px;
            .date{
                margin-left: 10px;
                color: #999;
                font-size: 12px;
                line-height: 18px;
            }
        }
        .like-reply{
            width: 100%;
            transition: height 0.5s;
            font-size: 12px;
            .publish{
                margin-top:15px;
            }
        }
        .content{
            width: 90%;
            font-size: 14px;
            line-height: 1.5em;
            overflow: hidden;
            margin-bottom: 10px;
            word-wrap: break-word;
        }
    }

    .report {
        button {
            color: #999;
        }
    }
}

.reply-item{
    padding-bottom: 10px;
    border-bottom: 1px dashed #dfdfdf;
    &:last-child{
        border: none;
    }
    // .reply-report{
    //     display: none;
    // }
    // &:hover{
    //     .reply-report{
    //         display: block;
    //     }
    // }
}

/*回复*/
.comment-item-reply{
    margin-top: 15px;
    overflow: hidden;
    border-top: 1px dashed #dfdfdf;
    .comment-item-detail{
        // border-bottom: none;
        // padding-bottom: 0;
    }
}
// 加载更多
.load-more {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    line-height: 3;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
}

@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .publish {
            .commment-item-publishbox {
                .btn-box {
                    button{
                        background-color: $color-value;
                    }
                }
                textarea:focus{
                    border-color: $color-value;
                }
            }
        }
        .comment-box{
            .option{
                .like:hover{
                    color: $color-value;
                    i{
                        color: $color-value;
                    }
                }
                .reply:hover{
                    color: $color-value;
                    i{
                        color: $color-value;
                    }
                }
            }
        }
        .load-more:hover{
            color: $color-value;
            i{
                color: $color-value;
            }
        }

        .open-all{
            color: $color-value;
            cursor: pointer;
            text-align: right;
            margin-top: 10px;
        }
    }
}
</style>
