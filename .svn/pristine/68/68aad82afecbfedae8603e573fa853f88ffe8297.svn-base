<template>
    <div id="studioMemberTopic">
        <div class="bgw topic-top">
            <nav class="tab-box">
                <v-tabs :tabs="tabs" :cur_tab="cur_tab" @cur_tab="setCurTab"></v-tabs>
                <div class="btn-box" v-if="isMember">
                    <a href="javaScript:;" @click="goAnchor('#initiate-title')">发起话题</a>
                </div>
            </nav>
            <section class="topic_list">
                <div class="list-header clearfix">
                    <div class="msg-box fr clearfix" style="color:#3e3e3e;font-size: 16px;">
                        <div class="author-time fl">
                            <p class="name">作者/创建时间</p>
                        </div>
                        <div class="reply-hot fl">
                            <p class="name">回复/人气</p>
                        </div>
                        <div class="last-reply fl">
                            <p class="name">最后回复</p>
                        </div>
                        <div class="fl" style="width:100px;" v-if="isMember">
                            <p class="name">操作</p>
                        </div>
                    </div>
                </div>
                <ul v-if="topicDatas.length > 0">
                    <li class="clearfix" v-for="(item,index) in topicDatas" :key="index">
                        <p class="topic-title fl">
                            <router-link :title="item.title" :to="{path:'topic/detail', query:{ id: $route.query.id, topicId: item.id }}">
                                {{item.title | textOverflow(28)}} <i class="icon-topic-hot" v-if="item.isHot === '1'"></i>
                            </router-link>
                        </p>
                        <div class="msg-box fr clearfix">
                            <div class="author-time fl">
                                <p class="name">{{item.userName}}</p>
                                <p class="time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm')}}</p>
                            </div>
                            <div class="reply-hot fl">
                                <p class="hot">{{item.replyTotal ? item.replyTotal : 0}}/{{item.browseNum ? item.browseNum : 0}}</p>
                            </div>
                            <div class="last-reply fl" v-if="item.lastReplyUser">
                                <p class="name">{{item.lastReplyUser}}</p>
                                <p class="time">{{item.lastReplyDate | dateFormat('yyyy-MM-dd HH:mm')}}</p>
                            </div>
                            <div v-else class="no-reply fl">暂无回复</div>
                            <div class="option fl" v-if="isMember">
                                <span class="hot" @click="setHot(item.id,'0',index)" v-if="item.isHot === '1'">取消热门 </span>
                                <span class="hot" @click="setHot(item.id,'1',index)" v-else>设为热门 </span>
                                <del-popover title="删除" class="delete" :delData="{ url:'maker/topic/delete', params:{id: item.id}, name:'话题' }" @callback="getTopicList"></del-popover>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty-block">暂无话题</div>
                <v-pagination :param="param" @callback="changePage"></v-pagination>
            </section>
        </div>
        <!-- 发起话题 -->
        <div id="initiate-topic" class="bgw" v-if="isMember">
            <h5 id="initiate-title" class="initiate-head">
                <a href="javaScript:;">发起话题</a>
            </h5>
            <section class="form-box">
                <el-form ref="form" :model="form" label-width="60px" :rules="rules">
                    <!-- 话题名称 -->
                    <el-row>
                        <el-form-item label="话题" prop="title">
                            <el-col :span="24">
                                <el-input placeholder="请输入说明，最多40字" v-model="form.title"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="内容" class="edit-box" prop="contentText">
                            <el-col :span="24">
                                <el-input v-model="form.contentText" v-show="false"></el-input>
                                <div id="editor-trigger" style="height: 200px">
                                </div>
                            </el-col>
                        </el-form-item>
                    </el-row>
                    <el-form-item class="btn clearfix">
                        <button class="publish-btn" @click="initiateTopic" type="button" >发表</button>
                    </el-form-item>
                </el-form>
            </section>
        </div>
    </div>
</template>

