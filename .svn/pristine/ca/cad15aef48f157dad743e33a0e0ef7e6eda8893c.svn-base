<template>
    <section class="dpd15 dicuss-theme">
        <div class="title">
            <div class="title_l fl">
                <router-link :to="{ path: 'discuss', query: { 'id': $route.query.id }}">讨论区</router-link>
                >
                <span>{{title}}</span>
            </div>
            <div class="discuss-broad-search    title_r fr">
                <el-input v-model="search.input" @keyup.enter.native="handleSearch" placeholder="搜索主题">
                    <el-select v-model="search.select" slot="prepend" placeholder="全部讨论区">
                        <el-option label="全部讨论区" value=""></el-option>
                        <el-option label="教师答疑区" value="2"></el-option>
                        <el-option label="综合讨论区" value="1"></el-option>
                    </el-select>
                    <el-button @click="handleSearch" slot="append" icon="search"></el-button>
                </el-input>
            </div>
        </div>
        <router-link class="initiateTheme" :to="{ path: 'initiate', query: {'id': $route.query.id, 'discussType': $route.query.discussType} }">
            <i class="icon-initiateTheme"></i>发起主题
        </router-link>
        <div class="allTopics">
            <h3 class="allTopics_title">全部主题</h3>
            <ul class="allTopics_ul">
                <li class="allTopics_list" v-for="(item,index) in data" :key="index">
                    <router-link :to="{ path: 'discussDetail', query: {'id': $route.query.id, 'pId': item.id, 'discussType': item.discussType}}">
                        <p class="allTopics_p1">{{item.title || '---'}}</p>
                        <p class="allTopics_p2">
                            <span class="name">{{item.createName}}</span>
                            <span class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</span>
                        </p>
                        <p class="allTopics_p3">
                            <span class="icon-btn-browse table-cell" title="浏览"> {{item.browseNum || 0}}</span>
                            <span class="icon-btn-reply table-cell" title="回复"> {{item.replyNum || 0}}</span>
                            <span class="icon-btn-thumbsup table-cell" title="点赞"> {{item.praiseNum || 0}}</span>
                        </p>
                        <div :class="{'reply-show': curIndex === index}" class="reply">
                            <textarea style="resize:none"></textarea>
                            <div class="buttonGroup clearfix">
                                <a class="reply_btn reply_btn1">发表</a>
                                <a class="reply_btn reply_btn2" @click="curIndex = -1">取消</a>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
            <p v-if="data.length === 0" class="no-data">暂无数据</p>
            <div class="load-more" v-if="totalNum > data.length" @click="pageNum++; getData()">加载更多</div>
        </div>
    </section>
</template>

<script>
    import { requestDiscussList } from '@/service/course.js'

    export default {
        name: 'courseDetailDiscuss',
        inheritAttrs: false,
        data() {
            return {
                items: {},
                search: { input: '', select: '' },
                curIndex: -1,
                data: [],
                title: '',
                totalNum: '',
                pageNum: 1
            }
        },
        mounted() {
            this.getData(this.$route.query.id)
            const o = { 1: '综合讨论区', 2: '教师答疑区' }
            this.title = o[this.$route.query.discussType] || ''
        },
        methods: {
            async getData() {
                const { id, discussType } = this.$route.query
                const res = await requestDiscussList({
                    discussType,
                    pageSize: 5,
                    pageNum: this.pageNum,
                    courseId: id,
                    pId: '-1',
                })
                if (res.data.code === 200) {
                    const _entity = res.data.entity || {}
                    this.data.push(...(_entity.resultData || []))
                    this.totalNum = _entity.totalNum || 0
                }
            },
            handleSearch() {
                this.$emit('on-search', this.search)
            },
        }
    }
</script>

<style lang='scss'>
    .discuss-broad-search {
        background-color: #fff;
        .el-input-group > .el-input__inner {
            color: #A6A6A6;
            width: 177px;
            border: none;
        }
        .el-input__inner {
            width: 114px;
            border: none;
        }
        .el-button {
            background: #C9C9C9;
            .el-icon-search:before {
                content: '搜索';
            }
        }
        .el-input__icon.is-reverse + .el-input__inner {
            border-color: #eee;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            color: #A7A7A7;
        }
    }

    .dicuss-theme {
        .title {
            .el-input-group__append {
                border: 0px;
            }
            .el-input-group__prepend {
                border: 0px;
            }
        }
    }
</style>
<style lang='scss' scoped>
    @import '~@/assets/css/scss/vars';

    @each $color-key,
    $color-value in $color-data {
        .theme-#{$color-key} {
            .plate_list {
                .list_p1 {
                    color: $color-value;
                }
                .allTopics_list {
                    .allTopics_p2 {
                        span {
                            color: $color-value;
                        }
                    }
                }
                .reply-show textarea:focus {
                    border: 1px solid $color-value;
                }
                .buttonGroup {
                    .reply_btn1 {
                        background-color: $color-value;
                    }
                    .reply_btn2 {
                        color: $color-value;
                    }
                }
            }
        }
    }

    .title {
        height: 46px;
        line-height: 38px;
        padding: 4px 12px;
        box-sizing: border-box;
        background-color: #EEEEEE;
        .title_l {
            a:nth-last-child(1) {
                color: #999999;
            }
        }
        .title_r {
            line-height: 1;
            border: 1px solid #C9C9C9;
            width: 352px;
        }
    }

    .initiateTheme {
        position: relative;
        display: inline-block;
        margin-top: 20px;
        width: 214px;
        height: 46px;
        line-height: 46px;
        background-color: $theme-color;
        text-align: center;
        color: #fff;
        font-size: 16px;
        border-radius: $button-radiu;
        &:hover {
            opacity: 0.75;
        }
        .icon-initiateTheme {
            margin-right: 4px;
        }
    }

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
                padding: 20px;
                box-sizing: border-box;
                border-bottom: 1px dashed #CACACA;
                .allTopics_p1,
                .allTopics_p2,
                .allTopics_p3 {
                    height: 35%;
                    line-height: 2;
                }
                .allTopics_p1 {
                    word-wrap: break-word;
                    word-break: break-all;
                }
                .allTopics_p2 {
                    font-size: 12px;
                    span {
                        display: inline-block;
                    }
                    .name {
                        color: $theme-color;
                    }
                    .time {
                        margin-left: 12px;
                    }
                }
                .allTopics_p3 {
                    font-size: 12px;
                    text-align: right;
                    color: #AAAAAA;
                    span {
                        display: inline-block;
                        min-width: 50px;
                        margin-right: 10px;
                        text-align: left;
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
        .no-data {
            font-size: 12px;
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
