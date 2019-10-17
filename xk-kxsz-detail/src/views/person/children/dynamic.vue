<template>
    <div class="dynamic" id="person_dynamic">
        <div class="dynamic-type-box" v-if="loginInfo && userId==loginInfo.userInfo.id">
            <el-select v-model="filterType" placeholder="请选择" @change="filterTypeChange">
                <el-option v-for="(value, key) in filterTypeList" :key="key" :label="value" :value="key"></el-option>
            </el-select>
        </div>
        <transition-group class="dynamic-list pr" name="dynamic-item" mode="out-in" tag="ul">
            <li class="dynamic-item-detail" v-for="(item, index) in dynamicList.resultData" :key="item.id" :id="item.id" ref="dynamicItem" v-if="filterDelItems([item]).length">
                <section class="dynamic-item-creator table-layout">
                    <img v-if="loginInfo && item.createId == $route.query.uid || !Object.keys(identityType).includes(item.identity)" :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-creator-head circle table-cell">
                    <!-- <router-link v-else tag="img" :to="generateRoute(item)" :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-creator-head circle table-cell is-link"></router-link> -->
                    <img v-else @click="toPersonDetail(item, 'createId')" :src="getFileUrl(item.headPortrait) || faceDefault" alt="" class="dynamic-creator-head circle table-cell is-link"></img>
                    <div class="dynamic-creator-info table-cell">
                        <span v-if="loginInfo && item.createId==$route.query.uid || !Object.keys(identityType).includes(item.identity)" class="dynamic-creator-name">{{item.createName}}</span>
                        <p v-else class="dynamic-creator-name">
                            <span @click="toPersonDetail(item, 'createId')" :title="item.createName">
                                {{item.createName}}
                            </span>
