<!-- 讨论区主题 -->
<template>
    <section class="dpd15">
        <router-link class="initiateTheme" :to="{ path: 'publish', query: {id: $route.query.id, discussType: $route.query.discussType } }"><i class="icon-initiateTheme"></i>发起主题</router-link>
        <div class="allTopics">
            <h3 class="allTopics_title">全部主题</h3>
            <ul class="allTopics_ul" v-if="data.length">
                <li class="allTopics_list" v-for="(item,index) in data" :key="index">
                    <router-link :to="{ path: 'detail', query: {id: $route.query.id, pId: item.id, discussType: item.discussType}}">
                        <p class="allTopics_p1">{{item.title}}</p>
                        <p class="allTopics_p2 table-layout">
                            <span class="table-cell author">{{item.userName}}</span>
                            <time class="table-cell time">{{item.createDate | dateFormat('yyyy-MM-dd')}}</time>
                        </p>
                        <p class="allTopics_p3">
                            &nbsp;<span class="icon-btn-browse table-cell"> ({{item.browseNum?item.browseNum:0}})</span>&nbsp;
                            &nbsp;<span class="icon-i-reply table-cell"> ({{item.replyNum?item.replyNum:0}})</span>&nbsp;
                            &nbsp;<span class="icon-btn-thumbsup table-cell"> ({{item.praiseNum?item.praiseNum:0}})</span>&nbsp;
                        </p>
                        <div class="reply">
                            <textarea style="resize:none"></textarea>
                            <div class="buttonGroup clearfix">
                                <a class="reply_btn reply_btn1">发表</a>
                                <a class="reply_btn reply_btn2" @click="setHide">取消</a>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <div class="empty-block" v-else>暂无主题</div>
            <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; getData()">加载更多</div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'projectDetailDiscuss',
    data() {
        return {
            items: {},
            search: { input: '', select: '' },
            data: [],
            title: '',
            totalNum: '',
            pageNum: 1
        }
    },
    mounted() {
        this.getData(this.$route.query.projectId)
        switch (this.$route.query.discussType) {
            case '2':
                this.title = '教师答疑区'
                break
            case '1':
                this.title = '综合讨论区'
                break
        }
    },
    methods: {
        setShow: function (index) {
            const replys = document.querySelectorAll('.reply')
            replys.forEach(function (i) {
                i.className = 'reply'
            })
            replys[index].className = 'reply reply-show'
        },
        setHide: function () {
            const replys = document.querySelectorAll('.reply')
            replys.forEach(function (i) {
                i.className = 'reply'
            })
        },
        getData: function () {
            this.$http.post('maker/projectDiscuss/selectDiscussPager?pageSize=5&pageNum=' + this.pageNum,
                { discussType: this.$route.query.discussType, projectId: this.$route.query.id, pId: -1 }
            ).then((res) => {
                if (res.data.code === 200) {
                    this.data.push(...res.data.entity.resultData)
                    this.totalNum = res.data.entity.totalNum
                }
            })
        }
    }
}
</script>

<style lang='scss'>
// .discuss-broad-search {
//     .el-input-group > .el-input__inner {
//         height: 32px;
//         margin: 0;
//         color: #A6A6A6;
//         width: 186px;
//     }
//     .el-input__inner {
//         width: 104px;
//     }
//     .el-button {
//         background: #C9C9C9;
//         .el-icon-search:before {
//             content: '搜索';
//         }
//     }
//     input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
//         color: #A7A7A7;
//     }
// }
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/projectInitiate.scss';

.allTopics {
    margin-top: 30px;
    font-size: 16px;
    .allTopics_title {
        padding: 10px 0;
        border-bottom: 1px solid #CCCCCC;
    }
    .allTopics_ul {
        font-size: 14px;
        .allTopics_list {
            min-height: 100px;
            padding: 20px 0;
            box-sizing: border-box;
            border-bottom: 1px dashed #CACACA;
            .allTopics_p1, .allTopics_p2, .allTopics_p3  {
                height: 35%;
                line-height: 2;
            }
            .allTopics_p2 {
                font-size: 12px;
                span {
                    display: inline-block;
                    width: 50px;
                }
            }
            .allTopics_p3 {
                width: 20%;
                font-size: 12px;
                text-align: right;
                color: #AAAAAA;
                a {
                    color: #AAAAAA;
                }
            }
            .reply {
                width: 860px;
                height: 0;
                transition: height .5s;
                textarea {
                    display: none;
                }
                .reply_btn {
                    display: none;
                }
            }
            .reply-show {
                display: block;
                height: 180px;
                border: 1px solid #F2F2F2;
                textarea {
                    display: inline-block;
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #F2F2F2;
                    box-sizing: border-box;
                    font-size: 14px;
                    height: 130px;
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
                        margin-right: 20px;
                        text-align: center;
                    }
                    .reply_btn1 {
                        color: #fff;
                    }
                    .reply_btn2 {
                        background-color: #fff;
                    }
                }
            }
        }
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
</style>