<script>
    import { editor } from '@/mixin/wangEditor.js'
    import { scrollToTop } from '@/js/scrollToTop.js'
    import { studioTopicList, studioTopicAdd } from '@/service/studio.js'
    import { topicIsHot } from '@/service/topic.js'
    import tabs from 'Common/tabs.vue'
    import pagination from 'Common/pagination.vue'
    import delPopover from 'Common/del_popover.vue'

    export default {
        components: {
            'v-tabs': tabs,
            'del-popover': delPopover,
            'v-pagination': pagination
        },
        mixins: [editor],
        data() {
            return {
                param: {
                    totalNum: 0,
                    pageSize: 10,
                    pageNum: 1
                },
                tabs: [
                    { name: '全部话题', type: 0 },
                    { name: '热门话题', type: 1 }
                ],
                cur_tab: 0,
                form: {
                    title: '',
                    content: '',
                    contentText: ''
                },
                placeholder: '请输入主题内容，最多500字',
                topicType: '3',
                rules: {
                    title: [
                        { required: true, message: '请输入话题标题', trigger: 'change' },
                        { max: 40, message: '不超过40字符', trigger: 'change' }
                    ],
                    contentText: [
                        { required: true, message: '请输入话题内容', trigger: 'change' },
                        { max: 1000, message: '输入内容过多', trigger: 'change' }
                    ]
                },
                txtLength: '',
                overTips: '',
                topicDatas: []
            }
        },
        props: ['isMember'],
        created() {
        },
        mounted() {
            const self = this
            window.setTimeout(function () {
                if (self.isMember) {
                    self.editorInit()
                }
            }, 300)
            this.getTopicList()
        },
        methods: {
            editorInit() {
                const self = this
                this.initEditor()
                this.editor.onchange = function () {
                    self.form.content = this.$txt.html()
                    self.form.contentText = this.$txt.text()
                }
            },
            goAnchor(selector) {
                const anchor = this.$el.querySelector(selector)
                window.scrollTo(0, anchor.offsetTop)
                // document.body.scrollTop = anchor.offsetTop
            },
            setCurTab(index) {
                this.cur_tab = index
                this.getTopicList()
            },
            changePage(val) {
                this.param.pageNum = val
                this.getTopicList()
            },
            /*
             * 获取话题列表
             * busId: "b741b06dc1de448aa19e3328e6e24bfb", 业务id
             * topicType: "2", 话题类别(1:班级话题,2:兴趣组)'
             * IsHot:"0" 是否为热门话题 0 不是，1：是
             */
            getTopicList() {
                const datas = {
                    busId: this.$route.query.id,
                    topicType: this.topicType,
                    isHot: this.cur_tab.toString()
                }
                studioTopicList(datas, { pageSize: 10, pageNum: this.param.pageNum }).then((res) => {
                    if (res.data.code === 200) {
                        this.topicDatas = res.data.entity.resultData
                        this.param.totalNum = res.data.entity.totalNum
                    }
                })
            },
            /*
             * 发起话题
             * busId: 业务Id
             * topicType: 话题类别（1：班级话题，2：兴趣组）
             * title: 话题标题
             * conten: 话题内容
             */
            initiateTopic() {
                if (localStorage.getItem('loginInfo')) {
                    this.$refs.form.validate((valid) => {
                        if (valid) {
                            const params = {
                                busId: this.$route.query.id,
                                topicType: this.topicType,
                                title: this.form.title,
                                content: this.form.content
                            }
                            studioTopicAdd(params).then((res) => {
                                if (res.data.code === 200) {
                                    this.showMessage('success', '发表成功')
                                    this.editor.$txt.html('<p><br></p>')
                                    this.$refs.form.resetFields()
                                    this.getTopicList()
                                    scrollToTop()
                                    this.$emit('getInterestDetail')
                                } else {
                                    this.showMessage('error', res.data.msg)
                                }
                            })
                        } else {
                            this.showMessage('warning', '请按要求填写完整信息')
                            return false
                        }
                    })
                } else {
                    this.showMessage('warning', '请登录后再发表话题哦')
                }
            },
            /*
             * 设置热门
             * id: 话题id
             * isHot: 是否为热门
             */
            setHot(id, isHot, index) {
                topicIsHot({ id: id, isHot: isHot }).then((res) => {
                    if (res.data.code === 200) {
                        this.showMessage('success', '设置成功')
                        this.topicDatas[index].isHot = isHot
                    } else {
                        this.showMessage('warning', res.data.msg)
                    }
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
    #studioMemberTopic{
        position: relative;
        padding-top: 4px;
        .topic-top{
            padding: 10px 0 20px;
        }
        .btn-box{
            position: absolute;
            top:14px;
            right: 15px;
            a{
                display: inline-block;
                height: 32px;
                width: 96px;
                border-radius: 3px;
                text-align: center;
                line-height: 32px;
                font-size: 14px;
                color: #fff;
                background-color: nth($default-color, 2);
            }
        }
        .btn-box:hover{
            opacity: 0.75;
        }
    }
    #initiate-topic{
        padding:10px 0 20px;
        margin-top: 20px;
        .initiate-head{
            border-bottom: 1px solid #c9c9c9;
            height: 26px;
            margin-top:5px;
            a{
                font-size: 16px;
                padding: 0 12px 7px;
                color: nth($default-color, 2);
                border-bottom: 2px solid nth($default-color, 2);
            }
        }
        .form-box{
            margin-top: 30px;
            padding: 0 15px;
        }
    }

    *{
        box-sizing: border-box;
    }
    .topic_list{
        padding: 0 15px;
        .list-header{
            border-bottom: 1px dashed #c9c9c9;
            padding: 20px 0 10px;
        }
        ul{
            li{
                height: 70px;
                padding: 17px 0;
                border-bottom: 1px dashed #c9c9c9;
                .topic-title{
                    a{
                        line-height: 35px;
                        font-size: 20px;
                        font-weight: lighter;
                        i{
                            vertical-align: top;
                            font-size: 22px;
                        }
                    }
                    a:hover{
                        color: nth($default-color, 2);
                    }
                }
            }
        }
        .msg-box{
            text-align: center;
            color: #999;
            font-size: 14px;
            .name{
            }
            .time{
                font-size: 12px;
                margin-top: 9px;
            }
            .author-time{
                width: 103px;
                margin-right: 30px;
            }
            .reply-hot{
                width: 71px;
                margin-right: 30px;
                .hot{
                    font-size: 18px;
                    line-height: 35px;
                }
            }
            .last-reply{
                width: 102px;
            }
            .no-reply{
                line-height: 35px;
                width: 102px;
            }
            .option{
                width: 100px;
                line-height: 35px;
                .hot{
                    font-size: 14px;
                }
                .hot:hover{
                    color: nth($default-color, 2);
                }
            }
        }
    }
</style>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
    #studioMemberTopic{
        .form-box{
            .el-form-item__label{
                font-size: 16px;
            }
            .el-input__inner{
                border-radius: 3px;
                height: 38px;
            }
            .publish-btn{
                width: 96px;
                height: 32px;
                line-height: 32px;
                border-radius: 3px;
                background-color: nth($default-color, 1);
                border: none;
                color: #fff;
            }
            .edit-box{
                .el-form-item__content{
                    border:1px solid #c9c9c9;
                    .wangEditor-container{
                        border: none;
                    }
                    .btn{
                        .el-form-item__content{
                            text-align: right;
                            border:none;
                        }
                    }
                }
            }
        }
        #delPopover {
            .delete-btn{
                font-size: 14px;
            }
        }
    }
</style>