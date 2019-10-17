<template>
    <section id="articleDetail">
        <!-- 面包屑 -->
        <nav class="navigation container"><router-link :to="{path:'/interestsSpace/article', query: {id: $route.query.orgId}}">全部文章</router-link> > 文章详情</nav>
        <!-- 文章详情 -->
        <article class="independentDetail container">
            <h1 v-text='detailDate.title' class="title"></h1>
            <time class="date">
                分类:【 {{detailDate.articelTypeName}} 】&nbsp;&nbsp;&nbsp;&nbsp;
                发布人: {{detailDate.userName}} &nbsp;&nbsp;&nbsp;&nbsp;
                发布时间 :{{detailDate.createTime | dateFormat('yyyy-MM-dd HH:mm')}}
                <span class="fr"> <strong>{{ detailDate.browseNum }}</strong> 人浏览&nbsp;&nbsp; </span>
                <span class="fr"> <strong>{{ detailDate.commentCount }}</strong> 条评论&nbsp;&nbsp;&nbsp;&nbsp; </span>
            </time>
            <div v-html='detailDate.content' class="independentDetail"></div>
            <!-- 上下文章 -->
            <div class="piece clearfix">
                <p class="fl">上一篇: <span  @click="getDetail( (piece.up?piece.up.id:null) )" :class=" piece.up == null ? 'col':'' "> {{ piece.up != null ? piece.up.title : '已经是第一篇了' }} </span></p>
                <p class="fl">下一篇: <span  @click="getDetail( (piece.next?piece.next.id:null) )" :class=" piece.next == null ? 'col':'' "> {{ piece.next != null ? piece.next.title : '已经是最后一篇了' }} </span></p>
            </div>
        </article>

        <section class="comments container independentDetail">
            <div class="mes">
                <option-btn :title='"文章"' module='article' :title.sync="detailDate.title"></option-btn>
                <!-- 点赞 -->
                <!-- span class="icon-btn-i-thumbsup" @click="praise" :class="{active: isPraise}"> 点赞 ({{ detailDate.praiseCount?detailDate.praiseCount:0 }}) </span> -->
                <!-- 举报 -->
                <!-- <v-report class="fr" :reportData="report"></v-report> -->
            </div>
            <!-- 发表评论 -->
            <div class="comment-box">
                <div class="publish">
                    <div class="commment-item-publishbox">
                        <textarea placeholder="我来说两句" v-model="comment.content"></textarea>
                        <div class="btn-box">
                            <button @click="addComment()">发表</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 评论列表 -->
            <div class="comment-list">
                <div class="empty-block" v-if="comment.list.length === 0">暂无评论</div>
                <ul class="comment_ul" v-else>
                    <li class="comment_li clearfix" v-for="(comment,index) in comment.list" :key="index">
                        <img :src="getFileUrl(comment.url) || faceDefault" width="40" height="40" class="fl comment_li_img">
                        <div class="comment-li-content">
                            <p class="user_box">
                                <span class="user_box_name">{{comment.userName}}
                                <span class="user_box_date"> {{comment.createTime | dateFormat('yyyy.MM.dd HH:mm')}}</span>
                                    <!-- 举报 -->
                                    <v-report class="fr" v-if="comment.createId !== userId" :reportData="{url: 'maker/interestsArticleCommentReport/add', params: {commentId: comment.id, status: 1}}"></v-report>
                                </span>
                            </p>
                            <div class="content">{{comment.content}}</div>
                        </div>
                    </li>
                </ul>
                <div class="load-more" @click="comment.pageParam.pageNum++; getCommentList()" v-if="comment.pageParam.pageNum < comment.pageParam.totalPageNum"><i class="icon-btn-i-more"></i>加载更多</div>
            </div>
        </section>
    </section>
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import { articleDetail } from '@/service/interest.js'
import { doPraise, cancelPraise } from '@/service/common.js'
import report from 'Common/report.vue'
import { articleCommentsAdd, articleCommentsList } from '@/service/interest.js'
import com_panel_event from 'Common/button/com_panel_event.vue'
export default {
    name: 'articleDetail',
    data () {
        return {
            userId: this.$ls.get('loginUId') || '',
            // 登录信息
            loginInfo:loginInfo,
            // 文章详情
            detailDate: {},
            // 上下文章
            piece: {},
            // 举报信息
            report: {
                url: 'maker/interests/article/report/add',
                params: {
                    articleId: this.$route.query.articleId
                }
            },
            // 评论
            comment: {
                // 列表
                list: [],
                // 输入内容
                content: '',
                pageParam: {
                    pageNum: 1,
                    pageSize: 10,
                    totalPageNum: 1
                }
            },
            // 是否点赞
            isPraise: false
        }
    },
    components: {
        'v-report': report,
        'option-btn': com_panel_event
    },
    methods: {
        // 请求文章详情
        getDetail ( id ) {
            if(id){
                this.$router.replace({path:'/articleDetail', query: { id, 'orgId': this.$route.query.orgId} })
                this.comment.list = []
                articleDetail({ id }).then(res => {
                    if(res.data.entity) {
                        this.detailDate = res.data.entity
                        this.piece = res.data.appendInfo
                        this.getCommentList(true)
                    }
                })
            }
        },
        // 请求评论列表
        getCommentList (ifAdd) {
            articleCommentsList({articleId: this.$route.query.id}, this.comment.pageParam).then(res=>{
                this.comment.pageParam.totalPageNum = res.data.entity.totalPageNum
                if(ifAdd) {
                    this.comment.list = res.data.entity.resultData
                }else {
                    this.comment.list.push(...res.data.entity.resultData)
                }
            })
        },
        // 添加评论
        addComment () {
            if(loginInfo){
                articleCommentsAdd ({articleId: this.$route.query.id, content: this.comment.content }).then(res => {
                    if(res.data.code === 200) {
                        this.getCommentList(true)
                        this.comment.content = ''
                        this.showMessage('评论成功', 'success')
                    }
                })
            }else {
                this.$store.commit('toggleLoginModal', true);
            }
        },
        // 点赞
        praise(){
            if (loginInfo){
                let url = this.isPraise ? 'maker/praise/cancel' : 'maker/praise/do';
                this.$http.post(url, { "busId": this.$route.query.articleId } ).then( response => {
                    this.isPraise = !this.isPraise;
                    if (this.isPraise) {
                        this.$set(this.detailDate, 'praiseCount', ++this.detailDate.praiseCount)
                        this.showMessage('点赞成功', 'success');
                    } else {
                        this.$set(this.detailDate, 'praiseCount', --this.detailDate.praiseCount)
                        this.showMessage('取消点赞', 'info');
                    }
                })
            }else{
                this.$store.commit('toggleLoginModal', true);
            }
        },
        // 提示消息
        showMessage (msg, type) {
            type = type == undefined ? 'error' : type;
            this.$message({
                message: msg,
                type: type
            });
        }
    },
    mounted() {
        this.getDetail( this.$route.query.id )
        this.$http.post('common/statistics/single', { busId: this.$route.query.articleId, userId: this.loginInfo.userInfo.id } ).then( response => {
            this.isPraise = response.data.appendInfo.isPraise
        })
    }
}
</script>

