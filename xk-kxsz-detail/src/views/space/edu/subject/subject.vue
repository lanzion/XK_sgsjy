<template>
  <div id="subject" class="subject">
    <div class="subject_top">
        <ul class="subject_top_ul clearfix">
            <li class="subject_top_li bgw" v-for="(item, index) in modelList">
                <v-tabs :tabs="item.tabs" :cur_tab="item.cur_tab" :more="item.more"></v-tabs>
                <ul class="subject_list" v-if="item.items.length > 0">
                    <li class="subject_list_item mes_lis clearfix" v-for="(list, index) in item.items" :key='index'>
                        <template v-if="item.notInRoute">
                            <a @click.prevent="redirect(item.details.path, { query: { id:$route.query.id, [item.details.query]: list.id } })">
                                <time class="mes_time">{{list.publishDate | dateFormat('yyyy-MM-dd')}}</time>
                                <p class="mes_title">{{list.title}}</p>
                            </a>
                        </template>
                        <router-link v-else :to="{ path:item.details.path, query: {id:$route.query.id,[item.details.query]: list.id }}" target="_blank">
                            <time class="mes_time">{{list.publishDate | dateFormat('yyyy-MM-dd')}}</time>
                            <p class="mes_title">{{list.title}}</p>
                        </router-link>
                    </li>
                </ul>
                <div class="empty-block subject_list" style="line-height:360px;" v-else>暂无数据</div>
            </li>
        </ul>
    </div>
    <div class="subject_bottom bgw">
        <v-tabs :tabs="subject_resource_tab.tabs" class="bgw" :more="subject_resource_tab.more"></v-tabs>
        <div class="table-box">
            <el-table class="data-table" :data="resourceList" style="width: 100%">
                <el-table-column prop="name" label="资源名称"></el-table-column>
                <el-table-column prop="resourceType" label="资源类型" width="150">
                    <template slot-scope="scope">
                        {{resourceType[scope.row.resourceType]}}
                    </template>
                </el-table-column>
                <el-table-column prop="fileSize" label="文件大小" width="120">
                    <template slot-scope="scope">{{scope.row.fileSize ? (scope.row.fileSize/1024).toFixed(1) : 0}}KB</template>
                </el-table-column>
                <el-table-column prop="userName" label="上传人" width="120"></el-table-column>
                <el-table-column prop="updateDate" label="上传时间" width="120">
                    <template slot-scope="scope">{{ scope.row.updateDate | dateFormat('yyyy-MM-dd')}}</template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                    <!-- <template slot-scope="scope"><a :href="downloadUrl(scope.row.resourceId, scope.row.name)" :download="scope.row.name" style="color:#00a0e9;">下载</a></template> -->
                    <template slot-scope="scope"><a @click="downloadUrl(scope.row.resourceId, scope.row.name)" style="color:#00a0e9;">下载</a></template>
                </el-table-column>
            </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import tabs from 'Common/tabs.vue'
import {
    requestResourceList,
    requestsubjectGuideList,
    requestSubjectActivityList,
    requestSpaceResultList,
    requestBackendSubjectList
} from '@/service/subject.js'

const moreLink = {
    path: 'subject/:model',
    params: 'model'
}

