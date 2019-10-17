<template>
    <section id="street_comment" class="lagouDetail_comment">
        <!-- 发表评论输入框 -->
        <div class="publish">
            <div class="commment-item-publishbox">
                <textarea placeholder="我来说两句(最多500字)" v-model="content"></textarea>
                <div class="btn-box">
                    <button @click="addEvaluation()">发表</button>
                </div>
            </div>
        </div>
        <!-- 评论列表 -->
        <div class="comment-list">
            <transition-group class="list-box" name="list-item" mode="out-in" tag="ul">
                <li class="list-item-detail clearfix" v-for="(item,index) in commentList" :key="index">
                    <div class="face-box fl">
                        <img :src="getFileUrl(item.face) || getFileUrl(item.url) || faceDefault">
                    </div>
                    <div class="content-box clearfix">
                        <div class="name-date">
                            <span class="name">{{item.userName}}</span>
                            <span class="name" v-if="item.receiveName || item.replyUserName">回复 &nbsp;&nbsp;{{ item.receiveName || item.replyUserName }}</span>
                            <span class="date">{{item.createDate | dateFormat('yyyy.MM.dd')}}</span>
                        </div>
                        <div class="comment-content">
                            {{item.content}}
                        </div>
                        <div class="operate-box">
                            <span class="reply-btn" @click="showReplyBox(index, item.createId)"><i class="icon-btn-reply"></i>回复</span>
                            <div class="publish" v-if="show == index">
                                <div class="commment-item-publishbox">
                                    <textarea placeholder="我来说两句(最多500字)" v-model="replyContent"></textarea>
                                    <div class="btn-box">
                                        <button @click="addEvaluation(item.id)">发表</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </transition-group>
        </div>
        <div class="load-more" v-if="pageParam.totalNum > commentList.length" @click="pageParam.pageNum++;getCommentList(true)">
            <i class="icon-btn-refresh"></i> 加载更多
        </div>
    </section>
</template>

<script>
    import { serviceCommentList, serviceCommentAdd } from '@/service/service.js'
    import { demandCommentList, demandCommentAdd } from '@/service/demand.js'
    export default {
        name:'street_comment',
        props:['detail'],
        data(){
            return {
                pageParam:{
                    pageSize:10,
                    pageNum:1
                },
                commentList:[],
                getListHandler: null,   //获取评论列表的请求操作
                addHandler: null,
                content:'', //发表评论内容
                replyContent:'',
                userId:'',  //当前登录人id
                id:'',  //详情id
                show:null,
                type: this.$route.params.type
            }
        },
        created(){
            if(this.$ls.get('loginInfo')){
                this.userId = this.$ls.get('loginInfo').userInfo.id;
            };
            this.id = this.$route.query.id;
            if(this.type == '1') {
                this.getListHandler = serviceCommentList
                this.addHandler = serviceCommentAdd
            }else {
                this.getListHandler = demandCommentList
                this.addHandler = demandCommentAdd
            }
            this.getCommentList()
        },
        methods:{
            showReplyBox(index, id){
                if(this.show != null && this.show == index){
                    this.show = null;
                }else if(id == this.$ls.get('loginUId')){
                    this.$message('该评论为自己发出！')
                }else{
                    this.show = index;
                }
            },
            // 发表评论
            addEvaluation(pId = ''){
                if(this.$ls.get('loginInfo')){
                    if(this.content === '' &&　this.replyContent === '' ){
                        this.$message('请输入评论内容')
                    }else if(this.content.length > 500 && this.replyContent.length > 500){
                        this.$message('评论内容不能超过500字符')
                    }else if(this.content.length > 500 && this.replyContent.length > 500){
                        this.$message('评论内容不能超过500字符')
                    }else{
                        let param = {
                            pId,
                            content: this.content
                        }
                        if(pId) {
                            param.content = this.replyContent
                        }
                        if(this.type == '1') {
                            param.serveId = this.$route.query.id
                        }else {
                            param.demandId = this.$route.query.id
                        }
                        this.addHandler( param ).then(res => {
                            if(res.data.code === 200){
                                this.showMessage('success','发表成功')
                                this.getCommentList()
                                this.content = ''
                                this.replyContent = ''
                                this.show = null
                                this.detail.commentNum++
                                this.$emit('commentChange')
                            }else{
                                this.$message(res.data.msg)
                            }
                        })
                    }
                }else{
                    this.$store.commit('toggleLoginModal', true);
                }
            },
            /*获取评论列表*/
            getCommentList(ifPush){
                let params = {}
                if(this.type == '1') {
                    params.serveId = this.id
                    // params.userId = this.userId
                }else {
                    params.demandId = this.id
                }
                this.getListHandler( params, this.pageParam ).then((res) => {
                    if(res.data.code == 200 && res.data.entity){
                        if(ifPush){
                            this.commentList.push(...res.data.entity.resultData)
                        }else {
                            this.commentList = res.data.entity.resultData
                        }
                        this.$set(this.pageParam, 'totalNum', res.data.entity.totalNum)
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/asset/scss/vars.scss';
    .lagouDetail_comment {
        padding: 15px;
    }
    *{
        box-sizing: border-box;
    }
    .list-item-detail{
        transition: opacity .5s, transform .5s;
    }
    .list-item-enter,
    .list-item-leave-active {
        opacity: 0;
        transform: translateY(-30px);
    }
    .list-item-leave-active {
        position: absolute;
    }
    /*发表*/
    .publish{
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        .commment-item-publishbox{
            width: 100%;
            overflow: hidden;
            textarea{
                width: 100%;
                height: 80px;
                border: 1px solid #dfdfdf;
                padding: 10px;
                resize: none;
            }
            .btn-box{
                width: 100%;
                height: 50px;
                border: 1px solid #dfdfdf;
                border-top: none;
                text-align: right;
                padding: 10px;
                button{
                    color: #fff;
                    vertical-align: top;
                    border: none;
                    padding: 5px 15px;
                }
                button:hover{
                    opacity: .75;
                    filter: alpha(opacity=75);
                }
            }
        }
    }
    // 评论列表
    .list-item-detail{
        padding: 15px 0;
        border-bottom: 1px solid #eee;
        .face-box{
            img{
                width: 42px;
                height: 43px;
                border-radius: 1000px;
            }
        }
        .content-box{
            padding-left: 54px;
            .name-date{
                margin-bottom: 8px;
                .name{
                    font-size: 14px;
                    margin-right: 8px;
                }
                .date{
                    color: #ccc;
                    margin-right: 10px;
                }
            }
            .comment-content{
                font-size: 14px;
                line-height: 1.5em;
                margin-bottom: 10px;
                word-wrap:break-word;
                word-break:normal;
            }
            .operate-box{
                .reply-btn{
                    display: inline-block;
                    width: 100%;
                    text-align: right;
                    cursor: pointer;
                    color: #ccc;
                    i{
                        margin-right: 5px;
                        color: #ccc;
                    }
                }
            }
        }
    }
    // 加载更多
    .load-more {
        width: 100%;
        margin-top: -1px;
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
                            background-color: $color-value
                        }
                    }
                    textarea:focus{
                        border-color: $color-value;
                    }
                }
            }
            .operate-box{
                .reply-btn{
                    &:hover{
                        color: $color-value;
                        i{
                            color: $color-value;
                        }
                    }
                }
            }
        }
    }
</style>