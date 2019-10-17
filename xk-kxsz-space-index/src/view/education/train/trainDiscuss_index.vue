<!-- 讨论区主页 -->
<template>
    <section>
        <router-link class="initiateTheme" :to="{ path: 'publish', query: {id: $route.query.id} }"><i class="i-initiateTheme"></i>发起主题</router-link>
        <div class="allTopics">
            <h3 class="allTopics_title">全部主题</h3>
            <ul class="allTopics_ul" v-if="data.length">
                <li class="allTopics_list clearfix" v-for="(item,index) in data" :key="index">
                    <router-link :to="{ path: 'detail', query: {id: $route.query.id, pId: item.id} }">
                        <div class="avatar-box fl">
                            <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
                        </div>
                        <div class="content-reply">
                            <p class="allTopics_p2 table-layout">
                                <span class="name">{{item.userName}}</span>
                                <time class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                            </p>
                            <p class="allTopics_p1"> {{ item.title }} </p>
                            <p class="allTopics_p3">
                                &nbsp;<span class="icon-btn-browse table-cell"> {{item.browseNum?item.browseNum:0}}</span>&nbsp;
                                &nbsp;<span class="icon-i-reply table-cell"> {{item.replyNum?item.replyNum:0}}</span>&nbsp;
                                &nbsp;<span class="icon-btn-thumbsup table-cell"> {{item.praiseNum?item.praiseNum:0}}</span>&nbsp;
                            </p>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div v-else class="empty-block"></div>
            <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; getData()">加载更多</div>
        </div>
    </section>
</template>

<script>
import { trainDiscussList } from '@/service/train.js'
export default {
    name : 'projectDetailDiscuss',
    data() {
        return{
            data: [],
            pageNum: 1,
            totalNum: '',
            pageParam: {
                pageSize: 5,
                pageNum: 1
            }
        }
    },
    props: {
        title: String,
        select: String
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData () {
            trainDiscussList({
                trainId: this.$route.query.id,
                pId: -1,
                title: this.title
            }, this.pageParam).then(res => {
                if(res.data.code === 200){
                    this.data.push(...res.data.entity.resultData)
                    this.totalNum = res.data.entity.totalNum
                }
            })
        },
        getSearch () {
            trainDiscussList({trainId: this.$route.query.id, pId: -1, title: this.title }).then(res => {
                if(res.data.code === 200){
                    this.data = res.data.entity.resultData
                    this.totalNum = res.data.entity.totalNum
                }
            })
        }
    }
}
</script>

<style lang='scss'>
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
@import "~@/asset/scss/vars.scss";
@import '~@/asset/scss/projectInitiate.scss';
.allTopics {
    margin-top: 30px;
    font-size: 16px;
    .allTopics_title {
        padding: 10px 0;
        border-bottom: 1px solid #CCCCCC;
    }
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

.name{
    color: $default-color;
    font-size: 14px;
}

.allTopics_p1{
    &:hover{
        color: #00a0e9;
    }
}
.allTopics_p3 {
    width: 20%;
}
.table-cell:hover {
    color: #999;
}
</style>
