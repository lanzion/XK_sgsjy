<!-- 讨论区讨论详情 -->
<template>
    <section id="projectDiscuss_detail">
        <div class="discuss_content">
            <div class="theme">
                <div class="theme_title">
                    <p class="clearfix">
                        {{theme.title}}
                        <v-report class="fr report" :report-data="{'url': reportApi, params: {'discussId': theme.id}}" v-if="theme.createId !== loginUserId"></v-report>
                    </p>
                    <p class="theme_content" v-html='theme.content'></p>
                    <p><span class="theme_author">{{theme.createName}}</span> <span class="theme_time">{{theme.createTime | dateFormat('yyyy.MM.dd HH:mm:ss')}}</span></p>
                </div>
                <div class="theme_state">
                    <a @click="like(theme.id)" title="点赞" class="icon-btn-thumbsup"> ({{theme.praiseNum?theme.praiseNum:0}})</a>&nbsp;&nbsp;
                    <a @click="addDiscuss" title="回复" class="icon-i-reply"> ({{theme.replyNum?theme.replyNum:0}})</a>
                </div>
                <reply-show :replyData="{'paramName': 'pId', 'paramVal': theme.id, level: []}" @reply="refreshData"></reply-show>
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
                        <div class="clearfix level1">
                            <p class="allTopics_p2">
                                <span class="user-name">{{item.userName}}</span>
                                {{item.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                                <v-report class="report fr" :report-data="{'url': reportApi, params: {'discussId': item.id}}" v-if="item.createId !== loginUserId"></v-report>
                            </p>
                            <p class="allTopics_p1">{{item.content}}</p>
                            <p class="allTopics_p3">
                                <a @click="like(item.id)" title="点赞" class="icon-btn-thumbsup"> ({{item.praiseNum ? item.praiseNum : 0}})</a>&nbsp;&nbsp;
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
                        <ul class="allTopics_ul2" v-if="item.childBean !== undefined || item.childBean.resultData.length>0">
                            <li v-for="(i, k) in item.childBean.resultData" class="allTopics_list2 clearfix">
                                <div class="avatar-box fl">
                                    <img :src="getFileUrl(i.url) || faceDefault" width="41" height="41">
                                </div>
                                <div class="content-reply">
                                    <p class="allTopics_p2">
                                        <span class="user-name">{{i.userName}}</span> {{i.createTime | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                                        <v-report class="report2 fr" :report-data="{'url': reportApi, params: {'discussId': i.id}}" v-if="i.createId !== loginUserId"></v-report>
                                    </p>
                                    <p class="allTopics_p1">{{i.content}}</p>
                                    <p class="allTopics_p3">
                                        <a @click="like(i.id)" title="点赞" class="icon-btn-thumbsup"> ({{i.praiseNum ? i.praiseNum : 0 }})</a>&nbsp;&nbsp;
                                        <a @click="setShow([index, k], item)" title="回复" class="icon-i-reply"> ({{i.replyNum ? i.replyNum : 0}})</a>
                                        <div class="reply"  v-if="show[0] === index && show[1] === k">
                                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="text" resize="none"> </el-input>
                                            <div class="buttonGroup clearfix">
                                                <a class="reply_btn reply_btn1" @click="reply">发表</a>
                                                <a class="reply_btn reply_btn2" @click="removeShow">取消</a>
                                            </div>
                                        </div>
                                    </p>
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
import replyShow from 'Common/reply_show.vue'
import { projectDiscussAddDiscuss } from '@/service/project.js'
import { mapState } from 'vuex'

export default {
    name : 'projectDetailDiscuss',
    data() {
        return {
            reportApi: 'maker/projectDiscuss/addDiscussReport',
            search: { input:'', select: ''},
            theme: '',
            title: '',
            comments: [],
            totalNum: '',
            pageNum: 1,
            text:'',
            show: [null, null],
            param: null,
            loginUserId: this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.id : null
        }
    },
    components: {
        'v-report': report,
        'v-reply': reply,
        replyShow
    },
    created() {
        this.getData()
        switch (this.$route.query.discussType) {
            case '2':
            this.title ="教师答疑区"
            break
            case '1':
            this.title ="综合讨论区"
            break
        }
    },
    methods: {
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
        getData () {
            this.$http.post('maker/projectDiscuss/selectDetail?pageSize=5&pageNum=' + this.pageNum,
                {'id': this.$route.query.pId}
            ).then(response => {
                this.theme = response.data.appendInfo.proDiscuss;
                this.comments = response.data.entity.resultData;
                this.totalNum = response.data.entity.totalNum;
            })
        },
        like(pId) {
            let evt = window.event || event;
            let targetObj = evt.target || evt.srcElement;

            this.$http.post('maker/projectDiscuss/addPraiseDiscuss',
                {'discussId':pId}
            ).then(res => {
                if(res.data.code == 200) {
                    this.getData();
                    if(res.data.appendInfo.status == 0) {
                        targetObj.className = "thumbUp icon-btn-thumbsup"
                    }else {
                        targetObj.className = "icon-btn-thumbsup"
                    }
                }
            })
        },
        moreData(){
            this.$http.post('maker/projectDiscuss/selectDetail?pageSize=5&pageNum=' + this.pageNum,
                {'id': this.$route.query.pId}
            ).then(response => {
                this.comments.push(...response.data.entity.resultData);
            })
        },
        refreshData(data){
            this.getData()
        },
        reply() {
            let query = this.$route.query,
                param = { projectId: query.id, discussType: query.discussType, content: this.text, pId: this.param.id, secondId : this.param.id }
            projectDiscussAddDiscuss( param ).then(res => {
                if(res.data.code == 200) {
                    let data = {}
                    data.content = this.text
                    data.url = this.$ls.get('loginInfo') ? this.$ls.get('loginInfo').userInfo.face : null
                    data.createTime = (new Date()).getTime()
                    data.id = res.data.appendInfo.item.id
                    data.pId = res.data.appendInfo.item.pId
                    data.discussType = res.data.appendInfo.item.discussType
                    data.secondId = res.data.appendInfo.item.secondId
                    data.title = res.data.appendInfo.item.title
                    data.userName = this.$ls.get('loginInfo').userInfo.userName;
                    data.replyNum = 0;
                    data.praiseNum = 0;
                    this.comments[this.show[0]].childBean.resultData.unshift(data)
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
    },
    computed: mapState({
        projectDetail: state => state.project.detail
    })
}
</script>

<style lang='scss'>
#projectDiscuss_detail {
    .discuss_content {
        .theme_title {
            .hoverIfshow {
                display: none;
            }
            &:hover .hoverIfshow {
                display: inline-block;
            }
        }
    }
    .allTopics_ul {
        .level1 {
            .allTopics_p2 {
                .hoverIfshow {
                    display: none;
                }
            }
            &:hover .hoverIfshow {
                display: inline-block;
            }
        }
        .allTopics_ul2 {
            .allTopics_p2 {
                .hoverIfshow {
                    display: none;
                }
            }
            &:hover .hoverIfshow {
                display: inline-block;
            }
        }
    }
}
</style>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
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
            padding: 20px 0 10px;
            box-sizing: border-box;
            border-bottom: 1px dashed #CACACA;
            p {
                line-height: 2;
                font-size: 12px;
            }
            .allTopics_ul2 {
                .allTopics_list2 {
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px dashed #CACACA;
                }
            }
        }
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
                background-color: $default-color;
            }
        }
    }
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
    color: $default-color;
    margin-right: 8px;
}
</style>
