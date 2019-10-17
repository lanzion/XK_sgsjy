<template>
    <section id="discuss_detail">
        <div class="title clearfix">
            <div class="title_l fl">
                <router-link :to="{ path: 'discuss', query: { id: $route.query.id,subjectId: $route.query.subjectId }}">讨论区</router-link> > <span>主题详情</span>
            </div>
        </div>
        <div class="discuss_content">
            <div class="theme">
                <div class="theme_title">
                    <p>{{theme.ttile}}</p>
                    <p class="theme_content" v-html='theme.content'></p>
                    <p><span class="theme_author user-name">{{theme.userName}}</span> <span class="theme_time">{{theme.createTime | dateFormat('yyyy.MM.dd HH:mm:ss')}}</span></p>
                </div>
                <div class="theme_state">
                    <a @click="praiseItem(theme,'1')" title="点赞" class="icon-btn-thumbsup" :class="{'active':theme.praise}"> ({{theme.praiseNum?theme.praiseNum:0}}) &nbsp;&nbsp;</a>
                    <a @click="setShow" title="回复" class="icon-i-reply reply-icon"> ({{totalNum}})</a>
                </div>
                <v-report v-if="!theme.report && theme.createId !== userId" class="report" :report-data="{'url': reportApi, params: {'discussId': theme.id}}"></v-report>
                <reply-show :replyApi="replyApi" :replyData="{'paramName': 'pId', 'paramVal': pId, level: []}" :replyCommentId="pId" v-on:reply="refreshData"></reply-show>
            </div>
        </div>
        <div class="comments">
            <h3 class="comments_title">共{{totalNum}}条回复</h3>
            <ul class="allTopics_ul" v-if="comments.length > 0">
                <li class="allTopics_list clearfix" v-for="(c,index) in comments" :key="index">
                    <div class="avatar-box fl">
                        <img :src="getFileUrl(c.url) || faceDefault" width="41" height="41">
                    </div>
                    <div class="content-reply">
                        <section class="allTopics_list_item">
                            <p class="allTopics_p2"><span class="user-name">{{c.userName}}</span> {{c.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}</p>
                            <p class="allTopics_p1">{{c.content}}</p>
                            <p class="allTopics_p3">
                                <a @click="praiseItem(comments,index)" title="点赞" class="icon-btn-thumbsup" :class="{'active':c.praise}"> ({{c.praiseNum?c.praiseNum:0}})</a>&nbsp;&nbsp;
                                <a @click="setShow('allTopics_list',index)" title="回复" class="icon-i-reply reply-icon"> ({{c.replyNum}})</a>
                            </p>
                            <v-report v-if="!c.report && c.createId !== userId" class="report" :report-data="{'url': reportApi, params: {'discussId': c.id}}"></v-report>
                            <v-reply :replyData="{'paramName': 'pId', 'paramVal':pId, level: [index]}" :replyCommentId="c.id" :reply-api="replyApi" v-on:reply="refreshData"></v-reply>
                        </section>
                        <ul class="allTopics_ul2" v-if="c.commentResult!= null">
                            <li v-for="(i,k) in c.commentResult" class="allTopics_list2 clearfix" v-if="k < c.maxNum">
                                <div class="avatar-box fl">
                                    <img :src="getFileUrl(i.url) || faceDefault" width="41" height="41">
                                </div>
                                <div class="content-reply">
                                    <p class="allTopics_p2"><span class="user-name">{{i.userName}}</span> {{i.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}</p>
                                    <p class="allTopics_p1">{{i.content}}</p>
                                    <p class="allTopics_p3">
                                        <a @click="praiseItem(c.commentResult,k)" title="点赞" class="icon-btn-thumbsup" :class="{'active':i.praise}"> ({{i.praiseNum?i.praiseNum:0}})</a>&nbsp;&nbsp;
                                        <a @click="setShow('allTopics_list2',k)" title="回复" class="icon-i-reply reply-icon"> ({{i.replyNum}})</a>
                                    </p>
                                    <v-report v-if="!i.report && i.createId !== userId" class="report2" :report-data="{'url': reportApi, params: {'discussId': i.id}}"></v-report>
                                    <v-reply :replyData="{'paramName': 'pId', 'paramVal':pId, level: [index, k]}" :replyCommentId="c.id" :reply-api="replyApi" v-on:reply="refreshData"></v-reply>
                                </div>
                            </li>
                            <div class="open-all" v-if="c.commentResult.length > c.maxNum" @click="showMore(index)">展开更多回复>></div>
                            <div class="open-all" v-if="c.maxNum > 5" @click="hideMore(index)">&#8593;收起更多回复</div>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="load-more" v-if="totalNum > comments.length" @click="pageNum++; moreData();">加载更多</div>
        </div>
    </section>
</template>

<script>
import report from 'Common/report.vue'
import reply from 'Common/reply.vue'
import replyShow from 'Common/reply_show.vue'
import { requestDiscussDetail } from '@/service/subject.js'
import { loginInfo } from '@/js/getUserInfo.js'

export default {
    name: 'subjectDetailDiscuss',
    data() {
        return {
            userId: '',
            replyApi: 'maker/subject/discuss/add',
            reportApi: 'maker/subject/discuss/report/add',
            search: { input: '', select: '' },
            theme: '',
            title: '',
            comments: [],
            totalNum: '',
            pageNum: 1,
            pId: '',
        }
    },
    components: {
        'v-report': report,
        'v-reply': reply,
        replyShow
    },
    created() {
        if (loginInfo) {
            this.userId = loginInfo.userInfo.id
        }
    },
    mounted() {
        this.pId = this.$route.query.discussId
        this.getDiscussDetail()
    },
    methods: {
        setShow: function (event) {
            if (this.$ls.get('loginInfo')) {
                const evt = window.event || event
                const targetObj = evt.target || evt.srcElement
                const parentObj = targetObj.parentNode.parentNode
                const lastObj = parentObj.lastChild
                const replyObj = document.querySelectorAll('.reply')
                for (let i = 0; i < replyObj.length; i++) {
                    replyObj[i].className = 'reply'
                }
                lastObj.className = 'reply reply-show'
            } else {
                this.$store.commit('toggleLoginModal', true)
            }
        },
        getDiscussDetail: function () {
            requestDiscussDetail({ id: this.$route.query.discussId }).then((res) => {
                this.theme = res.data.entity
                this.comments = res.data.entity.commentResult.resultData
                for (let k = 0; k < this.comments.length; k++) {
                    this.comments[k].commentResult = []
                    // this.comments[k].maxNum = 5
                    this.$set(this.$data.comments[k], 'maxNum', 5)
                }
                for (let i = 0; i < this.comments.length; i++) {
                    if (this.comments[i].replyCommentId !== this.pId) {
                        const replyId = this.comments[i].replyCommentId
                        for (let j = 0; j < this.comments.length; j++) {
                            if (this.comments[j].id === replyId) {
                                this.comments[j].commentResult.push(this.comments[i])
                            }
                        }
                        this.comments.splice(i, 1)
                        i--
                    }
                }
                // console.log(this.comments)
                this.totalNum = this.comments.length
            })
        },
        /*
        * 点赞/取消点赞
        * discussId: 评论id
        * status: 状态(1:启用0:禁用)
         */
        praiseItem(items, index) {
            if (loginInfo) {
                const item = index === '1' ? items : items[index]
                let url
                let param
                if (item.praise) {
                    url = 'maker/subject/discuss/praise/modify'
                    param = { discussId: item.id, status: 0 }
                } else {
                    url = 'maker/subject/discuss/praise/add'
                    param = { discussId: item.id, status: 1 }
                }
                this.$http.post(url, param).then((res) => {
                    if (res.data.code === 200) {
                        item.praise = !item.praise
                        if (item.praise) {
                            this.$set(item, 'praiseNum', ++item.praiseNum)
                            this.showMessage('success', '点赞成功')
                        } else {
                            this.$set(item, 'praiseNum', --item.praiseNum)
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
        moreData() {
            this.$http.post('maker/subject/discuss/selectPager?pageSize=5&pageNum=' + this.pageNum,
                { subjectId: this.$route.query.pId }
            ).then((response) => {
                this.comments.push(...response.data.entity.resultData)
            })
        },
        refreshData() {
            this.getDiscussDetail()
        },
        showMore(index) {
            this.$set(this.$data.comments[index], 'maxNum', 99999)
        },
        hideMore(index) {
            this.$set(this.$data.comments[index], 'maxNum', 5)
        }
    }
}
</script>

<style lang='scss'>

.theme_state {
    .el-button {
        color: #9C9C9C;
        &:hover {
            color: #41C36F;
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/projectInitiate.scss';
@each $color-key, $color-value in $color-data {
    .theme-#{$color-key} {
        .thumbUp {
            color: $color-value !important;
        }
        .title a:hover {
            color: $color-value;
        }
        .theme_author {
            color: $color-value;
        }
        .allTopics_p2 {
            span {
                color: $color-value;
                margin-right: 8px;
            }
        }
    }
}

#discuss_detail{
    padding: 5px 15px 15px;
}

// 头像盒子
.avatar-box{
    img{
        border-radius: 50%;
    }
}

.content-reply{
    padding-left: 51px;
}

.reply-icon:hover{
    color: #d00;
}

.discuss_content {
    .theme {
        position: relative;
        .theme_title {
            padding: 20px 0 10px;
            font-size: 14px;
            box-sizing: border-box;
            border-bottom: 1px dashed #CDCDCD;
            p {
                line-height: 2;
            }
            .theme_author, .theme_time, .theme_content {
                font-size: 12px;
            }
        }
        .theme_state {
            padding: 10px 0;
            box-sizing: border-box;
            color: #999999;
        }
        .report {
            display: none;
            position: absolute;
            top: 30px;
            right: 0;
        }
        &:hover .report {
            display: inline-block;
        }
    }
}

.comments {
    .comments_title {
        margin-top: 20px;
        padding: 16px 0;
        font-size: 16px;
        border-bottom: 1px solid #D5D5D5;
    }
    .allTopics_ul {
        font-size: 14px;
        .allTopics_list {
            position: relative;
            padding: 20px 0 10px;
            box-sizing: border-box;
            border-bottom: 1px dashed #CACACA;
            .allTopics_p3{
                display: block;
                float: none;
                text-align: right;
                width: 100%;
            }
            .report {
                display: none;
                position: absolute;
                top: 30px;
                right: 0;
            }
            .allTopics_list_item:hover .report {
                display: inline-block;
            }
            p {
                line-height: 2;
                font-size: 12px;
            }
            .allTopics_ul2 {
                .allTopics_list2 {
                    position: relative;
                    margin-top: 15px;
                    padding-top: 10px;
                    border-top: 1px dashed #CACACA;
                    .report2 {
                        display: none;
                        position: absolute;
                        top: 30px;
                        right: 0;
                    }
                    &:hover .report2 {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
.report {
    position: absolute;
    display: none;
    right: 0;
    top: 20px;
}
.allTopics_list2:hover .allTopics_list > .report {
    display: none !important;
}
.load-more {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    line-height: 3;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
}
.user-name{
    font-size: 14px;
    color: #d00;
}
.open-all{
    color: #00a0e9;
    cursor: pointer;
    text-align: right;
    margin-top: 10px;
}
</style>
