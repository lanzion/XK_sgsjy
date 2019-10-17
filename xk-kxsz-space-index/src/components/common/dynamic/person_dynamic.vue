<template>
    <!-- <ul clachildrenamic-list"> -->
    <transition-group class="dynamic-list" name="dynamic-item" mode="out-in" tag="ul">
        <li class="dynamic-item-detail" v-for="(item, index) in filterDelItems(dynamicList.resultData)" :key="item.id">
            <section class="dynamic-item-creator table-layout">
                <img :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-creator-head circle table-cell">
                <div class="dynamic-creator-info table-cell">
                    <span class="dynamic-creator-name">{{item.createName}}</span>
                    <time class="dynamic-item-time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time><span class="dynamic-item-motion">发布了{{dynamicType[item.dynamicType-1]}}</span>
                </div>
                <div class="dynamic-btn-group table-cell">
                    <v-report v-if="!item.report && item.createId!==loginInfo.userInfo.id" :report-data="{'url': reportApi, params: {'dynamicId': item.id}}"></v-report>
                    <v-del-popover v-if="item.createId==loginInfo.userInfo.id" title="删除" class="delete" :isIcon="false" :delData="{ url:'maker/dynamic/space/delete', params:{id: item.id}, name:'动态'}" @callback="delDynamicItem(item.id)"></v-del-popover>
                </div>
            </section>
            <article class="dynamic-item-content">
                <a target="_blank" :href="item.url">
                    <p>{{item.title}}</p>
                    <img class="dynamic-item-img" v-if="item.image_url" :src="getFileUrl(item.image_url)">
                </a>
            </article>
            <div class="dynamic-item-statistics clearfix">
                <span class="fl"><i class="icon-i-browse"></i>浏览({{item.browseNum}})</span>
                <div class="fr">
                    <button class="i-button" @click="spreadReplyBox([index])"><i class="icon-btn-i-reply"></i>({{item.commentCount}})</button>
                    <button class="i-button" :class="{'active': item.praise}" @click="praiseItem(index)"><i class="icon-btn-i-thumbsup"></i>({{item.praiseCount}})</button>
                </div>
            </div>
            <section class="dynamic-item-praiseList" v-if="item.praiseCount>0">
                <i class="icon-btn-i-thumbsup"></i>
                <template v-for="(praiseItem, p) in item.praiseList.resultData">
                    <a class="dynamic-item-praiseUser">{{praiseItem.createName}}</a>
                    <template v-if="p !== item.praiseList.resultData.length-1">、</template>
                </template>
                共<span class="dynamic-item-praiseCount">{{item.praiseCount}}</span>人觉得很赞
                <a class="load-more-praise" v-if="item.praiseList.totalNum > item.praiseList.resultData.length" @click="getPraiseList(index)">查看所有点赞>></a>
            </section>
            <v-send-reply ref="sendComment" v-show="item.isShow" @submitForm="addComment" :isFocus="item.isShow" :index="[index]" :params="{dynamicId: item.id}"></v-send-reply>
            <ul class="dynamic-item-commentList" v-if="item.commentList.resultData.length>0" v-for="(commentItem, c) in item.commentList.resultData">
                <li class="dynamic-comment-item clearfix">
                    <img :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-commenter-head circle fl">
                    <article class="dynamic-comment-detail">
                        <a class="dynamic-comment-user">{{commentItem.createName}}</a>：
                        <p class="dynamic-comment-content">{{commentItem.content}}</p>
                        <div class="dynamic-comment-other">
                            <time class="dynamic-comment-time">{{commentItem.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                            <i class="icon-i-reply" title="回复" @click="spreadReplyBox([index, c])"></i>
                        </div>
                    </article>
                    <a class="load-more-reply" v-if="commentItem.comments.totalNum > commentItem.comments.resultData.length" @click="getReplyList(index, c)">展开更多回复>></a>
                    <ul class="dynamic-item-commentList2nd dynamic-item-commentList" v-if="commentItem.comments.resultData.length>0">
                        <li class="dynamic-comment-item clearfix" v-for="(commentItem2nd, c2) in commentItem.comments.resultData">
                            <img :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-commenter-head circle fl">
                            <article class="dynamic-comment-detail">
                                <a class="dynamic-comment-user">{{commentItem2nd.createName}}</a>：
                                <p class="dynamic-comment-content">{{commentItem2nd.content}}</p>
                                <div class="dynamic-comment-other">
                                    <time class="dynamic-comment-time">{{commentItem2nd.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                                    <i class="icon-i-reply" title="回复" @click="spreadReplyBox([index, c, c2])"></i>
                                </div>
                            </article>
                        </li>
                    </ul>
                    <div class="dynamic-item-reply-box" v-show="commentItem.isShow">
                        <v-send-reply ref="sendReply" @hideInput="hideReplyBox" @submitForm="addComment" :isFocus="commentItem.isShow" :index="[index, c]" :params="replyParams"></v-send-reply>
                    </div>
                </li>
            </ul>
            <div class="load-more" v-if="item.commentList.totalNum > item.commentList.resultData.length" @click="getCommentsList(index)"><i class="icon-btn-i-more"></i>加载更多</div>
        </li>
        <div key="load-more" class="load-more" v-if="dynamicList.totalNum > dynamicList.resultData.length" @click="getDynamicList({pageSize: pager.pageSize, pageNum: dynamicList.nextPageNum})"><i class="icon-btn-i-more"></i>加载更多</div>
    </transition-group>
    <!-- </ul> -->
</template>

<script>
import { loginInfo } from '@/js/getUserInfo.js'
import * as dynamicXhr from '@/service/dynamic.js'
import delPopover from '@/components/common/del_popover.vue'
import sendReply from '@/components/common/button/send_reply.vue';
import report from '@/components/common/report.vue'
export default {
    name : 'personDynamic',
    template: '',
    data() {
        return {
            loginInfo: loginInfo,
            pager: {
                pageSize: 10,
                pageNum: 1
            },
            reportApi: 'maker/children/space/report',
            dynamicType: [
                '活动',
                '作品',
                '文章',
                '课程',
                '课题',
                '资源',
                '项目'
            ],
            dynamicList: {
                resultData: []
            },
            replyParams: {
                dynamicId: '',
                replyCommentId: '',
                pId: ''
            },
            delDynamicList: []
        }
    },
    components: {
        'v-del-popover': delPopover,
        'v-send-reply': sendReply,
        'v-report': report
    },
    mounted() {
        this.getDynamicList(this.pager);
    },
    methods: {
        /*
         * 过滤删除的动态列表
         */
        filterDelItems(items) {
            let _delDynamicList = this.delDynamicList;
            return items.filter(function (item, index) {
                if (!_delDynamicList.includes(item.id)) {
                    return item
                }
            })
        },
        /*
         * 删除动态
         * id: 动态ID
         */
        delDynamicItem(id) {
            this.delDynamicList.push(id);
            this.$set(this.$data.dynamicList, 'totalNum', --this.dynamicList.totalNum)
        },
        /*
         * 获取动态列表
         * createId: 访问某用户空间时该用户ID
         */
        getDynamicList(params) {
            dynamicXhr.requestDynamicList(params).then(response => {
                if (response.data.code == 200) {
                    response.data.entity.resultData.unshift(...Object.assign([], this.dynamicList.resultData));
                    this.dynamicList = Object.assign(this.dynamicList, response.data.entity)
                    if (loginInfo !== null) {
                        this.dynamicList.resultData = this.dynamicList.resultData.filter( (item, index) => {
                            item.inPraiseList = item.praiseList.resultData.some(x => x.createId == loginInfo.userInfo.id);
                            return item;
                        });
                    }
                }
            })
        },
        /*
         * 获取评论列表
         * dynamicId: 动态ID
         */
        getCommentsList(index) {
            let item = this.dynamicList.resultData[index];
            dynamicXhr.requestCommentsList({
                pageNum: item.commentList.nextPageNum,
                pageSize: this.pager.pageSize,
                dynamicId: item.id
            }).then(response => {
                let _commentList = Object.assign([], item.commentList.resultData).filter( item => item.updateTime != undefined )
                response.data.entity.resultData.unshift(..._commentList);
                item.commentList = Object.assign(item.commentList, response.data.entity);
            })
        },
        /*
         * 获取回复列表
         * dynamicId: 动态ID
         * replyCommentId: 回复顶层ID
         */
        getReplyList(DynamicIndex, commentIndex) {
            let dItem = this.dynamicList.resultData[DynamicIndex];
            let cItem = dItem.commentList.resultData[commentIndex];
            dynamicXhr.requestReplyList({
                pageNum: cItem.comments.nextPageNum,
                pageSize: this.pager.pageSize,
                dynamicId: dItem.id,
                replyCommentId: cItem.id
            }).then(response => {
                let _replyList = Object.assign([], cItem.comments.resultData).filter( item => item.updateTime != undefined )
                response.data.entity.resultData.unshift(..._replyList);
                cItem.comments = Object.assign(cItem.comments, response.data.entity);
            })
        },
        /*
         * 获取点赞列表
         * dynamicId: 动态ID
         */
        getPraiseList(index) {
            let item = this.dynamicList.resultData[index];
            dynamicXhr.requestPraiseList({
                pageNum: 1,
                pageSize: item.praiseCount,
                dynamicId: item.id
            }).then(response => {
                // item.praiseList = response.data.entity.resultData;
                console.log(response.data)
            })
        },
        /*
         * 点赞/取消点赞
         * dynamicId: 动态ID
         */
        praiseItem(index) {
            if (loginInfo !== null) {
                let item = this.dynamicList.resultData[index];
                let url = item.praise ? 'maker/praise/cancel' : 'maker/praise/do';

                this.$http.post(url,
                    { "busId": item.id }
                ).then( response => {
                    if (response.data.code == 200) {
                        item.praise = !item.praise;
                        if (item.praise) {
                            // 更新点赞统计
                            this.$set(item, 'praiseCount', ++item.praiseCount)
                            this.showMessage('点赞成功', 'success');
                            // 更新点赞列表
                            if (item.inPraiseList != true) {
                                item.praiseList.resultData.unshift(
                                    {
                                        createId: loginInfo.userInfo.id,
                                        createName: loginInfo.userInfo.userName
                                    }
                                );
                            }
                            item.inPraiseList = true;
                        } else {
                            // 更新点赞统计
                            this.$set(item, 'praiseCount', --item.praiseCount)
                            this.showMessage('取消点赞', 'info');
                            // 更新点赞列表
                            if (item.inPraiseList) {
                                item.praiseList.resultData = item.praiseList.resultData.filter( x => x.createId !== loginInfo.userInfo.id );
                            }
                            item.inPraiseList = false;
                        }
                    } else {
                        this.showMessage(response.data.msg, 'error');
                    }
                })
            }
        },
        /*
         * 添加回复
         * dynamicId: 动态ID
         * content: 回复内容
         * pId: 回复父ID (二级回复)
         * replyCommentId: 该条回复顶层回复ID (二级回复)
         */
        addComment(data, level) {
            let _data = Object.assign({}, data);
            dynamicXhr.addComment(data).then(response => {
                if (response.data.code == 200) {
                    this.showMessage('回复成功', 'success');

                    // 更新列表数据
                    this.dynamicList.resultData[level[0]].commentCount++;

                    _data.id = response.data.entity;
                    _data.createId = loginInfo.userInfo.id;
                    _data.createName = loginInfo.userInfo.userName;
                    _data.createDate = new Date().getTime();
                    _data.headPortrait = loginInfo.userInfo.avatar;

                    if (level.length === 1) {   // 评论
                        _data.comments = {};
                        _data.comments.resultData = [];
                        this.dynamicList.resultData[level[0]].commentList.resultData.push(_data);
                        // 重置表单
                        this.$refs.sendComment[level[0]].resetForm();
                    } else {                    // 回复
                        this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].comments.resultData.push(_data);
                        // 重置表单
                        this.$refs.sendReply.forEach((x, i) => x.resetForm());
                    }
                }
            })
        },
        /*
         * 展开输入框
         */
        spreadReplyBox(level) {
            let flag, item;
            let pItem = this.dynamicList.resultData[level[0]];
            let items = pItem.commentList.resultData;

            if (level.length == 1) {
                // 评论
                flag = pItem.isShow;
                flag = !(flag == undefined ? false : flag);
                this.$set(pItem, 'isShow', flag);
                items.forEach( (x) => {
                    this.$set(x, 'isShow', false);
                    return x;
                });
                if (flag) {
                    this.$refs.sendComment[level[0]].focusInput();
                }
            } else {
                item = items[level[1]];
                // flag = item.isShow;
                // flag = !(flag == undefined ? false : flag);
                this.$set(pItem, 'isShow', false);
                items.forEach( (x, i) => {
                    if (i == level[1]) {
                        this.$set(x, 'isShow', true);
                    } else {
                        this.$set(x, 'isShow', false);
                    }
                    return x;
                });
                this.$refs.sendReply[level[1]].content = '';
                this.$refs.sendReply[level[1]].focusInput(true);


                this.$set(this.replyParams, 'dynamicId', this.dynamicList.resultData[level[0]].id);
                this.$set(this.replyParams, 'replyCommentId', item.id);

                if (level.length == 2) {
                    this.$set(this.replyParams, 'pId', this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].id);
                } else if (level.length == 3) {
                    this.$set(this.replyParams, 'pId', this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].comments.resultData[level[2]].id);
                }
            }
        },
        /*
         * 隐藏输入框
         */
        hideReplyBox(level) {
            let pItem = this.dynamicList.resultData[level[0]];

            switch(level.length) {
                case 1:
                    this.$set(pItem, 'isShow', false);
                    break;
                case 2:
                case 3:
                    this.$set(pItem.commentList.resultData[level[1]], 'isShow', false);
                    break;
            }
        },
        /*
         * 错误提示信息
         */
        showMessage(msg, type) {
            type = type == undefined ? 'error' : type;
            this.$message({
                message: msg,
                type: type
            });
        }
    }
}
</script>
<style lang="scss" scoped>
// 过渡动画
.dynamic-item-detail {
    transition: opacity .5s, transform .5s;
}
.dynamic-item-enter,
.dynamic-item-leave-active {
    opacity: 0;
    transform: translateY(-30px);
}
.dynamic-item-leave-active {
    position: absolute;
}

$big-head-size: 50px;
$small-head-size: 40px;
.dynamic-item-detail {
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;

    .dynamic-item-creator {
        margin-bottom: 20px;

        .dynamic-creator-head {
            width: $big-head-size;
            height: $big-head-size;
            margin-right: 1em;
        }

        .dynamic-creator-info {
            width: 100%;
            line-height: 1.5;

            .dynamic-creator-name {
                display: block;
                font-size: 14px;
            }
            .dynamic-item-time,
            .dynamic-item-motion {
                color: #999;
            }
            .dynamic-item-time {
                margin-right: .5em;
            }
        }
    }

    &:hover {
        .dynamic-btn-group {
            display: table-cell;
        }
    }
    .dynamic-btn-group {
        display: none;
        white-space: nowrap;
    }

    .dynamic-item-content {
        font-size: 16px;
        line-height: 1.5;
        text-align: justify;
        cursor: pointer;

        .dynamic-item-img {
            max-width: 100%;
            margin-top: 10px;
        }
    }

    .dynamic-item-statistics,
    .dynamic-item-praiseList,
    .dynamic-item-reply {
        margin-bottom: 10px;
    }

    .dynamic-item-statistics {
        border-bottom: 1px dashed #c9c9c9;
        line-height: 3;

        &,
        .i-button {
            color: #999;
            font-size: 12px;
        }

        [class^="icon-"],
        [class*=" icon-"] {
            margin-right: 4px;
            font-size: 16px;
            vertical-align: text-bottom;
        }

        .i-button {
            border: 0;

            [class^="icon-"],
            [class*=" icon-"] {
                font-size: 14px;
                vertical-align: middle;
            }
        }
    }

    .dynamic-item-praiseList {
        &,
        [class^="icon-"],
        [class*=" icon-"],
        .dynamic-item-praiseUser,
        .load-more-praise {
            color: #00a0e9;
        }

        [class^="icon-"],
        [class*=" icon-"] {
            cursor: default;
        }

        .dynamic-item-praiseUser {
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .dynamic-item-commentList {
        .dynamic-comment-item {

            .dynamic-commenter-head {
                width: $small-head-size;
                height: $small-head-size;
            }

            .dynamic-comment-detail,
            .load-more-reply,
            .dynamic-item-commentList2nd,
            .dynamic-item-reply-box {
                margin-left: $small-head-size + 10;
            }

            .load-more-reply {
                display: block;
                padding: 5px 0 10px;
                color: #00a0e9;
                cursor: pointer;
            }

            .dynamic-comment-detail {
                font-size: 14px;
                line-height: 1.5;
                margin: 0 0 .5em ($small-head-size + 10);

                .dynamic-comment-user {
                    color: #00a0e9;
                }

                .dynamic-comment-content {
                    display: inline;
                    word-wrap: break-word;
                }

                .dynamic-comment-time {
                    color: #999;
                    font-size: 10px;
                    margin-right: 10px;
                }

                [class^="icon-btn-"],
                [class*=" icon-btn-"] {
                    display: none;
                }

                &:hover {
                    [class^="icon-btn-"],
                    [class*=" icon-btn-"] {
                        display: inline-block;
                    }
                }
            }
        }
    }

}
</style>
