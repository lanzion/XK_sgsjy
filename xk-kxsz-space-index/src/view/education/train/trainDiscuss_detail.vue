<!-- 讨论区讨论详情 -->
<template>
    <section>
        <div class="discuss_content">
            <div class="theme">
                <div class="theme_title">
                    <p>{{theme.title}}</p>
                    <p class="theme_content" v-html='theme.content'></p>
                    <p><span class="theme_author">{{theme.createName}}</span> <span class="theme_time">{{theme.createDate | dateFormat('yyyy.MM.dd HH:mm:ss')}}</span></p>
                </div>
                <div class="theme_state">
                    <a @click="like(theme)" title="点赞" class="icon-btn-thumbsup" :class="{thumbUp: theme.praise}"> ({{theme.praiseNum?theme.praiseNum:0}})</a>&nbsp;&nbsp;
                    <a @click="addDiscuss" title="回复" class="icon-i-reply"> ({{totalNum?totalNum:0}})</a>
                    <v-report class="report" :report-data="{'url': reportApi, params: {'discussId': theme.id}}"></v-report>
                </div>
                <v-reply :replyData="{paramName: 'pId', 'paramVal': theme.id, level: []}" @reply="getDetailData" :replyApi='"maker/onlineTrainRoomDiscuss/add"' :replyNew="{trainId: $route.query.id }"></v-reply>
            </div>
        </div>
        <div class="comments">
            <h3 class="comments_title">共{{totalNum}}条回复</h3>
            <ul class="allTopics_ul">
                <li class="allTopics_list clearfix" v-for="(item, index) in comments" :key="index">
                    <div class="avatar-box fl">
                        <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
                    </div>
                    <div class="content-reply">
                        <div class="clearfix allTopics_list_item">
                            <p class="allTopics_p2">
                                <span class="user-name">{{item.userName}}</span>
                                {{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                                <v-report class="report" :report-data="{'url': reportApi, params: {'discussId': item.id}}"></v-report>
                            </p>
                            <p class="allTopics_p1">{{item.content}}</p>
                            <p class="allTopics_p3">
                                <a @click="like(item)" title="点赞" class="icon-btn-thumbsup" :class="{thumbUp: item.praise}"> ({{item.praiseNum ? item.praiseNum : 0}})</a>&nbsp;&nbsp;
                                <a @click="setShow([index], item)" title="回复" class="icon-i-reply"> ({{item.replyNum ? item.replyNum : 0}})</a>
                                <div class="reply" v-if="show[0] === index && show[1]==null">
                                    <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="text" resize="none"> </el-input>
                                    <div class="buttonGroup clearfix">
                                        <a class="reply_btn reply_btn1" @click="reply">发表</a>
                                        <a class="reply_btn reply_btn2" @click="removeShow">取消</a>
                                    </div>
                                </div>
                            </p>
                        </div>
                        <ul class="allTopics_ul2" v-if="item.commentResult!==undefined || item.commentResult.resultData.length>0">
                            <li v-for="(i, k) in item.commentResult.resultData" class="allTopics_list2 clearfix">
                                <div class="avatar-box fl">
                                    <img :src="getFileUrl(i.url) || faceDefault" width="41" height="41">
                                </div>
                                <div class="content-reply">
                                    <p class="allTopics_p2">
                                        <span class="user-name">{{i.userName}}</span> {{i.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                                    </p>
                                    <p class="allTopics_p1">{{i.content}}</p>
                                    <p class="allTopics_p3">
                                        <a @click="like(i)" title="点赞" class="icon-btn-thumbsup" :class="{thumbUp: i.praise}"> ({{i.praiseNum ? i.praiseNum : 0 }})</a>&nbsp;&nbsp;
                                        <a @click="setShow([index, k], item)" title="回复" class="icon-i-reply"> ({{i.replyNum ? i.replyNum : 0}})</a>
                                        <div class="reply"  v-if="show[0] === index && show[1] === k">
                                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="text" resize="none"> </el-input>
                                            <div class="buttonGroup clearfix">
                                                <a class="reply_btn reply_btn1" @click="reply">发表</a>
                                                <a class="reply_btn reply_btn2" @click="removeShow">取消</a>
                                            </div>
                                        </div>
                                    </p>
                                    <v-report class="report2" :report-data="{'url': reportApi, params: {'discussId': i.id}}"></v-report>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <div class="load-more" v-if="totalNum > comments.length" @click="pageNum++; moreData(); ">加载更多</div>
        </div>
    </section>
</template>

<script>
import report from 'Common/report.vue'
import reply from 'Common/reply.vue'
import { trainDiscussDetail, trainDiscussDetailAdd, trainDiscussDetailList, trainDiscussPraise } from '@/service/train.js'
export default {
    name : 'projectDetailDiscuss',
    data() {
        return {
            reportApi: 'maker/onlineTrainRoomDiscussReport/add',
            search: { input:'', select: ''},
            theme: '',
            title: '',
            comments: [],
            totalNum: '',
            pageNum: 1,
            text:'',
            show: [null, null],
            param: null,
        }
    },
    components: {
        'v-report': report,
        'v-reply': reply,
    },
    created() {
        this.getDetails()
        this.getDetailData()
    },
    methods: {
        getDetails () {
            const id = this.$route.query.pId
            if(id) {
                trainDiscussDetail({ id }).then (res => {
                    this.theme = res.data.entity
                })
            }
        },
        getDetailData () {
            const query = this.$route.query
            trainDiscussDetailList({ trainId: query.id, pId: query.pId }, {pageNum: 1, pageSize: 5}).then(res => {
                this.comments = res.data.entity.resultData
                this.totalNum = res.data.entity.totalNum
            })
        },
        addDiscuss: function (event) {
            this.removeShow()
            let target = $(event.target)
            let parentObj = target.parent().parent();
            let lastObj = parentObj.find('.reply');
            $('.reply').removeClass('reply-show')
            lastObj.addClass("reply-show")
        },
        setShow (arr, param) {
            this.show = arr
            this.param = param
        },
        removeShow () {
            this.show = [null, null]
        },
        like(item) {
            const status = Number(!item.praise)
            trainDiscussPraise( { discussId: item.id, status } ).then(res => {
                if(res.data.code == 200) {
                    item.praise ? item.praiseNum-- : item.praiseNum++
                    item.praise = !item.praise
                }
            })
        },
        moreData(){
            const query = this.$route.query
            trainDiscussDetailList({ trainId: query.id, pId: query.pId }, {pageNum: this.pageNum, pageSize: 5}).then(response => {
                this.comments.push(...response.data.entity.resultData)
            })
        },
        refreshData(data){
            this.getDetailData()
        },
        reply() {
            let query = this.$route.query,
                param = { trainId: query.id, content: this.text, pId: this.param.id }
            trainDiscussDetailAdd( param ).then(res => {
                if(res.data.code == 200) {
                    let data = {}
                    data.content = this.text
                    data.createDate = (new Date()).getTime()
                    data.id = res.data.entity.id
                    data.pId = res.data.entity.pId
                    data.discussType = res.data.entity.discussType
                    data.secondId = res.data.entity.secondId
                    data.title = res.data.entity.title
                    data.url = this.$ls.get('loginInfo').userInfo.face
                    data.userName = this.$ls.get('loginInfo').userInfo.userName
                    data.replyNum = 0;
                    data.praiseNum = 0;
                    this.comments[this.show[0]].commentResult.resultData.unshift(data)
                    this.removeShow()
                    this.param = null
                    this.text = ''
                }else {
                    this.$message({
                          message: '发表失败',
                          type: 'error'
                    });
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/projectInitiate.scss';
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
            }
        }
    }
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
    .buttonGroup {
        height: 30px;
        padding: 10px;
        .reply_btn {
            display: inline-block;
            width: 62px;
            height: 28px;
            line-height: 2;
            float: right;
            margin-left: 20px;
            text-align: center;
        }
        .reply_btn1 {
            color: #fff;
            height: 30px;
            &:hover{
                opacity: 0.75;
            }
        }
        .reply_btn2 {
            background-color: #fff;
            &:hover{
                color: #fff;
            }
        }
    }
    .allTopics_ul {
        font-size: 14px;
        .allTopics_list {
            position: relative;
            padding: 20px 0 10px;
            box-sizing: border-box;
            border-bottom: 1px dashed #CACACA;
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
                    margin-top: 10px;
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
    margin-top: -1px;
    font-size: 14px;
    line-height: 3;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
}

.user-name{
    font-size: 14px;
    color: #d00;
    margin-right: 8px;
}
.icon-i-reply:hover {
    color: #2bbb61;
    .icon-btn-i-report {
        color: #2bbb61;;
    }
}
</style>
