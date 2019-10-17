<template>
    <section id="contestDetail" class="clearfix">
        <div class="content_l bgw fl p15">
            <h1 class="content_l_title">{{ detail.title }}</h1>
            <el-steps v-if="$route.query.type == '1'" :space="120" :active="stepActive" finish-status="success" :center="true" class="steps" :align-center="true">
                <el-step :title="item.name" v-for="(item, k) in matchNode" :key="k"></el-step>
            </el-steps>
            <!-- <component :is="entryButton[$route.query.type].component" v-bind="{ addRoute, enrollHandler:entryButton[$route.query.type].handler  }" class="fr"></component> -->
            <div class="routerTo" @click="routerToPage">
                我要报名
                <!-- <router-link :to="{path: '/dynamicDetail', query: { id: $route.query.id, type: $route.query.type, dynamicId: 20 } }">我要报名</router-link> -->
            </div>
            <article v-html="detail.details" class="article"></article>
            <ul class="attList" v-if="attList.length">
                <li class="attList_title fl">附件:</li>
                <!-- <li v-for="(i, k)  in attList" class="attList_li"> <a :href="downloadUrl(i.resourceId, i.name)" :download="i.name" class="btn" title="下载">{{ i.name }} </a></li> -->
                <li v-for="(i, k)  in attList" class="attList_li" :key="k">
                    <a :href="downloadUrl(i.resourceId, i.name)" :download="i.name" class="btn" title="下载">{{ i.name }} </a>
                </li>
            </ul>
        </div>
        <aside class="content_r fr">
            <div class="dynamic bgc_w">
                <h3 class="title p15">竞赛动态 <router-link :to="{path: 'dynamic', query: {id: detail.id, type: $route.query.type}}" class="fr more">更多 &gt;&gt;</router-link></h3>
                <ul class="p15" v-if="dynamicList.length">
                    <li v-for="(i, k) in dynamicList" class="dynamic_lis ellipsis" :title="i.title" :key="k">
                        <i :class="`hot-${k + 1}`" class="hot"> {{ k + 1 }} </i>
                        <router-link class="dynamic_lis_title" :to="{path: '/dynamicDetail', query: { id: $route.query.id, type: $route.query.type, dynamicId: i.id } }">
                            {{ i.title }}
                            <!-- <time class="dynamic_lis_date fr">
                                {{ i.createDate | dateFormat('yyyy-MM-dd') }}
                            </time> -->
                        </router-link>
                    </li>
                </ul>
                <div class="no-data" v-else>暂无数据</div>
            </div>
            <div class="bgc_w mt20" v-if="$route.query.type == '2'">
                <h3 class="title p15">竞赛统计<router-link :to="{path: 'datail'}"></router-link></h3>
                <div class="p15" v-if="offlineStatis.length">
                    <el-table :data="offlineStatis" border>
                        <el-table-column label="项目类别" show-overflow-tooltip align='center' prop="projectName"></el-table-column>
                        <el-table-column label="参赛数量" show-overflow-tooltip align='center' prop="num"></el-table-column>
                    </el-table>
                </div>
                <div class="no-data" v-else>暂无数据</div>
            </div>
            <div class="bgc_w mt20" v-else>
                <h3 class="title p15">竞赛统计<router-link :to="{path: 'datail'}"></router-link></h3>
                <div class="p15" v-if="tableData.length">
                    <el-table :data="tableData" border :max-height="250">
                        <el-table-column label="区域/学校" show-overflow-tooltip align='center'>
                            <template slot-scope="scope">
                                {{scope.row.orgName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="参赛人数" show-overflow-tooltip align='center' prop="counts"></el-table-column>
                        <el-table-column label="参赛作品数" show-overflow-tooltip align='center' prop="wkCount"></el-table-column>
                    </el-table>
                </div>
                <div class="no-data" v-else>暂无数据</div>
            </div>
        </aside>
    </section>
</template>

<script>
import { requestSteep, requestOfflineStatis, requestOfflineStep, requestIsApply, requestDetail, requestOfflineDetail } from '@/service/contest_detail.js'
import { requestDynamicList, requestCompeteStatList } from '@/service/manage.js'

export default {
    data() {
        const baseInfo = this.$ls.get('baseInfo') && this.$ls.get('baseInfo').baseInfo
        return {
            // 登录信息
            baseInfo: baseInfo,
            // 比赛节点
            matchNode: [
                { name: '报名', status: 2 },
                { name: '初评', status: 1 },
                { name: '终评', status: 1 }
            ],
            // 附件列表
            attList: [],
            // 竞赛动态
            dynamicList: [],
            // 统计
            tableData: [],
            stepActive: 0,
            // identity: '' // 登录用户身份
            dynamicParam: {
                totalNum: 0,
                pageSize: 6,
                pageNum: 1
            },
            offlineStatis: [],
            detailData: {}
        }
    },
    methods: {
        // 获取参赛统计数据
        getCompeteStatList() {
            const params = Object.assign({}, { matchId: this.$route.query.id })
            requestCompeteStatList(params).then((res) => {
                if (res.data.code === 200) {
                    this.tableData = res.data.appendInfo.list
                }
            })
        },
        // 获取线下竞赛统计
        getOfflineStatis() {
            const params = Object.assign({}, { matchId: this.$route.query.id })
            requestOfflineStatis(params).then((res) => {
                if (res.data.code === 200) {
                    this.offlineStatis = res.data.appendInfo.matchStatistics
                }
            })
        },
        // 动态数据
        getDataList() {
            requestDynamicList({ matchId: this.$route.query.id, title: '' }, this.dynamicParam).then((res) => {
                if (res.data.code === 200) {
                    this.dynamicList = res.data.entity.resultData
                    this.$set(this.dynamicParam, 'totalNum', res.data.entity.totalNum)
                }
            })
        },
        init() {
            const type = Number(this.$route.query.type)
            const key = type === 1 ? 'attachmentList' : 'offlineAttachmentsList'
            const detail = this.detail
            const baseInfo = this.$ls.get('baseInfo')
            if (detail[key].length) {
                this.attList = detail[key].map(i => ({ resourceId: i.resourceId, name: i.name }))
            }
            if (baseInfo) {
                this.baseInfo = baseInfo.baseInfo
            }
        },
        getOnlineStep() {
            const type = Number(this.$route.query.type)
            const handle = type === 1 ? requestSteep : requestOfflineStep
            const key = type === 1 ? 'id' : 'matchId'
            handle({ [key]: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    // status(1: 未开始, 2:进行中, 3: 已结束)
                    let _data = res.data.appendInfo || {}
                    let enrollStatus = '1'
                    const now = new Date().getTime()
                    // 判断报名时间
                    if (now > (this.detail.enrollEndDate + 86400000)) {
                        enrollStatus = '3'
                    } else if (now > (this.detail.enrollStartDate + 86400000)) {
                        enrollStatus = '2'
                    }
                    _data = _data.matchList || []
                    _data.unshift({ name: '报名', status: enrollStatus })
                    this.matchNode = _data.map(x => ({ name: x.name, status: x.status }))

                    const _dataTmp = JSON.parse(JSON.stringify(_data)).reverse()
                    let _idx = _dataTmp.findIndex(x => x.status === '2')
                    if (_idx >= 0) {
                        if (_idx === _data.length - 1) {
                            this.stepActive = _data[0].status === '1' ? 1 : 0
                        } else {
                            this.stepActive = _idx >= 0 ? _data.length - _idx - 1 : 1
                        }
                    } else {
                        _idx = _dataTmp.findIndex(x => x.status === '3')
                        this.stepActive = _idx >= 0 ? _data.length - _idx : -1
                    }
                    // console.log(this.stepActive)
                    // console.log(this.matchNode)
                }
            })
        },
        // 请求详情
        getDetail() {
            const type = Number(this.$route.query.type)
            const handle = type === 1 ? requestDetail : requestOfflineDetail
            handle({ id: this.$route.query.id }).then((res) => {
                if (res.data.code === 200) {
                    this.detailData = res.data.entity
                }
            })
        },
        routerToPage() {
            if (this.baseInfo) {
                if ((this.identity === 'student' && this.detail.actorType === '1') || (this.identity === 'teacher' && this.detail.actorType === '2')) {
                    requestIsApply({ matchId: this.$route.query.id }).then((res) => {
                        // isApply: -3.报名未开始,-2.报名且未通过审核,-1.未报名,1.已报名 2.报名审核通过,3.报名已结束
                        // isProhibit: 判断是否在同一区域
                        if (res.data.code === 200) {
                            if (!res.data.appendInfo.isProhibit) {
                                this.$message({
                                    message: '报名人员与赛事不在同一区域！'
                                })
                            } else {
                                this.$router.push({ path: '/contest/myPlay/uploadWork', query: { id: this.$route.query.id, type: this.$route.query.type } })
                            }
                        } else {
                            this.showMessage('info', res.data.msg, 2000)
                        }
                    })
                } else {
                    this.showMessage('info', '温馨提示：您的身份不符合参赛要求，去欣赏参赛作品吧', 2000)
                }
            } else {
                this.$message({
                    message: '请先登录！'
                })
            }
        }
    },
    mounted() {
        this.getDetail()
        this.getDataList()
        this.identity = this.$ls.get('userIdentity') ? this.$ls.get('userIdentity') : ''
        if (Object.keys(this.detail).length) {
            this.init()
            this.getOnlineStep()
        }
        if (Number(this.$route.query.type) === 1) {
            this.getCompeteStatList()
            // this.getOnlineStep()
        } else {
            this.getOfflineStatis()
        }
    },
    filters: {
        handleWorksDesc(txt = '', len = 50, sep = '...') { // 处理作品描述字段，字段包括HTML标签内容
            const reg = new RegExp('(.{' + len + '}).+')
            return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || ''
        }
    },
    props: {
        detail: {
            type: Object,
            default: {}
        }
    },
    watch: {
        detail: {
            handler: function (val) {
                if (Object.keys(val).length) {
                    this.init()
                    this.getOnlineStep()
                    // if (Number(this.$route.query.type) === 1) {
                    //     this.getOnlineStep()
                    // }
                }
            }
        }
    }
}
</script>

<style lang='scss'>
@import '~@/assets/css/scss/vars.scss';
#contestDetail {
    .content_l_title {
        text-align: center;
        font-size: 22px;
        font-weight: 400;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    /* 进度条修改 */
    .el-step.is-horizontal {
        width: 88px;
    }
    .el-step__head {
        &.is-text {
            border-width: 5px;
            .el-step__icon {
                color: #000;
                font-weight: 400;
            }
        }
        &.is-success {
            color: #000;
            background-color: #fff;
            border-color: $theme-color;
            .el-step__icon {
                color: $theme-color;
            }
        }
        &.is-process {
            &.is-text .el-step__icon {
                color: #fff;
            }
        }
        .el-step__line.is-horizontal {
            left: 34px;
            height: 4px;
            .el-step__line-inner {
                border-width: 2px !important;
            }
        }
    }
    .el-step__main {
        .el-step__title.is-success {
            color: $theme-color;
        }
        .el-step__title.is-process {
            color: #97a8be;
        }
    }
    .el-form-item {
        margin: 0;
    }
    .is-error {
        margin-bottom: 20px;
    }
    .cell {
        padding: 0;
    }
    .el-table__body-wrapper {
        overflow: overlay;
    }
    .el-dialog {
        min-width: 550px;
    }
    .article {
        img {
            display: block;
            max-width: 100%;
        }
    }
}
</style>

<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
.pt20 {
  padding-top: 20px;
}
.p15 {
    padding: 15px;
    box-sizing: border-box;
}
.mt20 {
    margin-top: 20px;
}
a.more {
  color: #999999;
  &:hover {
    color: $theme-color;
  }
}
#contestDetail {
    color: #333;
    font-size: 14px;
    .content_l {
        width: 906px;
        title {
            display: block;
            text-align: center;
            font-size: 22px;
            font-weight: 400;
        }
        .steps {
          margin-bottom: 40px;
        }
        .article {
            color: #333;
            word-spacing:0.1em;
            line-height: 1.5;
            min-height: 300px;
            text-indent: 2em;
            overflow: hidden;
        }
        .attList {
            font-size: 14px;
            margin-top: 30px;
            .attList_li {
                margin-left: 3em;
                padding-bottom: 5px;
                a {
                    color: nth($default-color, 1);
                }
            }
        }
    }
    .content_r {
        width: 275px;
        .title {
            font-size: 16px;
            border-bottom: 1px solid #ddd;
        }
        .dynamic {
            .dynamic_lis {
                & + .dynamic_lis {
                    margin-top: 15px;
                }
                .dynamic_lis_title:hover {
                    color: $theme-color;
                }
                .hot {
                    padding-left: 2px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #fff;
                    background-color: #bbb;
                    text-align: center;
                    margin-right: 8px;
                }
                i.hot-1 {
                    background-color: #D00;
                }
                i.hot-2 {
                    background-color: #ff7200;
                }
                i.hot-3 {
                    background-color: #ff9d00;
                }
                .dynamic_lis_date {
                    color: #999;
                }
            }
        }
    }
}

.routerTo {
    width: 140px;
    line-height: 40px;
    color: #23b8ff;
    border: 1px solid #23b8ff;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    margin: 70px auto 50px;
    &:hover {
        background-color: #23b8ff;
        color: #fff;
    }
}
</style>
