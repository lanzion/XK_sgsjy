<!-- 讨论区总览 -->
<template>
    <section id="projectDetailDiscuss">
        <router-link class="initiateTheme" :to="{ path: 'publish', query: {id: $route.query.id} }"><i class="i-initiateTheme"></i>发起主题</router-link>
        <div class="plate">
            <h3 class="plate_title">板块</h3>
            <ul class="plate_ul"><p class="list_p"></p>
                <router-link :to="{ path:'theme', query:{'id': $route.query.id, 'discussType': '2'} }">
                    <li class="plate_list"><i class="icon icon-answer"></i><p class="list_p1">教师答疑区</p><p class="list_p2">在这里，项目成员可以发表关于项目的相关问题，并得到教师的解答。</p></li>
                </router-link>
                <router-link :to="{ path: 'theme', query:{'id': $route.query.id, 'discussType': '1'}  }">
                    <li class="plate_list"><i class="icon icon-discuss"></i><p class="list_p1">综合讨论区</p><p class="list_p2">在这里，大家可以一起交流项目经验。</p></li>
                </router-link>
            </ul>
        </div>
        <div class="allTopics">
            <h3 class="allTopics_title">全部主题</h3>
            <ul class="allTopics_ul" v-if="data.length">
                <li class="allTopics_list clearfix" v-for="(item,index) in data" :key="index">
                    <div class="avatar-box fl">
                        <img :src="getFileUrl(item.url) || faceDefault" width="41" height="41">
                    </div>
                    <div class="content-reply">
                        <p class="allTopics_p2 table-layout">
                            <span class="name">{{item.userName}}</span>
                            <time class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                        </p>
                        <router-link :to="{ path: 'detail', query: {id: $route.query.id, pId: item.id, discussType: item.discussType} }">
                            <p class="allTopics_p1">{{item.title}}</p>
                        </router-link>
                        <p class="allTopics_p3">
                            &nbsp;<span class="icon-btn-browse table-cell"> ({{item.browseNum?item.browseNum:0}})</span>&nbsp;
                            &nbsp;<span class="icon-i-reply table-cell"> ({{item.replyNum?item.replyNum:0}})</span>&nbsp;
                            &nbsp;<span class="icon-btn-thumbsup table-cell"> ({{item.praiseNum?item.praiseNum:0}})</span>&nbsp;
                        </p>
                    </div>
                </li>
            </ul>
            <div v-else class="empty-block"></div>
            <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; getData()">加载更多</div>
        </div>
    </section>
</template>

<script>
export default {
    name : 'projectDetailDiscuss',
    data() {
        return{
            data: [],
            pageNum: 1,
            totalNum: ''
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
            this.$http.post('maker/projectDiscuss/selectDiscussPager?pageSize=5&pageNum=' + this.pageNum,
                {projectId: this.$route.query.id, pId: '-1', title: this.title, discussType: this.select }
            ).then(res => {
                if(res.data.code === 200){
                    this.data.push(...res.data.entity.resultData)
                    this.totalNum = res.data.entity.totalNum
                }
            })
        },
        getSearch () {
            this.$http.post('maker/projectDiscuss/selectDiscussPager?pageSize=5&pageNum=' + this.pageNum,
                {projectId: this.$route.query.id, pId: '-1', title: this.title, discussType: this.select }
            ).then(res => {
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
@import '~@/asset/scss/vars.scss';
@import './../../asset/scss/projectInitiate.scss';
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
             background-image: url('./../../asset/img/common/answer.png');
        }
        .icon-discuss {
             background-image: url('./../../asset/img/common/discuss.png');
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
</style>