export default {
    name: 'subject',
    data() {
        return {
            modelList: [
                {
                    tabs: [
                        { name: '申报指南', type: 'guide' }
                    ],
                    more: moreLink,
                    items: [],
                    details: {
                        path: 'subject/guide/detail',
                        query: 'guideId'
                    }
                }, {
                    tabs: [
                        { name: '在研课题', type: 'research' }
                    ],
                    more: moreLink,
                    items: [],
                    notInRoute: true,
                    details: {
                        path: this.pages.detail.subject,
                        query: 'subjectId'
                    }
                }, {
                    tabs: [
                        { name: '课题活动', type: 'activity' }
                    ],
                    more: moreLink,
                    items: [],
                    details: {
                        path: 'subject/activity/detail',
                        query: 'activityId'
                    }
                }, {
                    tabs: [
                        { name: '课题成果', type: 'results' }
                    ],
                    more: moreLink,
                    items: [],
                    details: {
                        path: 'subject/results/detail',
                        query: 'resultId'
                    }
                }
            ],
            subject_resource_tab: {
                tabs: [
                    { name: '课题资源', type: 'resource' }
                ],
                more: moreLink,
                items: [],
                details: {
                    path: '',
                    query: 'resultId'
                }
            },
            resourceList: [],
            // 资源类型 (1.课题申报指南附件, 2.课题申报指南资源, 3.课题申报附件, 4.阶段成果, 5.课题成果, 6课题任务)
            resourceType: {
                1: '课题申报指南附件',
                2: '课题申报指南资源',
                3: '课题申报附件',
                4: '阶段成果',
                5: '课题成果',
                6: '课题任务'
            },
            id: ''
        }
    },
    components: {
        'v-tabs': tabs
    },
    created() {
        this.id = this.$route.query.id
    },
    mounted() {
        this.getSubjectResourceList()
        this.getSubjectGuideList()
        this.getResearchSubjectList()
        this.getSubjectActivityList()
        this.getSubjectResultList()
    },
    methods: {
        getSubjectGuideList() {
            requestsubjectGuideList({ orgId: this.$route.query.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                const datas = res.data.entity ? res.data.entity.resultData : []
                for (const i in datas) {
                    const obj = {}
                    obj.title = datas[i].title
                    obj.id = datas[i].id
                    obj.publishDate = datas[i].createDate
                    this.modelList[0].items.push(obj)
                }
            })
        },
        getResearchSubjectList() {
            requestBackendSubjectList({ orgId: this.id, auditStatus: 1 }, { pageSize: 5, pageNum: 1 }).then((res) => {
                const datas = res.data.entity ? res.data.entity.resultData : []
                for (const i in datas) {
                    const obj = {}
                    obj.title = datas[i].name
                    obj.id = datas[i].id
                    obj.publishDate = datas[i].projectDate
                    this.modelList[1].items.push(obj)
                }
            })
        },
        getSubjectActivityList() {
            requestSubjectActivityList({ orgId: this.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                const datas = res.data.entity ? res.data.entity.resultData : []
                for (const i in datas) {
                    const obj = {}
                    obj.title = datas[i].title
                    obj.id = datas[i].id
                    obj.publishDate = datas[i].startDate
                    this.modelList[2].items.push(obj)
                }
            })
        },
        getSubjectResultList() {
            requestSpaceResultList({ orgId: this.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                const datas = res.data.entity ? res.data.entity.resultData : []
                for (const i in datas) {
                    const obj = {}
                    obj.title = datas[i].name
                    obj.id = datas[i].id
                    obj.publishDate = datas[i].createDate
                    this.modelList[3].items.push(obj)
                }
            })
        },
        getSubjectResourceList() {
            requestResourceList({ orgId: this.id }, { pageSize: 5, pageNum: 1 }).then((res) => {
                this.resourceList = res.data.entity ? res.data.entity.resultData : []
            })
        }
    }
}

</script>
<style lang='scss'>
@import '~@/assets/css/scss/tabs.scss';
@import '~@/assets/css/scss/vars.scss';
#subject{
    .el-table{
        .cell{
            text-align: center;
        }
    }
    .subject_top,.subject_bottom {
        .tabs-bar-header {
            .tabs-right{
                right: 15px;
            }
        }
    }
    .subject_top_ul {
        .subject_top_li {
            .el-tabs__item.is-active {
                color: #333;
            }
            .el-tabs__active-bar {
                background-color: transparent;
            }
            .tabs-btn-more {
                color: #999;
                &:hover {
                    color: nth($default-color, 1);
                }
            }
        }
    }
}
</style>
<style lang='scss' scoped>
@import '~@/assets/css/scss/vars.scss';
$list-item-height: 40px;
.subject {
    width: 100%;
    .subject_top {
        .subject_top_ul {
            .subject_top_li {
                float: left;
                // border: 1px solid #C9C9C9;
                box-sizing: border-box;
                width: 48.5%;
                margin-bottom: 30px;
                &:nth-of-type(2n) {
                    margin-left: 3%;
                }
                .subject_list {
                    height: 5 * ($list-item-height + 1);
                    margin-bottom: -1px;
                    padding: 0 15px 15px;
                }
                .mes_lis {
                    display: block;
                    line-height: $list-item-height;
                    border-bottom: 1px dotted #E3E3E3;
                    font-size: 14px;
                    &:hover .mes_title {
                        color: nth($default-color, 1);
                    }
                    .mes_title {
                        /* color: nth($default-color, 1); */
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .mes_time {
                        float: right;
                        color: #626262;
                        margin-left: 1em;
                    }
                }
                .tabs-bar-header {
                    margin: 0;
                }
            }
        }
    }
    .subject_bottom{
        // padding: 15px;
        .table-box{
            padding: 0 15px 15px;
        }
    }
}

</style>