<!--                             <router-link :to="generateRoute(item)" :title="item.createName">
                                {{item.createName}}
                            </router-link> -->
                        </p>
                        <time class="dynamic-item-time">{{item.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                        <span class="dynamic-item-motion">{{item.title}}</span>
                    </div>
                    <div class="dynamic-btn-group table-cell">
                        <v-report v-if="!item.report && loginInfo && item.createId!==loginInfo.userInfo.id" :report-data="{'url': reportApi, params: {'dynamicId': item.id}}" :item="item" :callback="doReport"></v-report>
                        <v-del-popover v-if="loginInfo ? item.createId==loginInfo.userInfo.id : false" title="删除" class="delete" :isIcon="false" :delData="{ url:'maker/dynamic/space/delete', params:{id: item.id}, name:'动态'}" @callback="delDynamicItem(item.id)"></v-del-popover>
                    </div>
                </section>
                <article class="dynamic-item-content">
<!--                     <a target="_blank" :href="dynamicType[item.dynamicType]?`#${dynamicType[item.dynamicType].path}${item.busId}`:`${baseUrl}/${item.url.slice(item.url.indexOf('#'))}`">
                        <div class="dynamic-item-content-detail" v-html="item.content"></div>
                        <img class="dynamic-item-img" v-if="item.url && item.imageUrl" :src="getFileUrl(item.imageUrl) || listDefault">
                    </a> -->
                        <div class="dynamic-item-content-detail" v-html="item.content"></div>
                        <img class="dynamic-item-img" v-if="item.url && item.imageUrl" :src="getFileUrl(item.imageUrl) || listDefault">
                </article>
                <div class="dynamic-item-statistics clearfix">
                    <span class="fl"><i class="icon-i-browse"></i>浏览({{item.browseNum}})</span>
                    <div class="fr">
                        <!-- <button class="i-button" @click="spreadReplyBox([index])"><i
                            class="icon-i-reply"></i>({{item.commentCount}})
                        </button> -->
                        <button class="i-button" @click="praiseItem(item)"><i
                            class="icon-btn-i-thumbsup" :class="{'active': item.praise}"></i>({{item.praiseCount}})
                        </button>
                    </div>
                </div>
                <section class="dynamic-item-praiseList" v-if="item.praiseCount>0">
                    <i class="icon-btn-i-thumbsup"></i>
                    <template v-for="(praiseItem, p) in item.praiseList.resultData">
                        <a v-if="loginInfo && praiseItem.createId==$route.query.uid && !Object.keys(identityType).includes(praiseItem.identity)" class="dynamic-item-praiseUser">{{praiseItem.createName}}</a>
                        <a v-else class="dynamic-item-praiseUser">{{praiseItem.createName}}</a>
                        <!-- <router-link v-else :to="generateRoute(praiseItem)" tag="a" class="dynamic-item-praiseUser">{{praiseItem.createName}}</router-link> -->
                        <template v-if="p !== item.praiseList.resultData.length-1">、</template>
                    </template>
                    共<span class="dynamic-item-praiseCount">{{item.praiseCount}}</span>人觉得很赞
                    <a class="load-more-praise" v-if="item.praiseList.totalNum > item.praiseList.resultData.length"
                         @click="getPraiseList(index)">查看所有点赞>></a>
                </section>
                <v-send-reply ref="sendComment" v-show="item.isShow" @submitForm="addComment" :isFocus="item.isShow"
                                            :index="[index]" :params="{dynamicId: item.id}"></v-send-reply>
                <ul class="dynamic-item-commentList" v-if="item.commentList.resultData.length>0" v-for="(commentItem, c) in item.commentList.resultData" :key="c">
                    <li class="dynamic-comment-item clearfix">
                        <img v-if="loginInfo && commentItem.createId==$route.query.uid || !Object.keys(identityType).includes(commentItem.identity)"
                            :src="getFileUrl(commentItem.headPortrait) || faceDefault" alt="" class="dynamic-commenter-head circle fl">
                        <a v-else @click="toPersonDetail(commentItem, 'createId')">
                            <img :src="getFileUrl(commentItem.headPortrait) || faceDefault" alt="" class="dynamic-commenter-head circle fl is-link">
                        </a>
                        <article class="dynamic-comment-detail">
                            <a v-if="loginInfo && commentItem.createId==$route.query.uid || !Object.keys(identityType).includes(commentItem.identity)" class="dynamic-comment-user">{{commentItem.createName}}</a>
                            <a v-else @click="toPersonDetail(commentItem, 'createId')" tag="a" class="dynamic-comment-user">
                                {{commentItem.createName}}
                            </a>
                            ：
                            <p class="dynamic-comment-content">{{commentItem.content}}</p>
                            <div class="dynamic-comment-other">
                                <time class="dynamic-comment-time">{{commentItem.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}</time>
                                <i class="icon-btn-reply" title="回复" @click="spreadReplyBox([index, c])"></i>
                            </div>
                        </article>
                        <a class="load-more-reply" v-if="commentItem.comments.totalNum > commentItem.comments.resultData.length" @click="getReplyList(index, c)">展开更多回复>></a>
                        <ul class="dynamic-item-commentList2nd dynamic-item-commentList" v-if="commentItem.comments.resultData.length>0">
                            <li class="dynamic-comment-item clearfix" v-for="(commentItem2nd, c2) in commentItem.comments.resultData" :key="c2">
                                <img v-if="loginInfo && commentItem2nd.createId==$route.query.uid || !Object.keys(identityType).includes(commentItem2nd.identity)" :src="getFileUrl(commentItem2nd.headPortrait) || faceDefault" alt="" class="dynamic-commenter-head circle fl">
                                <a v-else @click="toPersonDetail(commentItem2nd, 'createId')">
                                    <img :src="getFileUrl(commentItem2nd.headPortrait) || faceDefault" class="dynamic-commenter-head circle fl is-link">
                                </a>
                                <article class="dynamic-comment-detail">
                                    <a v-if="loginInfo && commentItem2nd.createId==$route.query.uid || !Object.keys(identityType).includes(commentItem2nd.identity)" class="dynamic-comment-user">{{commentItem2nd.createName}}</a>
                                    <a v-else @click="toPersonDetail(commentItem2nd, 'createId')" class="dynamic-comment-user">{{commentItem2nd.createName}}
                                    </a>：
                                    <p class="dynamic-comment-content">{{commentItem2nd.content}}</p>
                                    <div class="dynamic-comment-other">
                                        <time class="dynamic-comment-time">{{commentItem2nd.createDate | dateFormat('yyyy-MM-dd HH:mm:ss')}}
                                        </time>
                                        <i class="icon-btn-reply" title="回复" @click="spreadReplyBox([index, c, c2])"></i>
                                    </div>
                                </article>
                            </li>
                        </ul>
                        <div class="dynamic-item-reply-box" v-show="commentItem.isShow">
                            <v-send-reply ref="sendReply" @hideInput="hideReplyBox" @submitForm="addComment" :isFocus="commentItem.isShow" :index="[index, c]" :params="replyParams"></v-send-reply>
                        </div>
                    </li>
                </ul>
                <div class="load-more" v-if="item.commentList.totalNum > item.commentList.resultData.length" @click="getCommentsList(index)"><i class="icon-btn-i-more"></i>加载更多
                </div>
            </li>
            <div key="load-more" class="load-more" v-if="dynamicList.totalNum > dynamicList.resultData.length" @click="getDynamicList({pageSize: pager.pageSize, pageNum: dynamicList.nextPageNum, userId, filterType, currentUserId: loginUId})">
                <i class="icon-btn-i-more"></i>加载更多
            </div>
        </transition-group>
        <p v-if="filterDelItems(dynamicList.resultData).length === 0" class="bgw no-data">暂无动态</p>
    </div>
</template>

<script>
    import getBaseUrl from '@/js/getBaseUrl.js'
    import { loginInfo } from '@/js/getUserInfo.js'
    import * as dynamicXhr from '@/service/dynamic.js'
    import delPopover from '@/components/common/del_popover.vue'
    import sendReply from '@/components/common/button/send_reply.vue'
    import report from '@/components/common/report.vue'

    export default {
        name: 'personDynamic',
        data() {
            return {
                baseUrl: getBaseUrl(),
                loginInfo: loginInfo,
                loginUId: this.$ls.get('loginUId') || this.$route.query.uid,
                filterType: 'all',
                filterTypeList: {
                    all: '所有动态',
                    mine: '我的动态',
                    friends: '好友动态',
                    follow: '我的关注'
                },
                pager: {
                    pageSize: 10,
                    pageNum: 1
                },
                reportApi: '/maker/dynamic/space/report',
                dynamicType: {
                    1: {
                        title: '活动',
                        path: '/space/activity/details/member?id='
                    },
                    2: {
                        title: '作品',
                        path: '/space/works/details?id='
                    },
                    // 3: {
                    //     title: '文章',
                    //     path: ''
                    // },
                    4: {
                        title: '课程',
                        path: '/education/course/detail?id='
                    },
                    5: {
                        title: '课题',
                        path: '/space/subject/research/detail?id='
                    },
                    6: {
                        title: '资源',
                        path: '/space/resource/details?id='
                    },
                    7: {
                        title: '项目',
                        path: '/education/project/detail?id='
                    },
                    8: {
                        title: '兴趣组',
                        path: '/interestsSpace/homePage?id='
                    },
                    9: {
                        title: '需求',
                        path: '/street/lagou/detail/2/instruction?id='
                    },
                    10: {
                        title: '服务',
                        path: '/street/lagou/detail/1/instruction?id='
                    },
                    11: {
                        title: '商业策划',
                        path: '/street/co/plan/detail/info?id='
                    },
                    12: {
                        title: '故事',
                        path: '/street/excellent/story/detail?id='
                    },
                    13: {
                        title: '导师工作室',
                        path: '/studioMemberDetail/homePage?id='
                    },
                    14: {
                        title: '网上实训室',
                        path: '/education/train/detail/?id='
                    },
                },
                identityType: {
                    0: {
                        path: '/space/studentDetail',
                        key: ['id', 'uid']
                    },
                    1: {
                        path: '/space/teacherDetail',
                        key: ['id', 'uid']
                    },
                    2: {
                        path: '/investor/detail',
                        key: 'id'
                    },
                    3: {
                        path: '/investOrg/detail',
                        key: 'id'
                    },
                    4: {
                        path: '/enterprise/detail',
                        key: 'id'
                    },
                    11: {
                        path: '/multSpace/detail',
                        key: 'id'
                    },
                    6: {
                        path: '/educationBureauSpace',
                        key: 'orgId'
                    },
                    7: {
                        path: '/educationBureauSpace',
                        key: 'orgId'
                    },
                    10: {
                        path: '/educationBureauSpace',
                        key: 'orgId'
                    },
                    9: {
                        path: '/schoolSpace',
                        key: 'orgId'
                    }
                },
                dynamicList: {
                    resultData: []
                },
                replyParams: {
                    dynamicId: '',
                    replyCommentId: '',
                    pId: ''
                },
                delDynamicList: [],
                browseDynamicList: []
            }
        },
        components: {
            'v-del-popover': delPopover,
            'v-send-reply': sendReply,
            'v-report': report
        },
        created() {
            this.initData()
            // 鼠标滚动计算位置判断是否已浏览而进行添加动态浏览数
            window.addEventListener('scroll', () => {
                const dynamicItems = this.$refs.dynamicItem || []
                if (dynamicItems.length) {
                    for (let i = 0; i < dynamicItems.length; i++) {
                        const _id = this.filterDelItems(this.dynamicList.resultData)[i].id
                        if (document.body.scrollTop + dynamicItems[i].offsetHeight > dynamicItems[i].offsetTop - 200 && !this.browseDynamicList.includes(_id)) {
                            dynamicXhr.browseDynamic({ id: _id })
                            this.browseDynamicList.push(_id)
                        }
                    }
                }
            })
        },
        methods: {
            initData() {
                const userId = this.userId = this.isAdmin ? this.loginUId : this.$route.query.uid
                const filterType = this.filterType = this.isAdmin ? 'all' : 'mine'

                this.getDynamicList({ ...this.pager, userId, filterType, currentUserId: this.loginUId })
            },
            /*
             * 动态类型改变
             */
            filterTypeChange() {
                this.$set(this.pager, 'pageNum', 1)
                this.$set(this.dynamicList, 'totalNum', 0)
                this.$set(this.dynamicList, 'resultData', [])
                this.getDynamicList({ ...this.pager, userId: this.userId, filterType: this.filterType, currentUserId: this.loginUId })
            },
            /*
             * 过滤删除的动态列表
             */
            filterDelItems(items) {
                const _delDynamicList = this.delDynamicList
                return items.filter(function (item) {
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
                this.delDynamicList.push(id)
                this.$set(this.$data.dynamicList, 'totalNum', --this.dynamicList.totalNum)
            },
            /*
             * 获取动态列表
             * createId: 访问某用户空间时该用户ID
             */
            getDynamicList(params) {
                dynamicXhr.requestDynamicList(params).then((response) => {
                    if (response.data.code === 200) {
                        response.data.entity.resultData.unshift(...Object.assign([], this.dynamicList.resultData))
                        this.dynamicList = Object.assign(this.dynamicList, response.data.entity)
                        if (loginInfo !== null) {
                            this.dynamicList.resultData = this.dynamicList.resultData.filter((item) => {
                                item.inPraiseList = item.praiseList.resultData.some(x => x.createId === loginInfo.userInfo.id)
                                return item
                            })
                        }
                    }
                })
            },
            /*
             * 获取评论列表
             * dynamicId: 动态ID
             */
            getCommentsList(index) {
                const item = this.dynamicList.resultData[index]
                dynamicXhr.requestCommentsList({
                    pageNum: item.commentList.nextPageNum,
                    pageSize: this.pager.pageSize,
                    dynamicId: item.id
                }).then((response) => {
                    const _commentList = Object.assign([], item.commentList.resultData).filter(x => x.updateTime !== undefined)
                    response.data.entity.resultData.unshift(..._commentList)
                    item.commentList = Object.assign(item.commentList, response.data.entity)
                })
            },
            /*
             * 获取回复列表
             * dynamicId: 动态ID
             * replyCommentId: 回复顶层ID
             */
            getReplyList(DynamicIndex, commentIndex) {
                const dItem = this.dynamicList.resultData[DynamicIndex]
                const cItem = dItem.commentList.resultData[commentIndex]
                dynamicXhr.requestReplyList({
                    pageNum: cItem.comments.nextPageNum,
                    pageSize: this.pager.pageSize,
                    dynamicId: dItem.id,
                    replyCommentId: cItem.id
                }).then((response) => {
                    const _replyList = Object.assign([], cItem.comments.resultData).filter(item => item.updateTime !== undefined)
                    response.data.entity.resultData.unshift(..._replyList)
                    cItem.comments = Object.assign(cItem.comments, response.data.entity)
                })
            },
            /*
             * 获取点赞列表
             * dynamicId: 动态ID
             */
            getPraiseList(index) {
                const item = this.dynamicList.resultData[index]
                dynamicXhr.requestPraiseList({
                    pageNum: 1,
                    pageSize: item.praiseCount,
                    dynamicId: item.id
                }).then((response) => {
                    item.praiseList = response.data.entity.resultData
                })
            },
            // 生成对应的路径
            generateRoute(item) {
                const studentCode = '0'
                const { path = '', key } = this.identityType[item.identity || studentCode] || {}
                const query = {}
                const fill = (val) => { query[val] = item[val === 'uid' && 'createId' || val === 'id' && 'orgId' || val] }

                Array.isArray(key) ? key.forEach(fill) : fill(key)
                return { path, query }
            },
            /*
             * 点赞/取消点赞
             * dynamicId: 动态ID
             */
            praiseItem(item) {
                if (loginInfo !== null) {
                    const url = item.praise ? 'maker/praise/cancel' : 'maker/praise/do'

                    this.$http.post(url, { busId: item.id }).then((response) => {
                        if (response.data.code === 200) {
                            item.praise = !item.praise
                            if (item.praise) {
                                // 更新点赞统计
                                this.$set(item, 'praiseCount', ++item.praiseCount)
                                this.showMessage('点赞成功', 'success')
                                // 更新点赞列表
                                if (item.inPraiseList !== true) {
                                    item.praiseList.resultData.unshift(
                                        {
                                            createId: loginInfo.userInfo.id,
                                            createName: loginInfo.userInfo.userName
                                        }
                                    )
                                }
                                item.inPraiseList = true
                            } else {
                                // 更新点赞统计
                                this.$set(item, 'praiseCount', --item.praiseCount)
                                this.showMessage('取消点赞', 'info')
                                // 更新点赞列表
                                if (item.inPraiseList) {
                                    item.praiseList.resultData = item.praiseList.resultData.filter(x => x.createId !== loginInfo.userInfo.id)
                                }
                                item.inPraiseList = false
                            }
                        } else {
                            this.showMessage(response.data.msg, 'error')
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
                const _data = Object.assign({}, data)
                if (!loginInfo) {
                    this.$store.commit('toggleLoginModal', true)
                    // this.$message('您还未登录,请先登录')
                    return
                }
                dynamicXhr.addComment(data).then((response) => {
                    if (response.data.code === 200) {
                        this.showMessage('回复成功', 'success')

                        // 更新列表数据
                        this.dynamicList.resultData[level[0]].commentCount++

                        _data.id = response.data.entity
                        _data.createId = loginInfo.userInfo.id
                        _data.createName = loginInfo.userInfo.userName
                        _data.createDate = response.data.appendInfo.date
                        _data.headPortrait = loginInfo.userInfo.face

                        if (level.length === 1) {     // 评论
                            _data.comments = {}
                            _data.comments.resultData = []
                            this.dynamicList.resultData[level[0]].commentList.resultData.push(_data)
                            // 重置表单
                            this.$refs.sendComment[level[0]].resetForm()
                        } else {                                        // 回复
                            this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].comments.resultData.push(_data)
                            // 重置表单
                            this.$refs.sendReply.forEach(x => x.resetForm())
                        }
                    } else {
                        this.$message.error(response.data.msg || '评论失败,请重试')
                    }
                })
            },
            doReport(item) {
                item.report = true
            },
            /*
             * 展开输入框
             */
            spreadReplyBox(level) {
                let flag
                let item
                const pItem = this.dynamicList.resultData[level[0]]
                const items = pItem.commentList.resultData

                if (level.length === 1) {
                    // 评论
                    flag = pItem.isShow
                    flag = !(flag === undefined ? false : flag)
                    this.$set(pItem, 'isShow', flag)
                    items.forEach((x) => {
                        this.$set(x, 'isShow', false)
                        return x
                    })
                    if (flag) {
                        this.$refs.sendComment[level[0]].focusInput()
                    }
                } else {
                    item = items[level[1]]
                    // flag = item.isShow;
                    // flag = !(flag == undefined ? false : flag);
                    this.$set(pItem, 'isShow', false)
                    items.forEach((x, i) => {
                        if (i === level[1]) {
                            this.$set(x, 'isShow', true)
                        } else {
                            this.$set(x, 'isShow', false)
                        }
                        return x
                    })
                    this.$refs.sendReply[level[1]].content = ''
                    this.$refs.sendReply[level[1]].focusInput(true)

                    this.$set(this.replyParams, 'dynamicId', this.dynamicList.resultData[level[0]].id)
                    this.$set(this.replyParams, 'replyCommentId', item.id)

                    if (level.length === 2) {
                        this.$set(this.replyParams, 'pId', this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].id)
                    } else if (level.length === 3) {
                        this.$set(this.replyParams, 'pId', this.dynamicList.resultData[level[0]].commentList.resultData[level[1]].comments.resultData[level[2]].id)
                    }
                }
            },
            /*
             * 隐藏输入框
             */
            hideReplyBox(level) {
                const pItem = this.dynamicList.resultData[level[0]]

                switch (level.length) {
                    case 1:
                        this.$set(pItem, 'isShow', false)
                        break
                    case 2:
                    case 3:
                        this.$set(pItem.commentList.resultData[level[1]], 'isShow', false)
                        break
                }
            },
            /*
             * 错误提示信息
             */
            showMessage(msg, type) {
                type = type === undefined ? 'error' : type
                this.$message({
                    message: msg,
                    type: type
                })
            }
        },
    }
</script>

<style lang='scss'>
#person_dynamic {
    .dynamic-item-detail:hover {
        .i-button {
            display: table-cell;
        }
    }
    .dynamic-list {
        .dynamic-item-detail {
            .hoverIfshow {
                display: none;
            }
            &:hover {
                .hoverIfshow {
                    display: inline-block;
                }
            }
        }

    }
}
</style>

<style lang='scss' scoped>
    /* 过渡动画 */
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
    .dynamic-type-box,
    .dynamic-item-detail {
        padding: 15px;
        margin-bottom: 15px;
        background-color: #fff;
    }

    .dynamic-item-detail {

        .is-link {
            cursor: pointer;
        }

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
        .dynamic-btn-group {
            white-space: nowrap;
        }

        .dynamic-item-content {
            font-size: 16px;
            line-height: 1.5;
            text-align: justify;
            word-wrap: break-word;

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
            word-wrap: break-word;

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

<style lang='scss'>
    .dynamic-item-content-detail img {
        width: 100%;
    }
/*     .dynamic-btn-group {
        .el-dialog__header {
            position: relative;
            .el-dialog__headerbtn {
                position: absolute;
                top: 0px;
                right: 20px;
            }
        }
    } */
</style>