<style lang='scss'>
@import '~@/asset/scss/datails.scss';
.comment_li {
    .report {
        .i-button {
            display: none;
        }
    }
    &:hover {
        #report {
            .i-button {
                display: block;
            }
        }
    }
}
</style>

<style lang='scss' scoped>
$white: #fff;
$red: #d00;
$gray: #c9c9c9;
/* 面包屑 */
.navigation {
    height: 50px;
    line-height: 50px;
    color: #999999;
}
/* 文章详情 */
.independentDetail {
    font-size: 14px;
    padding: 20px;
    background-color: $white;
    box-sizing: border-box;
    .date {
        padding-bottom: 10px;
        border-bottom: 1px solid $gray;
        strong {
            color: #01a8df;
            font-size: 1.14em;
        }
    }
    .piece {
        margin-top: 20px;
        p {
            padding: 10px 0;
            width: 100%;
            text-align: left;
            span {
                color: #00a1e9;
                cursor: pointer;
            }
            .col {
                color: #626262;
            }
        }
    }
}
/* 评论 */
.comments {
    box-sizing: border-box;
    background-color: $white;
    margin-top: 20px;
    text-align: left;
    .mes {
        padding-bottom: 12px;
        border-bottom: 1px solid $gray;
        margin-bottom: 20px;
        .active {
            color: $red;
        }
    }
    .comment-box {
        .publish{
            .commment-item-publishbox{
                textarea{
                    box-sizing: border-box;
                    width: 100%;
                    height: 130px;
                    border: 1px solid $gray;
                    padding: 10px;
                    resize: none;
                    &:focus{
                        border-color: $red;
                    }
                }
                .btn-box{
                    width: 100%;
                    height: 50px;
                    box-sizing: border-box;
                    border: 1px solid $gray;
                    border-top: none;
                    text-align: right;
                    padding: 10px;
                    button{
                        background-color: $red;
                        color: $white;
                        vertical-align: top;
                        border: none;
                        padding: 5px 15px;
                    }
                }
            }
        }
    }
    .comment_ul{
        margin-top: 30px;
        .comment_li {
            padding: 20px 0;
            border-bottom: 1px dotted $gray;
            .comment_li_img {
/*                 width: 68px;
                height: 68px;
 */                border-radius: 50%;
            }
            .comment-li-content {
                margin-left: 50px;
                line-height: 1.5;
                .user_box {
                    margin-bottom: 10px;
                    .user_box_name {
                        margin-right: 15px;
                    }
                    .user_box_date {
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
    }
}
</style>
