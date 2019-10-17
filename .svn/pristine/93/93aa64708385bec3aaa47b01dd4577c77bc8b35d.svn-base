<template>
    <section id="subject_discuss">
        <div class="title">
            <div class="title_l fl">
                讨论区
            </div>
            <div class="discussinitiate-broad-search title_r fr">
                <input type="text" placeholder="搜索主题" class="search_text" v-model="search">
                <div class="el-search_btn icon-search" @click="getDiscussList"></div>
                <!-- <el-input placeholder="搜索主题" v-model="search" v-on:keyup.enter="keyWordSearch">
                  <el-button slot="append" icon="search" @click="keyWordSearch"></el-button>
                </el-input> -->
            </div>
        </div>
        <router-link v-if="isCreater || isMember" class="initiateTheme" :to="{ path: 'discussInitiate', query: {id:$route.query.id ? $route.query.id : '',subjectId: $route.query.subjectId} }"><i class="i-initiateTheme"></i>发起主题</router-link>
        <div class="allTopics">
            <h3 class="allTopics_title">全部主题</h3>
            <ul class="allTopics_ul" v-if="data.length > 0">
                <li class="allTopics_list clearfix" v-for="(item,index) in data" :key="index">
                    <div class="avatar-box fl">
                        <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
                    </div>
                    <div class="content-reply">
                        <p class="allTopics_p2 table-layout">
                            <span class="discuss-author">{{item.userName}}</span>
                            <time class="discuss-time">{{item.createTime | dateFormat('yyyy-MM-dd')}}</time>
                        </p>
                        <router-link :to="{ path: 'discussDetail', query: {id:$route.query.id ? $route.query.id : '',subjectId: $route.query.subjectId, 'discussId': item.id}}">
                            <p class="allTopics_p1">{{item.ttile}}</p>
                        </router-link>
                        <p class="brp-box">
                            &nbsp;<span class="icon-btn-browse"> {{item.browseNum?item.browseNum:0}}</span>&nbsp;
                            &nbsp;<span class="icon-i-reply"> {{item.replyNum?item.replyNum:0}}</span>&nbsp;
                            &nbsp;<span class="icon-btn-thumbsup"> {{item.praiseNum?item.praiseNum:0}}</span>&nbsp;
                        </p>
                    </div>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无数据</div>
            <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; getDiscussList()">加载更多</div>
        </div>
    </section>
</template>

<script>
import { requestDiscussList } from '@/service/subject.js'

export default {
    name: 'subject_discuss',
    data() {
        return {
            search: '',
            data: [],
            pageNum: 1,
            totalNum: 0,
            title: ''
        }
    },
    props: ['isCreater', 'isMember'],
    mounted() {
        this.getDiscussList()
    },
    watch: {
        search: {
            handler: function () {
                this.getDiscussList()
            },
            deep: true
        }
    },
    methods: {
        // keyWordSearch(){
        //     this.title = this.search
        // },
        getDiscussList: function () {
            const params = {
                subjectId: this.$route.query.subjectId,
                ttile: this.search
            }
            requestDiscussList(params, { pageSize: 5, pageNum: this.pageNum }).then((res) => {
                if (res.data.code === 200) {
                    this.totalNum = res.data.entity.totalNum
                    if (this.pageNum === 1 || this.title !== '') {
                        this.data = res.data.entity.resultData
                    } else if (this.pageNum > 1 && this.title === '') {
                        this.data.push(...res.data.entity.resultData)
                    }
                }
            })
        }
    }
}
</script>

<style lang='scss'>
#subject_discuss{
    .title{
        .title_r{
            width: 250px;
            .el-input__inner{
                height: 34px;
            }
        }
    }

    .allTopics_p3{
        span{
            cursor: default;
            &:hover{
                color: #999;
            }
        }
    }
}
.discuss-broad-search {
    .el-input-group > .el-input__inner {
        height: 32px;
        margin: 0;
        color: #A6A6A6;
        width: 186px;
    }
    .el-input__inner {
        width: 104px;
    }
    .el-button {
        background: #C9C9C9;
        .el-icon-search:before {
            content: '搜索';
        }
    }
    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
        color: #A7A7A7;
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
@import '~@/assets/css/scss/projectInitiate.scss';

#subject_discuss{
    padding: 5px 15px 15px;
}

.discuss-author{
    font-size: 14px;
    color: nth($default-color, 1);
    margin-right: 10px;
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

.brp-box{
    font-size: 12px;
    text-align: right;
    span{
        margin-left: 20px;
    }
}

.search_text {
    float: left;
    width: 188px;
    height: 32px;
    border: none;
    text-indent: 5px;
}
.el-search_btn {
    float: right;
    width: 60px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #c9c9c9;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}
.plate {
    margin-top: 30px;
    font-size: 16px;
    .plate_title {
        padding: 10px 0;
        border-bottom: 1px solid #D6D6D6;
    }
    .plate_list {
        height: 100px;
        padding: 17px 0;
        box-sizing: border-box;
        border-bottom: 1px dashed #CACACA;
        cursor: pointer;
        .icon {
            float: left;
            width: 66px;
            height: 66px;
        }
        .icon-answer {
             background-image: url('~@/assets/img/common/answer.png');
        }
        .icon-discuss {
             background-image: url('~@/assets/img/common/discuss.png');
        }
        .list_p1, .list_p2 {
            float: left;
            width: 80%;
            height: 50%;
            line-height: 2;
            text-indent: 20px;
        }
        .list_p1 {
            color: #3e3e3e;
            font-weight: 600;
        }
        .list_p2 {
            font-size: 14px;
        }
    }
}
.allTopics {
    margin-top: 30px;
    font-size: 16px;
    .allTopics_title {
        padding: 10px 0;
        border-bottom: 1px solid #CCCCCC;
    }
}
.allTopics_p1:hover{
    color: nth($default-color, 1);
}
.transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #20A0FF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
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
</style>

